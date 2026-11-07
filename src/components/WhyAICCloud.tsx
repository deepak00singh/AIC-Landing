import React from 'react';
import {
  CreditCard,
  LayoutDashboard,
  Unlock,
  Headphones,
  Receipt,
  ShieldCheck,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { WHY_AIC_CLOUD } from '../data/landingData';

export const WhyAICCloud: React.FC = () => {
  const { theme } = useTheme();

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coins':
        return <CreditCard className="w-6 h-6 text-[#FF4B32]" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className={`w-6 h-6 ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`} />;
      case 'Unlock':
        return <Unlock className="w-6 h-6 text-[#FF4B32]" />;
      case 'Headphones':
        return <Headphones className={`w-6 h-6 ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`} />;
      case 'ReceiptCheck':
        return <Receipt className="w-6 h-6 text-[#FF4B32]" />;
      case 'ShieldCheck':
        return <ShieldCheck className={`w-6 h-6 ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`} />;
      default:
        return <CheckCircle className="w-6 h-6 text-[#FF4B32]" />;
    }
  };

  return (
    <section
      id="why-aic"
      className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-300 ${
        theme === 'light' ? 'bg-[#F8FAFC] border-y border-[#E2E8F0]' : 'bg-[#131517] border-y border-[#929DA7]/15'
      }`}
    >
      {/* Ambient background depth lighting */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-3xl pointer-events-none -z-10 ${
          theme === 'light'
            ? 'bg-gradient-to-b from-[#FF4B32]/[0.04] via-[#CBD5E1]/[0.1] to-transparent'
            : 'bg-gradient-to-b from-[#FF4B32]/[0.05] via-[#929DA7]/[0.02] to-transparent'
        }`}
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF4B32]/10 border border-[#FF4B32]/25 text-[#FF4B32] text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why AIC Cloud?</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              theme === 'light' ? 'text-[#0F172A]' : 'text-white'
            }`}
          >
            Built Different. Built for Global Scale.
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              theme === 'light' ? 'text-[#475569]' : 'text-[#929DA7]'
            }`}
          >
            We're not just another hosting provider. AIC Cloud delivers full-stack cloud infrastructure on one platform — with INR-first pricing, global datacenters, and 24/7 human support.
          </p>
        </div>

        {/* 6 Tactile 3D Extruded Cards (Clean & Focused) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_AIC_CLOUD.map((feat, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 ease-out cursor-pointer ${
                theme === 'light'
                  ? 'bg-gradient-to-b from-[#FFFFFF] to-[#F8FAFC] border-t border-white border-x border-[#E2E8F0] border-b-[5px] border-[#CBD5E1] shadow-[0_4px_18px_rgba(15,23,42,0.06),_0_5px_0_#CBD5E1] hover:-translate-y-1.5 hover:border-b-[7px] hover:border-t-[#FF4B32] hover:border-x-[#FF4B32]/40 hover:border-b-[#CBD5E1] hover:shadow-[0_16px_32px_-8px_rgba(15,23,42,0.12),_0_7px_0_#CBD5E1,_0_0_25px_rgba(255,75,50,0.14)]'
                  : 'bg-gradient-to-b from-[#1C2025] to-[#141619] border-t border-[#929DA7]/30 border-x border-[#929DA7]/15 border-b-[5px] border-[#0A0C0E] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),_0_14px_28px_-6px_rgba(0,0,0,0.7),_0_5px_0_#0A0C0E] hover:-translate-y-1.5 hover:border-b-[7px] hover:border-t-[#FF4B32]/70 hover:border-x-[#FF4B32]/30 hover:border-b-[#07080A] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.22),_0_24px_45px_-10px_rgba(0,0,0,0.85),_0_7px_0_#07080A,_0_0_35px_rgba(255,75,50,0.18)]'
              }`}
            >
              {/* Subtle top light sheen overlay */}
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b transition-opacity ${
                  theme === 'light'
                    ? 'from-[#FF4B32]/[0.02] to-transparent opacity-0 group-hover:opacity-100'
                    : 'from-white/[0.04] to-transparent opacity-60 group-hover:opacity-100'
                }`}
                aria-hidden="true"
              />

              {/* Subtle cyber dot grid inside card */}
              <div
                className={`pointer-events-none absolute inset-0 ${
                  theme === 'light'
                    ? 'opacity-[0.04] bg-[radial-gradient(#64748B_1px,transparent_1px)]'
                    : 'opacity-[0.03] bg-[radial-gradient(#929DA7_1px,transparent_1px)]'
                } [background-size:14px_14px]`}
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* 3D Keycap Icon Stage & Counter Pill */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-13 h-13 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      theme === 'light'
                        ? 'bg-gradient-to-b from-[#F8FAFC] to-[#EDF2F7] border-t border-white border-x border-[#E2E8F0] border-b-[4px] border-[#CBD5E1] shadow-[0_2px_6px_rgba(15,23,42,0.08)] group-hover:border-b-[#FF4B32] group-hover:shadow-[0_4px_14px_rgba(255,75,50,0.2)]'
                        : 'bg-gradient-to-b from-[#2A313C] to-[#191D23] border-t border-[#929DA7]/40 border-x border-[#929DA7]/20 border-b-[4px] border-[#0D0F13] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),_0_6px_14px_rgba(0,0,0,0.6)] group-hover:border-b-[#FF4B32] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),_0_0_20px_rgba(255,75,50,0.25)]'
                    }`}
                  >
                    {getFeatureIcon(feat.icon)}
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border-t border-x border-b-[2px] ${
                      theme === 'light'
                        ? 'bg-[#F1F5F9] border-white border-x-[#E2E8F0] border-b-[#CBD5E1] shadow-xs'
                        : 'bg-gradient-to-b from-[#1C2026] to-[#111317] border-[#929DA7]/25 border-x-[#929DA7]/15 border-b-[#0A0C0E] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B32]" />
                    <span
                      className={`text-[11px] font-mono font-bold tracking-wider ${
                        theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Card Title */}
                <h3
                  className={`text-xl font-extrabold mb-2.5 group-hover:text-[#FF4B32] transition-colors leading-snug ${
                    theme === 'light' ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  {feat.title}
                </h3>

                {/* Card Description */}
                <p
                  className={`text-sm leading-relaxed ${
                    theme === 'light' ? 'text-[#475569]' : 'text-[#929DA7]'
                  }`}
                >
                  {feat.desc}
                </p>
              </div>

              {/* Bottom Highlight Row */}
              {feat.highlight && (
                <div
                  className={`relative z-10 mt-6 pt-4 border-t flex items-center gap-2 text-xs font-semibold text-[#FF4B32] ${
                    theme === 'light' ? 'border-[#E2E8F0]' : 'border-[#929DA7]/15'
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4B32] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4B32]" />
                  </span>
                  <span>{feat.highlight}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAICCloud;
