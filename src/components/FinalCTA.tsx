import React from 'react';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FinalCTAProps {
  currency: 'INR' | 'USD';
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ currency }) => {
  const { theme } = useTheme();
  const priceDisplay = currency === 'INR' ? '₹99' : '$1.19';

  return (
    <section
      className={`py-20 lg:py-24 relative overflow-hidden transition-colors duration-300 ${
        theme === 'light' ? 'bg-[#F8FAFC]' : 'bg-[#17191C]'
      }`}
    >
      <div className="w-full max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          className={`relative rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-2xl overflow-hidden transition-all ${
            theme === 'light'
              ? 'bg-gradient-to-br from-[#FFFFFF] via-[#FFFFFF] to-[#F1F5F9] border border-[#CBD5E1] shadow-slate-200/80 text-[#0F172A]'
              : 'bg-gradient-to-br from-[#1C2024] via-[#17191C] to-[#121417] border border-[#929DA7]/25 text-white'
          }`}
        >
          {/* Subtle background glow spheres */}
          <div
            className={`absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
              theme === 'light' ? 'bg-[#FF4B32]/[0.08]' : 'bg-[#FF4B32]/10'
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
              theme === 'light' ? 'bg-[#CBD5E1]/20' : 'bg-[#929DA7]/10'
            }`}
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            {/* Pill */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${
                theme === 'light'
                  ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                  : 'bg-[#17191C]/90 border-[#929DA7]/25 text-slate-300'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#FF4B32]" />
              <span>Deploy Instantly in Seconds</span>
            </div>

            {/* Heading */}
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
                theme === 'light' ? 'text-[#0F172A]' : 'text-white'
              }`}
            >
              Ready to Build on the Smartest Cloud?
            </h2>

            {/* Description */}
            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
                theme === 'light' ? 'text-[#475569]' : 'text-[#929DA7]'
              }`}
            >
              Start with a VPS from{' '}
              <span
                className={`font-extrabold underline decoration-[#FF4B32] decoration-2 ${
                  theme === 'light' ? 'text-[#0F172A]' : 'text-white'
                }`}
              >
                {priceDisplay}/mo
              </span>{' '}
              or rent a GPU by the minute. No credit card required.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <a
                href="https://aiccloud.in/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[#FF4B32] hover:bg-[#E63E26] shadow-lg shadow-[#FF4B32]/30 transition-all active:scale-95 cursor-pointer"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://aiccloud.in/contact"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm backdrop-blur-md transition-all active:scale-95 cursor-pointer border ${
                  theme === 'light'
                    ? 'bg-white hover:bg-[#F8FAFC] text-[#0F172A] border-[#CBD5E1] shadow-xs'
                    : 'bg-[#1C2024] hover:bg-[#252B31] text-slate-200 border-[#929DA7]/25'
                }`}
              >
                <span>Contact Sales</span>
              </a>
            </div>

            {/* Micro guarantees */}
            <div
              className={`pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs ${
                theme === 'light' ? 'text-[#475569]' : 'text-[#929DA7]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF4B32] shrink-0" />
                <span className={theme === 'light' ? 'text-[#334155]' : 'text-slate-300'}>Zero setup fee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF4B32] shrink-0" />
                <span className={theme === 'light' ? 'text-[#334155]' : 'text-slate-300'}>UPI, Card & PayPal accepted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF4B32] shrink-0" />
                <span className={theme === 'light' ? 'text-[#334155]' : 'text-slate-300'}>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
