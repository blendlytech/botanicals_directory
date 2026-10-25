import Link from "next/link";
import type { ResearchedVendor } from "@/lib/researched-vendors";
import styles from "./ResearchedVendorProfile.module.css";

export default function ResearchedVendorProfile({ profile: p, managed }: { profile: ResearchedVendor; managed: boolean }) {
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <Link href="/vendors" className={styles.back}>← Browse the directory</Link>
        <header className={styles.hero}>
          <div className={styles.monogram} aria-hidden="true">{p.name.split(" ").slice(0, 2).map(s => s[0]).join("")}</div>
          <div>
            <p className={styles.eyebrow}>Independent directory listing</p>
            <h1>{p.name}</h1>
            <p className={styles.location}>{[p.city, p.state === "FL" ? "Florida" : p.state].filter(Boolean).join(", ")} · United States</p>
            <div className={styles.tags}>{p.specialty.map(s => <span key={s}>{s}</span>)}</div>
          </div>
        </header>
        <div className={styles.grid}>
          <div className={styles.content}>
            <section><h2>Meet the business</h2><p>{p.summary}</p></section>
            <section><h2>How to shop</h2><p>{p.buying}</p></section>
            <section><h2>Before planning a visit</h2><p>{p.visit}</p></section>
            <section className={styles.sources}>
              <h2>Where these details come from</h2>
              <p>RPV researched this profile using the business’s own website. Sources checked <time dateTime={p.checked}>October 24, 2026</time>. These details have not been confirmed through our owner-review process.</p>
              <ul>{p.sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label} ↗</a></li>)}</ul>
            </section>
          </div>
          <aside className={styles.aside}>
            <div className={styles.shop}>
              <p className={styles.eyebrow}>Connect directly</p>
              <h2>Explore their current offering</h2>
              <p>See current plants, prices and buying options on the business’s official website.</p>
              <a className={styles.primary} href={p.website} target="_blank" rel="noopener noreferrer">{p.slug === "aroid-greenhouses" ? "Visit official website" : "Visit official shop"} ↗</a>
              <p className={styles.small}>{new URL(p.website).hostname}</p>
              <p className={styles.small}>Purchases and product questions go directly to the seller. RPV does not display live inventory for this listing.</p>
            </div>
            <div className={styles.owner}>
              <h2>Is this your business?</h2>
              <p>Review your details and request ownership of your listing at no cost. Ownership review is separate from paid features.</p>
              <Link href={managed ? "/dashboard/settings" : `/claim/${p.slug}`} className={styles.secondary}>{managed ? "Manage your listing" : "Claim this listing free"}</Link>
              <p className={styles.small}>{managed ? "Sign in with the account associated with this listing to manage it." : "Include any corrections when submitting your ownership-review request."}</p>
            </div>
          </aside>
        </div>
        <footer className={styles.note}>Directory inclusion does not imply a paid membership, partnership or endorsement. Source research is not a verification of plant quality, identity or provenance. Confirm availability and policies directly with the business.</footer>
      </div>
    </main>
  );
}
