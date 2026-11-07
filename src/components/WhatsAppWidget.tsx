import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2.5 pointer-events-auto">
      {/* Tooltip bubble (Desktop/Tablet only to prevent mobile occlusion) */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1C2024] text-white text-xs font-semibold shadow-2xl border border-[#929DA7]/25">
          <span>Chat with us — We reply within minutes</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowTooltip(false);
            }}
            className="text-[#929DA7] hover:text-white p-0.5 cursor-pointer transition-colors"
            aria-label="Dismiss chat prompt"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/917022152606?text=Hi!%20I%20have%20a%20question%20about%20AIC%20Cloud."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AIC Cloud Support on WhatsApp"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-black/40 hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <MessageSquare className="w-5 h-5 fill-current stroke-[1.5]" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </div>
  );
};
