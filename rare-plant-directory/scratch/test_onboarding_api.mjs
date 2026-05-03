// Using built-in fetch

async function testOnboarding() {
  const payload = {
    tier: 'seedling',
    businessName: 'Debug Vendor ' + Date.now(),
    email: 'debug-' + Date.now() + '@example.com',
    password: 'Password123!',
    specialties: ['Aroids']
  };

  console.log('Sending request to /api/onboarding...');
  try {
    const res = await fetch('http://localhost:3001/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Data:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testOnboarding();
