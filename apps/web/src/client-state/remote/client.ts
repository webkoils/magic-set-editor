import { createClient } from '@supabase/supabase-js';
import type { Database } from '@mse/types';

// Create a single supabase client for interacting with your database
const client = createClient<Database>(
  'https://tyrtdbfzhhbnypdfwkqr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cnRkYmZ6aGhibnlwZGZ3a3FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc2Nzg2MzEsImV4cCI6MTk4MzI1NDYzMX0.Tv8PRIiDYMFYxif-N77DXLV8BZD2-69FvXKrZPFJI6A'
);
export { client };
