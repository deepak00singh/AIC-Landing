import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Terminal,
  Sparkles,
  Rocket,
  Gamepad2,
  TrendingUp,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { USE_CASES } from '../data/landingData';
import { MemoizedOrganicCardSmall } from './ui/organic-card-small';

const USE_CASE_IMAGES = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=670&h=260&fit=crop&q=80', // DevOps code / terminal
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=670&h=260&fit=crop&q=80', // AI neural network
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=670&h=260&fit=crop&q=80', // SaaS architecture
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=670&h=260&fit=crop&q=80', // Gaming server hardware
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=670&h=260&fit=crop&q=80', // Financial trading bots
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=670&h=260&fit=crop&q=80', // Agencies multi-tenant
];

export const UseCases: React.FC = () => {
  const { theme } = useTheme();
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [activeCard, setActiveCard] = useState<number>(1);

  // High performance refs for locked 60-120 FPS glide without React re-render lag
  const maxShiftRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const activeCardRef = useRef<number>(1);

  // Manual arrow navigation helper
  const scrollToCard = useCallback((direction: 'next' | 'prev') => {
    if (!targetRef.current) return;
    const rect = targetRef.current.getBoundingClientRect();
    const currentScroll = window.scrollY;
    const sectionTop = currentScroll + rect.top;
    const totalScrollableDistance = targetRef.current.offsetHeight - window.innerHeight;
    const step = totalScrollableDistance / (USE_CASES.length - 1);

    const currentIdx = activeCardRef.current;
    const targetIndex =
      direction === 'next'
        ? Math.min(USE_CASES.length - 1, currentIdx)
        : Math.max(0, currentIdx - 2);

    const targetScroll = sectionTop + targetIndex * step;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const calculateShift = () => {
      if (trackRef.current) {
        const scrollW = trackRef.current.scrollWidth;
        const clientW = window.innerWidth;
        const shift = Math.max(0, scrollW - clientW + 96);
        maxShiftRef.current = shift;
      }
    };

    calculateShift();
    const timer = setTimeout(calculateShift, 100);
    window.addEventListener('resize', calculateShift);

    let animationFrameId: number;
    let isRunning = true;

    // Passive scroll listener for zero main-thread blocking
    const onScroll = () => {
      if (!targetRef.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      const totalScrollableDistance = targetRef.current.offsetHeight - window.innerHeight;
      if (totalScrollableDistance <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollableDistance));
      targetProgressRef.current = progress;
    };

    // Hardware-accelerated RAF render loop: direct GPU transform, 0ms input lag, silky smooth lerp
    const updateLoop = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;

      if (Math.abs(diff) > 0.00005) {
        // 0.11 lerp factor: calm, cinematic, luxurious pacing (never rushed, zero overshoot)
        currentProgressRef.current += diff * 0.11;
        if (Math.abs(targetProgressRef.current - currentProgressRef.current) < 0.0001) {
          currentProgressRef.current = targetProgressRef.current;
        }

        const p = currentProgressRef.current;
        const currentX = -p * maxShiftRef.current;

        // 1. Direct GPU matrix translation (bypasses React VDOM diffing completely)
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;
        }

        // 2. Direct progress line transform
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
        }

        // 3. Active card indicator update
        const newCardIdx = Math.min(
          USE_CASES.length,
          Math.max(1, Math.floor(p * (USE_CASES.length - 0.05)) + 1)
        );

        if (newCardIdx !== activeCardRef.current) {
          activeCardRef.current = newCardIdx;
          if (counterRef.current) {
            counterRef.current.textContent = `0${newCardIdx}`;
          }
          // Only update React state on discrete card change to update button disabled states
          setActiveCard(newCardIdx);
        }
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      isRunning = false;
      clearTimeout(timer);
      window.removeEventListener('resize', calculateShift);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const getUseCaseIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-4 h-4 text-[#FF4B32]" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-[#929DA7]" />;
      case 'Rocket':
        return <Rocket className="w-4 h-4 text-[#FF4B32]" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-4 h-4 text-[#929DA7]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4 text-[#FF4B32]" />;
      case 'Briefcase':
        return <Briefcase className="w-4 h-4 text-[#929DA7]" />;
      default:
        return <Terminal className="w-4 h-4 text-[#FF4B32]" />;
    }
  };

  return (
    <section
      ref={targetRef}
      id="use-cases"
      className={`relative h-[320vh] md:h-[500vh] transition-colors duration-300 ${
        theme === 'light' ? 'bg-[#F8FAFC] border-y border-[#E2E8F0]' : 'bg-[#131517] border-y border-[#929DA7]/15'
      }`}
    >
      {/* Sticky viewport frame that locks into place while scrolling through cards */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 sm:pt-24 pb-6 overflow-hidden">
        
        {/* Section Header with Live Card Progress & Controls */}
        <div className="w-full max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B32]/10 border border-[#FF4B32]/25 text-[#FF4B32] text-xs font-bold uppercase tracking-wider">
                Use Cases
              </div>
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
                  theme === 'light' ? 'text-[#0F172A]' : 'text-white'
                }`}
              >
                Built For Every Builder
              </h2>
              <p
                className={`text-xs sm:text-sm lg:text-base leading-relaxed ${
                  theme === 'light' ? 'text-[#475569]' : 'text-[#929DA7]'
                }`}
              >
                Whether you're a solo developer or a growing startup, AIC Cloud has the infrastructure to power your ambitions.
              </p>
            </div>

            {/* Navigation & Progress Controls */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Card count pill */}
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono select-none ${
                  theme === 'light'
                    ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                    : 'bg-[#1C2024] border-[#929DA7]/20 text-xs text-white'
                }`}
              >
                <span className={theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}>Case</span>
                <span ref={counterRef} className="font-bold text-[#FF4B32]">0{activeCard}</span>
                <span className={theme === 'light' ? 'text-[#CBD5E1]' : 'text-[#929DA7]/50'}>/</span>
                <span className={theme === 'light' ? 'text-[#475569]' : 'text-slate-300'}>0{USE_CASES.length}</span>
              </div>

              {/* Manual navigation arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollToCard('prev')}
                  disabled={activeCard === 1}
                  aria-label="Previous use case"
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    activeCard === 1
                      ? theme === 'light'
                        ? 'bg-[#F1F5F9] border-[#E2E8F0] text-slate-300 cursor-not-allowed'
                        : 'bg-[#17191C] border-[#929DA7]/15 text-[#929DA7]/40 cursor-not-allowed'
                      : theme === 'light'
                      ? 'bg-white border-[#CBD5E1] text-[#0F172A] hover:border-[#FF4B32]/50 hover:bg-[#F8FAFC]'
                      : 'bg-[#1C2024] border-[#929DA7]/25 text-white hover:border-[#FF4B32]/50 hover:bg-[#22272C]'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToCard('next')}
                  disabled={activeCard === USE_CASES.length}
                  aria-label="Next use case"
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    activeCard === USE_CASES.length
                      ? theme === 'light'
                        ? 'bg-[#F1F5F9] border-[#E2E8F0] text-slate-300 cursor-not-allowed'
                        : 'bg-[#17191C] border-[#929DA7]/15 text-[#929DA7]/40 cursor-not-allowed'
                      : theme === 'light'
                      ? 'bg-white border-[#CBD5E1] text-[#0F172A] hover:border-[#FF4B32]/50 hover:bg-[#F8FAFC]'
                      : 'bg-[#1C2024] border-[#929DA7]/25 text-white hover:border-[#FF4B32]/50 hover:bg-[#22272C]'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Smooth Horizontal Progress Line */}
          <div
            className={`w-full h-1.5 rounded-full overflow-hidden mt-4 border ${
              theme === 'light' ? 'bg-[#E2E8F0] border-[#CBD5E1]' : 'bg-[#1C2024] border-[#929DA7]/15'
            }`}
          >
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#FF4B32]/60 via-[#FF4B32] to-[#FF4B32] origin-left rounded-full will-change-transform"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>

        {/* Horizontal Track of Organic Cutout Cards */}
        <div className="w-full overflow-hidden py-2 my-auto">
          <div
            ref={trackRef}
            style={{ willChange: 'transform' }}
            className="flex gap-6 sm:gap-8 items-stretch transform-gpu pl-4 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-24 2xl:pl-32 pr-12 sm:pr-20 lg:pr-36"
          >
            {USE_CASES.map((uc, idx) => (
              <div
                key={idx}
                className="w-[340px] sm:w-[480px] md:w-[540px] lg:w-[600px] xl:w-[640px] shrink-0 transform-gpu"
              >
                <MemoizedOrganicCardSmall
                  category={uc.tag}
                  badge={`0${idx + 1} / 0${USE_CASES.length}`}
                  date="Cloud Infrastructure • Ready in 60s"
                  title={uc.title}
                  description={uc.desc}
                  specs={uc.specs}
                  ctaText={`Deploy ${uc.title}`}
                  href="https://aiccloud.in/dashboard"
                  image={USE_CASE_IMAGES[idx]}
                  imageAlt={`${uc.title} workload visualization`}
                  icon={getUseCaseIcon(uc.icon)}
                  surfaceColor={theme === 'light' ? '#FFFFFF' : '#181B1F'}
                  className={`transition-all duration-300 ${
                    theme === 'light'
                      ? 'ring-1 ring-[#E2E8F0] hover:ring-[#FF4B32]/60 hover:shadow-xl'
                      : 'ring-1 ring-[#929DA7]/20 hover:ring-[#FF4B32]/60 hover:shadow-xl'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Interactive Guide Bar */}
        <div className="w-full max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#929DA7] pt-2 border-t border-[#929DA7]/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF4B32] animate-pulse" />
              <span>Scroll down to glide smoothly through all 6 architecture use cases</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span>{activeCard === USE_CASES.length ? 'All architectures viewed • Continue scrolling for FAQ' : 'Scroll down for next card'}</span>
              <span className="text-[#FF4B32]">↓</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default UseCases;
