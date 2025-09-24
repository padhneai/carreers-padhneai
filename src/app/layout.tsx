import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PadhneAI Careers – Internship Applications",
    template: "%s | PadhneAI Careers",
  },
  description:
    "Apply for internships at PadhneAI – based in Janakpur, Nepal. Join our team to grow your skills in AI, technology, and software development. Submit your resume online.",
  keywords: [
    "PadhneAI Careers",
    "PadhneAI Internship",
    "Internship in Nepal",
    "Internship Janakpur",
    "AI internship Nepal",
    "Software internship Nepal",
    "Next.js internship form",
  ],
  authors: [{ name: "PadhneAI Team" }],
  metadataBase: new URL("https://careers.padhneai.com"),
  openGraph: {
    title: "PadhneAI Careers – Internship Applications",
    description:
      "Submit your details and resume to apply for internships at PadhneAI in Janakpur, Nepal.",
    url: "https://careers.padhneai.com",
    siteName: "PadhneAI Careers",
    images: [
      {
        url: "/logo.png",
        width: 200,
        height: 200,
        alt: "PadhneAI Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PadhneAI Careers – Internship Applications",
    description:
      "Apply for internships at PadhneAI, Janakpur Nepal. Submit your resume to join our AI and software development team.",
    images: ["/logo.png"],
    creator: "@padhneai",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://careers.padhneai.com",
  },
  category: "Careers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured data for Local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PadhneAI",
              url: "https://careers.padhneai.com",
              logo: "https://careers.padhneai.com/logo.png",
              sameAs: [
                "https://www.facebook.com/padhneai",
                "https://twitter.com/padhneai",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Pidari Chowk, Janakpur Dham - 9",
                addressLocality: "Janakpur",
                addressRegion: "Madhesh Province",
                postalCode: "45600",
                addressCountry: "NP",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
