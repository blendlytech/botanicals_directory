import Link from 'next/link';
import { researchedVendors } from '@/lib/researched-vendors';
import styles from '../directory.module.css';

export const metadata = {
  title: 'For Vendors | Claim Your Free Listing | Rare Plant Vendors',
  description: 'Claim your free rare plant business listing, review your details and connect collectors with your official shop.',
};

export default function ForVendorsPage() {
  const example = researchedVendors[0];
  const questions = [
    ['Why is my business already listed?', 'We prepare basic directory entries using public business information. Inclusion does not mean you joined, paid us or endorsed the directory. Source links and research dates appear on our researched profiles.'],
    ['Is claiming my listing free?', 'Yes. No membership purchase or credit card is required to request ownership. After approval, you can manage your business details. Optional paid tools will be offered separately when ready.'],
    ['What does ownership review involve?', 'Sign in by email and explain your connection to the business. We review the request using independently located business channels. Approval is manual; submitting a request does not immediately transfer ownership.'],
    ['Do I need to replace my website or shop?', 'No. Your listing helps collectors understand your specialties and find your existing business. Purchases through your official shop follow your own checkout and policies.'],
    ['Does a listing guarantee inquiries or sales?', 'No. We are in the initial launch and are working with owners to improve the directory. We do not promise a particular number of visitors, inquiries or sales.'],
    ['Can I correct my listing?', 'Include corrections in your ownership-review request. After approval, you can manage the business details. A general correction and removal request service is still being prepared.'],
    ['What if my business is missing?', 'Search by your business name first to avoid a duplicate. New-listing requests are not open in this launch version; we will add that path once the review process is ready.'],
    ['What costs money?', 'The basic directory listing and ownership request are free. Paid profile assistance and event tools are being evaluated. There is no paid checkout on this page.'],
  ];
  return <main className={styles.page}>
    <section className={styles.hero}><div className={styles.wrap}>
      <p className={styles.eyebrow}>For nurseries, growers and plant sellers</p>
      <h1>Give collectors a clearer way to find your plant business.</h1>
      <p>Claim your free Rare Plant Vendors listing and help shoppers understand what you specialize in, where you sell, and how to buy directly from you.</p>
      <div className={styles.actions}><a href="#find-listing" className={styles.primary}>Find my listing</a><a href="#profile-example" className={styles.secondary}>See a profile example</a></div>
      <p className={styles.small}>Free basic listing. No credit card required. Ownership requests are reviewed manually.</p>
    </div></section>
    <section id="find-listing" className={styles.section}><div className={styles.wrap}>
      <h2>Start with your business name.</h2>
      <p>Find your existing listing, open the profile, then request ownership.</p>
      <form action="/vendors" method="get" className={styles.form}><label htmlFor="vendor-lookup">Business name</label><input id="vendor-lookup" name="q" placeholder="Your nursery or shop name" required /><button className={styles.primary} type="submit">Find my listing</button></form>
      <p className={styles.small}>Already managing a listing? <Link href="/login">Sign in to your account.</Link></p>
    </div></section>
    <section id="profile-example" className={styles.section}><div className={styles.wrap}><div className={styles.split}>
      <div><p className={styles.eyebrow}>What collectors will see</p><h2>A useful introduction to your business.</h2>
        <p>Your profile brings the essentials together: your specialties, location, buying options and official website.</p>
        <ul><li>A clear business introduction.</li><li>Specific plant specialties.</li><li>Links to your existing business.</li><li>Practical shipping and visit information.</li><li>A clear explanation of listing ownership status.</li></ul>
      </div>
      <article className={styles.card}><p className={styles.eyebrow}>Real directory example · RPV researched</p><h3>{example.name}</h3><p>Oviedo, Florida</p><p>{example.specialty.join(' · ')}</p><p>{example.summary}</p><Link href={`/vendors/${example.slug}`} className={styles.secondary}>View the full profile</Link><p className={styles.small}>Shown to demonstrate a researched listing. Inclusion here does not imply that the business endorses RPV or this offer.</p></article>
    </div></div></section>
    <section className={styles.section}><div className={styles.wrap}><h2>Three steps to managing your listing.</h2><div className={styles.grid}>
      {[
        ['1. Find your business', 'Search the directory and open your profile. Take a look at the information collectors see.'],
        ['2. Request ownership', 'Sign in by email and explain your connection to the business. Include any details that need correcting.'],
        ['3. Review and share', 'After approval, update your profile and share the link with collectors. Keep buying and visit information current.'],
      ].map(([title,body])=><article key={title} className={styles.card}><h3>{title}</h3><p>{body}</p></article>)}
    </div></div></section>
    <section className={styles.section}><div className={styles.wrap}><div className={styles.note}><h2>Help shape a useful directory for the plant community.</h2><p>Rare Plant Vendors is in its initial launch. We are working with business owners to build accurate profiles and learn which tools help them most. Start with your free listing and tell us what would make it more useful.</p><p className={styles.small}>Profile assistance and event tools are in development. They are separate from free claiming and are not included as available services in this offer.</p></div></div></section>
    <section className={styles.section}><div className={styles.wrap}><h2>Before you claim.</h2><div className={styles.faq}>{questions.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div><div className={styles.actions}><a href="#find-listing" className={styles.primary}>Find my free listing</a><Link href="/vendors" className={styles.secondary}>Browse the directory</Link></div></div></section>
  </main>;
}
