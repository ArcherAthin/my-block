
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Form, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Users, Plus, Edit, Trash2, Search, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

interface Resident {
  id: string;
  resident_number: string;
  name: string;
  email: string;
  unit_number: string;
  phone: string;
  status: string;
  user_id: string;
}

interface BillCategory {
  id: string;
  name: string;
  description: string;
}

const ResidentManagement = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [billCategories, setBillCategories] = useState<BillCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingResident, setIsAddingResident] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [isAddingBill, setIsAddingBill] = useState<string | null>(null);
  const { toast } = useToast();
  
  const form = useForm();
  const billForm = useForm();

  useEffect(() => {
    fetchResidents();
    fetchBillCategories();
  }, []);

  const fetchResidents = async () => {
    const { data, error } = await supabase
      .from('residents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch residents",
        variant: "destructive",
      });
    } else {
      setResidents(data || []);
    }
  };

  const fetchBillCategories = async () => {
    const { data, error } = await supabase
      .from('bill_categories')
      .select('*')
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching bill categories:', error);
    } else {
      setBillCategories(data || []);
    }
  };

  const handleAddResident = async (data: any) => {
    const { error } = await supabase
      .from('residents')
      .insert({
        name: data.name,
        email: data.email,
        unit_number: data.unit_number,
        phone: data.phone,
        status: 'active'
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add resident",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Resident added successfully",
      });
      setIsAddingResident(false);
      form.reset();
      fetchResidents();
    }
  };

  const handleUpdateResident = async (data: any) => {
    if (!editingResident) return;

    const { error } = await supabase
      .from('residents')
      .update({
        name: data.name,
        email: data.email,
        unit_number: data.unit_number,
        phone: data.phone,
        status: data.status
      })
      .eq('id', editingResident.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update resident",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Resident updated successfully",
      });
      setEditingResident(null);
      form.reset();
      fetchResidents();
    }
  };

  const handleAddBill = async (data: any) => {
    if (!isAddingBill) return;

    const { error } = await supabase
      .from('bills')
      .insert([{
        resident_id: isAddingBill,
        category_id: data.category_id,
        amount: parseFloat(data.amount),
        due_date: data.due_date,
        billing_month: data.billing_month,
        status: 'pending'
      }]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add bill",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Bill added successfully",
      });
      setIsAddingBill(null);
      billForm.reset();
    }
  };

  const handleDeleteResident = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resident?')) return;

    const { error } = await supabase
      .from('residents')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete resident",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Resident deleted successfully",
      });
      fetchResidents();
    }
  };

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.resident_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.unit_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Resident Management</h3>
        <Button
          onClick={() => setIsAddingResident(true)}
          className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Resident
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
        <Input
          placeholder="Search residents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
        />
      </div>

      {/* Add Resident Form */}
      {isAddingResident && (
        <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
          <h4 className="text-lg font-bold text-white mb-4">Add New Resident</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddResident)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <Input {...form.register('name', { required: true })} className="bg-white/10 border-white/20 text-white" />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...form.register('email', { required: true })} className="bg-white/10 border-white/20 text-white" />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel className="text-white">Unit Number</FormLabel>
                  <FormControl>
                    <Input {...form.register('unit_number', { required: true })} className="bg-white/10 border-white/20 text-white" />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel className="text-white">Phone</FormLabel>
                  <FormControl>
                    <Input {...form.register('phone')} className="bg-white/10 border-white/20 text-white" />
                  </FormControl>
                </FormItem>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white">
                  Add Resident
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAddingResident(false)} className="border-white/30 text-white hover:bg-white/10">
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      )}

      {/* Residents List */}
      <div className="grid gap-4">
        {filteredResidents.map((resident) => (
          <Card key={resident.id} className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-white font-bold">{resident.name}</h4>
                  <Badge className="bg-blue-500/20 text-blue-300">
                    {resident.resident_number}
                  </Badge>
                  <Badge className={resident.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
                    {resident.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
                  <div>Email: {resident.email}</div>
                  <div>Unit: {resident.unit_number}</div>
                  <div>Phone: {resident.phone || 'N/A'}</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsAddingBill(resident.id)}
                  size="sm"
                  className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                >
                  <DollarSign className="w-4 h-4 mr-1" />
                  Add Bill
                </Button>
                <Button
                  onClick={() => setEditingResident(resident)}
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDeleteResident(resident.id)}
                  size="sm"
                  variant="outline"
                  className="border-red-500/30 text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add Bill Form */}
            {isAddingBill === resident.id && (
              <div className="mt-4 pt-4 border-t border-white/20">
                <h5 className="text-white font-medium mb-3">Add Bill for {resident.name}</h5>
                <Form {...billForm}>
                  <form onSubmit={billForm.handleSubmit(handleAddBill)} className="space-y-3">
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <Select onValueChange={(value) => billForm.setValue('category_id', value)}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {billCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Amount"
                        {...billForm.register('amount', { required: true })}
                        className="bg-white/10 border-white/20 text-white"
                      />
                      <Input
                        type="date"
                        {...billForm.register('due_date', { required: true })}
                        className="bg-white/10 border-white/20 text-white"
                      />
                      <Input
                        type="month"
                        {...billForm.register('billing_month', { required: true })}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm" className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white">
                        Add Bill
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => setIsAddingBill(null)} className="border-white/30 text-white hover:bg-white/10">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResidentManagement;
