import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/** Browser-side singleton — safe to call in Client Components */
export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey)
