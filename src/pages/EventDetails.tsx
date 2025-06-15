
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from '@/components/Navigation';
import FloatingBackground from '@/components/FloatingBackground';
import { ArrowLeft, Calendar, Clock, MapPin, Users, CheckCircle, Mail, Phone } from 'lucide-react';

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hasRSVPed, setHasRSVPed] = useState(false);

  // Mock event data
  const event = {
    id: 1,
    title: "Community Festival Celebration",
    description: "Join us for our annual community festival featuring live music, food stalls, cultural performances, and fun activities for all ages. This is a great opportunity to meet your neighbors and celebrate our vibrant community spirit.",
    date: "2024-02-20",
    time: "6:00 PM - 10:00 PM",
    location: "Community Garden Area",
    organizer: "Cultural Committee",
    maxAttendees: 200,
    currentAttendees: 87,
    category: "Community Event",
    highlights: [
      "Live Music Performance",
      "Traditional Food Stalls", 
      "Cultural Dance Show",
      "Kids Play Area",
      "Community Awards",
      "Photography Contest"
    ],
    schedule: [
      { time: "6:00 PM", activity: "Opening Ceremony & Welcome" },
      { time: "6:30 PM", activity: "Cultural Dance Performance" },
      { time: "7:00 PM", activity: "Food Stalls Open" },
      { time: "7:30 PM", activity: "Live Music Concert" },
      { time: "8:30 PM", activity: "Community Awards Ceremony" },
      { time: "9:00 PM", activity: "Photography Contest Results" },
      { time: "9:30 PM", activity: "Closing & Community Song" }
    ],
    requirements: [
      "Family-friendly event",
      "Outside food not allowed",
      "Parking available in designated areas",
      "Please bring your own water bottles"
    ],
    contact: {
      name: "Sarah Wilson",
      phone: "+91 98765-55555",
      email: "cultural.committee@myblock.com"
    }
  };

  const handleRSVP = () => {
    setHasRSVPed(true);
    alert(`Thank you for your RSVP! We've registered you for "${event.title}". You'll receive a confirmation email shortly.`);
  };

  const spotsLeft = event.maxAttendees - event.currentAttendees;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingBackground />
      
      <div className="relative z-10">
        <Navigation />
        
        <main className="pt-24 pb-12 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                size="icon"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-white">Community Event</h1>
                <p className="text-white/70">Join your neighbors for this special occasion</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Event Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{event.title}</h2>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {event.category}
                      </Badge>
                    </div>
                    {hasRSVPed && (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        RSVP'd
                      </Badge>
                    )}
                  </div>

                  <p className="text-white/70 leading-relaxed mb-6">{event.description}</p>

                  {/* Event Highlights */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Event Highlights</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {event.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-white/80">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!hasRSVPed && spotsLeft > 0 && (
                    <Button
                      onClick={handleRSVP}
                      className="w-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white hover:scale-105 transition-all duration-300"
                    >
                      RSVP for Event
                    </Button>
                  )}

                  {hasRSVPed && (
                    <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-300" />
                        <p className="text-green-300 font-medium">You're registered for this event!</p>
                      </div>
                      <p className="text-green-300/80 text-sm mt-1">We'll send you a reminder closer to the date.</p>
                    </div>
                  )}

                  {spotsLeft <= 0 && !hasRSVPed && (
                    <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30">
                      <p className="text-red-300 font-medium">Event is fully booked</p>
                      <p className="text-red-300/80 text-sm">Join the waitlist to be notified if spots open up.</p>
                    </div>
                  )}
                </Card>

                {/* Event Schedule */}
                <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Event Schedule</h3>
                  <div className="space-y-4">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-white/10">
                        <div className="w-20 text-white/70 text-sm font-medium">{item.time}</div>
                        <div className="flex-1 text-white">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Requirements */}
                <Card className="p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Important Information</h3>
                  <div className="space-y-2">
                    {event.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-white/60 mt-1">•</span>
                        <span className="text-white/80">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h4 className="text-lg font-bold text-white mb-4">Event Details</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-white/70 text-sm">Date</p>
                        <p className="text-white font-medium">{event.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-white/70 text-sm">Time</p>
                        <p className="text-white font-medium">{event.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-white/70 text-sm">Location</p>
                        <p className="text-white font-medium">{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-white/60 mt-0.5" />
                      <div>
                        <p className="text-white/70 text-sm">Attendance</p>
                        <p className="text-white font-medium">{event.currentAttendees}/{event.maxAttendees}</p>
                        <p className="text-white/60 text-xs">{spotsLeft} spots left</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h4 className="text-lg font-bold text-white mb-4">Contact Organizer</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white font-medium">{event.contact.name}</p>
                      <p className="text-white/70 text-sm">{event.organizer}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <a
                        href={`tel:${event.contact.phone}`}
                        className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{event.contact.phone}</span>
                      </a>
                      
                      <a
                        href={`mailto:${event.contact.email}`}
                        className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{event.contact.email}</span>
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h4 className="text-lg font-bold text-white mb-4">Community Guidelines</h4>
                  <div className="space-y-2 text-white/70 text-sm">
                    <p>• Be respectful to all attendees</p>
                    <p>• Follow community rules</p>
                    <p>• Keep the venue clean</p>
                    <p>• Report any issues to organizers</p>
                    <p>• Have fun and enjoy!</p>
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

export default EventDetails;
