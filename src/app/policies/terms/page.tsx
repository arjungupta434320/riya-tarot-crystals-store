import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary/60 hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-stone max-w-none text-primary/80">
          <p className="mb-4">Last updated: October 2026</p>
          
          <h2 className="text-xl font-serif mt-8 mb-4 text-primary">1. Introduction</h2>
          <p className="mb-4">Welcome to Riya Tarot Crystals. By accessing our website and purchasing our products, you agree to be bound by these Terms and Conditions.</p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-primary">2. Products and Services</h2>
          <p className="mb-4">All products are subject to availability. We reserve the right to limit the quantities of any products or services that we offer. The colors and images of our products are displayed as accurately as possible, but we cannot guarantee that your computer monitor's display of any color will be accurate.</p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-primary">3. Pricing and Payments</h2>
          <p className="mb-4">Prices for our products are subject to change without notice. We reserve the right to modify or discontinue any product at any time. We use secure payment gateways (Razorpay) to process transactions safely.</p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-primary">4. Spiritual Disclaimer</h2>
          <p className="mb-4">The healing properties mentioned regarding our crystals are for spiritual and energetic support only. They are not meant to replace professional medical, psychological, or financial advice.</p>

          <h2 className="text-xl font-serif mt-8 mb-4 text-primary">5. Contact Information</h2>
          <p className="mb-4">Questions about the Terms of Service should be sent to us at auracrystalstarot2@gmail.com.</p>
        </div>
      </div>
    </div>
  );
}
