import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Building, Calendar, Clock } from 'lucide-react';

interface FacilityBookingFormProps {
  residentId?: string;
  onBookingSubmitted?: () => void;
}

const FacilityBookingForm = ({ residentId, onBookingSubmitted }: FacilityBookingFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [booking, setBooking] = useState({
    facilityName: '',
    bookingDate: '',
    startTime: '',
    endTime: '',
    notes: ''
  });

  const facilities = [
    'Swimming Pool',
    'Gym & Fitness Center', 
    'Community Hall',
    'Garden Area',
    'Game Room',
    'Parking Spot',
    'Tennis Court',
    'Children\'s Playground'
  ];

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!residentId) {
      toast({
        title: "Error",
        description: "Resident ID not found. Please login first.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('facility_bookings')
        .insert({
          resident_id: residentId,
          facility_name: booking.facilityName,
          booking_date: booking.bookingDate,
          start_time: booking.startTime,
          end_time: booking.endTime,
          notes: booking.notes,
          status: 'Pending'
        });

      if (error) throw error;

      toast({
        title: "Facility Booking Submitted",
        description: "Your facility booking has been submitted successfully. The admin will review and confirm it shortly.",
      });

      // Reset form
      setBooking({
        facilityName: '',
        bookingDate: '',
        startTime: '',
        endTime: '',
        notes: ''
      });

      onBookingSubmitted?.();
    } catch (error) {
      console.error('Error submitting facility booking:', error);
      toast({
        title: "Error",
        description: "Failed to submit facility booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <Building className="w-6 h-6 text-green-400" />
        <h3 className="text-xl font-bold text-white">Book Facility</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white/70 mb-2">Facility</label>
          <Select value={booking.facilityName} onValueChange={(value) => setBooking({...booking, facilityName: value})}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select facility to book" />
            </SelectTrigger>
            <SelectContent>
              {facilities.map((facility) => (
                <SelectItem key={facility} value={facility}>{facility}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-white/70 mb-2">Booking Date</label>
          <Input
            type="date"
            value={booking.bookingDate}
            onChange={(e) => setBooking({...booking, bookingDate: e.target.value})}
            required
            className="bg-white/10 border-white/20 text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/70 mb-2">Start Time</label>
            <Select value={booking.startTime} onValueChange={(value) => setBooking({...booking, startTime: value})}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Start time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-white/70 mb-2">End Time</label>
            <Select value={booking.endTime} onValueChange={(value) => setBooking({...booking, endTime: value})}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="End time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-white/70 mb-2">Notes (Optional)</label>
          <Textarea
            value={booking.notes}
            onChange={(e) => setBooking({...booking, notes: e.target.value})}
            placeholder="Any special requirements or notes..."
            rows={3}
            className="bg-white/10 border-white/20 text-white placeholder-white/60"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105 transition-all duration-300"
        >
          <Calendar className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
        </Button>
      </form>
    </Card>
  );
};

export default FacilityBookingForm;