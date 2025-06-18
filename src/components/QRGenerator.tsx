
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Download } from 'lucide-react';

interface QRGeneratorProps {
  visitorData: {
    id: string;
    visitorName: string;
    residentName: string;
    purpose: string;
    visitDate: string;
    visitTime: string;
  };
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ visitorData }) => {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      const qrData = JSON.stringify({
        visitorId: visitorData.id,
        visitDate: visitorData.visitDate,
        purpose: visitorData.purpose,
        timestamp: new Date().toISOString()
      });

      const qrCodeURL = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });

      setQrCodeDataURL(qrCodeURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeDataURL) {
      const link = document.createElement('a');
      link.href = qrCodeDataURL;
      link.download = `visitor-qr-${visitorData.id}.png`;
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <CardContent className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Visitor QR Code</h3>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              Valid for {visitorData.visitDate}
            </Badge>
          </div>

          {!qrCodeDataURL ? (
            <div className="text-center">
              <Button
                onClick={generateQRCode}
                disabled={isGenerating}
                className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105 transition-all duration-300"
              >
                <QrCode className="w-4 h-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate QR Code'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-2xl shadow-lg">
                  <img 
                    src={qrCodeDataURL} 
                    alt="Visitor QR Code"
                    className="w-64 h-64 object-contain"
                  />
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-white/70 text-sm">
                  Present this QR code at the security gate
                </p>
                <Button
                  onClick={downloadQRCode}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </div>
            </div>
          )}

          <div className="bg-white/10 rounded-lg p-4 space-y-2">
            <h4 className="text-white font-medium">Visit Details:</h4>
            <div className="grid grid-cols-1 gap-2 text-sm text-white/70">
              <div>Visitor: {visitorData.visitorName}</div>
              <div>Resident: {visitorData.residentName}</div>
              <div>Purpose: {visitorData.purpose}</div>
              <div>Date: {visitorData.visitDate}</div>
              <div>Time: {visitorData.visitTime}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRGenerator;
