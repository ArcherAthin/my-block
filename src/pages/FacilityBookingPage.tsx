
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import FloatingBackground from '@/components/FloatingBackground';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  Waves,
  Dumbbell,
  GamepadIcon,
  TreePine,
  Car,
  Building,
  CheckCircle
} from 'lucide-react';

const FacilityBookingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({
    residentName: user?.name || '',
    phone: '',
    guests: 1,
    purpose: ''
  });

  const [bookedSlots, setBookedSlots] = useState<any>({
    'swimming-pool': ['10:00', '15:00', '18:00'],
    'gym': ['09:00', '11:00', '17:00', '19:00'],
    'game-room': ['14:00', '16:00', '20:00'],
    'garden': ['10:00', '18:00'],
    'community-hall': ['15:00', '19:00']
  });

  const facilities = [
    {
      id: 'swimming-pool',
      name: "Swimming Pool",
      icon: Waves,
      capacity: "50 people",
      price: "₹300/hour",
      color: "from-[#06b6d4] to-[#0891b2]",
      amenities: ["Lifeguard", "Pool Toys", "Changing Rooms", "Towel Service"],
      rules: ["No outside food", "Children under 12 must be supervised", "Swimming cap required"],
      available: [8, 22], // Available from 8 AM to 10 PM
      image: "/placeholder.svg"
    },
    {
      id: 'gym',
      name: "Gym & Fitness Center",
      icon: Dumbbell, 
      capacity: "25 people",
      price: "₹200/hour", 
      color: "from-[#f59e0b] to-[#d97706]",
      amenities: ["Modern Equipment", "AC", "Shower", "Lockers", "Trainer Available"],
      rules: ["Proper gym attire required", "Clean equipment after use", "No loud music"],
      available: [6, 22], // Available from 6 AM to 10 PM
      image: "/placeholder.svg"
    },
    {
      id: 'game-room',
      name: "Game Room",
      icon: GamepadIcon,
      capacity: "15 people", 
      price: "₹150/hour",
      color: "from-[#8b5cf6] to-[#7c3aed]",
      amenities: ["Gaming Consoles", "Board Games", "Snacks Counter", "Comfortable Seating"],
      rules: ["No outside gaming devices", "Keep noise level moderate", "Clean up after use"],
      available: [10, 22], // Available from 10 AM to 10 PM
      image: "/placeholder.svg"
    },
    {
      id: 'garden',
      name: "Garden Area",
      icon: TreePine,
      capacity: "100 people",
      price: "₹500/hour",
      color: "from-[#10b981] to-[#059669]",
      amenities: ["BBQ Setup", "Outdoor Seating", "Sound System", "Lighting"],
      rules: ["Clean up after events", "No loud music after 10 PM", "Advance booking required"],
      available: [8, 22], // Available from 8 AM to 10 PM
      image: "/placeholder.svg"
    },
    {
      id: 'community-hall',
      name: "Community Hall",
      icon: Building,
      capacity: "200 people",
      price: "₹1000/hour",
      color: "from-[#ec4899] to-[#db2777]",
      amenities: ["Stage", "Audio/Video", "Kitchen", "Parking", "Security"],
      rules: ["48-hour advance booking", "Security deposit required", "Professional cleaning included"],
      available: [9, 23], // Available from 9 AM to 11 PM
      image: "/placeholder.svg"
    }
  ];

  const generateTimeSlots = (facility: any) => {
    const slots = [];
    const [start, end] = facility.available;
    
    for (let hour = start; hour < end; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      const isBooked = bookedSlots[facility.id]?.includes(timeString) || false;
      
      slots.push({
        time: timeString,
        available: !isBooked,
        price: parseInt(facility.price.replace(/[^\d]/g, ''))
      });
    }
    
    return slots;
  };

  const handleFacilitySelect = (facility: any) => {
    setSelectedFacility(facility);
    setSelectedSlot(null);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    // Update booked slots
    const newBookedSlots = { ...bookedSlots };
    if (!newBookedSlots[selectedFacility.id]) {
      newBookedSlots[selectedFacility.id] = [];
    }
    newBookedSlots[selectedFacility.id].push(selectedSlot);
    setBookedSlots(newBookedSlots);

    const bookingId = 'BK' + Math.random().toString(36).substr(2, 8).toUpperCase();
    
    alert(`Booking Confirmed! 🎉

Booking ID: ${bookingId}
Facility: ${selectedFacility.name}
Date: ${selectedDate}
Time: ${selectedSlot}:00 - ${(parseInt(selectedSlot.split(':')[0]) + 1).toString().padStart(2, '0')}:00
Guests: ${bookingForm.guests}
Total Cost: ${selectedFacility.price}

You will receive a confirmation email shortly.`);

    // Reset form
    setSelectedFacility(null);
    setSelectedSlot(null);
    setBookingForm({
      residentName: user?.name || '',
      phone: '',
      guests: 1,
      purpose: ''
    });
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
                  <h1 className="text-3xl font-bold text-white">Facility Booking</h1>
                  <p className="text-white/70">Reserve community amenities with ease</p>
                </div>
              </div>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                Smart Booking
              </Badge>
            </div>

            {!selectedFacility ? (
              /* Facility Selection */
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((facility) => {
                  const IconComponent = facility.icon;
                  const currentBookings = bookedSlots[facility.id]?.length || 0;
                  const totalSlots = facility.available[1] - facility.available[0];
                  const availabilityPercentage = ((totalSlots - currentBookings) / totalSlots) * 100;
                  
                  return (
                    <Card 
                      key={facility.id} 
                      className="p-6 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 group rounded-2xl cursor-pointer"
                      onClick={() => handleFacilitySelect(facility)}
                    >
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
                          </div>
                        </div>

                        {/* Availability */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Availability Today</span>
                            <span className="text-white font-medium">{totalSlots - currentBookings}/{totalSlots} slots</span>
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
                            {facility.amenities.slice(0, 3).map((amenity, amenityIndex) => (
                              <Badge key={amenityIndex} className="bg-white/20 text-white border-white/30 text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {facility.amenities.length > 3 && (
                              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                                +{facility.amenities.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Book Button */}
                        <Button 
                          className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105 transition-all duration-300"
                        >
                          Select Facility
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              /* Booking Form */
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Facility Details */}
                <div className="lg:col-span-1 space-y-6">
                  <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <Button
                        onClick={() => setSelectedFacility(null)}
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                      >
                        ← Back
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedFacility.color} flex items-center justify-center`}>
                          <selectedFacility.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{selectedFacility.name}</h3>
                          <p className="text-white/60">{selectedFacility.capacity}</p>
                        </div>
                      </div>

                      <div className="text-2xl font-bold text-white">{selectedFacility.price}</div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Amenities:</h4>
                        <div className="space-y-1">
                          {selectedFacility.amenities.map((amenity: string, idx: number) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              <span className="text-white/70 text-sm">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Rules:</h4>
                        <div className="space-y-1">
                          {selectedFacility.rules.map((rule: string, idx: number) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <span className="text-white/60 text-sm">•</span>
                              <span className="text-white/60 text-sm">{rule}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Booking Form */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">Book {selectedFacility.name}</h3>
                    
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/70 mb-2">Resident Name</label>
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
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/70 mb-2">Date</label>
                          <Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 mb-2">Number of Guests</label>
                          <Input
                            type="number"
                            value={bookingForm.guests}
                            onChange={(e) => setBookingForm({...bookingForm, guests: parseInt(e.target.value)})}
                            min="1"
                            max={parseInt(selectedFacility.capacity.split(' ')[0])}
                            required
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/70 mb-2">Purpose (Optional)</label>
                        <Input
                          value={bookingForm.purpose}
                          onChange={(e) => setBookingForm({...bookingForm, purpose: e.target.value})}
                          placeholder="Birthday party, workout session, etc."
                          className="bg-white/10 border-white/20 text-white placeholder-white/60"
                        />
                      </div>

                      {/* Time Slots */}
                      <div>
                        <label className="block text-white/70 mb-4">Select Time Slot</label>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                          {generateTimeSlots(selectedFacility).map((slot) => (
                            <button
                              key={slot.time}
                              type="button"
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
                              <div className="text-xs opacity-75">
                                {slot.available ? 'Available' : 'Booked'}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {selectedSlot && (
                        <div className="p-4 rounded-lg bg-white/10">
                          <h4 className="text-white font-medium mb-2">Booking Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white/70">Facility:</span>
                              <span className="text-white">{selectedFacility.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Date:</span>
                              <span className="text-white">{selectedDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Time:</span>
                              <span className="text-white">{selectedSlot}:00 - {(parseInt(selectedSlot.split(':')[0]) + 1).toString().padStart(2, '0')}:00</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Guests:</span>
                              <span className="text-white">{bookingForm.guests} people</span>
                            </div>
                            <div className="flex justify-between font-bold border-t border-white/20 pt-2">
                              <span className="text-white">Total Cost:</span>
                              <span className="text-white">{selectedFacility.price}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={!selectedSlot}
                        className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Confirm Booking
                      </Button>
                    </form>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FacilityBookingPage;
