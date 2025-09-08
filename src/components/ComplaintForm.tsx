import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, FileText } from 'lucide-react';

interface ComplaintFormProps {
  residentId?: string;
  onComplaintSubmitted?: () => void;
}

const ComplaintForm = ({ residentId, onComplaintSubmitted }: ComplaintFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complaint, setComplaint] = useState({
    subject: '',
    description: '',
    priority: 'Medium'
  });

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
        .from('complaints')
        .insert({
          resident_id: residentId,
          subject: complaint.subject,
          description: complaint.description,
          priority: complaint.priority,
          status: 'Open'
        });

      if (error) throw error;

      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been submitted successfully. The admin will review it shortly.",
      });

      // Reset form
      setComplaint({
        subject: '',
        description: '',
        priority: 'Medium'
      });

      onComplaintSubmitted?.();
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast({
        title: "Error",
        description: "Failed to submit complaint. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <AlertCircle className="w-6 h-6 text-red-400" />
        <h3 className="text-xl font-bold text-white">Submit Complaint</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white/70 mb-2">Subject</label>
          <Input
            value={complaint.subject}
            onChange={(e) => setComplaint({...complaint, subject: e.target.value})}
            placeholder="Brief description of the issue"
            required
            className="bg-white/10 border-white/20 text-white placeholder-white/60"
          />
        </div>

        <div>
          <label className="block text-white/70 mb-2">Priority</label>
          <Select value={complaint.priority} onValueChange={(value) => setComplaint({...complaint, priority: value})}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-white/70 mb-2">Description</label>
          <Textarea
            value={complaint.description}
            onChange={(e) => setComplaint({...complaint, description: e.target.value})}
            placeholder="Detailed description of the issue..."
            rows={4}
            className="bg-white/10 border-white/20 text-white placeholder-white/60"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#ff6ec4] to-[#7873f5] text-white hover:scale-105 transition-all duration-300"
        >
          <FileText className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
        </Button>
      </form>
    </Card>
  );
};

export default ComplaintForm;