import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { NavbarClient, FooterClient, ThemeProvider } from "@rpv/ui";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rare Plant Vendors | Find Growers and Plant Events",
  description: "Find rare plant nurseries and specialists by location and specialty. Explore upcoming plant events and connect directly with businesses.",
};

export const viewport: Viewport = {
  themeColor: "#0B3D2E",
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/vendors/blendly-elite/brand-logo-nobkg.svg" type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <NavbarClient />
          {children}
          <FooterClient / >
        </ThemeProvider>
      </body>
    </html>
  );
}
