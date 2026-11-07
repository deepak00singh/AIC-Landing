import React from 'react';
import {
  ArrowRight,
  Check,
  Terminal,
  HardDrive,
  Cpu,
  GitBranch,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PLATFORM_SERVICES, type PlatformService } from '../data/landingData';

interface PlatformServicesProps {
  currency: 'INR' | 'USD';
}

export const PlatformServices: React.FC<PlatformServicesProps> = ({ currency }) => {
  const { theme } = useTheme();

  const getCardPrice = (item: PlatformService) => {
    if (currency === 'INR') {
      return item.price;
    }
    // USD conversion
    switch (item.id) {
      case 'vps':
        return '$1.19';
      case 'dedicated':
        return '$14.50';
      case 'gpu':
        return '$0.33';
      case 'app':
        return 'Deploy';
      default:
        return item.price;
    }
  };

  const getServiceVisual = (id: string) => {
    switch (id) {
      case 'vps':
        return (
          <div
            className={`rounded-xl p-3 border text-xs font-mono space-y-2 ${
              theme === 'light'
                ? 'bg-[#F1F5F9] border-[#E2E8F0] text-[#334155]'
                : 'bg-[#121417] border-[#929DA7]/20 text-slate-300'
            }`}
          >
            <div
              className={`flex items-center justify-between border-b pb-1.5 text-[11px] ${
                theme === 'light' ? 'border-[#E2E8F0] text-[#64748B]' : 'border-[#929DA7]/15 text-[#929DA7]'
              }`}
            >
              <span className={`flex items-center gap-1.5 font-bold ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>
                <Terminal className="w-3.5 h-3.5 text-[#FF4B32]" /> root@vps-mumbai:~#
              </span>
              <span className="text-[#FF4B32] font-semibold">NVMe Gen4</span>
            </div>
            <div className="text-[11px] space-y-0.5">
              <p className={theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}># fio --ioengine=libaio --rw=randread</p>
              <p className={`font-semibold ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>read: IOPS=340k, BW=1328MiB/s</p>
              <p className={theme === 'light' ? 'text-[#475569]' : 'text-slate-400'}>Port: 1 Gbps unmetered • KVM Root</p>
            </div>
          </div>
        );
      case 'dedicated':
        return (
          <div
            className={`rounded-xl p-3 border text-xs font-mono space-y-2 ${
              theme === 'light'
                ? 'bg-[#F1F5F9] border-[#E2E8F0] text-[#334155]'
                : 'bg-[#121417] border-[#929DA7]/20 text-slate-300'
            }`}
          >
            <div
              className={`flex items-center justify-between border-b pb-1.5 text-[11px] ${
                theme === 'light' ? 'border-[#E2E8F0] text-[#64748B]' : 'border-[#929DA7]/15 text-[#929DA7]'
              }`}
            >
              <span className={`flex items-center gap-1.5 font-bold ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>
                <HardDrive className="w-3.5 h-3.5 text-[#FF4B32]" /> Bare-Metal Node
              </span>
              <span className={theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}>IPMI / KVM</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div
                className={`p-1.5 rounded border ${
                  theme === 'light' ? 'bg-white border-[#E2E8F0]' : 'bg-[#1C2024] border-[#929DA7]/15'
                }`}
              >
                <span className={`block text-[9px] ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`}>CPU</span>
                <span className={`font-bold ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>AMD EPYC / Xeon</span>
              </div>
              <div
                className={`p-1.5 rounded border ${
                  theme === 'light' ? 'bg-white border-[#E2E8F0]' : 'bg-[#1C2024] border-[#929DA7]/15'
                }`}
              >
                <span className={`block text-[9px] ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`}>RAM</span>
                <span className={`font-bold ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>ECC DDR4/DDR5</span>
              </div>
            </div>
          </div>
        );
      case 'gpu':
        return (
          <div
            className={`rounded-xl p-3 border text-xs font-mono space-y-2 ${
              theme === 'light'
                ? 'bg-[#F1F5F9] border-[#E2E8F0] text-[#334155]'
                : 'bg-[#121417] border-[#929DA7]/20 text-slate-300'
            }`}
          >
            <div
              className={`flex items-center justify-between border-b pb-1.5 text-[11px] ${
                theme === 'light' ? 'border-[#E2E8F0] text-[#64748B]' : 'border-[#929DA7]/15 text-[#929DA7]'
              }`}
            >
              <span className={`flex items-center gap-1.5 font-bold ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>
                <Cpu className="w-3.5 h-3.5 text-[#FF4B32]" /> nvidia-smi
              </span>
              <span className="text-[#FF4B32] font-semibold">CUDA 12.4</span>
            </div>
            <div className="text-[11px] space-y-0.5">
              <p className={`flex justify-between ${theme === 'light' ? 'text-[#334155]' : 'text-slate-300'}`}>
                <span>NVIDIA RTX 4090 / A100</span>
                <span className={`font-semibold ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>80GB VRAM</span>
              </p>
              <div
                className={`w-full h-1.5 rounded-full overflow-hidden mt-1 ${
                  theme === 'light' ? 'bg-[#E2E8F0]' : 'bg-[#1C2024]'
                }`}
              >
                <div className="h-full bg-gradient-to-r from-[#FF4B32]/70 to-[#FF4B32] w-3/4 rounded-full" />
              </div>
            </div>
          </div>
        );
      case 'app':
        return (
          <div
            className={`rounded-xl p-3 border text-xs font-mono space-y-2 ${
              theme === 'light'
                ? 'bg-[#F1F5F9] border-[#E2E8F0] text-[#334155]'
                : 'bg-[#121417] border-[#929DA7]/20 text-slate-300'
            }`}
          >
            <div
              className={`flex items-center justify-between border-b pb-1.5 text-[11px] ${
                theme === 'light' ? 'border-[#E2E8F0] text-[#64748B]' : 'border-[#929DA7]/15 text-[#929DA7]'
              }`}
            >
              <span className={`flex items-center gap-1.5 font-bold ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>
                <GitBranch className="w-3.5 h-3.5 text-[#FF4B32]" /> git push aic main
              </span>
              <span className="text-[#FF4B32] font-semibold">SSL Auto</span>
            </div>
            <div className="text-[11px] space-y-0.5">
              <p className={theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}>Building Next.js 15 app bundle...</p>
              <p className={`font-semibold ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>✓ Deployed to https://myapp.aic.app</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="platform-services"
      className={`py-20 lg:py-28 relative transition-colors duration-300 ${
        theme === 'light' ? 'bg-[#F8FAFC]' : 'bg-[#17191C]'
      }`}
    >
      <div className="w-full max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B32]/10 border border-[#FF4B32]/25 text-[#FF4B32] text-xs font-bold uppercase tracking-wider">
            Our Platform
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              theme === 'light' ? 'text-[#0F172A]' : 'text-white'
            }`}
          >
            Everything You Need to Ship
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              theme === 'light' ? 'text-[#475569]' : 'text-[#929DA7]'
            }`}
          >
            Everything you need to build, deploy, and scale — from bare-metal servers to one-click app hosting, all in one platform.
          </p>
        </div>

        {/* 4 Core Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PLATFORM_SERVICES.map((service) => {
            const displayPrice = getCardPrice(service);
            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  theme === 'light'
                    ? 'bg-[#FFFFFF] border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#FF4B32]/40'
                    : 'bg-[#1C2024] border border-[#929DA7]/20 hover:border-[#FF4B32]/50 shadow-lg shadow-black/30 hover:shadow-2xl hover:shadow-[#FF4B32]/10'
                }`}
              >
                {/* Badge if present */}
                {service.badge && (
                  <div className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-[#FF4B32] text-white shadow-md shadow-[#FF4B32]/30">
                    {service.badge}
                  </div>
                )}

                <div>
                  {/* Card Header & Eyebrow */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
                      }`}
                    >
                      {service.eyebrow}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3
                    className={`text-xl font-extrabold mb-2 group-hover:text-[#FF4B32] transition-colors ${
                      theme === 'light' ? 'text-[#0F172A]' : 'text-white'
                    }`}
                  >
                    {service.name}
                  </h3>

                  {/* Tagline */}
                  <p
                    className={`text-xs leading-relaxed mb-4 min-h-[48px] ${
                      theme === 'light' ? 'text-[#475569]' : 'text-[#929DA7]'
                    }`}
                  >
                    {service.tagline}
                  </p>

                  {/* Pricing Box */}
                  <div
                    className={`mb-5 p-3 rounded-xl border ${
                      theme === 'light' ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#121417] border-[#929DA7]/20'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider block ${
                        theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
                      }`}
                    >
                      {service.pricePrefix || 'Starting'}
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span
                        className={`text-2xl font-black tracking-tight ${
                          theme === 'light' ? 'text-[#0F172A]' : 'text-white'
                        }`}
                      >
                        {displayPrice}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
                        }`}
                      >
                        {service.pricePeriod}
                      </span>
                    </div>
                  </div>

                  {/* Product Specific Realistic Visual */}
                  <div className="mb-5">{getServiceVisual(service.id)}</div>

                  {/* Key Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2 text-xs ${
                          theme === 'light' ? 'text-[#334155]' : 'text-slate-300'
                        }`}
                      >
                        <Check className="w-4 h-4 text-[#FF4B32] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Link */}
                <div
                  className={`pt-4 border-t mt-auto ${
                    theme === 'light' ? 'border-[#E2E8F0]' : 'border-[#929DA7]/15'
                  }`}
                >
                  <a
                    href="https://aiccloud.in/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs group-hover:bg-[#FF4B32] group-hover:text-white cursor-pointer ${
                      theme === 'light'
                        ? 'text-[#0F172A] bg-[#F1F5F9] border border-[#CBD5E1] hover:bg-[#FF4B32] hover:text-white hover:border-[#FF4B32]'
                        : 'text-slate-200 bg-[#252B31] hover:bg-[#FF4B32] hover:text-white'
                    }`}
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
