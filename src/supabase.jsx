// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// URL de tu proyecto y la clave pública (anon key)
const supabaseUrl = 'https://rbpjrfdsspebeqetpdkh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicGpyZmRzc3BlYmVxZXRwZGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NDEyNTMsImV4cCI6MjA2MjExNzI1M30.rt536s4Bk8j8Bx6PprzOhfifbwwm3r25-UE7GKQEkBM';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
