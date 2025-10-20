// Error types for better error handling
export type ConversionError = 
  | 'INVALID_FILE'
  | 'CONVERSION_FAILED' 
  | 'BROWSER_NOT_SUPPORTED'
  | 'MEMORY_ERROR'
  | 'UNKNOWN_ERROR';

export interface ConversionResult {
  success: boolean;
  blob?: Blob;
  thumbnail?: string;
  error?: {
    type: ConversionError;
    message: string;
  };
}

export class WebpConverterService {
  /**
   * Check if the browser supports WebP conversion
   */
  public checkBrowserSupport(): { supported: boolean; message?: string } {
    // Check for Canvas support (required for WebP to JPG conversion)
    if (typeof HTMLCanvasElement === 'undefined') {
      return {
        supported: false,
        message: 'Canvas API is not supported. Please update your browser.'
      };
    }

    // Check for Blob support
    if (typeof Blob !== 'function') {
      return {
        supported: false,
        message: 'Blob API is not supported. Please update your browser.'
      };
    }

    return { supported: true };
  }

  /**
   * Convert a single WebP file to JPG with retry logic
   */
  public async convertFile(file: File, quality: number = 0.9, maxRetries: number = 2): Promise<ConversionResult> {
    let lastError: Error | ConversionResult['error'] | null = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await this.performConversion(file, quality);
        
        // If successful, return immediately
        if (result.success) {
          return result;
        }
        
        // If it's a non-retryable error, don't retry
        if (result.error && this.isNonRetryableError(result.error.type)) {
          return result;
        }
        
        lastError = result.error;
        
        // Wait with exponential backoff before retry (except on last attempt)
        if (attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 5000); // Max 5 seconds
          await this.delay(delay);
        }
        
      } catch (error) {
        lastError = error as Error;
        
        // Wait with exponential backoff before retry (except on last attempt)
        if (attempt < maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
          await this.delay(delay);
        }
      }
    }
    
    // If all retries failed, return the last error
    return {
      success: false,
      error: {
        type: 'CONVERSION_FAILED',
        message: `Conversion failed after ${maxRetries + 1} attempts: ${lastError?.message || 'Unknown error'}`
      }
    };
  }
  
  /**
   * Perform the actual conversion using Canvas API
   */
  private async performConversion(file: File, quality: number = 0.9): Promise<ConversionResult> {
    // Check browser support first
    const browserCheck = this.checkBrowserSupport();
    if (!browserCheck.supported) {
      return {
        success: false,
        error: {
          type: 'BROWSER_NOT_SUPPORTED',
          message: browserCheck.message || 'Browser not supported'
        }
      };
    }

    try {
      // Validate file type
      if (!this.isWebpFile(file)) {
        return {
          success: false,
          error: {
            type: 'INVALID_FILE',
            message: 'File must be WebP format'
          }
        };
      }

      // Convert WebP to JPG using Canvas API
      const convertedBlob = await this.convertWebpToJpg(file, quality);
      
      if (!convertedBlob) {
        return {
          success: false,
          error: {
            type: 'CONVERSION_FAILED',
            message: 'Failed to convert WebP to JPG'
          }
        };
      }

      // Generate thumbnail
      const thumbnail = await this.generateThumbnail(convertedBlob);

      return {
        success: true,
        blob: convertedBlob,
        thumbnail
      };

    } catch (error: unknown) {
      const err = error as Error;
      console.error('WebP conversion failed:', error);
      
      // Determine error type
      let errorType: ConversionError = 'UNKNOWN_ERROR';
      let errorMessage = 'An unknown error occurred during conversion';

      if (err?.message?.includes('memory') || err?.message?.includes('Memory')) {
        errorType = 'MEMORY_ERROR';
        errorMessage = 'Not enough memory to convert this file. Try a smaller file.';
      } else if (err?.message?.includes('Invalid') || err?.message?.includes('corrupt')) {
        errorType = 'INVALID_FILE';
        errorMessage = 'This WebP file appears to be corrupted or invalid.';
      } else if (err?.message) {
        errorType = 'CONVERSION_FAILED';
        errorMessage = `Conversion failed: ${err.message}`;
      }

      return {
        success: false,
        error: {
          type: errorType,
          message: errorMessage
        }
      };
    }
  }

  /**
   * Convert WebP file to JPG using Canvas API
   */
  private async convertWebpToJpg(file: File, quality: number): Promise<Blob | null> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      img.onload = () => {
        try {
          // Set canvas dimensions to match image
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw the WebP image onto the canvas
          ctx.drawImage(img, 0, 0);

          // Convert canvas to JPG blob
          canvas.toBlob((blob) => {
            // Cleanup
            URL.revokeObjectURL(img.src);
            resolve(blob);
          }, 'image/jpeg', quality);
        } catch (error) {
          URL.revokeObjectURL(img.src);
          reject(error);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error('Failed to load WebP image'));
      };

      // Create object URL for the WebP file
      img.src = URL.createObjectURL(file);
    });
  }
  
  /**
   * Check if an error type should not be retried
   */
  private isNonRetryableError(errorType: ConversionError): boolean {
    return [
      'BROWSER_NOT_SUPPORTED',
      'INVALID_FILE',
      'MEMORY_ERROR' // Don't retry memory errors as they're likely to fail again
    ].includes(errorType);
  }
  
  /**
   * Utility function to create delays for retry logic
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Clean up memory after conversion
   */
  public cleanupMemory(): void {
    // Force garbage collection if available (mainly for development)
    if (typeof window !== 'undefined' && 'gc' in window && typeof (window as { gc?: () => void }).gc === 'function') {
      (window as { gc: () => void }).gc();
    }
  }

  /**
   * Generate a thumbnail from the converted JPG blob
   */
  private async generateThumbnail(blob: Blob, maxSize: number = 200): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate thumbnail dimensions
        let { width, height } = img;
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and convert to data URL
        ctx?.drawImage(img, 0, 0, width, height);
        const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
        
        // Cleanup
        URL.revokeObjectURL(img.src);
        resolve(thumbnail);
      };

      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error('Failed to generate thumbnail'));
      };

      img.src = URL.createObjectURL(blob);
    });
  }

  /**
   * Check if a file is a WebP file
   */
  private isWebpFile(file: File): boolean {
    return file.name.toLowerCase().endsWith('.webp');
  }

  /**
   * Format file size for display
   */
  public static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Get user-friendly error message
   */
  public static getErrorMessage(error: ConversionError): string {
    switch (error) {
      case 'INVALID_FILE':
        return 'Invalid WebP file. Please select a valid WebP file.';
      case 'CONVERSION_FAILED':
        return 'Conversion failed. Please try again or select a different file.';
      case 'BROWSER_NOT_SUPPORTED':
        return 'Your browser does not support WebP conversion. Please use a modern browser.';
      case 'MEMORY_ERROR':
        return 'Not enough memory to convert this file. Try selecting smaller files.';
      case 'UNKNOWN_ERROR':
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}

// Export singleton instance
export const webpConverter = new WebpConverterService();

// Export utility functions
export const formatFileSize = WebpConverterService.formatFileSize;
export const getErrorMessage = WebpConverterService.getErrorMessage;