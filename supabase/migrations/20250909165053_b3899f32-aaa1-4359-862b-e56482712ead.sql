-- Create update_updated_at_column function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create scheduled_visits table for visitor management
CREATE TABLE public.scheduled_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_name TEXT NOT NULL,
  resident_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  purpose TEXT NOT NULL,
  visit_date DATE NOT NULL,
  visit_time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'used', 'expired')),
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.scheduled_visits ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Everyone can view scheduled visits" ON public.scheduled_visits
  FOR SELECT USING (true);

CREATE POLICY "Everyone can create scheduled visits" ON public.scheduled_visits
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Everyone can update scheduled visits" ON public.scheduled_visits
  FOR UPDATE USING (true);

-- Enable real-time
ALTER TABLE public.scheduled_visits REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.scheduled_visits;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_scheduled_visits_updated_at
BEFORE UPDATE ON public.scheduled_visits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();