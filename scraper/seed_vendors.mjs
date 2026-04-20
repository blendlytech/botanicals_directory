import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dkdrvfemtyuapzuwyrgt.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZHJ2ZmVtdHl1YXB6dXd5cmd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY5NjA0OSwiZXhwIjoyMDkyMjcyMDQ5fQ.vGR5Of8tSfLmX5dekWGfQQkKRwli88kkfUsoFFy5mJc';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const topVendors = [
  {
    name: 'NSE Tropicals',
    slug: 'nse-tropicals',
    website_url: 'https://www.nsetropicals.com/',
    specialty: ['Rare Aroids', 'Anthuriums', 'Philodendrons'],
    location_city: 'Plantation',
    location_country: 'USA',
    is_verified: true,
    tier_level: 2
  },
  {
    name: 'Ecuagenera',
    slug: 'ecuagenera',
    website_url: 'https://www.ecuagenera.com/',
    specialty: ['Orchids', 'Aroids', 'Imported Rare Plants'],
    location_city: 'Cuenca',
    location_country: 'Ecuador',
    is_verified: true,
    tier_level: 2
  },
  {
    name: 'Carnivero',
    slug: 'carnivero',
    website_url: 'https://www.carnivero.com/',
    specialty: ['Carnivorous Plants', 'Nepenthes', 'Aroids'],
    location_city: 'Austin',
    location_country: 'USA',
    is_verified: true,
    tier_level: 1
  },
  {
    name: "Steve's Leaves",
    slug: 'steves-leaves',
    website_url: 'https://stevesleaves.com/',
    specialty: ['Begonias', 'Aroids', 'Unusual Exotics'],
    location_city: 'Lewisville',
    location_country: 'USA',
    is_verified: true,
    tier_level: 1
  },
  {
    name: "Logee's Greenhouses",
    slug: 'logees',
    website_url: 'https://www.logees.com/',
    specialty: ['Tropical Fruiting Plants', 'Rare Exotics', 'Houseplants'],
    location_city: 'Danielson',
    location_country: 'USA',
    is_verified: true,
    tier_level: 2
  },
  {
    name: 'Gabriella Plants',
    slug: 'gabriella-plants',
    website_url: 'https://www.gabriellaplants.com/',
    specialty: ['Philodendrons', 'Monstera', 'Hoya'],
    location_city: 'Oviedo',
    location_country: 'USA',
    is_verified: true,
    tier_level: 1
  },
  {
    name: 'Bros with Hoes Plant Co.',
    slug: 'bwh-plant-co',
    website_url: 'https://bwhplantco.com/',
    specialty: ['Trending Houseplants', 'Aroids'],
    location_city: 'Orlando',
    location_country: 'USA',
    is_verified: true,
    tier_level: 1
  },
  {
    name: 'Canopy Plant Co.',
    slug: 'canopy-plant-co',
    website_url: 'https://canopyplantco.com/',
    specialty: ['Hoya', 'Aroids', 'Pothos'],
    location_city: 'New Orleans',
    location_country: 'USA',
    is_verified: true,
    tier_level: 0
  },
  {
    name: 'Equatorial Plant Company',
    slug: 'equatorial-plant-co',
    website_url: 'https://www.equatorialplants.com/',
    specialty: ['Rare Orchids', 'Tropical Exotics'],
    location_city: 'Durham',
    location_country: 'UK',
    is_verified: true,
    tier_level: 0
  },
  {
    name: 'Aroid Market',
    slug: 'aroid-market',
    website_url: 'https://aroidmarket.com/',
    specialty: ['Monstera', 'Variegated Aroids'],
    location_city: 'Miami',
    location_country: 'USA',
    is_verified: true,
    tier_level: 2
  }
];

async function seedVendors() {
  console.log('Seeding top tier vendors...');
  
  const { data, error } = await supabase
    .from('vendors')
    .upsert(topVendors, { onConflict: 'slug' })
    .select('id, name');
    
  if (error) {
    console.error('Error inserting vendors:', error.message);
    return;
  }
  
  console.log(`Successfully seeded ${data.length} premium vendors!`);
  
  // Link some of them to the Chelsea Flower Show and IAS Expo
  const { data: events, error: evError } = await supabase
    .from('events')
    .select('id, title');
    
  if (!evError && events && events.length > 0) {
    const iasEvent = events.find(e => e.title.includes('IAS'));
    const chelseaEvent = events.find(e => e.title.includes('Chelsea'));
    
    if (iasEvent && data.length > 0) {
       await supabase.from('event_vendors').upsert([
         { event_id: iasEvent.id, vendor_id: data[0].id, booth_number: 'A1' },
         { event_id: iasEvent.id, vendor_id: data[1].id, booth_number: 'A2' },
         { event_id: iasEvent.id, vendor_id: data[2].id, booth_number: 'B1' },
         { event_id: iasEvent.id, vendor_id: data[3].id, booth_number: 'B2' },
       ]);
       console.log('Linked 4 vendors to IAS Expo.');
    }
    
    if (chelseaEvent && data.length > 4) {
       await supabase.from('event_vendors').upsert([
         { event_id: chelseaEvent.id, vendor_id: data[4].id, booth_number: 'Pavilion 1' },
         { event_id: chelseaEvent.id, vendor_id: data[8].id, booth_number: 'Pavilion 2' },
       ]);
       console.log('Linked 2 vendors to Chelsea Flower Show.');
    }
  }
}

seedVendors().catch(console.error);
