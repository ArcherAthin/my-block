
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import FloatingBackground from '@/components/FloatingBackground';
import BillPayment from '@/components/BillPayment';
import ComplaintForm from '@/components/ComplaintForm';
import FacilityBookingForm from '@/components/FacilityBookingForm';
import ServiceBookingForm from '@/components/ServiceBookingForm';
import { supabase } from "@/integrations/supabase/client";
import { 
  CreditCard, 
  Calendar, 
  Bell, 
  Users, 
  QrCode, 
  Wrench, 
  Building,
  DollarSign,
  Clock,
  Star,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ResidentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [bills, setBills] = useState([]);
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for demonstration since we don't have real Supabase integration with mock auth
  const mockBills = [
    {
      id: '1',
      amount: 250.00,
      due_date: '2024-02-15',
      status: 'pending',
      billing_month: '2024-02',
      bill_categories: { name: 'Maintenance Fee', description: 'Monthly maintenance' }
    },
    {
      id: '2',
      amount: 50.00,
      due_date: '2024-02-20',
      status: 'pending',
      billing_month: '2024-02',
      bill_categories: { name: 'Utilities', description: 'Water and electricity' }
    }
  ];

  const [upcomingEvents] = useState([
    { id: 1, title: 'Community Meeting', date: '2024-02-15', time: '7:00 PM', rsvp: false },
    { id: 2, title: 'Swimming Pool Maintenance', date: '2024-02-18', time: '9:00 AM', rsvp: false },
    { id: 3, title: 'Festival Celebration', date: '2024-02-20', time: '6:00 PM', rsvp: true }
  ]);

  const [announcements] = useState([
    { id: 1, title: 'New Security Guidelines', content: 'Updated visitor management protocols effective immediately.', date: '2024-01-20' },
    { id: 2, title: 'Parking Rule Changes', content: 'Assigned parking spots will be implemented from next month.', date: '2024-01-18' },
    { id: 3, title: 'Facility Booking Update', content: 'New time slots available for community hall bookings.', date: '2024-01-15' }
  ]);

  useEffect(() => {
    if (user) {
      fetchResidentData();
      setupRealtimeSubscription();
    } else {
      setLoading(false);
    }
  }, [user]);

  const setupRealtimeSubscription = () => {
    // Subscribe to bills changes for real-time updates
    const billsChannel = supabase
      .channel('resident_bills_realtime')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'bills'
      }, (payload) => {
        console.log('Bills change detected:', payload);
        // Refresh bills data when changes occur
        fetchBillsData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(billsChannel);
    };
  };

  const fetchBillsData = async () => {
    if (!resident?.id) return;

    try {
      const { data: billsData, error: billsError } = await supabase
        .from('bills')
        .select(`
          *,
          bill_categories(name, description)
        `)
        .eq('resident_id', resident.id)
        .order('due_date', { ascending: true });

      if (billsError) {
        console.error('Error fetching bills:', billsError);
        setBills(mockBills);
      } else {
        setBills(billsData || []);
        toast({
          title: "Bills Updated",
          description: "Your bills have been updated with the latest information.",
        });
      }
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  const fetchResidentData = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    console.log('Fetching resident data for:', user.email);
    setLoading(true);
    setError(null);

    try {
      // Try to fetch resident profile from Supabase
      const { data: residentData, error: residentError } = await supabase
        .from('residents')
        .select('*')
        .eq('email', user.email)
        .maybeSingle();

      if (residentError) {
        console.error('Error fetching resident:', residentError);
        // For now, use mock data if Supabase query fails
        setResident({
          id: 'mock-resident-1',
          name: user.name || 'Demo Resident',
          email: user.email,
          unit_number: 'A-101',
          resident_number: 'RES-2024-0001',
          phone: '+1234567890',
          status: 'active'
        });
        setBills(mockBills);
      } else if (residentData) {
        setResident(residentData);
        
        // Fetch bills for this resident
        const { data: billsData, error: billsError } = await supabase
          .from('bills')
          .select(`
            *,
            bill_categories(name, description)
          `)
          .eq('resident_id', residentData.id)
          .order('due_date', { ascending: true });

        if (billsError) {
          console.error('Error fetching bills:', billsError);
          setBills(mockBills);
        } else {
          setBills(billsData || []);
        }
      } else {
        // No resident profile found, use mock data for demo
        console.log('No resident profile found, using mock data');
        setResident({
          id: 'mock-resident-1',
          name: user.name || 'Demo Resident',
          email: user.email,
          unit_number: 'A-101',
          resident_number: 'RES-2024-0001',
          phone: '+1234567890',
          status: 'active'
        });
        setBills(mockBills);
      }
    } catch (error) {
      console.error('Error fetching resident data:', error);
      setError(error.message);
      // Fall back to mock data
      setResident({
        id: 'mock-resident-1',
        name: user.name || 'Demo Resident',
        email: user.email,
        unit_number: 'A-101',
        resident_number: 'RES-2024-0001',
        phone: '+1234567890',
        status: 'active'
      });
      setBills(mockBills);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed successfully.",
    });
    // Refresh bills after payment
    setTimeout(() => {
      fetchResidentData();
    }, 1000);
  };

  const getTotalOutstanding = () => {
    return bills
      .filter(bill => bill.status === 'pending')
      .reduce((total, bill) => total + parseFloat(bill.amount), 0);
  };

  const quickActions = [
    { title: 'Generate Visitor Pass', icon: QrCode, action: () => navigate('/visitor-management') },
    { title: 'Report Issue', icon: Wrench, action: () => navigate('/maintenance-portal') },
    { title: 'Book Facility', icon: Building, action: () => navigate('/facility-booking') },
    { title: 'Service Providers', icon: Users, action: () => navigate('/service-providers') }
  ];

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <FloatingBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <FloatingBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-300 mb-4">Error loading dashboard: {error}</p>
            <Button 
              onClick={() => fetchResidentData()}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              Retry
            </Button>
          </div>
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
                  <h1 className="text-3xl font-bold text-white">
                    Welcome back, {resident?.name || user?.name || 'Resident'}!
                  </h1>
                  <p className="text-white/70">
                    {resident ? `Unit ${resident.unit_number} • ID: ${resident.resident_number}` : 'Your personal community dashboard'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={fetchResidentData}
                  variant="outline"
                  size="icon"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  Active Resident
                </Badge>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Bills & Payments */}
              <div className="space-y-6">
                {/* Outstanding Dues */}
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Outstanding Bills</h3>
                    <CreditCard className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-white">
                      ${getTotalOutstanding().toFixed(2)}
                    </div>
                    {getTotalOutstanding() === 0 ? (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        All bills paid!
                      </Badge>
                    ) : (
                      <p className="text-white/70 text-sm">
                        {bills.filter(bill => bill.status === 'pending').length} pending bills
                      </p>
                    )}
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action, index) => {
                      const IconComponent = action.icon;
                      return (
                        <Button
                          key={index}
                          onClick={action.action}
                          variant="outline"
                          className="h-20 flex flex-col items-center justify-center border-white/30 text-white hover:bg-white/10 bg-transparent space-y-2"
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="text-xs text-center">{action.title}</span>
                        </Button>
                      );
                    })}
                  </div>
                </Card>
              </div>

              {/* Middle & Right Column - Tabbed Content */}
              <div className="lg:col-span-2 space-y-6">
                <Tabs defaultValue="bills" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20">
                    <TabsTrigger value="bills" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff6ec4] data-[state=active]:to-[#7873f5] data-[state=active]:text-white text-white/70">Bills</TabsTrigger>
                    <TabsTrigger value="complaints" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff6ec4] data-[state=active]:to-[#7873f5] data-[state=active]:text-white text-white/70">Complaints</TabsTrigger>
                    <TabsTrigger value="facility" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff6ec4] data-[state=active]:to-[#7873f5] data-[state=active]:text-white text-white/70">Facilities</TabsTrigger>
                    <TabsTrigger value="services" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ff6ec4] data-[state=active]:to-[#7873f5] data-[state=active]:text-white text-white/70">Services</TabsTrigger>
                  </TabsList>

                  <TabsContent value="bills" className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">Your Bills</h3>
                      <Button
                        onClick={fetchResidentData}
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                    <BillPayment bills={bills} onPaymentSuccess={handlePaymentSuccess} />
                  </TabsContent>

                  <TabsContent value="complaints">
                    <ComplaintForm 
                      residentId={resident?.id} 
                      onComplaintSubmitted={() => {
                        toast({
                          title: "Complaint Submitted",
                          description: "Your complaint will be reviewed by the admin immediately.",
                        });
                      }}
                    />
                  </TabsContent>

                  <TabsContent value="facility">
                    <FacilityBookingForm 
                      residentId={resident?.id} 
                      onBookingSubmitted={() => {
                        toast({
                          title: "Booking Submitted", 
                          description: "Your facility booking will be reviewed by the admin immediately.",
                        });
                      }}
                    />
                  </TabsContent>

                  <TabsContent value="services">
                    <ServiceBookingForm 
                      residentId={resident?.id} 
                      onBookingSubmitted={() => {
                        toast({
                          title: "Service Requested",
                          description: "Your service booking will be reviewed by the admin immediately.",
                        });
                      }}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResidentDashboard;
