import { createClient } from '@supabase/supabase-js'

// Import from .env file use [process.env.NAME]
// To import from .env using vite, use [import.meta.env.NAME]

const supabaseURL = import.meta.env.VITE_REACT_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_REACT_SUPABASE_ANON_KEY

const supabase = createClient(supabaseURL, supabaseAnonKey)

export default supabase