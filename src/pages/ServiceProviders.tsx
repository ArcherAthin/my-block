
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Navigation from '@/components/Navigation';
import FloatingBackground from '@/components/FloatingBackground';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowLeft,
  Star,
  Phone,
  Mail,
  Clock,
  MapPin,
  User,
  Calendar,
  CheckCircle
} from 'lucide-react';

const ServiceProviders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [bookingForm, setBookingForm] = useState({
    residentName: user?.name || '',
    serviceType: '',
    description: '',
    preferredDate: '',
    preferredTime: '',
    phone: ''
  });

  const providers = [
    {
      id: 1,
      name: "QuickFix Plumbing Services",
      category: "Plumbing",
      rating: 4.8,
      reviews: 156,
      phone: "+91 98765-11111",
      email: "quickfix.plumbing@email.com",
      services: ["Emergency Repairs", "Pipe Installation", "Drain Cleaning", "Water Heater Service"],
      experience: "8+ years",
      response: "15 minutes",
      price: "₹500-800/hour",
      available: true,
      description: "Professional plumbing services with 24/7 emergency support. Specialized in residential and commercial plumbing solutions.",
      certifications: ["Licensed Plumber", "Emergency Response Certified"]
    },
    {
      id: 2,
      name: "ElectroTech Solutions",
      category: "Electrical",
      rating: 4.7,
      reviews: 189,
      phone: "+91 98765-22222",
      email: "electrotech.solutions@email.com",
      services: ["Wiring & Rewiring", "Appliance Repair", "Smart Home Setup", "Safety Inspections"],
      experience: "10+ years",
      response: "30 minutes",
      price: "₹600-1000/hour",
      available: true,
      description: "Expert electrical services including smart home installations and emergency repairs. Safety-first approach with modern solutions.",
      certifications: ["Certified Electrician", "Smart Home Specialist"]
    },
    {
      id: 3,
      name: "CleanPro Housekeeping",
      category: "Cleaning",
      rating: 4.6,
      reviews: 124,
      phone: "+91 98765-33333",
      email: "cleanpro.housekeeping@email.com",
      services: ["Deep Cleaning", "Regular Maintenance", "Carpet Cleaning", "Post-Construction Cleanup"],
      experience: "5+ years",
      response: "1 hour",
      price: "₹300-500/hour",
      available: false,
      description: "Professional cleaning services using eco-friendly products. Reliable team with attention to detail and flexible scheduling.",
      certifications: ["Eco-Certified", "Insured & Bonded"]
    },
    {
      id: 4,
      name: "SecureGuard Systems",
      category: "Security",
      rating: 4.9,
      reviews: 98,
      phone: "+91 98765-44444",
      email: "secureguard.systems@email.com",
      services: ["CCTV Installation", "Access Control", "Alarm Systems", "24/7 Monitoring"],
      experience: "12+ years",
      response: "45 minutes",
      price: "₹1200-2000/hour",
      available: true,
      description: "Advanced security solutions for residential communities. State-of-the-art equipment with professional installation and monitoring.",
      certifications: ["Security System Certified", "Surveillance Specialist"]
    }
  ];

  const handleBookService = (provider: any) => {
    setSelectedProvider(provider);
    setBookingForm({ ...bookingForm, serviceType: provider.services[0] });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate sending email to service provider
    const emailContent = `
New Service Booking Request:

Provider: ${selectedProvider.name}
Resident: ${bookingForm.residentName}
Phone: ${bookingForm.phone}
Service Type: ${bookingForm.serviceType}
Description: ${bookingForm.description}
Preferred Date: ${bookingForm.preferredDate}
Preferred Time: ${bookingForm.preferredTime}

Provider Contact: ${selectedProvider.email}
    `;
    
    console.log('Email would be sent to:', selectedProvider.email);
    console.log('Email content:', emailContent);
    
    alert(`Booking request sent successfully to ${selectedProvider.name}!\n\nThey will contact you at ${bookingForm.phone} within ${selectedProvider.response}.\n\nBooking details have been emailed to: ${selectedProvider.email}`);
    
    setSelectedProvider(null);
    setBookingForm({
      residentName: user?.name || '',
      serviceType: '',
      description: '',
      preferredDate: '',
      preferredTime: '',
      phone: ''
    });
  };

  const handleCallProvider = (provider: any) => {
    alert(`Calling ${provider.name}...\n\nPhone: ${provider.phone}\n\nIn a real app, this would initiate a phone call or display contact details.`);
  };

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
                  <h1 className="text-3xl font-bold text-white">Trusted Service Providers</h1>
                  <p className="text-white/70">Connect with verified local professionals</p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                Verified Network
              </Badge>
            </div>

            {/* Service Providers Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {providers.map((provider) => (
                <Card 
                  key={provider.id}
                  className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:scale-105 transition-all duration-300 hover:bg-white/15"
                >
                  <div className="space-y-6">
                    {/* Provider Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            {provider.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{provider.name}</h3>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-white/80 ml-1">{provider.rating}</span>
                            </div>
                            <span className="text-white/60">({provider.reviews} reviews)</span>
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                              {provider.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${provider.available ? 'bg-green-400' : 'bg-red-400'}`} />
                    </div>

                    {/* Provider Details */}
                    <div className="space-y-4">
                      <p className="text-white/70 text-sm leading-relaxed">{provider.description}</p>
                      
                      {/* Services */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Services:</h4>
                        <div className="flex flex-wrap gap-2">
                          {provider.services.map((service, idx) => (
                            <Badge key={idx} variant="outline" className="border-white/30 text-white/80 text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-white/70">
                          <Clock className="w-4 h-4 mr-2" />
                          Response: {provider.response}
                        </div>
                        <div className="flex items-center text-white/70">
                          <MapPin className="w-4 h-4 mr-2" />
                          {provider.experience} experience
                        </div>
                        <div className="flex items-center text-white/70 col-span-2">
                          <span className="font-medium text-white">Rates: {provider.price}</span>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div>
                        <h4 className="text-white font-medium mb-2">Certifications:</h4>
                        <div className="flex flex-wrap gap-2">
                          {provider.certifications.map((cert, idx) => (
                            <div key={idx} className="flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              <span className="text-white/70 text-xs">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-4">
                        <Button
                          onClick={() => handleBookService(provider)}
                          disabled={!provider.available}
                          className={`flex-1 ${
                            provider.available 
                              ? 'bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] hover:scale-105 text-white border-0' 
                              : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                          } transition-all duration-300`}
                        >
                          {provider.available ? 'Book Service' : 'Unavailable'}
                        </Button>
                        <Button
                          onClick={() => handleCallProvider(provider)}
                          variant="outline"
                          size="icon"
                          className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => alert(`Contact: ${provider.email}\nPhone: ${provider.phone}`)}
                          variant="outline"
                          size="icon"
                          className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Booking Modal */}
            {selectedProvider && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <Card className="w-full max-w-md p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Book Service</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedProvider(null)}
                      className="text-white hover:bg-white/10"
                    >
                      ×
                    </Button>
                  </div>

                  <div className="mb-4 p-4 rounded-lg bg-white/10">
                    <h4 className="text-white font-medium">{selectedProvider.name}</h4>
                    <p className="text-white/60 text-sm">{selectedProvider.category} • {selectedProvider.price}</p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-white/70 mb-2">Your Name</label>
                      <Input
                        value={bookingForm.residentName}
                        onChange={(e) => setBookingForm({...bookingForm, residentName: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-white/60"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 mb-2">Phone Number</label>
                      <Input
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        placeholder="Your contact number"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-white/60"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 mb-2">Service Type</label>
                      <select
                        value={bookingForm.serviceType}
                        onChange={(e) => setBookingForm({...bookingForm, serviceType: e.target.value})}
                        required
                        className="w-full p-2 rounded-md bg-white/10 border border-white/20 text-white"
                      >
                        {selectedProvider.services.map((service: string, idx: number) => (
                          <option key={idx} value={service} className="bg-gray-800">{service}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/70 mb-2">Preferred Date</label>
                        <Input
                          type="date"
                          value={bookingForm.preferredDate}
                          onChange={(e) => setBookingForm({...bookingForm, preferredDate: e.target.value})}
                          required
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-2">Preferred Time</label>
                        <Input
                          type="time"
                          value={bookingForm.preferredTime}
                          onChange={(e) => setBookingForm({...bookingForm, preferredTime: e.target.value})}
                          required
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/70 mb-2">Description</label>
                      <textarea
                        value={bookingForm.description}
                        onChange={(e) => setBookingForm({...bookingForm, description: e.target.value})}
                        placeholder="Describe the issue or service needed..."
                        required
                        rows={3}
                        className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105 transition-all duration-300"
                    >
                      Confirm Booking
                    </Button>
                  </form>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceProviders;
