import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllColumns() {
  const tables = ['vendors', 'inventory', 'digital_passports', 'events', 'wishlists', 'wishlist_matches', 'analytics_events'];
  for (const table of tables) {
    const { data, selectError, count } = await supabase.from(table).select('*', { count: 'exact', head: true });
    console.log(`\nTable: ${table}`);
    if (selectError) {
      console.log('Error:', selectError.message);
    } else {
      console.log('Count:', count);
      // To get columns, we need at least one row or use rpc
      const { data: rowData } = await supabase.from(table).select('*').limit(1);
      if (rowData && rowData.length > 0) {
        console.log('Columns:', Object.keys(rowData[0]));
      } else {
        console.log('Table is empty (no columns shown).');
      }
    }
  }
}

checkAllColumns();
