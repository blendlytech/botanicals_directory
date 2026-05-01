import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import NavbarClient from "./components/NavbarClient";
import FooterClient from "./components/FooterClient";
import { ThemeProvider } from "./components/ThemeProvider";

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
  title: "Permit Data | Premium Roofing & Pool Construction Leads",
  description: "Real-time homeowner building permit data for roofing and pool contractors. Get high-intent leads as soon as they are filed. Exclusive, verified, and automated.",
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
        <link rel="icon" href="/icon.png" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <NavbarClient />
          {children}
          <FooterClient />
        </ThemeProvider>
      </body>
    </html>
  );
}
