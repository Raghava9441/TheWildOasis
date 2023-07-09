import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://vqmovpgnbibqcvgjdgtw.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxbW92cGduYmlicWN2Z2pkZ3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg0NjkwMTMsImV4cCI6MjAwNDA0NTAxM30.vE1TsrIlR2Pa_E19ct6obKKcs1vnklIdLwRwXdPeaw0"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase