import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://namaskarai.com"),
  title: {
    default: "Namaskar AI — Learn AI in Assamese | অসমীয়াত AI শিকক",
    template: "%s | Namaskar AI",
  },
  description:
    "Namaskar AI is the first Assamese-language AI learning platform. Access prompt packs, tool guides, AI courses, and step-by-step roadmaps — all in Assamese. Built for learners, job seekers, small businesses, and families in Assam.",
  keywords: [
    "AI in Assamese",
    "Learn AI Assamese",
    "Assamese AI platform",
    "ChatGPT Assamese",
    "AI course Assam",
    "prompt packs Assamese",
    "artificial intelligence Assam",
    "NamaskarAI",
    "অসমীয়া AI",
    "AI শিকক",
  ],
  authors: [{ name: "Namaskar AI" }],
  creator: "Namaskar AI",
  publisher: "Namaskar AI",
  openGraph: {
    title: "Namaskar AI — Learn AI in Assamese",
    description:
      "First Assamese-language AI learning platform. Prompt packs, courses, tools & roadmaps for Assam.",
    siteName: "Namaskar AI",
    type: "website",
    locale: "en_IN",
    alternateLocale: "as_IN",
    url: "https://namaskarai.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Namaskar AI — Learn AI in Assamese",
    description:
      "First Assamese-language AI learning platform. Prompt packs, courses, tools & roadmaps.",
    creator: "@namaskarai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://namaskarai.com",
    languages: {
      en: "https://namaskarai.com",
      as: "https://namaskarai.com/as",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Namaskar AI",
              url: "https://namaskarai.com",
              description:
                "First Assamese-language AI learning platform offering prompt packs, AI courses, and tool guides.",
              areaServed: {
                "@type": "Place",
                name: "Assam, India",
              },
              inLanguage: ["en", "as"],
              sameAs: [
                "https://facebook.com/namaskarai",
                "https://instagram.com/namaskarai",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Namaskar AI?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Namaskar AI is the first Assamese-language AI learning platform that helps learners, job seekers, small businesses, and families in Assam use AI tools effectively through prompt packs, courses, and step-by-step roadmaps.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I learn AI in Assamese?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! Namaskar AI provides all content in both English and Assamese, making AI learning accessible to everyone in Assam.",
                  },
                },
              ],
            }),
          }}
        />
        <meta name="geo.region" content="IN-AS" />
        <meta name="geo.placename" content="Assam, India" />
        <meta name="geo.position" content="26.2006;92.9376" />
        <meta name="ICBM" content="26.2006, 92.9376" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
