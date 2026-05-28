import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase Admin environment variables are missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createVendor() {
  const email = 'test.blendlytech@rareplantvendors.com';
  const password = 'TestPassword123!';
  const businessName = 'Blendly Tech Botanticals';
  
  console.log(`Creating user with email ${email}...`);
  
  // Create user
  const { data: userAuth, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      business_name: businessName,
      role: 'vendor'
    }
  });

  if (authError) {
    if (authError.message.includes('already registered')) {
        console.log('User already exists. Fetching user...');
    } else {
        console.error('Error creating user:', authError);
        return;
    }
  }

  const { data: usersData } = await supabase.auth.admin.listUsers();
  const user = usersData?.users.find(u => u.email === email);
  
  if (!user) {
      console.error('Could not find user after creation');
      return;
  }
  
  const userId = user.id;
  console.log(`User ID: ${userId}`);

  // Create vendor profile
  const slug = 'blendly-tech-botanticals-elite';
  console.log(`Creating vendor profile with slug ${slug}...`);
  
  const { data: newVendor, error: vendorError } = await supabase
    .from('vendors')
    .upsert({
      user_id: userId,
      name: businessName,
      slug: slug,
      owner_name: 'Test Owner',
      contact_email: email,
      tier: 'elite',
      account_tier: 'elite',
      subscription_status: 'active',
      is_elite: true,
      is_verified: true,
      bio: 'Premium verified elite vendor for testing the backend.',
      website_url: 'https://blendlytech.com',
    }, { onConflict: 'contact_email' })
    .select()
    .single();

  if (vendorError) {
    console.error('Error creating vendor:', vendorError);
    return;
  }

  console.log('Successfully created Elite Vendor!');
  console.log(newVendor);
  console.log('--- CREDENTIALS ---');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
}

createVendor();
