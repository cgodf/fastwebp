'use client';

import { useState } from 'react';
import { ConversionFile } from '../../types/webp';
import { trackDownload } from './Analytics';

interface DownloadManagerProps {
  files: ConversionFile[];
}

export default function DownloadManager({ files }: DownloadManagerProps) {
  const [isCreatingZip, setIsCreatingZip] = useState(false);

  const downloadIndividualFile = (file: ConversionFile) => {
    if (!file.convertedBlob) return;

    const url = URL.createObjectURL(file.convertedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file.name}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Track download
    trackDownload('individual', 1);
  };

  const downloadAllAsZip = async () => {
    if (files.length === 0 || isCreatingZip) return;

    setIsCreatingZip(true);

    try {
      // Dynamic import of jszip
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      // Add all converted files to zip
      for (const file of files) {
        if (file.convertedBlob) {
          zip.file(`${file.name}.jpg`, file.convertedBlob);
        }
      }

      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });

      // Download zip file
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `converted-webp-files-${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Track download
      trackDownload('zip', files.length);

    } catch (error) {
      console.error('Error creating zip file:', error);
      alert('Failed to create zip file. Please try downloading files individually.');
    } finally {
      setIsCreatingZip(false);
    }
  };

  if (files.length === 0) {
    return null;
  }

  const validFiles = files.filter(f => f.convertedBlob);
  const totalSize = validFiles.reduce((sum, file) => sum + (file.convertedBlob?.size || 0), 0);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header with Download All */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Downloads Ready
              </h3>
              <p className="text-sm text-muted-foreground">
                {validFiles.length} file{validFiles.length !== 1 ? 's' : ''} converted • {formatFileSize(totalSize)} total
              </p>
            </div>
          </div>

          {/* Download All Button */}
          {validFiles.length > 1 && (
            <button
              onClick={downloadAllAsZip}
              disabled={isCreatingZip}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 hover:scale-105 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreatingZip ? (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating ZIP...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download All (.zip)
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Individual Files Grid */}
      <div className="grid grid-cols-1 gap-3">
        {validFiles.map((file, index) => (
          <div 
            key={file.id} 
            className="glass rounded-xl p-5 hover:scale-[1.01] transition-all animate-slide-up group"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden glass-intense flex-shrink-0 ring-2 ring-green-500/20">
                  {file.thumbnail ? (
                    <img 
                      src={file.thumbnail} 
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-green-500/10">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-lg truncate">
                    {file.name}.jpg
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">
                      {file.convertedBlob && formatFileSize(file.convertedBlob.size)}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 font-medium">
                      JPG
                    </span>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={() => downloadIndividualFile(file)}
                className="glass glass-hover px-5 py-3 rounded-xl font-semibold text-foreground hover:bg-primary/10 transition-all flex items-center gap-2 flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                </svg>
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Privacy Notice */}
      <div className="glass rounded-xl p-5 border-2 border-green-500/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">100% Private</h4>
            <p className="text-sm text-muted-foreground">
              All files were processed locally in your browser. No data was uploaded to any server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}