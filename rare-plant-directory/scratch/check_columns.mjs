import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
  const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'vendors' });
  if (error) {
    // If RPC doesn't exist, try a simple select
    const { data: selectData, error: selectError } = await supabase.from('vendors').select('*').limit(1);
    if (selectError) {
      console.error('Error fetching columns:', selectError);
    } else {
      console.log('Columns:', Object.keys(selectData[0] || {}));
    }
  } else {
    console.log('Columns (via RPC):', data);
  }
}

checkColumns();
