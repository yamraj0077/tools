import React, { useState, useRef } from 'react';
import { ToolLayout } from '../../../components/tools/ToolLayout';
import { FileUpload } from '../../../components/common/FileUpload';
import { Button } from '../../../components/tools/Button';
import { QrCode, Copy, Camera } from 'lucide-react';
import { Card } from '../../../components/common/Card';

export function QRScanner() {
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      try {
        // In a real implementation, we would use a QR code scanning library
        // For now, we'll just simulate a scan
        setTimeout(() => {
          setResult('https://example.com');
          setError('');
        }, 1000);
      } catch (err) {
        setError('Failed to scan QR code');
        setResult('');
      }
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (err) {
      setError('Failed to access camera');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsScanning(false);
    }
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ToolLayout
      title="QR Code Scanner"
      description="Scan QR codes from images or using your camera"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 space-y-4">
            <h3 className="text-lg font-medium">Upload QR Code Image</h3>
            <FileUpload
              id="qr-upload"
              accept="image/*"
              icon={QrCode}
              label="Drop a QR code image here or click to upload"
              onChange={handleFileChange}
            />
          </Card>

          <Card className="p-4 space-y-4">
            <h3 className="text-lg font-medium">Scan with Camera</h3>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-full"
                autoPlay
                playsInline
              />
            </div>
            <Button
              onClick={isScanning ? stopCamera : startCamera}
              icon={Camera}
              variant="secondary"
            >
              {isScanning ? 'Stop Camera' : 'Start Camera'}
            </Button>
          </Card>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        {result && (
          <Card className="p-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Scan Result</h3>
              <p className="font-mono text-sm break-all">{result}</p>
              <Button onClick={copyResult} icon={Copy}>
                Copy Result
              </Button>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}