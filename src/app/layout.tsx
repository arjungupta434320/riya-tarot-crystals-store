import type { Metadata, Viewport } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import StickyMobileCartBar from "@/components/StickyMobileCartBar";
import MobileBottomNav from "@/components/MobileBottomNav";
import PolicyModal from "@/components/PolicyModal";
import QuizModal from "@/components/QuizModal";
import ToastNotifier from "@/components/ToastNotifier";
import React from "react";
import { AuthProvider } from "@/components/AuthProvider";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { Preloader } from "@/components/animations/Preloader";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#FBF8F3",
};

export const metadata: Metadata = {
  title: "Riya Tarot Crystals | Authentically Sourced & Energized Spiritual Gemstones",
  description: "Authentically sourced healed crystal bracelets, raw clusters, and 7-Chakra curations. 100% natural earth gems pre-energized with 108 Vedic Beej Mantras.",
  metadataBase: new URL("https://riyatarotcrystals.com"),
  openGraph: {
    title: "Riya Tarot Crystals | Authentically Sourced & Energized Spiritual Gemstones",
    description: "Authentically sourced healed crystal bracelets, raw clusters, and 7-Chakra curations.",
    type: "website",
    locale: "en_IN",
    siteName: "Riya Tarot Crystals",
  },
  icons: {
    icon: "/images/products/rose-quartz-new.jpg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden max-w-full w-full">
      <body className={`${cinzel.variable} ${plusJakartaSans.variable} font-sans antialiased min-h-[100dvh] flex flex-col bg-[#FBF8F3] text-[#2B1B3D] pb-24 md:pb-0 overflow-x-hidden max-w-full w-full`}>
        <SmoothScrollProvider>
          <Preloader />
          <CustomCursor />
          <AuthProvider>
            <Navbar />
            <main className="flex-grow w-full max-w-full overflow-x-hidden">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <CheckoutModal />
            <PolicyModal />
            <QuizModal />
            <StickyMobileCartBar />
            <MobileBottomNav />
            <ToastNotifier />
            <React.Suspense fallback={null}>
              <WhatsAppWidget />
            </React.Suspense>
          </AuthProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
