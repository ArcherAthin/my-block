
-- Create residents table with unique user ID numbers
CREATE TABLE public.residents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  resident_number TEXT UNIQUE NOT NULL, -- Unique ID number for easy referencing
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  unit_number TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create bill categories table
CREATE TABLE public.bill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- e.g., 'Maintenance', 'Electricity', 'Water', 'Parking'
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create bills table
CREATE TABLE public.bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID REFERENCES public.residents(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.bill_categories(id),
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  billing_month DATE NOT NULL, -- Year-Month for the billing period
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  stripe_payment_intent_id TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create payments table for tracking Stripe transactions
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id UUID REFERENCES public.bills(id) ON DELETE CASCADE,
  resident_id UUID REFERENCES public.residents(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT UNIQUE NOT NULL,
  stripe_session_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL, -- 'pending', 'succeeded', 'failed', 'canceled'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for residents table
CREATE POLICY "Residents can view their own data" ON public.residents
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all residents" ON public.residents
  FOR ALL USING (true);

-- RLS Policies for bill_categories table  
CREATE POLICY "Anyone can view bill categories" ON public.bill_categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage bill categories" ON public.bill_categories
  FOR ALL USING (true);

-- RLS Policies for bills table
CREATE POLICY "Residents can view their own bills" ON public.bills
  FOR SELECT USING (
    resident_id IN (
      SELECT id FROM public.residents WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all bills" ON public.bills
  FOR ALL USING (true);

-- RLS Policies for payments table
CREATE POLICY "Residents can view their own payments" ON public.payments
  FOR SELECT USING (
    resident_id IN (
      SELECT id FROM public.residents WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all payments" ON public.payments
  FOR ALL USING (true);

-- Insert default bill categories
INSERT INTO public.bill_categories (name, description) VALUES
  ('Maintenance', 'Monthly maintenance fees'),
  ('Electricity', 'Electricity bills'),
  ('Water', 'Water and sewage bills'),
  ('Parking', 'Parking fees'),
  ('Security', 'Security service fees');

-- Create function to generate unique resident numbers
CREATE OR REPLACE FUNCTION generate_resident_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  counter INTEGER := 1;
BEGIN
  LOOP
    -- Generate format: RES-YYYY-NNNN (e.g., RES-2024-0001)
    new_number := 'RES-' || EXTRACT(YEAR FROM NOW()) || '-' || LPAD(counter::TEXT, 4, '0');
    
    -- Check if this number already exists
    IF NOT EXISTS (SELECT 1 FROM public.residents WHERE resident_number = new_number) THEN
      RETURN new_number;
    END IF;
    
    counter := counter + 1;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate resident numbers
CREATE OR REPLACE FUNCTION set_resident_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.resident_number IS NULL OR NEW.resident_number = '' THEN
    NEW.resident_number := generate_resident_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_resident_number
  BEFORE INSERT ON public.residents
  FOR EACH ROW
  EXECUTE FUNCTION set_resident_number();
