'use client';

import { useState, useCallback, useEffect } from 'react';
import { ConversionFile, ConversionProgress } from '../../types/webp';
import { webpConverter, ConversionResult } from '../services/webpConverter';
import { trackConversion, trackError } from './Analytics';
import Image from 'next/image';
import FileDropzone from './FileDropzone';
import ConversionQueue from './ConversionQueue';
import DownloadManager from './DownloadManager';
import { HeaderAd, BelowResultsAd, InContentAd, MobileAnchorAd } from './AdPlaceholder';
import ThemeToggle from './ThemeToggle';
import { LinearProgress } from './ProgressIndicator';
import ErrorRecovery from './ErrorRecovery';
import BatchProgressSummary from './BatchProgressSummary';

type AppState = 'idle' | 'processing' | 'completed';

export default function ConversionPipeline() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [files, setFiles] = useState<ConversionFile[]>([]);
  const [progress, setProgress] = useState<ConversionProgress>({ total: 0, completed: 0, failed: 0 });
  const [browserSupported, setBrowserSupported] = useState(true);
  const [supportMessage, setSupportMessage] = useState<string>('');

  // Check browser support on component mount
  useEffect(() => {
    const supportCheck = webpConverter.checkBrowserSupport();
    setBrowserSupported(supportCheck.supported);
    if (!supportCheck.supported) {
      setSupportMessage(supportCheck.message || 'Browser not supported');
    }
  }, []);

  // Handle files being added from dropzone
  const handleFilesAdded = useCallback((newFiles: ConversionFile[]) => {
    // Don't process if no valid files were provided
    if (newFiles.length === 0) {
      return; // Stay in idle state
    }
    
    setFiles(newFiles);
    setAppState('processing');
    setProgress({ total: newFiles.length, completed: 0, failed: 0 });
    
    // Start conversion process
    processFiles(newFiles);
  }, []);

  // Process files sequentially to avoid memory issues
  const processFiles = async (filesToProcess: ConversionFile[]) => {
    const updatedFiles = [...filesToProcess];
    let completedCount = 0;
    let failedCount = 0;

    for (let i = 0; i < updatedFiles.length; i++) {
      const file = updatedFiles[i];
      
      // Update file status to converting
      file.status = 'converting';
      setFiles([...updatedFiles]);

      try {
        // Convert the file with retry logic
        const result: ConversionResult = await webpConverter.convertFile(file.file, 0.9, 2);
        
        if (result.success && result.blob && result.thumbnail) {
          // Success
          file.status = 'done';
          file.convertedBlob = result.blob;
          file.thumbnail = result.thumbnail;
          completedCount++;
          
          // Track successful conversion
          trackConversion(1, updatedFiles.length > 1 ? 'bulk' : 'single');
        } else {
          // Conversion failed
          file.status = 'failed';
          file.error = result.error?.message || 'Conversion failed';
          failedCount++;
          
          // Track error
          if (result.error) {
            trackError(result.error.type, result.error.message);
          }
        }
      } catch (error) {
        // Unexpected error
        file.status = 'failed';
        file.error = error instanceof Error ? error.message : 'Unexpected error occurred';
        failedCount++;
        
        // Track error
        trackError('UNKNOWN_ERROR', file.error);
      }
      
      // Cleanup memory after each conversion
      webpConverter.cleanupMemory();
      
      // Small delay to prevent overwhelming the browser
      await new Promise(resolve => setTimeout(resolve, 100));

      // Update progress
      setProgress({ 
        total: updatedFiles.length, 
        completed: completedCount, 
        failed: failedCount 
      });
      
      // Update files array
      setFiles([...updatedFiles]);
    }

    // All files processed
    setAppState('completed');
  };

  // Reset to initial state
  const handleReset = useCallback(() => {
    setFiles([]);
    setAppState('idle');
    setProgress({ total: 0, completed: 0, failed: 0 });
  }, []);

  // Remove a specific file from the list
  const handleRemoveFile = useCallback((fileId: string) => {
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(f => f.id !== fileId);
      
      // If no files left, reset to idle
      if (updatedFiles.length === 0) {
        setAppState('idle');
        setProgress({ total: 0, completed: 0, failed: 0 });
      } else {
        // Update progress
        const completed = updatedFiles.filter(f => f.status === 'done').length;
        const failed = updatedFiles.filter(f => f.status === 'failed').length;
        setProgress({ total: updatedFiles.length, completed, failed });
      }
      
      return updatedFiles;
    });
  }, []);

  // Retry specific files by ID
  const handleRetryFiles = useCallback((fileIds: string[]) => {
    const updatedFiles = files.map(f => 
      fileIds.includes(f.id) && f.status === 'failed'
        ? { ...f, status: 'waiting' as const, error: undefined }
        : f
    );
    
    const filesToRetry = updatedFiles.filter(f => fileIds.includes(f.id) && f.status === 'waiting');
    
    if (filesToRetry.length === 0) return;
    
    setFiles(updatedFiles);
    setAppState('processing');
    
    // Process only the retry files
    processFiles(filesToRetry);
  }, [files]);
  
  // Remove specific files by ID  
  const handleRemoveFiles = useCallback((fileIds: string[]) => {
    const updatedFiles = files.filter(f => !fileIds.includes(f.id));
    
    setFiles(updatedFiles);
    
    // Update progress
    const completed = updatedFiles.filter(f => f.status === 'done').length;
    const failed = updatedFiles.filter(f => f.status === 'failed').length;
    
    setProgress({ total: updatedFiles.length, completed, failed });
    
    // If no files left, reset to idle
    if (updatedFiles.length === 0) {
      setAppState('idle');
      setProgress({ total: 0, completed: 0, failed: 0 });
    } else if (updatedFiles.every(f => f.status === 'done' || f.status === 'failed')) {
      setAppState('completed');
    }
  }, [files]);

  // Legacy retry function for backward compatibility
  const handleRetryFailed = useCallback(() => {
    const failedFileIds = files.filter(f => f.status === 'failed').map(f => f.id);
    handleRetryFiles(failedFileIds);
  }, [files, handleRetryFiles]);

  // Show browser not supported message
  if (!browserSupported) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <HeaderAd className="mb-8" />
        
        <div className="glass rounded-2xl p-12 text-center border-destructive/50">
          <div className="mx-auto w-16 h-16 glass rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Browser Not Supported</h2>
          <p className="text-muted-foreground text-lg mb-6">{supportMessage}</p>
          <p className="text-sm text-muted-foreground">
            This tool requires Canvas API support for WebP conversion.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      {/* Header with Theme Toggle */}
      <div className="w-full border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <Image src="/fastwebplogo.svg" alt="FastWebP" width={32} height={32} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-foreground">Fast</span>
              <span className="text-lg font-bold text-primary">WebP</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Ad */}
        <HeaderAd />

        {/* Idle State - Centered */}
        {appState === 'idle' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-foreground mb-4">
                Fast, Free WebP to JPG Converter
              </h1>
              <p className="text-xl text-muted-foreground">
                Convert WebP images to JPG instantly in your browser
              </p>
            </div>
            
            <FileDropzone onFilesAdded={handleFilesAdded} />
            
            {/* Features */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-1">100% Private</h3>
                <p className="text-sm text-muted-foreground">Files never leave your device</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-1">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Instant conversion in-browser</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-1">Batch Convert</h3>
                <p className="text-sm text-muted-foreground">Convert multiple files at once</p>
              </div>
            </div>
          </div>
        )}

        {/* Processing/Completed State - With Sidebar */}
        {(appState === 'processing' || appState === 'completed') && (
          <div className="flex gap-8">
            {/* Main Conversion Area */}
            <div className="flex-1 space-y-6">
              {/* Batch Progress Summary */}
              <BatchProgressSummary 
                files={files}
                progress={progress}
                appState={appState}
              />
              
              {/* Header with Progress */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      {appState === 'completed' ? (
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <svg className="w-6 h-6 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        </div>
                      )}
                      <h2 className="text-3xl font-bold text-foreground">
                        {appState === 'processing' ? 'Converting Files...' : 'Conversion Complete'}
                      </h2>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {progress.completed} of {progress.total} files processed
                      {progress.failed > 0 && ` • ${progress.failed} failed`}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    {progress.failed > 0 && appState === 'completed' && (
                      <button
                        onClick={handleRetryFailed}
                        className="glass glass-hover px-4 py-2 rounded-lg text-sm font-medium text-foreground transition-smooth flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Retry Failed
                      </button>
                    )}
                    <button
                      onClick={handleReset}
                      className="glass glass-hover px-5 py-2 rounded-lg text-sm font-semibold text-foreground transition-smooth flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Convert More Files
                    </button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <LinearProgress 
                  current={progress.completed}
                  total={progress.total}
                  failed={progress.failed}
                  size="md"
                />
              </div>

              {/* Downloads Section - Show First if Completed */}
              {appState === 'completed' && progress.completed > 0 && (
                <DownloadManager files={files.filter(f => f.status === 'done')} />
              )}

              {/* Processing Queue */}
              <ConversionQueue 
                files={files} 
                onRemoveFile={handleRemoveFile}
              />
              
              {/* In-Content Ad - High visibility during processing */}
              <InContentAd />
              
              {/* Error Recovery - Show when there are failed files */}
              {progress.failed > 0 && appState === 'completed' && (
                <ErrorRecovery 
                  files={files}
                  onRetry={handleRetryFiles}
                  onRemove={handleRemoveFiles} 
                  onReset={handleReset}
                />
              )}
            </div>

            {/* Sidebar with ads - only show on larger screens */}
            <div className="hidden lg:block w-80">
              <div className="sticky top-8">
                {/* Sidebar content can go here */}
              </div>
            </div>
          </div>
        )}

        {/* Below Results Ad */}
        {appState === 'completed' && (
          <BelowResultsAd className="mt-8" />
        )}
      </div>

      {/* Mobile Anchor Ad - Sticky bottom on mobile only */}
      {(appState === 'processing' || appState === 'completed') && (
        <MobileAnchorAd />
      )}
    </div>
  );
}