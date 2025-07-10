
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Calendar, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Bill {
  id: string;
  amount: number;
  due_date: string;
  billing_month: string;
  status: string;
  bill_categories: {
    name: string;
    description: string;
  };
}

interface BillPaymentProps {
  bills: Bill[];
  onPaymentSuccess: () => void;
}

const BillPayment = ({ bills, onPaymentSuccess }: BillPaymentProps) => {
  const [payingBills, setPayingBills] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handlePayBill = async (billId: string) => {
    setPayingBills(prev => new Set(prev).add(billId));

    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { billId }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        onPaymentSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to create payment session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPayingBills(prev => {
        const newSet = new Set(prev);
        newSet.delete(billId);
        return newSet;
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'overdue': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    }
  };

  if (bills.length === 0) {
    return (
      <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
        <div className="text-center">
          <CreditCard className="w-12 h-12 text-white/60 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Bills Found</h3>
          <p className="text-white/70">You don't have any bills at the moment.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bills.map((bill) => (
        <Card key={bill.id} className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-white font-bold text-lg">{bill.bill_categories.name}</h4>
                <Badge className={getStatusColor(bill.status)}>
                  {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                </Badge>
              </div>
              <p className="text-white/70 text-sm mb-3">{bill.bill_categories.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {new Date(bill.due_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Period: {new Date(bill.billing_month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-white mb-3">
                ${parseFloat(bill.amount.toString()).toFixed(2)}
              </div>
              
              {bill.status === 'pending' && (
                <Button
                  onClick={() => handlePayBill(bill.id)}
                  disabled={payingBills.has(bill.id)}
                  className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105 transition-all duration-300"
                >
                  {payingBills.has(bill.id) ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay Now
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BillPayment;
