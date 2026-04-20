import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import NavbarClient from "./components/NavbarClient";
import FooterClient from "./components/FooterClient";

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
  title: "Rare Plant Vendors | The Premier Botanical Event Directory",
  description: "Discover the world's most exclusive rare plant expos, preview verified vendor inventory before doors open, and connect with serious collectors. Est. 2026.",
  themeColor: "#0B3D2E",
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
        <NavbarClient />
        {children}
        <FooterClient />
      </body>
    </html>
  );
}
