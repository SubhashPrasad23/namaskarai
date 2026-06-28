// This file is kept for backward compatibility but now points to server-only env vars.
// For server components, prefer importing from @/lib/supabase/server directly.
// For client components, use API routes (/api/*) instead of calling Supabase directly.

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);
