
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin, Waves, Dumbbell, GamepadIcon, TreePine, Car, Building } from 'lucide-react';

const FacilityBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const facilities = [
    {
      name: "Swimming Pool",
      icon: Waves,
      capacity: "50 people",
      price: "$25/hour",
      available: 8,
      total: 12,
      color: "from-[#06b6d4] to-[#0891b2]",
      amenities: ["Lifeguard", "Pool Toys", "Changing Rooms"]
    },
    {
      name: "Gym & Fitness",
      icon: Dumbbell, 
      capacity: "25 people",
      price: "$15/hour", 
      available: 6,
      total: 10,
      color: "from-[#f59e0b] to-[#d97706]",
      amenities: ["Equipment", "AC", "Shower"]
    },
    {
      name: "Game Room",
      icon: GamepadIcon,
      capacity: "15 people", 
      price: "$20/hour",
      available: 4,
      total: 8,
      color: "from-[#8b5cf6] to-[#7c3aed]",
      amenities: ["Gaming Consoles", "Board Games", "Snacks"]
    },
    {
      name: "Garden Area",
      icon: TreePine,
      capacity: "100 people",
      price: "$40/hour",
      available: 3,
      total: 6,
      color: "from-[#10b981] to-[#059669]",
      amenities: ["BBQ Setup", "Seating", "Sound System"]
    },
    {
      name: "Parking Spots",
      icon: Car,
      capacity: "1 vehicle",
      price: "$5/day",
      available: 12,
      total: 25,
      color: "from-[#6b7280] to-[#4b5563]",
      amenities: ["Covered", "Security", "24/7 Access"]
    },
    {
      name: "Community Hall",
      icon: Building,
      capacity: "200 people",
      price: "$100/hour",
      available: 2,
      total: 4,
      color: "from-[#ec4899] to-[#db2777]",
      amenities: ["Stage", "Audio/Video", "Kitchen"]
    }
  ];

  const timeSlots = [
    { time: "09:00", available: true, price: 25 },
    { time: "10:00", available: true, price: 25 },
    { time: "11:00", available: false, price: 25 },
    { time: "12:00", available: true, price: 30 },
    { time: "13:00", available: true, price: 30 },
    { time: "14:00", available: false, price: 30 },
    { time: "15:00", available: true, price: 35 },
    { time: "16:00", available: true, price: 35 },
    { time: "17:00", available: true, price: 35 },
    { time: "18:00", available: false, price: 40 },
    { time: "19:00", available: true, price: 40 },
    { time: "20:00", available: true, price: 40 }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            🏢 Smart Facilities
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Facility <span className="bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] bg-clip-text text-transparent">Booking</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Reserve community amenities with smart calendar integration. 
            Real-time availability, instant confirmations, and seamless access management.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Facilities Grid */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {facilities.map((facility, index) => {
              const IconComponent = facility.icon;
              const availabilityPercentage = (facility.available / facility.total) * 100;
              
              return (
                <Card key={index} className="p-6 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 group rounded-2xl">
                  <div className="space-y-4">
                    {/* Facility Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${facility.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{facility.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-white/60">
                            <Users className="w-4 h-4" />
                            <span>{facility.capacity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{facility.price}</div>
                        <div className="text-xs text-white/60">per hour</div>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Availability Today</span>
                        <span className="text-white font-medium">{facility.available}/{facility.total} slots</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${
                            availabilityPercentage > 60 ? 'from-green-400 to-green-500' :
                            availabilityPercentage > 30 ? 'from-yellow-400 to-yellow-500' :
                            'from-red-400 to-red-500'
                          }`}
                          style={{ width: `${availabilityPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="space-y-2">
                      <div className="text-sm text-white/70 font-medium">Amenities:</div>
                      <div className="flex flex-wrap gap-1">
                        {facility.amenities.map((amenity, amenityIndex) => (
                          <Badge key={amenityIndex} className="bg-white/20 text-white border-white/30 text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Book Button */}
                    <Button 
                      className={`w-full ${
                        facility.available > 0 
                          ? "bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105" 
                          : "bg-gray-500/50 text-white/50 cursor-not-allowed"
                      } transition-all duration-300`}
                      disabled={facility.available === 0}
                    >
                      {facility.available > 0 ? "Book Now" : "Fully Booked"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Booking Panel */}
          <div className="space-y-6">
            {/* Calendar Card */}
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-bold text-white">Select Date</h3>
                </div>
                
                {/* Simple Date Selector */}
                <div className="grid grid-cols-7 gap-2 text-center">
                  <div className="text-xs text-white/60 py-2">Sun</div>
                  <div className="text-xs text-white/60 py-2">Mon</div>
                  <div className="text-xs text-white/60 py-2">Tue</div>
                  <div className="text-xs text-white/60 py-2">Wed</div>
                  <div className="text-xs text-white/60 py-2">Thu</div>
                  <div className="text-xs text-white/60 py-2">Fri</div>
                  <div className="text-xs text-white/60 py-2">Sat</div>
                  
                  {[...Array(31)].map((_, i) => (
                    <button
                      key={i}
                      className={`py-2 text-sm rounded-lg transition-all duration-200 ${
                        i === 14 
                          ? 'bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white' 
                          : 'text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Time Slots */}
            <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-bold text-white">Available Times</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`p-3 rounded-lg text-sm transition-all duration-200 ${
                        !slot.available 
                          ? 'bg-red-500/20 text-red-300 cursor-not-allowed' 
                          : selectedSlot === slot.time
                          ? 'bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(slot.time)}
                    >
                      <div className="font-medium">{slot.time}</div>
                      <div className="text-xs">${slot.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Booking Summary */}
            {selectedSlot && (
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Date</span>
                      <span className="text-white">Today</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Time</span>
                      <span className="text-white">{selectedSlot}:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Duration</span>
                      <span className="text-white">1 hour</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-white">$25</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105 transition-all duration-300">
                    Confirm Booking
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilityBooking;
