import { createClient } from '@rpv/supabase/server';
import PassportClient from './PassportClient';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('digital_passports')
    .select('specimen_name')
    .eq('id', id)
    .single();
  return {
    title: data?.specimen_name ? `${data.specimen_name} — CultivarID Passport` : 'Digital Plant Passport — CultivarID',
    description: 'Scan verified. View the complete botanical provenance and care guide for this rare plant specimen.',
  };
}

export default async function PassportPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: passport, error } = await supabase
    .from('digital_passports')
    .select('*, inventory(*), vendor:vendors(name, slug, logo_url, bio)')
    .eq('id', id)
    .single();

  if (error || !passport) notFound();

  return <PassportClient passport={passport} />;
}
