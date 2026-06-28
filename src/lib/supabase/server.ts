import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client — keys are NOT exposed to the browser
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);
