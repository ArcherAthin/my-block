-- Create complaints table
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID REFERENCES public.residents(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'In Review', 'Resolved')),
  priority TEXT DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create facility_bookings table
CREATE TABLE public.facility_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID REFERENCES public.residents(id) ON DELETE CASCADE,
  facility_name TEXT NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create service_bookings table  
CREATE TABLE public.service_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID REFERENCES public.residents(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  service_provider TEXT,
  booking_date DATE NOT NULL,
  preferred_time TEXT,
  status TEXT DEFAULT 'Requested' CHECK (status IN ('Requested', 'Confirmed', 'In Progress', 'Completed', 'Cancelled')),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facility_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for complaints
CREATE POLICY "Residents can view their own complaints" ON public.complaints
  FOR SELECT USING (resident_id IN (SELECT id FROM public.residents WHERE user_id = auth.uid()));

CREATE POLICY "Residents can create their own complaints" ON public.complaints
  FOR INSERT WITH CHECK (resident_id IN (SELECT id FROM public.residents WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all complaints" ON public.complaints
  FOR ALL USING (true);

-- RLS Policies for facility_bookings
CREATE POLICY "Residents can view their own facility bookings" ON public.facility_bookings
  FOR SELECT USING (resident_id IN (SELECT id FROM public.residents WHERE user_id = auth.uid()));

CREATE POLICY "Residents can create their own facility bookings" ON public.facility_bookings
  FOR INSERT WITH CHECK (resident_id IN (SELECT id FROM public.residents WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all facility bookings" ON public.facility_bookings
  FOR ALL USING (true);

-- RLS Policies for service_bookings
CREATE POLICY "Residents can view their own service bookings" ON public.service_bookings
  FOR SELECT USING (resident_id IN (SELECT id FROM public.residents WHERE user_id = auth.uid()));

CREATE POLICY "Residents can create their own service bookings" ON public.service_bookings
  FOR INSERT WITH CHECK (resident_id IN (SELECT id FROM public.residents WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all service bookings" ON public.service_bookings
  FOR ALL USING (true);

-- Enable real-time for all tables
ALTER TABLE public.complaints REPLICA IDENTITY FULL;
ALTER TABLE public.facility_bookings REPLICA IDENTITY FULL;
ALTER TABLE public.service_bookings REPLICA IDENTITY FULL;
ALTER TABLE public.bills REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.complaints;
ALTER PUBLICATION supabase_realtime ADD TABLE public.facility_bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bills;