
import { useState } from 'react';
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

  const [visitors] = useState([
    { id: 1, name: 'John Doe', resident: 'Sarah Wilson', purpose: 'Delivery', status: 'Active', qrCode: 'QR123456', entryTime: '10:30 AM', date: '2024-01-20' },
    { id: 2, name: 'Mike Johnson', resident: 'David Chen', purpose: 'Maintenance', status: 'Expired', qrCode: 'QR789012', entryTime: '2:15 PM', date: '2024-01-19' },
    { id: 3, name: 'Emily Davis', resident: 'Lisa Kumar', purpose: 'Social Visit', status: 'Active', qrCode: 'QR345678', entryTime: '6:45 PM', date: '2024-01-20' }
  ]);

  const [securityLogs] = useState([
    { id: 1, visitor: 'John Doe', resident: 'Sarah Wilson', action: 'Entry', time: '10:30 AM', date: '2024-01-20', guard: 'Security Guard 1' },
    { id: 2, visitor: 'Mike Johnson', resident: 'David Chen', action: 'Exit', time: '4:15 PM', date: '2024-01-19', guard: 'Security Guard 2' },
    { id: 3, visitor: 'Emily Davis', resident: 'Lisa Kumar', action: 'Entry', time: '6:45 PM', date: '2024-01-20', guard: 'Security Guard 1' }
  ]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qrCode = 'QR' + Math.random().toString(36).substr(2, 9).toUpperCase();
    alert(`Visitor pre-approved! QR Code: ${qrCode}\nValid for ${visitorForm.date} at ${visitorForm.time}`);
    setVisitorForm({
      visitorName: '',
      residentName: '',
      phone: '',
      purpose: '',
      date: '',
      time: ''
    });
  };

  const tabs = [
    { id: 'pre-approval', label: 'Pre-Approval', icon: QrCode },
    { id: 'active-visitors', label: 'Active Visitors', icon: Users },
    { id: 'security-logs', label: 'Security Logs', icon: Shield },
    { id: 'announcements', label: 'Announcements', icon: AlertCircle }
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
                  <p className="text-white/70">Smart entry system with QR codes and security logs</p>
                </div>
              </div>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                Enhanced Security
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
                      Generate QR Code
                    </Button>
                  </form>
                </Card>

                <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">How It Works</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] flex items-center justify-center text-white font-bold">1</div>
                      <div>
                        <h4 className="text-white font-medium">Fill Visitor Details</h4>
                        <p className="text-white/60 text-sm">Enter visitor information and visit purpose</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] flex items-center justify-center text-white font-bold">2</div>
                      <div>
                        <h4 className="text-white font-medium">QR Code Generated</h4>
                        <p className="text-white/60 text-sm">Time-limited QR code sent to visitor</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] flex items-center justify-center text-white font-bold">3</div>
                      <div>
                        <h4 className="text-white font-medium">Scan at Gate</h4>
                        <p className="text-white/60 text-sm">Security scans QR code for instant entry</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] flex items-center justify-center text-white font-bold">4</div>
                      <div>
                        <h4 className="text-white font-medium">Automatic Logging</h4>
                        <p className="text-white/60 text-sm">Entry/exit automatically recorded</p>
                      </div>
                    </div>
                  </div>
                </Card>
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
                          <h4 className="text-white font-bold">{visitor.name}</h4>
                          <p className="text-white/60">Visiting: {visitor.resident}</p>
                          <p className="text-white/60 text-sm">Purpose: {visitor.purpose}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={visitor.status === 'Active' ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}>
                          {visitor.status}
                        </Badge>
                        <div className="text-white/60 text-sm mt-1">QR: {visitor.qrCode}</div>
                        <div className="text-white/60 text-sm">{visitor.date} • {visitor.entryTime}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'security-logs' && (
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Security Entry/Exit Logs</h3>
                <div className="space-y-4">
                  {securityLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${log.action === 'Entry' ? 'bg-green-400' : 'bg-red-400'}`} />
                        <div>
                          <h4 className="text-white font-medium">{log.visitor}</h4>
                          <p className="text-white/60 text-sm">Resident: {log.resident}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={log.action === 'Entry' ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}>
                          {log.action}
                        </Badge>
                        <div className="text-white/60 text-sm">{log.date} • {log.time}</div>
                        <div className="text-white/60 text-xs">By: {log.guard}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'announcements' && (
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Security Announcements</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/10">
                    <h4 className="text-white font-medium mb-2">Updated Visitor Guidelines</h4>
                    <p className="text-white/70 text-sm">All visitors must pre-register 2 hours before arrival. QR codes are valid for 12 hours from generation time.</p>
                    <div className="text-white/50 text-xs mt-2">Posted: 2024-01-20</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/10">
                    <h4 className="text-white font-medium mb-2">Festival Security Measures</h4>
                    <p className="text-white/70 text-sm">Additional security personnel will be deployed during the upcoming festival. Extended visitor hours approved.</p>
                    <div className="text-white/50 text-xs mt-2">Posted: 2024-01-18</div>
                  </div>
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
