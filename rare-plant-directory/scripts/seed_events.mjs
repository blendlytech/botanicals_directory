// scripts/seed_events.mjs
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const eventsData = JSON.parse(fs.readFileSync('src/data/events.json', 'utf8'));

async function seedEvents() {
  console.log(`🚀 Seeding ${eventsData.length} events...`);

  const { data, error } = await supabase
    .from('events')
    .upsert(eventsData, { onConflict: 'title' })
    .select();

  if (error) {
    console.error('❌ Error seeding events:', error.message);
  } else {
    console.log(`✅ Successfully seeded ${data.length} events!`);
  }
}

seedEvents().catch(console.error);
