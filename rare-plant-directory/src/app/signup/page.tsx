import { redirect } from 'next/navigation';

export default function SignupPage() {
  // Vendors should sign up via the onboarding flow to pick a tier and pay
  redirect('/for-vendors');
}
