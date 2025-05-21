import React from 'react';
import { QrCode } from 'lucide-react';

interface QRCodeProps {
  value: string;
  size: number;
  className?: string;
}

/**
 * A simple QR code component
 * In a real implementation, this would use a library like react-qr-code
 */
const QRCode = ({ value, size, className }: QRCodeProps) => {
  // Get a display-friendly version of the value (truncated for UI only)
  const displayValue = typeof value === 'string' && value.length > 20
    ? `${value.substring(0, 20)}...`
    : value;

  return (
    <div className={className}>
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: 'white',
          padding: '20px',
          boxSizing: 'border-box'
        }}
        className="border-2 border-black grid place-items-center relative"
        {/* Use the full value for the QR code representation */}
        <QrCode size={size * 0.6} className="text-black" />

        {/* Use the truncated value for display purposes only */}
        <div className="absolute bottom-2 text-xs max-w-[80%] text-center truncate text-black">
          {displayValue}
        </div>
      </div>
    </div>
  );
};

export default QRCode;

