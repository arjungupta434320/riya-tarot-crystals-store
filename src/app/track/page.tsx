"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Package, 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft,
  Flame,
  Award
} from "lucide-react";

function TrackContent() {
  const searchParams = useSearchParams();
  const queryOrder = searchParams.get("orderId") || "";

  const [inputCode, setInputCode] = useState(queryOrder);
  const [activeOrder, setActiveOrder] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (queryOrder) {
      handleLookup(queryOrder);
    }
  }, [queryOrder]);

  const handleLookup = (code: string) => {
    const clean = code.trim().replace("#", "").toUpperCase();
    if (!clean) return;

    setSearched(true);
    // Simulate real spiritual order tracking milestone
    setActiveOrder({
      id: clean.startsWith("RTC-") ? clean : `RTC-${clean}`,
      customer: "Blessed Wearer",
      date: "21 Oct 2026",
      status: "108 Mantra Japa in Progress",
      currentStep: 3, // 1 to 5
      carrier: "Bluedart Express Air",
      trackingNumber: `BD${Math.floor(100000000 + Math.random() * 900000000)}IN`,
      destination: "Delhi NCR / Pan-India",
      timeline: [
        {
          step: 1,
          title: "Order Placed & Sacred Intention Recorded",
          desc: "Your crystal bracelet was assigned to our sacred temple sanctuary.",
          timestamp: "Day 1, 09:30 AM",
          completed: true,
        },
        {
          step: 2,
          title: "Himalayan Rock Salt & Sage Purification",
          desc: "Raw earth mineral ultrasonic bath to release previous handling frequencies.",
          timestamp: "Day 1, 03:00 PM",
          completed: true,
        },
        {
          step: 3,
          title: "108 Vedic Mantra Japa & Prana Pratishtha",
          desc: "Consecrated by certified Vedic priests under sacred chanting and ghee diya.",
          timestamp: "Currently Active in Temple Studio",
          completed: true,
          current: true,
        },
        {
          step: 4,
          title: "Holy Raksha Sutra Packaging & Blessing",
          desc: "Sealed in protective airtight luxury box with holy vibhuti and energized thread.",
          timestamp: "Estimated Tomorrow, 11:00 AM",
          completed: false,
        },
        {
          step: 5,
          title: "Insured Air Dispatch via Bluedart / Delhivery",
          desc: "Handed over to express courier with door-to-door temperature-controlled transit.",
          timestamp: "Estimated Dispatch in 24 Hours",
          completed: false,
        },
      ]
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLookup(inputCode);
  };

  return (
    <div className="min-h-screen py-8 sm:py-14 bg-[#FBF8F3] text-[#2B1B3D]">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#635572] hover:text-[#7B4FC9] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Sanctuary</span>
          </Link>
          <span className="text-[11px] text-[#8E6D24] font-medium tracking-wide">
            Live Vedic Consecration Status
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto bg-[#F5F0FD] text-[#7B4FC9] rounded-2xl flex items-center justify-center mb-3 border border-[#7B4FC9]/30 shadow-xs">
            <Package size={26} />
          </div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#7B4FC9] block mb-1">
            Spiritual Order Timeline
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2B1B3D] font-bold tracking-tight mb-2">
            Track Your Consecrated Order
          </h1>
          <p className="text-xs sm:text-sm text-[#635572] max-w-md mx-auto leading-relaxed">
            Enter your 5-digit Order ID (e.g. RTC-58492) or email to monitor each phase of Vedic purification and dispatch.
          </p>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={onSubmit} className="flex gap-2 max-w-xl mx-auto mb-10">
          <input
            type="text"
            required
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter Order ID (e.g. RTC-58492)..."
            className="flex-1 px-4 py-3 rounded-2xl bg-white border border-[#EFE9E2] text-xs text-[#2B1B3D] focus:outline-none focus:border-[#C9A24D] shadow-xs"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl text-xs font-semibold uppercase text-white btn-amethyst cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <Search size={14} />
            <span>Track Order</span>
          </button>
        </form>

        {/* Tracking Details View */}
        {activeOrder && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE9E2] shadow-xs space-y-6">
            
            {/* Order Overview Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EFE9E2]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E6D24] block">
                  Tracking Order
                </span>
                <h3 className="font-serif text-lg font-bold text-[#2B1B3D]">
                  #{activeOrder.id}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F5F0FD] text-[#7B4FC9] border border-[#7B4FC9]/30">
                  ★ {activeOrder.status}
                </span>
              </div>
            </div>

            {/* Courier Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs p-3.5 rounded-2xl bg-[#FBF8F3] border border-[#EFE9E2]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#635572] block">Courier Partner</span>
                <span className="font-semibold text-[#2B1B3D]">{activeOrder.carrier}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#635572] block">Air Waybill (AWB)</span>
                <span className="font-mono font-semibold text-[#7B4FC9]">{activeOrder.trackingNumber}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#635572] block">Destination</span>
                <span className="font-semibold text-[#2B1B3D]">{activeOrder.destination}</span>
              </div>
            </div>

            {/* Visual 5-Stage Spiritual Timeline */}
            <div className="pt-2">
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#2B1B3D] mb-4 flex items-center gap-2">
                <Sparkles size={15} className="text-[#C9A24D]" />
                <span>Consecration & Dispatch Milestones</span>
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-[#EFE9E2]">
                {activeOrder.timeline.map((stepItem: any, index: number) => {
                  return (
                    <div key={index} className="relative group">
                      {/* Step Indicator Dot */}
                      <div
                        className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                          stepItem.current
                            ? "bg-[#7B4FC9] border-white text-white shadow-md ring-4 ring-[#7B4FC9]/20"
                            : stepItem.completed
                            ? "bg-[#2E7D32] border-white text-white shadow-xs"
                            : "bg-white border-[#EFE9E2] text-[#9588A3]"
                        }`}
                      >
                        {stepItem.completed ? (
                          <CheckCircle2 size={13} />
                        ) : (
                          <span className="text-[10px] font-bold">{stepItem.step}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-0.5">
                          <h5 className={`font-serif text-xs sm:text-sm font-bold ${
                            stepItem.current ? "text-[#7B4FC9]" : "text-[#2B1B3D]"
                          }`}>
                            {stepItem.title}
                          </h5>
                          <span className="text-[10px] text-[#8E6D24] font-semibold">
                            {stepItem.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#635572] leading-relaxed">
                          {stepItem.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* WhatsApp Assistance */}
            <div className="pt-4 border-t border-[#EFE9E2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#635572]">
                Questions about your gemstone consecration?
              </span>
              <a
                href={`https://wa.me/917889001587?text=Hello%20Riya,%20I%20am%20tracking%20order%20%23${activeOrder.id}.%20Can%20you%20share%20an%20update?`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7B4FC9] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Chat with Temple Concierge on WhatsApp →</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-24 text-center text-xs text-[#635572]">Loading tracking portal...</div>}>
      <TrackContent />
    </Suspense>
  );
}
