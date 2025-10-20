'use client';

import { useState } from 'react';
import { ConversionFile } from '../../types/webp';

interface ErrorRecoveryProps {
  files: ConversionFile[];
  onRetry: (fileIds: string[]) => void;
  onRemove: (fileIds: string[]) => void;
  onReset: () => void;
  className?: string;
}

interface ErrorSuggestion {
  type: string;
  title: string;
  description: string;
  action: string;
  actionType: 'retry' | 'remove' | 'info';
}

export default function ErrorRecovery({ 
  files, 
  onRetry, 
  onRemove, 
  onReset, 
  className = '' 
}: ErrorRecoveryProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  
  const failedFiles = files.filter(f => f.status === 'failed');
  
  if (failedFiles.length === 0) return null;

  // Categorize errors and provide suggestions
  const getErrorSuggestions = (): ErrorSuggestion[] => {
    const suggestions: ErrorSuggestion[] = [];
    const errorTypes = new Set(failedFiles.map(f => f.error?.includes('too large') ? 'size' : 
                                                  f.error?.includes('Invalid') ? 'corrupt' :
                                                  f.error?.includes('memory') ? 'memory' :
                                                  'unknown'));

    if (errorTypes.has('size')) {
      suggestions.push({
        type: 'size',
        title: 'File Size Too Large',
        description: 'Some files exceed the 50MB limit. Try compressing them or converting smaller batches.',
        action: 'Remove Large Files',
        actionType: 'remove'
      });
    }

    if (errorTypes.has('corrupt')) {
      suggestions.push({
        type: 'corrupt',
        title: 'Corrupted Files',
        description: 'Some WebP files appear to be corrupted or invalid. These need to be removed or replaced.',
        action: 'Remove Corrupted Files',
        actionType: 'remove'
      });
    }

    if (errorTypes.has('memory')) {
      suggestions.push({
        type: 'memory',
        title: 'Memory Limit Reached',
        description: 'Your browser ran out of memory. Try converting fewer files at once.',
        action: 'Process Smaller Batches',
        actionType: 'info'
      });
    }

    if (errorTypes.has('unknown')) {
      suggestions.push({
        type: 'unknown',
        title: 'Conversion Failed',
        description: 'Some files failed to convert for unknown reasons. You can try again.',
        action: 'Retry Failed Files',
        actionType: 'retry'
      });
    }

    return suggestions;
  };

  const handleSelectFile = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    const allFailedIds = failedFiles.map(f => f.id);
    setSelectedFiles(prev => 
      prev.length === allFailedIds.length ? [] : allFailedIds
    );
  };

  const handleBulkAction = (action: 'retry' | 'remove') => {
    const targetFiles = selectedFiles.length > 0 ? selectedFiles : failedFiles.map(f => f.id);
    
    if (action === 'retry') {
      onRetry(targetFiles);
    } else {
      onRemove(targetFiles);
    }
    
    setSelectedFiles([]);
  };

  const suggestions = getErrorSuggestions();

  return (
    <div className={`glass-intense rounded-2xl p-6 border-destructive/30 animate-slide-up ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {failedFiles.length} File{failedFiles.length !== 1 ? 's' : ''} Failed
          </h3>
          <p className="text-sm text-muted-foreground">
            Don&apos;t worry, we can help you fix these issues
          </p>
        </div>
      </div>

      {/* Error Suggestions */}
      <div className="grid gap-3 mb-6">
        {suggestions.map((suggestion, index) => (
          <div 
            key={suggestion.type} 
            className="glass-subtle rounded-xl p-4 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">
                  {suggestion.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {suggestion.description}
                </p>
              </div>
              <button
                onClick={() => {
                  const relevantFiles = failedFiles.filter(f => {
                    if (suggestion.type === 'size') return f.error?.includes('too large');
                    if (suggestion.type === 'corrupt') return f.error?.includes('Invalid');
                    if (suggestion.type === 'memory') return f.error?.includes('memory');
                    return true;
                  }).map(f => f.id);

                  if (suggestion.actionType === 'retry') {
                    onRetry(relevantFiles);
                  } else if (suggestion.actionType === 'remove') {
                    onRemove(relevantFiles);
                  }
                }}
                disabled={suggestion.actionType === 'info'}
                className={`glass-card px-3 py-2 text-xs font-medium rounded-lg transition-bounce ${
                  suggestion.actionType === 'info' 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-105'
                } ${
                  suggestion.actionType === 'retry' ? 'text-purple-400 hover:bg-purple-500/10' :
                  suggestion.actionType === 'remove' ? 'text-red-400 hover:bg-red-500/10' :
                  'text-muted-foreground'
                }`}
              >
                {suggestion.action}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Failed Files List */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">Failed Files</h4>
          <button
            onClick={handleSelectAll}
            className="text-xs text-primary hover:text-primary/80 transition-smooth"
          >
            {selectedFiles.length === failedFiles.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        <div className="max-h-48 overflow-y-auto space-y-2">
          {failedFiles.map((file) => (
            <div 
              key={file.id}
              className={`glass-card p-3 rounded-lg cursor-pointer transition-smooth ${
                selectedFiles.includes(file.id) ? 'bg-primary/10 border-primary/50' : ''
              }`}
              onClick={() => handleSelectFile(file.id)}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => handleSelectFile(file.id)}
                  className="rounded border-muted-foreground/30"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-destructive">
                    {file.error}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleBulkAction('retry')}
          className="glass-card px-4 py-2 rounded-lg font-medium text-purple-400 hover:bg-purple-500/10 hover:scale-105 transition-bounce"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry {selectedFiles.length > 0 ? `Selected (${selectedFiles.length})` : 'All Failed'}
          </span>
        </button>

        <button
          onClick={() => handleBulkAction('remove')}
          className="glass-card px-4 py-2 rounded-lg font-medium text-red-400 hover:bg-red-500/10 hover:scale-105 transition-bounce"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove {selectedFiles.length > 0 ? `Selected (${selectedFiles.length})` : 'All Failed'}
          </span>
        </button>

        <button
          onClick={onReset}
          className="glass-card px-4 py-2 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:scale-105 transition-bounce"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}