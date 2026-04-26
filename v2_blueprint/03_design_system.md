# CultivarID V2: Design System (Deep Forest Luxe)

## 1. Aesthetic Philosophy
Premium, eco-minimalist, and cinematic. The platform should feel like an exclusive botanical club. High contrast, subtle glassmorphism, and intentional micro-animations.

## 2. Core Color Tokens (CSS Variables)

We use vanilla CSS with root variables. No Tailwind unless specifically requested.

```css
:root {
  /* Core Brand Colors */
  --emerald: #0B3D2E;
  --emerald-light: #165c47;
  --gold: #D4AF37;
  --gold-dim: rgba(212, 175, 55, 0.15);
  --gold-hover: #F1D570;
  
  /* Backgrounds */
  --bg: #040806;             /* Obsidian */
  --bg-surface: #0a110d;     /* Deep Forest */
  --bg-card: #0f1a14;        /* Slightly lighter card */
  
  /* Text */
  --text-primary: #F5F5F5;
  --text-secondary: rgba(255, 255, 255, 0.6);
  --text-inverse: #040806;
  
  /* UI Elements */
  --glass: rgba(11, 61, 46, 0.3);
  --glass-border: rgba(255, 255, 255, 0.05);
}
```

## 3. Typography & Font Loading

**Crucial Fix:** Fonts MUST be loaded via `next/font/google` in `layout.tsx` to prevent render-blocking. Do not use `@import` in CSS.

- **Primary Heading (`var(--font-heading)`):** 'Outfit' or 'Playfair Display' (Cinematic/Editorial).
- **Body (`var(--font-sans)`):** 'Inter' or 'Roboto' (Clean, legible).

## 4. Responsive Breakpoints (Mobile-First)

The V1 system failed on mobile. V2 must implement these strict media queries:

```css
/* Base styles are mobile-first */

/* Tablet */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .hero-title { font-size: 3.5rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
  .navbar-mobile-menu { display: none; }
  .navbar-desktop { display: flex; }
}
```

## 5. UI Architecture Rules
- **Buttons:** Must have subtle hover states (`transform: translateY(-2px); box-shadow: 0 5px 15px var(--gold-dim)`).
- **Cards:** Use `backdrop-filter: blur(10px)` for glassmorphism effects on cards overlaying background graphics.
- **Images:** All hero images and profile pictures must use Next.js `<Image>` component with `priority` set on LCP elements.
