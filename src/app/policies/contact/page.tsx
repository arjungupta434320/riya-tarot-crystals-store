import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone, Clock, MessageCircle, Sparkles } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#FBF8F3] text-[#2B1B3D]">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#635572] hover:text-[#7B4FC9] transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Sanctuary Home
        </Link>
        
        <div className="space-y-2 mb-10">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E6D24] flex items-center gap-1.5">
            <Sparkles size={12} className="text-[#C9A24D]" />
            Customer Support & Sanctuary Helpdesk
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1B3D]">Contact Us</h1>
          <p className="text-xs sm:text-sm text-[#635572] max-w-xl">
            Have questions about our consecrated gemstones, sacred wrist sizing, or your order? We are here to assist you with care and reverence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Official Contact Info Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE9E2] shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#2B1B3D] border-b border-[#EFE9E2] pb-3">
              Official Contact Details
            </h2>

            <div className="space-y-6">
              {/* Email Support */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#F5F0FD] border border-[#7B4FC9]/20 flex items-center justify-center flex-shrink-0 text-[#7B4FC9]">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#2B1B3D]">Email Support</h3>
                  <a 
                    href="mailto:auracrystalstarot2@gmail.com" 
                    className="text-xs sm:text-sm font-medium text-[#7B4FC9] hover:underline block mt-0.5"
                  >
                    auracrystalstarot2@gmail.com
                  </a>
                  <p className="text-[#635572] text-[11px] mt-1 flex items-center gap-1">
                    <Clock size={11} className="text-[#C9A24D]" />
                    We aim to reply within 24 hours.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#F5F0FD] border border-[#7B4FC9]/20 flex items-center justify-center flex-shrink-0 text-[#7B4FC9]">
                  <Phone size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#2B1B3D]">Phone</h3>
                  <a 
                    href="tel:+917889001587" 
                    className="text-xs sm:text-sm font-medium text-[#2B1B3D] hover:text-[#7B4FC9] block mt-0.5"
                  >
                    +91 7889001587
                  </a>
                  <p className="text-[#635572] text-[11px] mt-1">
                    Mon-Fri, 10am to 6pm IST
                  </p>
                  <a
                    href="https://wa.me/917889001587"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mt-2 hover:bg-emerald-100 transition-colors"
                  >
                    <MessageCircle size={12} className="text-emerald-600" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FFFDF9] border border-[#C9A24D]/30 flex items-center justify-center flex-shrink-0 text-[#8E6D24]">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#2B1B3D]">Address</h3>
                  <p className="text-xs text-[#635572] mt-1 leading-relaxed">
                    Omaxe Eternity<br />
                    Vrindavan, 281121<br />
                    Uttar Pradesh, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE9E2] shadow-sm space-y-5">
            <h2 className="font-serif text-xl font-bold text-[#2B1B3D] border-b border-[#EFE9E2] pb-3">
              Send a Direct Message
            </h2>
            <form 
              className="space-y-4 text-xs text-[#2B1B3D]"
              action={`mailto:auracrystalstarot2@gmail.com`}
              method="GET"
            >
              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#8E6D24] block mb-1">Your Full Name</label>
                <input 
                  type="text" 
                  name="subject"
                  required
                  placeholder="e.g. Radhika Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D] focus:outline-none focus:border-[#7B4FC9]" 
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#8E6D24] block mb-1">Your Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. radhika@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D] focus:outline-none focus:border-[#7B4FC9]" 
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-wider text-[#8E6D24] block mb-1">Message or Inquiry</label>
                <textarea 
                  rows={4} 
                  name="body"
                  required
                  placeholder="How can we assist you with our crystals or your consecrated order..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FBF8F3] border border-[#EFE9E2] text-xs text-[#2B1B3D] focus:outline-none focus:border-[#7B4FC9] resize-none" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#7B4FC9] hover:bg-[#683eb4] shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
