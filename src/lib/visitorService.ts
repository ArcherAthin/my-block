
import { supabase } from '@/integrations/supabase/client';

export interface VisitorData {
  id?: string;
  visitorName: string;
  residentName: string;
  phone: string;
  purpose: string;
  visitDate: string;
  visitTime: string;
  status: 'pending' | 'approved' | 'used' | 'expired';
  createdAt: string;
  usedAt?: string;
}

export const createVisitor = async (visitorData: Omit<VisitorData, 'id' | 'createdAt' | 'status'>) => {
  try {
    const { data, error } = await supabase
      .from('scheduled_visits')
      .insert({
        visitor_name: visitorData.visitorName,
        resident_name: visitorData.residentName,
        phone: visitorData.phone,
        purpose: visitorData.purpose,
        visit_date: visitorData.visitDate,
        visit_time: visitorData.visitTime,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating visitor:', error);
      return { success: false, error };
    }

    return { success: true, id: data.id };
  } catch (error) {
    console.error('Error creating visitor:', error);
    return { success: false, error };
  }
};

export const updateVisitorStatus = async (id: string, status: VisitorData['status'], usedAt?: string) => {
  try {
    const updateData: any = { status };
    if (usedAt) updateData.used_at = usedAt;
    
    const { error } = await supabase
      .from('scheduled_visits')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating visitor status:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating visitor status:', error);
    return { success: false, error };
  }
};

export const subscribeToVisitors = (
  callback: (visitors: VisitorData[]) => void,
  filterDate?: string
) => {
  let query = supabase
    .from('scheduled_visits')
    .select('*')
    .order('created_at', { ascending: false });

  if (filterDate) {
    query = query.eq('visit_date', filterDate);
  }

  const subscription = query.subscribe((payload) => {
    if (payload.eventType === 'SELECT' && payload.new) {
      const visitors = payload.new.map((row: any) => ({
        id: row.id,
        visitorName: row.visitor_name,
        residentName: row.resident_name,
        phone: row.phone,
        purpose: row.purpose,
        visitDate: row.visit_date,
        visitTime: row.visit_time,
        status: row.status,
        createdAt: row.created_at,
        usedAt: row.used_at
      } as VisitorData));
      callback(visitors);
    }
  });

  // Initial fetch
  query.then(({ data, error }) => {
    if (!error && data) {
      const visitors = data.map((row: any) => ({
        id: row.id,
        visitorName: row.visitor_name,
        residentName: row.resident_name,
        phone: row.phone,
        purpose: row.purpose,
        visitDate: row.visit_date,
        visitTime: row.visit_time,
        status: row.status,
        createdAt: row.created_at,
        usedAt: row.used_at
      } as VisitorData));
      callback(visitors);
    }
  });

  return () => {
    subscription.unsubscribe();
  };
};
