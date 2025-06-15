
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import FloatingBackground from '@/components/FloatingBackground';
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
  ArrowLeft
} from 'lucide-react';

const ResidentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [outstandingDues, setOutstandingDues] = useState(2450);
  const [recentPayments] = useState([
    { id: 1, amount: 1200, date: '2024-01-15', type: 'Maintenance Fee', status: 'Paid' },
    { id: 2, amount: 800, date: '2024-01-10', type: 'Electricity Bill', status: 'Paid' },
    { id: 3, amount: 450, date: '2024-01-05', type: 'Water Bill', status: 'Paid' }
  ]);

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

  const handlePayment = () => {
    // Simulate payment processing
    alert('Payment gateway integration would go here. For demo: Payment of ₹' + outstandingDues + ' processed successfully!');
    setOutstandingDues(0);
  };

  const handleRSVP = (eventId: number) => {
    alert(`RSVP confirmed for event ${eventId}!`);
  };

  const quickActions = [
    { title: 'Generate Visitor Pass', icon: QrCode, action: () => navigate('/visitor-management') },
    { title: 'Report Issue', icon: Wrench, action: () => navigate('/maintenance-portal') },
    { title: 'Book Facility', icon: Building, action: () => navigate('/facility-booking') },
    { title: 'Service Providers', icon: Users, action: () => navigate('/service-providers') }
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
                  <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name || 'Resident'}!</h1>
                  <p className="text-white/70">Your personal community dashboard</p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                Active Resident
              </Badge>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Dues & Payments */}
              <div className="space-y-6">
                {/* Outstanding Dues */}
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Outstanding Dues</h3>
                    <CreditCard className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-white">₹{outstandingDues.toLocaleString()}</div>
                    {outstandingDues > 0 ? (
                      <Button 
                        onClick={handlePayment}
                        className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105 transition-all duration-300"
                      >
                        Pay Now
                      </Button>
                    ) : (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        All dues cleared!
                      </Badge>
                    )}
                  </div>
                </Card>

                {/* Recent Payments */}
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Payments</h3>
                  <div className="space-y-3">
                    {recentPayments.map((payment) => (
                      <div key={payment.id} className="flex justify-between items-center p-3 rounded-lg bg-white/10">
                        <div>
                          <div className="text-white font-medium">{payment.type}</div>
                          <div className="text-white/60 text-sm">{payment.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">₹{payment.amount}</div>
                          <Badge className="bg-green-500/20 text-green-300 text-xs">
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
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

              {/* Middle Column - Events & Calendar */}
              <div className="space-y-6">
                {/* Upcoming Events */}
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Upcoming Events</h3>
                    <Calendar className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{event.title}</h4>
                          <Badge className={event.rsvp ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"}>
                            {event.rsvp ? "RSVP'd" : "Pending"}
                          </Badge>
                        </div>
                        <div className="text-white/60 text-sm mb-3">
                          {event.date} at {event.time}
                        </div>
                        {!event.rsvp && (
                          <Button
                            onClick={() => handleRSVP(event.id)}
                            size="sm"
                            className="bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white hover:scale-105 transition-all duration-300"
                          >
                            RSVP Now
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column - Announcements */}
              <div className="space-y-6">
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Announcements</h3>
                    <Bell className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                        <h4 className="text-white font-medium mb-2">{announcement.title}</h4>
                        <p className="text-white/70 text-sm mb-2">{announcement.content}</p>
                        <div className="text-white/50 text-xs">{announcement.date}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResidentDashboard;
