import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "ZehraTech - Empowering Young Minds with AI & Innovation",
  description: "Learn Artificial Intelligence, Cybersecurity, and Future Technologies. Join our workshops and explore the technology shaping the future.",
  keywords: "AI, Artificial Intelligence, Cybersecurity, Tech Education, Workshops, ZehraTech, Yashab Alam",
  authors: [{ name: "Yashab Alam" }],
  openGraph: {
    title: "ZehraTech - AI & Tech Education",
    description: "Empowering young minds with AI & Innovation",
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
