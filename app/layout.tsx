import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  metadataBase: new URL('https://zehratech.in'),
  title: {
    default: "ZehraTech - AI & Tech Education | Yashab Alam | Artificial Intelligence Workshops",
    template: "%s | ZehraTech - AI & Tech Education"
  },
  description: "ZehraTech by Yashab Alam offers cutting-edge AI, Machine Learning, Cybersecurity workshops for students. Learn Artificial Intelligence, Python, Data Science, and future technologies. Join 500+ students trained across India.",
  keywords: [
    "ZehraTech",
    "Yashab Alam",
    "AI workshops",
    "Artificial Intelligence training",
    "Machine Learning courses",
    "Cybersecurity education",
    "Tech workshops India",
    "Python programming",
    "Data Science courses",
    "AI for students",
    "Tech education",
    "Innovation workshops",
    "Future technology",
    "Student AI training",
    "Online AI courses",
    "Practical AI learning",
    "Tech skills development",
    "AI India",
    "Technology workshops",
    "Computer Science education"
  ],
  authors: [
    { name: "Yashab Alam", url: "https://zehratech.in/portfolio" }
  ],
  creator: "Yashab Alam",
  publisher: "ZehraTech",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://zehratech.in",
    siteName: "ZehraTech",
    title: "ZehraTech - AI & Tech Education by Yashab Alam",
    description: "Leading AI and Tech Education platform in India. Learn Artificial Intelligence, Machine Learning, Cybersecurity from expert trainer Yashab Alam. Join 500+ students.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZehraTech - AI & Tech Education by Yashab Alam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZehraTech - AI & Tech Education",
    description: "Learn AI, Machine Learning, and Cybersecurity with expert trainer Yashab Alam. Join 500+ students trained across India.",
    images: ["/og-image.jpg"],
    creator: "@yashab_cyber",
  },
  alternates: {
    canonical: "https://zehratech.in",
  },
  verification: {
    google: "your-google-verification-code-here",
  },
  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "ZehraTech",
    "url": "https://zehratech.in",
    "logo": "https://zehratech.in/logo.png",
    "description": "Leading AI and Tech Education platform in India offering workshops in Artificial Intelligence, Machine Learning, and Cybersecurity",
    "founder": {
      "@type": "Person",
      "name": "Yashab Alam",
      "url": "https://zehratech.in/portfolio",
      "sameAs": [
        "https://github.com/yashab-cyber",
        "https://linkedin.com/in/yashabalam"
      ]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8960457971",
      "contactType": "Customer Service",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://github.com/yashab-cyber",
      "https://linkedin.com/in/yashabalam"
    ],
    "offers": {
      "@type": "Offer",
      "category": "Education",
      "description": "AI, Machine Learning, and Cybersecurity Workshops"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#00f0ff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
