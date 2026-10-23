"use client";

import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const WHATSAPP_NUMBER = "917889001587";

export default function WhatsAppWidget() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef<{ clientX: number; clientY: number; posX: number; posY: number } | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Initialize position safely above mobile bottom nav & cart bars
  useEffect(() => {
    const initPos = () => {
      const isMobile = window.innerWidth < 768;
      const widgetSize = isMobile ? 50 : 58;
      const initialRight = isMobile ? 16 : 24;
      const initialBottom = isMobile ? 115 : 90;
      const x = Math.max(12, window.innerWidth - widgetSize - initialRight);
      const y = Math.max(12, window.innerHeight - widgetSize - initialBottom);
      setPosition({ x, y });
    };

    initPos();

    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return null;
        const isMobile = window.innerWidth < 768;
        const widgetSize = isMobile ? 50 : 58;
        const clampedX = Math.min(Math.max(12, prev.x), window.innerWidth - widgetSize - 12);
        const clampedY = Math.min(Math.max(12, prev.y), window.innerHeight - widgetSize - 12);
        return { x: clampedX, y: clampedY };
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      "Hi Riya Tarot Crystals, I would like to inquire about authentically sourced energized bracelets and sacred intention curations..."
    );
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!position) return;
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      posX: position.x,
      posY: position.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.clientX;
    const dy = e.clientY - dragStartRef.current.clientY;

    if (Math.hypot(dx, dy) > 4) {
      setIsDragging(true);
    }

    const widgetSize = 58;
    const newX = Math.min(Math.max(12, dragStartRef.current.posX + dx), window.innerWidth - widgetSize - 12);
    const newY = Math.min(Math.max(12, dragStartRef.current.posY + dy), window.innerHeight - widgetSize - 12);

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return;

    const dx = e.clientX - dragStartRef.current.clientX;
    const dy = e.clientY - dragStartRef.current.clientY;
    const distance = Math.hypot(dx, dy);

    dragStartRef.current = null;
    setIsDragging(false);

    // Strict Drag vs Click distinction (distance < 6px is a Click)
    if (distance < 6) {
      openWhatsApp();
    }
  };

  if (!position) return null;

  return (
    <div
      ref={widgetRef}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        touchAction: "none",
      }}
      className="select-none"
    >
      <div className="relative flex items-center">
        {/* Floating Pill Tooltip (Desktop view) */}
        {showTooltip && (
          <div className="hidden sm:flex absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_4px_16px_rgba(212,175,55,0.2)] text-xs font-semibold text-[#2C2A29] items-center gap-1.5 animate-fadeIn pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>Chat with Riya</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="ml-1 text-[#6E6A64] hover:text-[#2C2A29] p-0.5 rounded-full transition-colors"
              aria-label="Dismiss tooltip"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* Luminous Pearl-White & Champagne-Gold Button */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          role="button"
          tabIndex={0}
          aria-label="Chat with Riya on WhatsApp"
          className={`w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] rounded-full bg-[#FFFFFF] border-2 border-[#D4AF37] shadow-[0_8px_25px_rgba(212,175,55,0.32)] flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform duration-150 touch-press ${
            isDragging ? "scale-105 shadow-2xl" : "hover:scale-105"
          }`}
        >
          {/* Subtle Outer Pulse Ring */}
          <div className="absolute inset-0 rounded-full border border-[#D4AF37]/40 animate-gold-pulse pointer-events-none" />

          {/* Official WhatsApp SVG in Emerald Green & Gold Trim */}
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            className="sm:w-[30px] sm:h-[30px] text-[#25D366] transition-transform group-hover:scale-110 pointer-events-none"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
