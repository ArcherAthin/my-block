
import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Scan, RotateCcw } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface VisitorData {
  id: string;
  visitorName: string;
  residentName: string;
  purpose: string;
  visitDate: string;
  visitTime: string;
  status?: string;
  usedAt?: string;
}

interface ScanResult {
  status: 'approved' | 'declined' | 'expired' | 'used';
  visitor?: VisitorData;
  message: string;
}

const QRScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanKey, setScanKey] = useState(0);

  const validateVisitor = async (qrData: any): Promise<ScanResult> => {
    try {
      const { visitorId, visitDate } = qrData;
      const today = new Date().toISOString().split('T')[0];

      // Check if visit date is today
      if (visitDate !== today) {
        return {
          status: 'expired',
          message: 'Visit date has expired or is not for today'
        };
      }

      // Get visitor document from Firestore
      const visitorDoc = await getDoc(doc(db, 'scheduled_visits', visitorId));
      
      if (!visitorDoc.exists()) {
        return {
          status: 'declined',
          message: 'Visitor not found in the system'
        };
      }

      const visitorData = { id: visitorDoc.id, ...visitorDoc.data() } as VisitorData;

      // Check if QR code has already been used
      if (visitorData.status === 'used') {
        return {
          status: 'used',
          visitor: visitorData,
          message: 'QR code has already been used'
        };
      }

      // Mark QR code as used
      await updateDoc(doc(db, 'scheduled_visits', visitorId), {
        status: 'used',
        usedAt: new Date().toISOString()
      });

      return {
        status: 'approved',
        visitor: visitorData,
        message: 'Visitor approved for entry'
      };

    } catch (error) {
      console.error('Error validating visitor:', error);
      return {
        status: 'declined',
        message: 'Error validating visitor data'
      };
    }
  };

  const handleScan = async (result: any) => {
    if (result && isScanning) {
      setIsScanning(false);
      
      try {
        const qrData = JSON.parse(result.text);
        const validation = await validateVisitor(qrData);
        setScanResult(validation);
      } catch (error) {
        setScanResult({
          status: 'declined',
          message: 'Invalid QR code format'
        });
      }
    }
  };

  const handleError = (err: any) => {
    console.error('QR Scanner Error:', err);
  };

  const resetScanner = () => {
    setScanResult(null);
    setIsScanning(true);
    setScanKey(prev => prev + 1);
  };

  const getStatusBadge = () => {
    if (!scanResult) return null;

    const { status } = scanResult;
    const configs = {
      approved: { 
        className: "bg-green-500/20 text-green-300 border-green-500/30", 
        icon: CheckCircle 
      },
      declined: { 
        className: "bg-red-500/20 text-red-300 border-red-500/30", 
        icon: XCircle 
      },
      expired: { 
        className: "bg-orange-500/20 text-orange-300 border-orange-500/30", 
        icon: XCircle 
      },
      used: { 
        className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", 
        icon: XCircle 
      }
    };

    const config = configs[status];
    const IconComponent = config.icon;

    return (
      <Badge className={config.className}>
        <IconComponent className="w-4 h-4 mr-1" />
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <CardContent className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">QR Code Scanner</h3>
            <p className="text-white/70">Scan visitor QR codes for entry validation</p>
          </div>

          {!isScanning && !scanResult && (
            <div className="text-center">
              <Button
                onClick={() => setIsScanning(true)}
                className="bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white hover:scale-105 transition-all duration-300"
              >
                <Scan className="w-4 h-4 mr-2" />
                Start Scanning
              </Button>
            </div>
          )}

          {isScanning && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4">
                <QrReader
                  key={scanKey}
                  onResult={handleScan}
                  onError={handleError}
                  constraints={{ facingMode: 'environment' }}
                  style={{ width: '100%' }}
                />
              </div>
              <div className="text-center">
                <Button
                  onClick={() => setIsScanning(false)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Stop Scanning
                </Button>
              </div>
            </div>
          )}

          {scanResult && (
            <div className="space-y-4">
              <div className="text-center">
                {getStatusBadge()}
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white text-center mb-4">{scanResult.message}</p>
                
                {scanResult.visitor && (
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Visitor Details:</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm text-white/70">
                      <div>Name: {scanResult.visitor.visitorName}</div>
                      <div>Visiting: {scanResult.visitor.residentName}</div>
                      <div>Purpose: {scanResult.visitor.purpose}</div>
                      <div>Scheduled: {scanResult.visitor.visitDate} at {scanResult.visitor.visitTime}</div>
                      {scanResult.visitor.usedAt && (
                        <div>Used at: {new Date(scanResult.visitor.usedAt).toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center">
                <Button
                  onClick={resetScanner}
                  className="bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white hover:scale-105 transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Scan Another QR
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QRScanner;
