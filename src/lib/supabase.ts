import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase connection
const supabaseUrl = 'https://ojknsrftpdhuusnaocqj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qa25zcmZ0cGRodXVzbmFvY3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNDA5NzEsImV4cCI6MjA0OTYxNjk3MX0.R17lHk75lC7-waiy2xkBCNM7e4RsIvHIPdPi-X6bebg';

// Create Supabase client without auto-schema updates
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
});