import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '../rare-plant-directory/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadVideo() {
  const videoPath = 'c:/Users/DELL/RPV Project/rare-plant-directory/public/rpv-explainer.mp4';
  const fileBuffer = fs.readFileSync(videoPath);

  console.log('Uploading video...');
  
  // First, ensure bucket exists or just try to upload to 'marketing' bucket
  const { data: bucketData, error: bucketError } = await supabase.storage.getBucket('marketing');
  
  if (bucketError && bucketError.message.includes('not found')) {
    console.log('Creating marketing bucket...');
    await supabase.storage.createBucket('marketing', { public: true });
  }

  const { data, error } = await supabase.storage
    .from('marketing')
    .upload('rpv-explainer-detroit.mp4', fileBuffer, {
      contentType: 'video/mp4',
      upsert: true
    });

  if (error) {
    console.error('Upload error:', error);
  } else {
    console.log('Upload successful:', data);
    const { data: { publicUrl } } = supabase.storage
      .from('marketing')
      .getPublicUrl('rpv-explainer-detroit.mp4');
    console.log('Public URL:', publicUrl);
  }
}

uploadVideo();
