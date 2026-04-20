// test_elite_automation.mjs
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testEliteAutomation() {
  console.log("🚀 Testing Elite 100 Automation...");

  // 1. Create a dummy vendor
  const { data: vendor, error: createError } = await supabase
    .from('vendors')
    .insert([{
      name: "Test Botanical Co.",
      slug: `test-botanical-${Date.now()}`,
      tier: 'seedling'
    }])
    .select()
    .single();

  if (createError) {
    console.error("❌ Failed to create test vendor:", createError);
    return;
  }

  console.log(`✅ Created test vendor: ${vendor.name} (ID: ${vendor.id})`);
  console.log(`📊 Initial Fee Rate: ${vendor.transaction_fee_rate}`);

  // 2. Simulate Elite Upgrade (Triggered by Payment)
  console.log("💳 Simulating successful $999 payment...");
  
  const { data: updatedVendor, error: updateError } = await supabase
    .from('vendors')
    .update({ tier: 'elite', is_elite: true })
    .eq('id', vendor.id)
    .select()
    .single();

  if (updateError) {
    console.error("❌ Failed to upgrade vendor:", updateError);
    return;
  }

  console.log(`🏆 Upgraded to Elite!`);
  console.log(`📊 New Fee Rate: ${updatedVendor.transaction_fee_rate}`);

  if (parseFloat(updatedVendor.transaction_fee_rate) === 0.00) {
    console.log("✅ SUCCESS: Transaction fee correctly set to 0% via Database Trigger.");
  } else {
    console.log("❌ FAILURE: Transaction fee did not update correctly.");
  }

  // 3. Cleanup
  await supabase.from('vendors').delete().eq('id', vendor.id);
  console.log("🧹 Cleanup complete.");
}

testEliteAutomation();
