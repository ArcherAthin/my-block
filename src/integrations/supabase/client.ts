// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xhcsbhfssuwfunbjcbyw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoY3NiaGZzc3V3ZnVuYmpjYnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDU5NzcsImV4cCI6MjA2NTU4MTk3N30.9K6MAYmYoSSJODrHN6uEhfs-oEW21fVkvcE4USqaGJg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);