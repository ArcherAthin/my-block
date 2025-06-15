import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Star, Clock, MapPin, Phone, Mail, Calendar, ChevronRight } from 'lucide-react';

const VendorMarketplace = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAllVendors, setShowAllVendors] = useState(false);

  const vendors = [
    {
      id: 1,
      name: "QuickFix Plumbing",
      category: "maintenance",
      rating: 4.8,
      reviews: 156,
      image: "/placeholder.svg",
      services: ["Emergency Repairs", "Installation", "Maintenance"],
      response: "15 mins",
      price: "₹500/hr",
      verified: true,
      available: true
    },
    {
      id: 2,
      name: "GreenThumb Landscaping",
      category: "gardening",
      rating: 4.9,
      reviews: 203,
      image: "/placeholder.svg",
      services: ["Garden Design", "Maintenance", "Plant Installation"],
      response: "2 hours",
      price: "₹800/hr",
      verified: true,
      available: true
    },
    {
      id: 3,
      name: "SparkElectric Solutions",
      category: "maintenance",
      rating: 4.7,
      reviews: 189,
      image: "/placeholder.svg",
      services: ["Wiring", "Appliance Repair", "Installation"],
      response: "30 mins",
      price: "₹600/hr",
      verified: true,
      available: false
    },
    {
      id: 4,
      name: "CleanSweep Services",
      category: "cleaning",
      rating: 4.6,
      reviews: 124,
      image: "/placeholder.svg",
      services: ["Deep Cleaning", "Regular Maintenance", "Sanitization"],
      response: "1 hour",
      price: "₹400/hr",
      verified: true,
      available: true
    },
    {
      id: 5,
      name: "SafeGuard Security",
      category: "security",
      rating: 4.8,
      reviews: 167,
      image: "/placeholder.svg",
      services: ["Security Systems", "CCTV Installation", "Monitoring"],
      response: "45 mins",
      price: "₹1200/hr",
      verified: true,
      available: true
    },
    {
      id: 6,
      name: "FreshMart Grocery",
      category: "delivery",
      rating: 4.5,
      reviews: 234,
      image: "/placeholder.svg",
      services: ["Grocery Delivery", "Fresh Produce", "Bulk Orders"],
      response: "4 hours",
      price: "Free delivery",
      verified: true,
      available: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', count: vendors.length },
    { id: 'maintenance', name: 'Maintenance', count: vendors.filter(v => v.category === 'maintenance').length },
    { id: 'cleaning', name: 'Cleaning', count: vendors.filter(v => v.category === 'cleaning').length },
    { id: 'gardening', name: 'Gardening', count: vendors.filter(v => v.category === 'gardening').length },
    { id: 'security', name: 'Security', count: vendors.filter(v => v.category === 'security').length },
    { id: 'delivery', name: 'Delivery', count: vendors.filter(v => v.category === 'delivery').length }
  ];

  const filteredVendors = selectedCategory === 'all' 
    ? vendors 
    : vendors.filter(vendor => vendor.category === selectedCategory);

  const displayedVendors = showAllVendors ? filteredVendors : filteredVendors.slice(0, 4);

  const handleBookService = (vendorName: string) => {
    console.log(`Booking service with ${vendorName}`);
    navigate('/service-providers');
  };

  const handleContactVendor = (vendorName: string) => {
    console.log(`Contacting ${vendorName}`);
    alert(`Contact details for ${vendorName} will be shared via SMS.`);
  };

  const handleViewDetails = (vendorName: string) => {
    console.log(`Viewing details for ${vendorName}`);
    navigate('/service-providers');
  };

  const handleViewAllVendors = () => {
    console.log('View all vendors clicked');
    navigate('/service-providers');
  };

  return (
    <section id="services" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            🛠️ Vendor Marketplace
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted <span className="bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] bg-clip-text text-transparent">Service Providers</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Connect with verified local vendors for all your neighborhood needs
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white border-0 hover:text-white'
                  : 'border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent'
              }`}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Vendors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {displayedVendors.map((vendor, index) => (
            <Card 
              key={vendor.id}
              className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:scale-105 transition-all duration-300 hover:bg-white/15"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {vendor.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{vendor.name}</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white/80 ml-1">{vendor.rating}</span>
                      </div>
                      <span className="text-white/60">({vendor.reviews} reviews)</span>
                      {vendor.verified && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${vendor.available ? 'bg-green-400' : 'bg-red-400'}`} />
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {vendor.services.slice(0, 3).map((service, idx) => (
                    <Badge key={idx} variant="outline" className="border-white/30 text-white/80">
                      {service}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-white/70">
                    <Clock className="w-4 h-4 mr-2" />
                    {vendor.response}
                  </div>
                  <div className="flex items-center text-white/70">
                    <span className="font-medium">{vendor.price}</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={() => handleBookService(vendor.name)}
                    disabled={!vendor.available}
                    className={`flex-1 ${
                      vendor.available 
                        ? 'bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] hover:scale-105 text-white border-0 hover:text-white' 
                        : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                    } transition-all duration-300`}
                  >
                    {vendor.available ? 'Book Now' : 'Unavailable'}
                  </Button>
                  <Button
                    onClick={() => handleContactVendor(vendor.name)}
                    variant="outline"
                    size="icon"
                    className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleViewDetails(vendor.name)}
                    variant="outline"
                    size="icon"
                    className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            onClick={handleViewAllVendors}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent px-8 py-3 rounded-xl transition-all duration-300"
          >
            View All Vendors
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VendorMarketplace;
