'use client';

import { useEffect, useState } from 'react';

export default function WebPTest() {
  const [webpSupported, setWebpSupported] = useState(false);
  const [canvasSupported, setCanvasSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testWebPSupport = async () => {
      try {
        // Test Canvas API support (required for WebP conversion)
        const canvasTest = typeof HTMLCanvasElement !== 'undefined';
        setCanvasSupported(canvasTest);
        
        // Test WebP support in browser
        const webpTest = await new Promise((resolve) => {
          const webP = new Image();
          webP.onload = webP.onerror = () => {
            resolve(webP.height === 2);
          };
          webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
        
        setWebpSupported(webpTest as boolean);
        
        if (!canvasTest) {
          setError('Canvas API not supported');
        } else if (!webpTest) {
          setError('WebP format not supported');
        }
      } catch (err) {
        console.error('Error testing WebP support:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    testWebPSupport();
  }, []);

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold">WebP Conversion Compatibility Test</h3>
      {canvasSupported && webpSupported && (
        <p className="text-green-600">✅ WebP conversion fully supported! (Native browser APIs)</p>
      )}
      {canvasSupported && !webpSupported && (
        <p className="text-yellow-600">⚠️ Canvas API supported, WebP display may not work</p>
      )}
      {error && (
        <p className="text-red-600">❌ Error: {error}</p>
      )}
      {!canvasSupported && !webpSupported && !error && (
        <p className="text-yellow-600">⏳ Testing WebP support...</p>
      )}
    </div>
  );
}
