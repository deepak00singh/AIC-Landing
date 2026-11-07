import React from 'react';
import { Users, Globe2, MessageSquare, ShieldCheck, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { TRUST_INDICATORS } from '../data/landingData';

export const TrustIndicators: React.FC = () => {
  const { theme } = useTheme();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Users':
        return <Users className="w-4 h-4 text-[#FF4B32]" />;
      case 'Globe2':
        return <Globe2 className={`w-4 h-4 ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`} />;
      case 'MessageSquare':
        return <MessageSquare className="w-4 h-4 text-[#FF4B32]" />;
      case 'ShieldCheck':
        return <ShieldCheck className={`w-4 h-4 ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`} />;
      case 'Award':
        return <Award className="w-4 h-4 text-[#FF4B32]" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-[#FF4B32]" />;
    }
  };

  return (
    <section
      id="trust-indicators"
      className={`py-7 scroll-mt-20 transition-colors duration-300 ${
        theme === 'light' ? 'bg-[#FFFFFF] border-b border-[#E2E8F0]' : 'bg-[#131517] border-b border-[#929DA7]/15'
      }`}
    >
      <div className="w-full max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Seamless Proof Bar */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4 lg:gap-x-0 items-start ${
            theme === 'light' ? 'lg:divide-x lg:divide-[#E2E8F0]' : 'lg:divide-x lg:divide-[#929DA7]/15'
          }`}
        >
          {TRUST_INDICATORS.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                idx === 0 ? 'lg:pl-0' : 'lg:px-5'
              } ${idx === TRUST_INDICATORS.length - 1 ? 'lg:pr-0' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-xs mt-0.5 border ${
                  theme === 'light'
                    ? 'bg-[#F1F5F9] border-[#E2E8F0]'
                    : 'bg-[#1C2024] border-[#929DA7]/20'
                }`}
              >
                {getIcon(item.icon)}
              </div>
              <div className="min-w-0">
                <div
                  className={`text-sm font-bold tracking-tight leading-snug ${
                    theme === 'light' ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  {item.stat}
                </div>
                <div
                  className={`text-xs font-medium leading-tight mt-0.5 ${
                    theme === 'light' ? 'text-[#475569]' : 'text-[#929DA7]'
                  }`}
                >
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
