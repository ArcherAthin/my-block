
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Clock, Users, Waves, Dumbbell, GamepadIcon, TreePine, Car, Building, CheckCircle } from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const FacilityBooking = () => {
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({
    residentName: '',
    phone: '',
    guests: 1,
    purpose: ''
  });

  // State to track booked slots and facility availability
  const [bookedSlots, setBookedSlots] = useState<any>({
    'swimming-pool': ['11:00', '14:00', '18:00'],
    'gym': ['09:00', '11:00', '17:00', '19:00'],
    'game-room': ['14:00', '16:00', '20:00'],
    'garden': ['10:00', '18:00'],
    'community-hall': ['15:00', '19:00'],
    'parking': ['09:00', '12:00', '15:00']
  });

  const [facilities, setFacilities] = useState([
    {
      id: 'swimming-pool',
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
      id: 'gym',
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
      id: 'game-room',
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
      id: 'garden',
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
      id: 'parking',
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
      id: 'community-hall',
      name: "Community Hall",
      icon: Building,
      capacity: "200 people",
      price: "$100/hour",
      available: 2,
      total: 4,
      color: "from-[#ec4899] to-[#db2777]",
      amenities: ["Stage", "Audio/Video", "Kitchen"]
    }
  ]);

  const timeSlots = [
    { time: "09:00", price: 25 },
    { time: "10:00", price: 25 },
    { time: "11:00", price: 25 },
    { time: "12:00", price: 30 },
    { time: "13:00", price: 30 },
    { time: "14:00", price: 30 },
    { time: "15:00", price: 35 },
    { time: "16:00", price: 35 },
    { time: "17:00", price: 35 },
    { time: "18:00", price: 40 },
    { time: "19:00", price: 40 },
    { time: "20:00", price: 40 }
  ];

  const handleFacilitySelect = (facility: any) => {
    setSelectedFacility(facility);
    setSelectedSlot(null);
    setBookingForm({
      residentName: '',
      phone: '',
      guests: 1,
      purpose: ''
    });
  };

  const handleBookingConfirm = () => {
    if (!selectedSlot || !selectedDate || !bookingForm.residentName || !bookingForm.phone) {
      alert('Please fill in all required fields and select a time slot');
      return;
    }

    // Update booked slots
    const newBookedSlots = { ...bookedSlots };
    if (!newBookedSlots[selectedFacility.id]) {
      newBookedSlots[selectedFacility.id] = [];
    }
    newBookedSlots[selectedFacility.id].push(selectedSlot);
    setBookedSlots(newBookedSlots);

    // Update facility availability
    const updatedFacilities = facilities.map(facility => {
      if (facility.id === selectedFacility.id) {
        return { ...facility, available: facility.available - 1 };
      }
      return facility;
    });
    setFacilities(updatedFacilities);

    const bookingId = 'BK' + Math.random().toString(36).substr(2, 8).toUpperCase();
    
    alert(`🎉 Booking Confirmed Successfully!

Booking ID: ${bookingId}
Facility: ${selectedFacility.name}
Date: ${format(selectedDate, 'PPP')}
Time: ${selectedSlot}:00
Guest Name: ${bookingForm.residentName}
Phone: ${bookingForm.phone}
Guests: ${bookingForm.guests}
Total Cost: ${selectedFacility.price}

You will receive a confirmation email shortly. Thank you for using My Block!`);

    // Reset form
    setSelectedFacility(null);
    setSelectedSlot(null);
    setSelectedDate(new Date());
    setBookingForm({
      residentName: '',
      phone: '',
      guests: 1,
      purpose: ''
    });
  };

  const isSlotBooked = (slot: string) => {
    if (!selectedFacility || !selectedDate) return false;
    return bookedSlots[selectedFacility.id]?.includes(slot) || false;
  };

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

        {!selectedFacility ? (
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
                        onClick={() => handleFacilitySelect(facility)}
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

            {/* Info Panel */}
            <div className="space-y-6">
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">How to Book</h3>
                  <div className="space-y-3 text-sm text-white/70">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <span>Select your preferred facility from the available options</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <span>Choose your booking date and time slot</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <span>Fill in your details and confirm booking</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                      <span>Receive instant confirmation and access details</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button
                onClick={() => setSelectedFacility(null)}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                ← Back to Facilities
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Facility Details */}
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
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
                </div>
              </Card>

              {/* Booking Form */}
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Book {selectedFacility.name}</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 mb-2">Name *</label>
                      <Input
                        value={bookingForm.residentName}
                        onChange={(e) => setBookingForm({...bookingForm, residentName: e.target.value})}
                        placeholder="Your full name"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-white/60"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2">Phone *</label>
                      <Input
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                        placeholder="Contact number"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-white/60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 mb-2">Date *</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
                              !selectedDate && "text-white/60"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2">Guests</label>
                      <Input
                        type="number"
                        value={bookingForm.guests}
                        onChange={(e) => setBookingForm({...bookingForm, guests: parseInt(e.target.value)})}
                        min="1"
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
                    <label className="block text-white/70 mb-4">Select Time Slot *</label>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((slot) => {
                        const isBooked = isSlotBooked(slot.time);
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            className={`p-3 rounded-lg text-sm transition-all duration-200 ${
                              isBooked 
                                ? 'bg-red-500/20 text-red-300 cursor-not-allowed' 
                                : selectedSlot === slot.time
                                ? 'bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                            disabled={isBooked}
                            onClick={() => setSelectedSlot(slot.time)}
                          >
                            <div className="font-medium">{slot.time}</div>
                            <div className="text-xs opacity-75">
                              {isBooked ? 'Booked' : `$${slot.price}`}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedSlot && selectedDate && (
                    <div className="p-4 rounded-lg bg-white/10">
                      <h4 className="text-white font-medium mb-2">Booking Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Facility:</span>
                          <span className="text-white">{selectedFacility.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Date:</span>
                          <span className="text-white">{format(selectedDate, 'PPP')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Time:</span>
                          <span className="text-white">{selectedSlot}:00</span>
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
                    onClick={handleBookingConfirm}
                    disabled={!selectedSlot || !selectedDate || !bookingForm.residentName || !bookingForm.phone}
                    className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FacilityBooking;
