import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Navigation from '@/components/Navigation';
import FloatingBackground from '@/components/FloatingBackground';
import { 
  QrCode, 
  Users, 
  Shield, 
  Clock, 
  ArrowLeft,
  Eye,
  Calendar,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  Mail
} from 'lucide-react';
import QRGenerator from '@/components/QRGenerator';
import QRScanner from '@/components/QRScanner';
import { createVisitor, subscribeToVisitors, VisitorData } from '@/lib/visitorService';

const VisitorManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pre-approval');
  const [visitorForm, setVisitorForm] = useState({
    visitorName: '',
    residentName: '',
    phone: '',
    purpose: '',
    date: '',
    time: ''
  });

  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorData | null>(null);

  // Subscribe to real-time visitor updates
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const unsubscribe = subscribeToVisitors((visitorsData) => {
      setVisitors(visitorsData);
    }, today);

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await createVisitor({
      visitorName: visitorForm.visitorName,
      residentName: visitorForm.residentName,
      phone: visitorForm.phone,
      purpose: visitorForm.purpose,
      visitDate: visitorForm.date,
      visitTime: visitorForm.time
    });

    if (result.success) {
      const newVisitor: VisitorData = {
        id: result.id,
        ...visitorForm,
        visitDate: visitorForm.date,
        visitTime: visitorForm.time,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      setSelectedVisitor(newVisitor);
      setVisitorForm({
        visitorName: '',
        residentName: '',
        phone: '',
        purpose: '',
        date: '',
        time: ''
      });
    }
  };

  const tabs = [
    { id: 'pre-approval', label: 'Pre-Approval', icon: QrCode },
    { id: 'active-visitors', label: 'Active Visitors', icon: Users },
    { id: 'qr-scanner', label: 'QR Scanner', icon: Shield },
    { id: 'security-logs', label: 'Security Logs', icon: Clock }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingBackground />
      
      <div className="relative z-10">
        <Navigation />
        
        <main className="pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  size="icon"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-white">Visitor Management</h1>
                  <p className="text-white/70">QR-based smart entry system with real-time validation</p>
                </div>
              </div>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                Real-time QR System
              </Badge>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    className={`flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white border-0'
                        : 'border-white/30 text-white hover:bg-white/10 bg-transparent'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Tab Content */}
            {activeTab === 'pre-approval' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Pre-Approve Visitor</h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-white/70 mb-2">Visitor Name</label>
                      <Input
                        value={visitorForm.visitorName}
                        onChange={(e) => setVisitorForm({...visitorForm, visitorName: e.target.value})}
                        placeholder="Enter visitor's full name"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-white/60"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2">Resident Name</label>
                      <Input
                        value={visitorForm.residentName}
                        onChange={(e) => setVisitorForm({...visitorForm, residentName: e.target.value})}
                        placeholder="Your name"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-white/60"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2">Phone Number</label>
                      <Input
                        value={visitorForm.phone}
                        onChange={(e) => setVisitorForm({...visitorForm, phone: e.target.value})}
                        placeholder="Visitor's phone number"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-white/60"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2">Purpose of Visit</label>
                      <Input
                        value={visitorForm.purpose}
                        onChange={(e) => setVisitorForm({...visitorForm, purpose: e.target.value})}
                        placeholder="Delivery, Social Visit, Maintenance, etc."
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-white/60"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/70 mb-2">Date</label>
                        <Input
                          type="date"
                          value={visitorForm.date}
                          onChange={(e) => setVisitorForm({...visitorForm, date: e.target.value})}
                          required
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-2">Time</label>
                        <Input
                          type="time"
                          value={visitorForm.time}
                          onChange={(e) => setVisitorForm({...visitorForm, time: e.target.value})}
                          required
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105 transition-all duration-300"
                    >
                      Create Visitor & Generate QR
                    </Button>
                  </form>
                </Card>

                {selectedVisitor && (
                  <QRGenerator 
                    visitorData={{
                      id: selectedVisitor.id!,
                      visitorName: selectedVisitor.visitorName,
                      residentName: selectedVisitor.residentName,
                      purpose: selectedVisitor.purpose,
                      visitDate: selectedVisitor.visitDate,
                      visitTime: selectedVisitor.visitTime
                    }}
                  />
                )}

                {!selectedVisitor && (
                  <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">QR-Based System Features</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] flex items-center justify-center text-white font-bold">1</div>
                        <div>
                          <h4 className="text-white font-medium">Real-time Validation</h4>
                          <p className="text-white/60 text-sm">QR codes are validated against live Firestore data</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] flex items-center justify-center text-white font-bold">2</div>
                        <div>
                          <h4 className="text-white font-medium">Single-Use QR Codes</h4>
                          <p className="text-white/60 text-sm">Each QR code can only be used once for security</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] flex items-center justify-center text-white font-bold">3</div>
                        <div>
                          <h4 className="text-white font-medium">Instant Security Dashboard</h4>
                          <p className="text-white/60 text-sm">Security can scan and validate visitors instantly</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'active-visitors' && (
              <div className="grid gap-6">
                {visitors.map((visitor) => (
                  <Card key={visitor.id} className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">{visitor.visitorName}</h4>
                          <p className="text-white/60">Visiting: {visitor.residentName}</p>
                          <p className="text-white/60 text-sm">Purpose: {visitor.purpose}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          visitor.status === 'pending' ? "bg-blue-500/20 text-blue-300" :
                          visitor.status === 'used' ? "bg-green-500/20 text-green-300" :
                          "bg-red-500/20 text-red-300"
                        }>
                          {visitor.status}
                        </Badge>
                        <div className="text-white/60 text-sm mt-1">{visitor.visitDate} • {visitor.visitTime}</div>
                        {visitor.usedAt && (
                          <div className="text-white/60 text-xs">Used: {new Date(visitor.usedAt).toLocaleString()}</div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'qr-scanner' && (
              <QRScanner />
            )}

            {activeTab === 'security-logs' && (
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Real-time Security Logs</h3>
                <div className="space-y-4">
                  {visitors.filter(v => v.status === 'used').map((visitor) => (
                    <div key={visitor.id} className="flex items-center justify-between p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <div>
                          <h4 className="text-white font-medium">{visitor.visitorName}</h4>
                          <p className="text-white/60 text-sm">Visited: {visitor.residentName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-500/20 text-green-300">
                          QR Validated
                        </Badge>
                        <div className="text-white/60 text-sm">{visitor.visitDate}</div>
                        {visitor.usedAt && (
                          <div className="text-white/60 text-xs">Entry: {new Date(visitor.usedAt).toLocaleString()}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default VisitorManagement;
