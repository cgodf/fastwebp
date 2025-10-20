'use client';

import { ConversionFile } from '../../types/webp';
import { formatFileSize } from '../services/webpConverter';

interface ConversionQueueProps {
  files: ConversionFile[];
  onRemoveFile: (fileId: string) => void;
}

interface FileCardProps {
  file: ConversionFile;
  onRemove: (fileId: string) => void;
}

function FileCard({ file, onRemove }: FileCardProps) {
  const getStatusIcon = () => {
    switch (file.status) {
      case 'waiting':
        return (
          <div className="w-6 h-6 rounded-full border-2 border-muted-foreground animate-pulse" />
        );
      case 'converting':
        return (
          <div className="w-6 h-6">
            <svg className="animate-spin text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        );
      case 'done':
        return (
          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'failed':
        return (
          <div className="w-6 h-6 rounded-full bg-destructive flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (file.status) {
      case 'waiting':
        return 'Waiting...';
      case 'converting':
        return 'Converting...';
      case 'done':
        return 'Done!';
      case 'failed':
        return 'Failed';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (file.status) {
      case 'waiting':
        return 'text-muted-foreground';
      case 'converting':
        return 'text-primary';
      case 'done':
        return 'text-purple-500';
      case 'failed':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={`
      glass-card p-4 transition-smooth animate-slide-up
      ${file.status === 'converting' ? 'scale-105 border-primary/50 animate-pulse-glow' : ''}
      ${file.status === 'failed' ? 'border-destructive/50' : ''}
      ${file.status === 'done' ? 'border-purple-500/30 bg-purple-500/5' : ''}
    `}>
      <div className="flex items-center gap-4">
        {/* Thumbnail or Icon */}
        <div className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden glass-intense transition-smooth ${
          file.status === 'converting' ? 'animate-pulse' : ''
        }`}>
          {file.thumbnail ? (
            <img 
              src={file.thumbnail} 
              alt={file.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground truncate">
              {file.name}
            </h3>
            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
              {file.status === 'done' ? 'JPG' : 'WebP'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {formatFileSize(file.size)}
              {file.convertedBlob && (
                <span className="text-purple-500 ml-2">
                  → {formatFileSize(file.convertedBlob.size)}
                </span>
              )}
            </div>
          </div>

          {/* Progress indicator for large files */}
          {file.status === 'converting' && file.size > 10 * 1024 * 1024 && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Converting large file...</span>
                <span>{formatFileSize(file.size)}</span>
              </div>
              <div className="glass rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent animate-shimmer" style={{ width: '60%' }} />
              </div>
            </div>
          )}
          
          {/* Error Message */}
          {file.status === 'failed' && file.error && (
            <div className="mt-2 text-sm text-destructive bg-destructive/10 px-2 py-1 rounded">
              {file.error}
            </div>
          )}
        </div>

        {/* Status */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(file.id)}
            className="p-1 rounded-full glass-hover transition-all duration-200 opacity-60 hover:opacity-100"
            title="Remove file"
          >
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConversionQueue({ files, onRemoveFile }: ConversionQueueProps) {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Processing Queue
        </h3>
        <div className="text-sm text-muted-foreground">
          {files.length} file{files.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {files.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            onRemove={onRemoveFile}
          />
        ))}
      </div>
    </div>
  );
}