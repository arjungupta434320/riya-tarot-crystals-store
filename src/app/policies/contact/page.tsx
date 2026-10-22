import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-primary/60 hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 className="font-serif text-3xl md:text-4xl mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div>
            <h2 className="text-xl font-serif mb-6 text-primary">Get in Touch</h2>
            <p className="text-primary/80 mb-8 leading-relaxed">
              Have questions about which crystal is right for you? Need help with an order? 
              We're here to assist you on your spiritual journey.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <Mail className="text-accent mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-primary">Email Support</h3>
                  <p className="text-primary/70 text-sm mt-1">auracrystalstarot2@gmail.com</p>
                  <p className="text-primary/50 text-xs mt-1">We aim to reply within 24 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="text-accent mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-primary">Phone & WhatsApp</h3>
                  <a href="tel:+917889001587" className="text-primary/70 text-sm mt-1 hover:text-accent transition-colors block">+91 78890 01587</a>
                  <p className="text-primary/50 text-xs mt-1">Mon-Fri, 10am to 6pm IST</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin className="text-accent mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-primary">Operating Address</h3>
                  <p className="text-primary/70 text-sm mt-1">
                    Omaxe Eternity<br />
                    Vrindavan, 281121<br />
                    Uttar Pradesh, India
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary/30 p-8 rounded border border-primary/10">
            <h2 className="text-xl font-serif mb-6 text-primary">Send a Message</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-primary/60 mb-2 block">Name</label>
                <input type="text" className="w-full bg-transparent border-b border-primary/20 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-primary/60 mb-2 block">Email</label>
                <input type="email" className="w-full bg-transparent border-b border-primary/20 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-primary/60 mb-2 block">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-primary/20 py-2 focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
              </div>
              <button type="button" className="mt-4 bg-primary text-secondary text-sm tracking-widest uppercase py-4 hover:bg-accent transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
