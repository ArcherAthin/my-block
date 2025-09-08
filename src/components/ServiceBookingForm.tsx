import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Wrench, Calendar } from 'lucide-react';

interface ServiceBookingFormProps {
  residentId?: string;
  onBookingSubmitted?: () => void;
}

const ServiceBookingForm = ({ residentId, onBookingSubmitted }: ServiceBookingFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [booking, setBooking] = useState({
    serviceType: '',
    serviceProvider: '',
    bookingDate: '',
    preferredTime: '',
    description: ''
  });

  const serviceTypes = [
    'Plumbing',
    'Electrical',
    'Cleaning',
    'Maintenance',
    'Painting',
    'Pest Control',
    'Appliance Repair',
    'Other'
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
        .from('service_bookings')
        .insert({
          resident_id: residentId,
          service_type: booking.serviceType,
          service_provider: booking.serviceProvider || null,
          booking_date: booking.bookingDate,
          preferred_time: booking.preferredTime,
          description: booking.description,
          status: 'Requested'
        });

      if (error) throw error;

      toast({
        title: "Service Booking Submitted",
        description: "Your service booking has been submitted successfully. The admin will review and confirm it shortly.",
      });

      // Reset form
      setBooking({
        serviceType: '',
        serviceProvider: '',
        bookingDate: '',
        preferredTime: '',
        description: ''
      });

      onBookingSubmitted?.();
    } catch (error) {
      console.error('Error submitting service booking:', error);
      toast({
        title: "Error",
        description: "Failed to submit service booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <Wrench className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Request Service</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white/70 mb-2">Service Type</label>
          <Select value={booking.serviceType} onValueChange={(value) => setBooking({...booking, serviceType: value})}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-white/70 mb-2">Preferred Service Provider (Optional)</label>
          <Input
            value={booking.serviceProvider}
            onChange={(e) => setBooking({...booking, serviceProvider: e.target.value})}
            placeholder="Enter preferred provider name"
            className="bg-white/10 border-white/20 text-white placeholder-white/60"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/70 mb-2">Preferred Date</label>
            <Input
              type="date"
              value={booking.bookingDate}
              onChange={(e) => setBooking({...booking, bookingDate: e.target.value})}
              required
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <label className="block text-white/70 mb-2">Preferred Time</label>
            <Input
              value={booking.preferredTime}
              onChange={(e) => setBooking({...booking, preferredTime: e.target.value})}
              placeholder="e.g., 10:00 AM - 2:00 PM"
              className="bg-white/10 border-white/20 text-white placeholder-white/60"
            />
          </div>
        </div>

        <div>
          <label className="block text-white/70 mb-2">Service Description</label>
          <Textarea
            value={booking.description}
            onChange={(e) => setBooking({...booking, description: e.target.value})}
            placeholder="Describe the service you need..."
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
          {isSubmitting ? 'Submitting...' : 'Submit Service Request'}
        </Button>
      </form>
    </Card>
  );
};

export default ServiceBookingForm;