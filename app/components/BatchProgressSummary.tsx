'use client';

import { ConversionFile, ConversionProgress } from '../../types/webp';
import { formatFileSize } from '../services/webpConverter';

interface BatchProgressSummaryProps {
  files: ConversionFile[];
  progress: ConversionProgress;
  appState: 'idle' | 'processing' | 'completed';
  className?: string;
}

export default function BatchProgressSummary({ 
  files, 
  progress, 
  appState, 
  className = '' 
}: BatchProgressSummaryProps) {
  if (appState === 'idle' || files.length === 0) return null;

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const convertedSize = files
    .filter(f => f.convertedBlob)
    .reduce((sum, file) => sum + (file.convertedBlob?.size || 0), 0);
  
  const compressionRatio = totalSize > 0 && convertedSize > 0 
    ? Math.round(((totalSize - convertedSize) / totalSize) * 100) 
    : 0;

  const activeFile = files.find(f => f.status === 'converting');
  const estimatedTimePerFile = 2; // seconds estimate
  const remainingFiles = files.filter(f => f.status === 'waiting').length;
  const estimatedTimeRemaining = remainingFiles * estimatedTimePerFile;

  return (
    <div className={`glass-subtle rounded-xl p-4 ${className}`}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Files Progress */}
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {progress.completed}
          </div>
          <div className="text-xs text-muted-foreground">
            of {progress.total} files
          </div>
          <div className="text-xs text-primary">
            {Math.round((progress.completed / progress.total) * 100)}% complete
          </div>
        </div>

        {/* Size Statistics */}
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {formatFileSize(totalSize)}
          </div>
          <div className="text-xs text-muted-foreground">
            total size
          </div>
          {convertedSize > 0 && (
            <div className="text-xs text-purple-500">
              {compressionRatio > 0 ? `-${compressionRatio}%` : 'same size'}
            </div>
          )}
        </div>

        {/* Status */}
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {appState === 'processing' ? '⏳' : progress.failed > 0 ? '⚠️' : '✅'}
          </div>
          <div className="text-xs text-muted-foreground">
            {appState === 'processing' ? 'converting' : 'completed'}
          </div>
          {progress.failed > 0 && (
            <div className="text-xs text-destructive">
              {progress.failed} failed
            </div>
          )}
        </div>

        {/* Time Estimate */}
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {appState === 'processing' 
              ? `${estimatedTimeRemaining}s`
              : appState === 'completed' 
                ? '0s'
                : '—'
            }
          </div>
          <div className="text-xs text-muted-foreground">
            {appState === 'processing' ? 'remaining' : 'time left'}
          </div>
          {activeFile && (
            <div className="text-xs text-primary">
              {activeFile.name.substring(0, 12)}...
            </div>
          )}
        </div>
      </div>

      {/* Processing Queue Mini Preview */}
      {appState === 'processing' && (
        <div className="mt-4 pt-4 border-t border-border/40">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Processing Queue</span>
            <span>{files.filter(f => f.status === 'waiting').length} waiting</span>
          </div>
          <div className="mt-2 flex gap-1">
            {files.slice(0, 20).map((file) => (
              <div
                key={file.id}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  file.status === 'done' ? 'bg-purple-500' :
                  file.status === 'converting' ? 'bg-primary animate-pulse' :
                  file.status === 'failed' ? 'bg-destructive' :
                  'bg-muted/50'
                }`}
                title={`${file.name} - ${file.status}`}
              />
            ))}
            {files.length > 20 && (
              <span className="text-xs text-muted-foreground ml-2">
                +{files.length - 20} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}