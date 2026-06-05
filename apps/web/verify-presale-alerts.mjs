import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const { error } = await supabase.from('events').select('presale_alert_sent_at').limit(1);
console.log(error ? `❌ events.presale_alert_sent_at — ${error.message}` : '✅ events.presale_alert_sent_at exists');
process.exit(0);
