import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CultivarID — Digital Plant Passports",
    template: "%s | CultivarID",
  },
  description:
    "The premier Digital Product Passport for rare plants. Track provenance, generate QR care tags, and manage inventory — built for the high-end botanical market.",
  keywords: [
    "rare plants",
    "plant provenance",
    "cultivar tracking",
    "botanical inventory",
    "plant passport",
    "QR plant tags",
    "plant vendor tools",
  ],
  authors: [{ name: "CultivarID" }],
  openGraph: {
    title: "CultivarID — Digital Plant Passports",
    description: "The premier Digital Product Passport for rare plants.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
