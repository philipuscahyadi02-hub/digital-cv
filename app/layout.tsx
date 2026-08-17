import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/resume";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://philipus-cahyadi-cv.vercel.app";
const titleFull = `${profile.name} — ${profile.roles.join(" / ")}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: titleFull,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    profile.name,
    "Philipus Cahyadi",
    "IT Business Analyst",
    "Business Analyst Indonesia",
    "Presales Consultant",
    "Product Manager",
    "Jakarta",
    ...profile.roles,
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: titleFull,
    description: profile.tagline,
    url: siteUrl,
    siteName: `${profile.name} — Digital CV`,
    type: "profile",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: titleFull,
    description: profile.tagline,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  jobTitle: profile.roles[0],
  description: profile.tagline,
  email: `mailto:${profile.email}`,
  sameAs: Object.values(profile.social),
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
    addressCountry: "ID",
  },
  knowsAbout: [
    "Business Analysis",
    "Presales Consulting",
    "Product Management",
    "Requirement Gathering",
    "UI/UX Collaboration",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-ink-950 font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
