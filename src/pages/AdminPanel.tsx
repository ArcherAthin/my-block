import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Navigation from '@/components/Navigation';
import FloatingBackground from '@/components/FloatingBackground';
import ResidentManagement from '@/components/ResidentManagement';
import { supabase } from "@/integrations/supabase/client";
import { 
  Shield, 
  DollarSign, 
  Vote, 
  AlertCircle, 
  ArrowLeft,
  Eye,
  EyeOff,
  Users,
  TrendingUp,
  FileText,
  Settings,
  BarChart3,
  Calendar
} from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [fundData, setFundData] = useState({
    totalFunds: 450000,
    monthlyIncome: 125000,
    monthlyExpenses: 87500,
    pendingDues: 23000
  });

  const [polls, setPolls] = useState([
    { id: 1, title: 'Swimming Pool Renovation', status: 'Active', votes: 45, endDate: '2024-02-15', options: ['Yes', 'No'], results: [32, 13] },
    { id: 2, title: 'New Playground Equipment', status: 'Completed', votes: 78, endDate: '2024-01-20', options: ['Approve', 'Reject'], results: [65, 13] },
    { id: 3, title: 'Parking Fee Increase', status: 'Draft', votes: 0, endDate: '2024-02-25', options: ['Agree', 'Disagree'], results: [0, 0] }
  ]);

  const [complaints, setComplaints] = useState<any[]>([]);
  const [facilityBookings, setFacilityBookings] = useState<any[]>([]);
  const [serviceBookings, setServiceBookings] = useState<any[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'myblock') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const createPoll = () => {
    const title = prompt('Enter poll title:');
    if (title) {
      const newPoll = {
        id: polls.length + 1,
        title,
        status: 'Draft',
        votes: 0,
        endDate: '2024-03-01',
        options: ['Option 1', 'Option 2'],
        results: [0, 0]
      };
      setPolls([...polls, newPoll]);
      alert('Poll created successfully!');
    }
  };

  const updateComplaintStatus = async (complaintId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('complaints')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', complaintId);

      if (error) throw error;
      alert(`Complaint status updated to: ${newStatus}`);
    } catch (error) {
      console.error('Error updating complaint:', error);
      alert('Failed to update complaint status');
    }
  };

  const updateBookingStatus = async (bookingId: string, tableName: 'facility_bookings' | 'service_bookings', newStatus: string) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', bookingId);

      if (error) throw error;
      alert(`Booking status updated to: ${newStatus}`);
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking status');
    }
  };

  // Real-time subscriptions
  useEffect(() => {
    if (!isAuthenticated) return;

    // Subscribe to complaints
    const complaintsChannel = supabase
      .channel('admin_complaints')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'complaints' }, (payload) => {
        console.log('Complaints change:', payload);
        fetchComplaints();
      })
      .subscribe();

    // Subscribe to facility bookings  
    const facilityChannel = supabase
      .channel('admin_facility_bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'facility_bookings' }, (payload) => {
        console.log('Facility bookings change:', payload);
        fetchFacilityBookings();
      })
      .subscribe();

    // Subscribe to service bookings
    const serviceChannel = supabase
      .channel('admin_service_bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'service_bookings' }, (payload) => {
        console.log('Service bookings change:', payload);
        fetchServiceBookings();
      })
      .subscribe();

    // Initial data fetch
    fetchComplaints();
    fetchFacilityBookings();
    fetchServiceBookings();

    return () => {
      supabase.removeChannel(complaintsChannel);
      supabase.removeChannel(facilityChannel);
      supabase.removeChannel(serviceChannel);
    };
  }, [isAuthenticated]);

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select(`
          *,
          residents(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComplaints(data || []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const fetchFacilityBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('facility_bookings')
        .select(`
          *,
          residents(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFacilityBookings(data || []);
    } catch (error) {
      console.error('Error fetching facility bookings:', error);
    }
  };

  const fetchServiceBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('service_bookings')
        .select(`
          *,
          residents(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServiceBookings(data || []);
    } catch (error) {
      console.error('Error fetching service bookings:', error);
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'residents', label: 'Residents & Bills', icon: Users },
    { id: 'funds', label: 'Fund Management', icon: DollarSign },
    { id: 'polls', label: 'Polls', icon: Vote },
    { id: 'complaints', label: 'Complaints', icon: AlertCircle },
    { id: 'facility-bookings', label: 'Facility Bookings', icon: Calendar },
    { id: 'service-bookings', label: 'Service Bookings', icon: Settings }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <FloatingBackground />
        
        <div className="relative z-10">
          <Navigation />
          
          <main className="pt-24 pb-12 px-6">
            <div className="max-w-md mx-auto">
              <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                <div className="text-center mb-6">
                  <Shield className="w-16 h-16 text-white mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-white">Admin Panel Access</h1>
                  <p className="text-white/70">Enter admin password to continue</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Admin Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10 bg-white/10 border-white/20 text-white placeholder-white/60"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white hover:bg-transparent"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white hover:scale-105 transition-all duration-300"
                  >
                    Access Admin Panel
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <Button
                    onClick={() => navigate('/')}
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    ← Back to Home
                  </Button>
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                  <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
                  <p className="text-white/70">Community management dashboard</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  Authenticated
                </Badge>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Logout
                </Button>
              </div>
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
            {activeTab === 'dashboard' && (
              <div className="grid lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Total Residents</p>
                      <p className="text-2xl font-bold text-white">1,247</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                </Card>
                
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Pending Bills</p>
                      <p className="text-2xl font-bold text-white">156</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-yellow-400" />
                  </div>
                </Card>
                
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">This Month Revenue</p>
                      <p className="text-2xl font-bold text-white">₹1.25L</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-400" />
                  </div>
                </Card>
                
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Payment Success Rate</p>
                      <p className="text-2xl font-bold text-white">94%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-400" />
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'residents' && <ResidentManagement />}

            {activeTab === 'funds' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Fund Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-lg bg-white/10">
                      <span className="text-white/70">Total Available Funds</span>
                      <span className="text-white font-bold text-xl">₹{fundData.totalFunds.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg bg-green-500/20">
                      <span className="text-green-300">Monthly Income</span>
                      <span className="text-green-300 font-bold">₹{fundData.monthlyIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg bg-red-500/20">
                      <span className="text-red-300">Monthly Expenses</span>
                      <span className="text-red-300 font-bold">₹{fundData.monthlyExpenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg bg-yellow-500/20">
                      <span className="text-yellow-300">Pending Dues</span>
                      <span className="text-yellow-300 font-bold">₹{fundData.pendingDues.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-white/10">
                      <div>
                        <p className="text-white font-medium">Maintenance Payment</p>
                        <p className="text-white/60 text-sm">Jan 20, 2024</p>
                      </div>
                      <span className="text-green-300 font-bold">+₹45,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-white/10">
                      <div>
                        <p className="text-white font-medium">Security Service</p>
                        <p className="text-white/60 text-sm">Jan 19, 2024</p>
                      </div>
                      <span className="text-red-300 font-bold">-₹25,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-white/10">
                      <div>
                        <p className="text-white font-medium">Utility Bills</p>
                        <p className="text-white/60 text-sm">Jan 18, 2024</p>
                      </div>
                      <span className="text-red-300 font-bold">-₹12,500</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'polls' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">Community Polls</h3>
                  <Button
                    onClick={createPoll}
                    className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105 transition-all duration-300"
                  >
                    Create New Poll
                  </Button>
                </div>
                
                {polls.map((poll) => (
                  <Card key={poll.id} className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-white font-bold text-lg">{poll.title}</h4>
                        <p className="text-white/60">Ends: {poll.endDate} • {poll.votes} votes</p>
                      </div>
                      <Badge className={`${
                        poll.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                        poll.status === 'Completed' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {poll.status}
                      </Badge>
                    </div>
                    
                    {poll.status !== 'Draft' && (
                      <div className="space-y-2">
                        {poll.options.map((option, index) => (
                          <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white/10">
                            <span className="text-white">{option}</span>
                            <div className="flex items-center space-x-3">
                              <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5]"
                                  style={{ width: poll.votes > 0 ? `${(poll.results[index] / poll.votes) * 100}%` : '0%' }}
                                />
                              </div>
                              <span className="text-white font-medium">{poll.results[index]}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'complaints' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Resident Complaints</h3>
                
                {complaints.length === 0 ? (
                  <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                    <p className="text-white/70 text-center">No complaints submitted yet</p>
                  </Card>
                ) : (
                  complaints.map((complaint) => (
                    <Card key={complaint.id} className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-white font-bold">{complaint.subject}</h4>
                            <Badge className={`${
                              complaint.status === 'Resolved' ? 'bg-green-500/20 text-green-300' :
                              complaint.status === 'In Review' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-red-500/20 text-red-300'
                            }`}>
                              {complaint.status}
                            </Badge>
                            <Badge className={`${
                              complaint.priority === 'High' ? 'bg-red-500/20 text-red-300' :
                              complaint.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-gray-500/20 text-gray-300'
                            }`}>
                              {complaint.priority}
                            </Badge>
                          </div>
                          <p className="text-white/70 mb-2">{complaint.description}</p>
                          <div className="text-white/60 text-sm">
                            Resident: {complaint.residents?.name || 'Unknown'} • {new Date(complaint.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="ml-6 space-x-2">
                          <Button
                            onClick={() => updateComplaintStatus(complaint.id, 'In Review')}
                            size="sm"
                            variant="outline"
                            className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10"
                          >
                            Review
                          </Button>
                          <Button
                            onClick={() => updateComplaintStatus(complaint.id, 'Resolved')}
                            size="sm"
                            className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white"
                          >
                            Resolve
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === 'facility-bookings' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Facility Bookings</h3>
                
                {facilityBookings.length === 0 ? (
                  <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                    <p className="text-white/70 text-center">No facility bookings submitted yet</p>
                  </Card>
                ) : (
                  facilityBookings.map((booking) => (
                    <Card key={booking.id} className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-white font-bold">{booking.facility_name}</h4>
                            <Badge className={`${
                              booking.status === 'Approved' ? 'bg-green-500/20 text-green-300' :
                              booking.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-red-500/20 text-red-300'
                            }`}>
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-white/60">{booking.residents?.name || 'Unknown'} • {new Date(booking.booking_date).toLocaleDateString()}</p>
                          <p className="text-white/70 mt-2">{booking.start_time} - {booking.end_time}</p>
                          {booking.notes && <p className="text-white/60 text-sm mt-1">{booking.notes}</p>}
                        </div>
                        <div className="flex space-x-2">
                          {booking.status === 'Pending' && (
                            <>
                              <Button
                                onClick={() => updateBookingStatus(booking.id, 'facility_bookings', 'Approved')}
                                size="sm"
                                variant="outline"
                                className="border-green-500/30 text-green-300 hover:bg-green-500/10"
                              >
                                Approve
                              </Button>
                              <Button
                                onClick={() => updateBookingStatus(booking.id, 'facility_bookings', 'Rejected')}
                                size="sm"
                                variant="outline"
                                className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === 'service-bookings' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Service Bookings</h3>
                
                {serviceBookings.length === 0 ? (
                  <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                    <p className="text-white/70 text-center">No service bookings submitted yet</p>
                  </Card>
                ) : (
                  serviceBookings.map((booking) => (
                    <Card key={booking.id} className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-white font-bold">{booking.service_type}</h4>
                            <Badge className={`${
                              booking.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                              booking.status === 'In Progress' ? 'bg-blue-500/20 text-blue-300' :
                              booking.status === 'Confirmed' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-gray-500/20 text-gray-300'
                            }`}>
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-white/60">{booking.residents?.name || 'Unknown'} • {new Date(booking.booking_date).toLocaleDateString()}</p>
                          {booking.service_provider && <p className="text-white/70">Provider: {booking.service_provider}</p>}
                          {booking.preferred_time && <p className="text-white/70">Preferred time: {booking.preferred_time}</p>}
                          {booking.description && <p className="text-white/60 text-sm mt-1">{booking.description}</p>}
                        </div>
                        <div className="flex space-x-2">
                          {booking.status === 'Requested' && (
                            <Button
                              onClick={() => updateBookingStatus(booking.id, 'service_bookings', 'Confirmed')}
                              size="sm"
                              variant="outline"
                              className="border-green-500/30 text-green-300 hover:bg-green-500/10"
                            >
                              Confirm
                            </Button>
                          )}
                          {booking.status === 'Confirmed' && (
                            <Button
                              onClick={() => updateBookingStatus(booking.id, 'service_bookings', 'In Progress')}
                              size="sm"
                              variant="outline"
                              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
                            >
                              Start
                            </Button>
                          )}
                          {booking.status === 'In Progress' && (
                            <Button
                              onClick={() => updateBookingStatus(booking.id, 'service_bookings', 'Completed')}
                              size="sm"
                              variant="outline"
                              className="border-green-500/30 text-green-300 hover:bg-green-500/10"
                            >
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
