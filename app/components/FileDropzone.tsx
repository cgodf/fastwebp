'use client';

import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { ConversionFile } from '../../types/webp';

interface FileDropzoneProps {
  onFilesAdded: (files: ConversionFile[]) => void;
  disabled?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  maxTotalSize?: number;
}

const DEFAULT_MAX_FILES = 10;
const DEFAULT_MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const DEFAULT_MAX_TOTAL_SIZE = 200 * 1024 * 1024; // 200MB

export default function FileDropzone({
  onFilesAdded,
  disabled = false,
  maxFiles = DEFAULT_MAX_FILES,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  maxTotalSize = DEFAULT_MAX_TOTAL_SIZE,
}: FileDropzoneProps) {
  const [errors, setErrors] = useState<string[]>([]);

  const validateFiles = useCallback((files: File[]): { validFiles: File[]; errors: string[] } => {
    const validFiles: File[] = [];
    const newErrors: string[] = [];

    // Check file count
    if (files.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed. Selected ${files.length} files.`);
      return { validFiles: [], errors: newErrors };
    }

    let totalSize = 0;

    for (const file of files) {
      // Check file type
      const isWebp = file.name.toLowerCase().match(/\.webp$/);
      if (!isWebp) {
        newErrors.push(`${file.name}: Only WebP files are supported.`);
        continue;
      }

      // Check individual file size
      if (file.size > maxFileSize) {
        const sizeMB = Math.round(file.size / (1024 * 1024));
        const maxSizeMB = Math.round(maxFileSize / (1024 * 1024));
        newErrors.push(`${file.name}: File too large (${sizeMB}MB). Maximum ${maxSizeMB}MB per file.`);
        continue;
      }

      totalSize += file.size;
      validFiles.push(file);
    }

    // Check total size
    if (totalSize > maxTotalSize) {
      const totalSizeMB = Math.round(totalSize / (1024 * 1024));
      const maxTotalSizeMB = Math.round(maxTotalSize / (1024 * 1024));
      newErrors.push(`Total files too large (${totalSizeMB}MB). Maximum ${maxTotalSizeMB}MB total.`);
      return { validFiles: [], errors: newErrors };
    }

    return { validFiles, errors: newErrors };
  }, [maxFiles, maxFileSize, maxTotalSize]);

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setErrors([]);
    
    const { validFiles, errors: validationErrors } = validateFiles(acceptedFiles);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Convert to ConversionFile format
    const conversionFiles: ConversionFile[] = validFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      name: file.name.replace(/\.webp$/i, ''),
      size: file.size,
      status: 'waiting',
    }));

    onFilesAdded(conversionFiles);
  }, [onFilesAdded, validateFiles]);
  
  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    setErrors([]);
    
    const errorCounts = new Map<string, { count: number; files: string[] }>();
    
    fileRejections.forEach(rejection => {
      const { file, errors } = rejection;
      errors.forEach((err) => {
        let errorKey = '';
        
        if (err.code === 'file-invalid-type') {
          errorKey = 'invalid-type';
        } else if (err.code === 'file-too-large') {
          errorKey = 'too-large';
        } else if (err.code === 'too-many-files') {
          errorKey = 'too-many-files';
        } else {
          errorKey = err.code || 'unknown';
        }
        
        if (!errorCounts.has(errorKey)) {
          errorCounts.set(errorKey, { count: 0, files: [] });
        }
        
        const errorInfo = errorCounts.get(errorKey)!;
        errorInfo.count++;
        errorInfo.files.push(file.name);
        errorCounts.set(errorKey, errorInfo);
      });
    });
    
    const consolidatedErrors: string[] = [];
    
    errorCounts.forEach((errorInfo, errorKey) => {
      if (errorKey === 'too-many-files') {
        // For "too many files", show a single consolidated message
        consolidatedErrors.push(`Too many files selected (${errorInfo.count + maxFiles}). Maximum ${maxFiles} files allowed.`);
      } else if (errorInfo.count === 1) {
        // Single file error - show filename
        if (errorKey === 'invalid-type') {
          consolidatedErrors.push(`${errorInfo.files[0]}: Only WebP files are supported.`);
        } else if (errorKey === 'too-large') {
          consolidatedErrors.push(`${errorInfo.files[0]}: File too large. Maximum ${Math.round(maxFileSize / (1024 * 1024))}MB per file.`);
        } else {
          consolidatedErrors.push(`${errorInfo.files[0]}: Error occurred.`);
        }
      } else {
        // Multiple files with same error - show count
        if (errorKey === 'invalid-type') {
          consolidatedErrors.push(`${errorInfo.count} files rejected: Only WebP files are supported.`);
        } else if (errorKey === 'too-large') {
          consolidatedErrors.push(`${errorInfo.count} files rejected: Files too large. Maximum ${Math.round(maxFileSize / (1024 * 1024))}MB per file.`);
        } else {
          consolidatedErrors.push(`${errorInfo.count} files rejected: Error occurred.`);
        }
      }
    });
    
    setErrors(consolidatedErrors);
  }, [maxFiles, maxFileSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: {
      'image/webp': ['.webp'],
    },
    disabled,
    multiple: true,
    maxFiles,
    maxSize: maxFileSize,
  });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          group glass rounded-2xl p-12 text-center cursor-pointer border-2
          transition-all duration-300
          ${isDragActive ? 'scale-[1.02] border-primary bg-primary/5 shadow-xl shadow-primary/10' : 'border-border/40'}
          ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:border-primary/60 hover:-translate-y-1 hover:shadow-lg'}
          ${errors.length > 0 ? 'border-destructive/50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          {/* Upload Icon */}
          <div className={`mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15 ${
            isDragActive ? 'scale-110 bg-primary/20' : ''
          }`}>
            <svg
              className="w-8 h-8 text-primary transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          {/* Main Text */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              {isDragActive
                ? 'Drop your WebP files here'
                : 'Drag & Drop Your WebP Files Here'
              }
            </h3>
            <p className="text-muted-foreground text-lg">
              or click to select files from your device
            </p>
          </div>

          {/* File Limits Info */}
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Supports WebP files</p>
            <p>
              Maximum {maxFiles} files • {Math.round(maxFileSize / (1024 * 1024))}MB per file • {Math.round(maxTotalSize / (1024 * 1024))}MB total
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">100% Private</span>
            <span className="text-xs opacity-75">- Files never leave your device</span>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mt-4 space-y-2">
          {errors.map((error, index) => (
            <div
              key={index}
              className="glass rounded-lg p-3 border-destructive/50 bg-destructive/10"
            >
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}