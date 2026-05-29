import { createClient } from '@supabase/supabase-js';

let _adminClient: ReturnType<typeof createClient> | null = null;

const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase Admin environment variables are missing');
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

/**
 * 🛠️ Supabase Admin Client
 * Use this ONLY for server-side operations that require bypassing RLS.
 * Never use this in client components or for public read operations 
 * that could be handled by the anon key.
 */
export const supabaseAdmin = new Proxy({} as any, {
  get(target, prop) {
    if (!_adminClient) {
      _adminClient = getSupabaseAdmin();
    }
    return (_adminClient as any)[prop];
  }
}) as ReturnType<typeof createClient>;
