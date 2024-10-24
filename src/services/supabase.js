import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://asqicexanjcnosphdsrw.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzcWljZXhhbmpjbm9zcGhkc3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzODE3ODIsImV4cCI6MjA0MDk1Nzc4Mn0.dcwglQ26v0DRCvHh5AaSH36k9uoSzqLEHIp5s-U0I4g';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
