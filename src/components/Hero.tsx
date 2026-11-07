import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Globe } from './ui/Globe';
import { useTheme } from '../context/ThemeContext';

interface HeroProps {
  currency: 'INR' | 'USD';
}

export const Hero: React.FC<HeroProps> = ({ currency }) => {
  const { theme } = useTheme();
  const currentPrice = currency === 'INR' ? '₹99/mo' : '$1.19/mo';

  return (
    <section
      id="hero"
      className={`relative min-h-[100dvh] h-auto lg:h-[100dvh] lg:min-h-[860px] w-full flex flex-col justify-between overflow-hidden select-none transition-colors duration-300 ${
        theme === 'light' ? 'bg-gradient-to-b from-[#DCE3EB] via-[#E8EDF3] to-[#F8FAFC]' : 'bg-[#17191C]'
      }`}
    >
      {/* Background Graphic Layers: OriginKit Scanlines (Only in Dark Mode to prevent muddy wash in Light Mode) */}
      {theme === 'dark' && (
        <>
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover sm:hidden opacity-60 grayscale contrast-125"
            src="/bg.png"
          />
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover hidden sm:block xl:hidden opacity-60 grayscale contrast-125"
            src="/bg-ipad.png"
          />
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover hidden xl:block opacity-60 grayscale contrast-125"
            src="/bg-desktop.png"
          />
        </>
      )}

      {/* Light Mode Architectural Developer Dot Grid */}
      {theme === 'light' && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#CBD5E1_1.2px,transparent_1.2px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)] -z-10"
          aria-hidden="true"
        />
      )}

      {/* Ambient Lighting & Horizon Glow */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-56 pointer-events-none blur-3xl -z-10 ${
          theme === 'light'
            ? 'bg-gradient-to-b from-[#FF4B32]/[0.08] via-[#FF6B55]/[0.04] to-transparent'
            : 'bg-gradient-to-b from-[#FF4B32]/[0.08] via-[#929DA7]/[0.03] to-transparent'
        }`}
        aria-hidden="true"
      />

      {/* Radiant Spotlight Directly Behind the 3D Globe Stage in Light Mode */}
      {theme === 'light' ? (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[520px] lg:h-[520px] rounded-full bg-gradient-to-tr from-[#FF4B32]/12 via-[#CBD5E1]/30 to-transparent blur-[60px] sm:blur-[90px] pointer-events-none -z-10"
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] lg:w-[600px] lg:h-[600px] rounded-full bg-[#929DA7]/[0.05] blur-[80px] sm:blur-[140px] pointer-events-none -z-10"
          aria-hidden="true"
        />
      )}

      {/* Main Content Container - Centered and tight on Mobile, spacious on Desktop */}
      <div className="relative w-full z-20 flex flex-col justify-center lg:justify-between pt-24 sm:pt-28 lg:pt-28 xl:pt-32 pb-10 sm:pb-12 lg:pb-4 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto h-full min-h-[calc(100dvh-64px)] lg:min-h-0">

        {/* Top Centered Header & Copy */}
        <div className="relative z-30 text-center max-w-3xl mx-auto space-y-3 sm:space-y-3.5 pt-2 sm:pt-3 lg:pt-3">

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-[42px] lg:text-[48px] xl:text-[52px] font-black tracking-[-0.03em] leading-[1.15] sm:leading-[1.08] max-w-4xl mx-auto px-2">
            <span
              className={`block transition-colors duration-300 ${
                theme === 'light'
                  ? 'text-[#0F172A] drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                  : 'text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.08)]'
              }`}
            >
              Build, Deploy & Scale
            </span>
            <span className="block bg-gradient-to-r from-[#FF4B32] via-[#FF5F49] to-[#FF7A66] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(255,75,50,0.35)]">
              Cloud Infrastructure
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xs sm:text-sm md:text-[14.5px] leading-relaxed max-w-xl mx-auto pt-0.5 sm:pt-1 transition-colors duration-300 font-normal px-2 ${
              theme === 'light' ? 'text-[#475569]' : 'text-[#94A3B8]'
            }`}
          >
            Deploy VPS, dedicated servers, GPU instances and app hosting — all from a single dashboard.{' '}
            <span
              className={`inline-block font-semibold px-2 py-0.5 rounded-full text-xs transition-colors duration-300 ${
                theme === 'light'
                  ? 'bg-[#FF4B32]/12 text-[#FF4B32] border border-[#FF4B32]/25'
                  : 'bg-[#FF4B32]/15 text-[#FF7A66] border border-[#FF4B32]/30'
              }`}
            >
              Starting at just {currentPrice}
            </span>
            .
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-2 sm:pt-3 w-full max-w-xs sm:max-w-none mx-auto">
            <a
              href="#platform-services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#FF4B32] via-[#FF553D] to-[#E63E26] hover:from-[#E63E26] hover:to-[#D1341E] shadow-[0_4px_20px_rgba(255,75,50,0.38)] hover:shadow-[0_8px_28px_rgba(255,75,50,0.5)] border border-[#FF6B55]/30 transition-all hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
            >
              <span>Explore Cloud Services</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#pricing"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 rounded-full font-semibold text-sm transition-all active:scale-[0.98] cursor-pointer ${
                theme === 'light'
                  ? 'text-[#1E293B] hover:text-[#0F172A] bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#94A3B8] shadow-xs'
                  : 'text-[#E2E8F0] hover:text-white bg-[#1A1E23]/90 hover:bg-[#242A32] border border-[#334155] hover:border-[#475569] backdrop-blur-sm shadow-sm'
              }`}
            >
              <span>View Pricing</span>
            </a>
          </div>
        </div>

        {/* Centerpiece Stage: Interactive 3D Globe */}
        <div className="relative w-full mt-6 sm:mt-8 lg:mt-0 lg:flex-1 lg:my-auto min-h-[260px] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[460px] flex items-center justify-center overflow-visible">

          {/* Central Anchor Stage for Globe + Hands together */}
          <div className="relative w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] md:w-[410px] md:h-[410px] lg:w-[460px] lg:h-[460px] xl:w-[500px] xl:h-[500px] flex items-center justify-center">

            {/* HAND 1: Reaches in from LOWER-LEFT side towards globe (Locked to Central Anchor Stage) */}
            <div
              className="hidden md:block absolute right-[65%] lg:right-[72%] xl:right-[75%] -bottom-20 lg:-bottom-28 xl:-bottom-36 md:w-[640px] lg:w-[720px] xl:w-[800px] pointer-events-none select-none z-20 animate-hand-bottom-left"
              style={{
                maskImage: 'linear-gradient(42deg, transparent 0%, rgba(0,0,0,0.2) 3%, rgba(0,0,0,0.8) 8%, #000 15%, #000 100%)',
                WebkitMaskImage: 'linear-gradient(42deg, transparent 0%, rgba(0,0,0,0.2) 3%, rgba(0,0,0,0.8) 8%, #000 15%, #000 100%)',
              }}
            >
              <img
                alt="Left Reaching Hand"
                className={`w-full h-auto object-contain pointer-events-none select-none ${
                  theme === 'light'
                    ? 'drop-shadow-[0_16px_40px_rgba(15,23,42,0.18)]'
                    : 'drop-shadow-[0_10px_40px_rgba(146,157,167,0.35)]'
                }`}
                style={{
                  transform: 'rotate(5deg) scale(0.88)',
                  transformOrigin: 'bottom left',
                  filter: theme === 'light' ? 'grayscale(1) brightness(1.02) contrast(1.08)' : 'grayscale(0.8) brightness(1.05) contrast(1.1)',
                }}
                src="/hand-left.png"
              />
            </div>

            {/* HAND 2: Reaches in from UPPER-RIGHT side towards upper-right region of globe (Desktop & Tablet) */}
            <div
              className="hidden md:block absolute left-[80%] lg:left-[92%] xl:left-[90%] -top-40 lg:-top-48 xl:-top-[225px] md:w-[620px] lg:w-[700px] xl:w-[760px] pointer-events-none select-none z-10 animate-hand-top-right"
              style={{
                maskImage: 'linear-gradient(to right, #000 0%, #000 65%, rgba(0,0,0,0.8) 78%, rgba(0,0,0,0.3) 90%, transparent 99%)',
                WebkitMaskImage: 'linear-gradient(to right, #000 0%, #000 65%, rgba(0,0,0,0.8) 78%, rgba(0,0,0,0.3) 90%, transparent 99%)',
              }}
            >
              <img
                alt="Right Reaching Hand"
                className={`w-full h-auto object-contain pointer-events-none select-none ${
                  theme === 'light'
                    ? 'drop-shadow-[0_16px_40px_rgba(15,23,42,0.18)]'
                    : 'drop-shadow-[0_10px_40px_rgba(146,157,167,0.35)]'
                }`}
                style={{
                  transform: 'rotate(-5deg)',
                  filter: theme === 'light' ? 'grayscale(1) brightness(1.02) contrast(1.08)' : 'grayscale(0.8) brightness(1.05) contrast(1.1)',
                }}
                src="/hand-right.png"
              />
            </div>

            {/* 3D Interactive WebGL Globe in Center */}
            <div className="relative z-20 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
              <Globe
                scale={9.0}
                stopOnHover={true}
                initialLatitude={23}
                initialLongitude={-23}
                fill="dots"
                dots={{
                  color: theme === 'light' ? '#0F172A' : '#929DA7',
                  size: 5,
                  density: 8,
                  allDots: false,
                }}
                showOutline={true}
                outlineColor={theme === 'light' ? '#475569' : '#929DA7'}
                showGrid={true}
                graticuleColor={theme === 'light' ? 'rgba(71, 85, 105, 0.22)' : 'rgba(146, 157, 167, 0.45)'}
                oceanColor={theme === 'light' ? '#D8E2EC' : '#17191C'}
                markerConfig={{
                  markers: [
                    { lat: 19.076, lng: 72.8777 },  // Mumbai (BOM-1)
                    { lat: 28.6139, lng: 77.209 },  // Delhi (DEL-1)
                    { lat: 50.1109, lng: 8.6821 },  // Frankfurt (FRA-1)
                    { lat: 1.3521, lng: 103.8198 }, // Singapore (SIN-1)
                    { lat: 40.7128, lng: -74.006 }, // New York (NYC-1)
                  ],
                  color: '#FF4B32',
                  size: 55,
                }}
                arcConfig={{
                  show: true,
                  color: '#FF4B32',
                  width: 1.3,
                  altitude: 0.18,
                  opacity: 0.88,
                  connectAllMarkers: true,
                }}
                style={{ width: '100%', height: '100%' }}
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
