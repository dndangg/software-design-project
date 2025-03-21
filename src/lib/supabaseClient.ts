import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Create a file in the root directory named .env.local and add the following to it:
// NEXT_PUBLIC_SUPABASE_URL=the url under Project URL
// NEXT_PUBLIC_SUPABASE_ANON_KEY=the anon public key
// You can find these in the Project Settings -> Data API pages in Supabase