-- Update RLS policies to allow insertion without strict auth requirements

-- Drop existing restrictive INSERT policies for complaints
DROP POLICY IF EXISTS "Residents can create their own complaints" ON complaints;

-- Create more permissive INSERT policy for complaints
CREATE POLICY "Allow complaint creation"
ON complaints
FOR INSERT
WITH CHECK (true);

-- Drop existing restrictive INSERT policies for facility_bookings  
DROP POLICY IF EXISTS "Residents can create their own facility bookings" ON facility_bookings;

-- Create more permissive INSERT policy for facility_bookings
CREATE POLICY "Allow facility booking creation"
ON facility_bookings
FOR INSERT
WITH CHECK (true);

-- Drop existing restrictive INSERT policies for service_bookings
DROP POLICY IF EXISTS "Residents can create their own service bookings" ON service_bookings;

-- Create more permissive INSERT policy for service_bookings
CREATE POLICY "Allow service booking creation"
ON service_bookings
FOR INSERT
WITH CHECK (true);