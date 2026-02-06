import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vbobniyseniudzefugzq.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error(
    "VITE_SUPABASE_KEY not found in the environment variables. did you create the .env file?",
  );
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
