
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Shield, Wrench, Car, Utensils, Shirt, Home, Eye, Users } from 'lucide-react';

const VendorMarketplace = () => {
  const vendors = [
    {
      name: "QuickFix Pro",
      category: "Maintenance",
      icon: Wrench,
      rating: 4.8,
      jobs: 145,
      responseTime: "< 2 hrs",
      specialties: ["Plumbing", "Electrical", "AC Repair"],
      color: "from-[#3a0ca3] to-[#f72585]",
      available: true
    },
    {
      name: "CleanCar Services", 
      category: "Automotive",
      icon: Car,
      rating: 4.9,
      jobs: 89,
      responseTime: "< 1 hr",
      specialties: ["Car Wash", "Detailing", "Oil Change"],
      color: "from-[#f72585] to-[#4cc9f0]",
      available: true
    },
    {
      name: "FreshMeals Daily",
      category: "Food & Catering", 
      icon: Utensils,
      rating: 4.7,
      jobs: 67,
      responseTime: "< 30 mins",
      specialties: ["Daily Meals", "Party Catering", "Healthy Options"],
      color: "from-[#4cc9f0] to-[#3a0ca3]",
      available: false
    },
    {
      name: "LaundryMax",
      category: "Laundry",
      icon: Shirt,
      rating: 4.6,
      jobs: 234,
      responseTime: "< 4 hrs",
      specialties: ["Pickup & Drop", "Dry Cleaning", "Express Service"],
      color: "from-[#7c3aed] to-[#ec4899]",
      available: true
    },
    {
      name: "HomeHelpers",
      category: "Cleaning",
      icon: Home,
      rating: 4.9,
      jobs: 156,
      responseTime: "< 3 hrs",
      specialties: ["Deep Cleaning", "Regular Maintenance", "Move-in Clean"],
      color: "from-[#10b981] to-[#3b82f6]",
      available: true
    }
  ];

  const categories = [
    { name: "All Services", count: "45+", active: true },
    { name: "Maintenance", count: "12", active: false },
    { name: "Cleaning", count: "8", active: false },
    { name: "Food", count: "15", active: false },
    { name: "Transport", count: "6", active: false },
    { name: "Other", count: "4", active: false }
  ];

  const handleBookNow = (vendorName: string) => {
    alert(`Booking ${vendorName}... This would open a booking modal in a real application.`);
  };

  const handleViewDetails = (vendorName: string) => {
    alert(`Viewing details for ${vendorName}... This would show detailed vendor information.`);
  };

  const handleViewAllVendors = () => {
    alert('Viewing all vendors... This would navigate to a comprehensive vendor listing page.');
  };

  const handleEmergencyCall = () => {
    alert('Emergency service request initiated. This would connect you with available emergency services.');
  };

  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            🛍️ Service Marketplace
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Vendor <span className="bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] bg-clip-text text-transparent">Marketplace</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Connect with trusted local service providers. Book maintenance, 
            cleaning, food delivery, and more with verified neighborhood vendors.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={category.active ? "default" : "outline"}
              className={`${
                category.active 
                  ? "bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white border-0 hover:shadow-lg" 
                  : "border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50"
              } backdrop-blur-md transition-all duration-300 hover:scale-105`}
            >
              {category.name}
              <Badge className="ml-2 bg-white/20 text-xs text-white">{category.count}</Badge>
            </Button>
          ))}
        </div>

        {/* Vendor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor, index) => {
            const IconComponent = vendor.icon;
            return (
              <Card key={index} className="p-6 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 group rounded-2xl overflow-hidden">
                <div className="space-y-6">
                  {/* Vendor Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${vendor.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{vendor.name}</h3>
                        <p className="text-sm text-white/60">{vendor.category}</p>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${vendor.available ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-bold">{vendor.rating}</span>
                      </div>
                      <div className="text-xs text-white/60">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold mb-1">{vendor.jobs}</div>
                      <div className="text-xs text-white/60">Jobs Done</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Clock className="w-4 h-4 text-white/60" />
                        <span className="text-white font-bold text-xs">{vendor.responseTime}</span>
                      </div>
                      <div className="text-xs text-white/60">Response</div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="space-y-2">
                    <div className="text-sm text-white/70 font-medium">Specialties:</div>
                    <div className="flex flex-wrap gap-2">
                      {vendor.specialties.map((specialty, specIndex) => (
                        <Badge key={specIndex} className="bg-white/20 text-white border-white/30 text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleBookNow(vendor.name)}
                      className={`flex-1 ${
                        vendor.available 
                          ? "bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:shadow-lg" 
                          : "bg-gray-500/50 text-white/50 cursor-not-allowed"
                      } transition-all duration-300 hover:scale-105`}
                      disabled={!vendor.available}
                    >
                      {vendor.available ? "Book Now" : "Unavailable"}
                    </Button>
                    <Button 
                      onClick={() => handleViewDetails(vendor.name)}
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/10 backdrop-blur-md hover:border-white/50 hover:text-white"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Action Bar */}
        <Card className="mt-12 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Need Emergency Service?</h3>
              <p className="text-white/70">Connect with available vendors for urgent requests</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={handleEmergencyCall}
                className="bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                Emergency Call
              </Button>
              <Button 
                onClick={handleViewAllVendors}
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                View All Vendors
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default VendorMarketplace;
