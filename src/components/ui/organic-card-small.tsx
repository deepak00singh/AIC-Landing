import React, { useId, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Cult UI Organic SVG Cutout Paths
const PATH_IDLE =
  'M670 0H0V91C0 102.046 8.9543 111 20 111H518.641C526.216 111 533.14 106.721 536.529 99.9469L570.988 31.0531C574.377 24.2789 581.301 20 588.875 20H650C661.046 20 670 11.0457 670 0Z';
const PATH_HOVER =
  'M670 0H0V91C0 102.046 8.9543 111 20 111H518.641C526.216 111 533.14 111 536.529 111L570.988 111C574.377 111 581.301 111 588.875 111H650C661.046 111 670 102.046 670 91Z';

const DEFAULT_SURFACE = '#1C2024';

// Hardware-optimized lightweight drop-shadows (single pass, zero Gaussian choke during horizontal scroll)
const SILHOUETTE_SHADOW =
  'drop-shadow(0px 4px 10px rgba(0,0,0,0.22))';
const SILHOUETTE_SHADOW_HOVER =
  'drop-shadow(0px 8px 20px rgba(255,75,50,0.18))';

const SILHOUETTE_SHADOW_LIGHT =
  'drop-shadow(0px 4px 12px rgba(15,23,42,0.06))';
const SILHOUETTE_SHADOW_LIGHT_HOVER =
  'drop-shadow(0px 10px 22px rgba(255,75,50,0.14))';

export interface OrganicCardSmallProps {
  image: string;
  imageAlt?: string;
  category: string;
  date?: string;
  title: string;
  description?: string;
  specs?: string[];
  badge?: string;
  href?: string;
  className?: string;
  surfaceColor?: string;
  ctaText?: string;
  accentColor?: string;
  icon?: React.ReactNode;
}

export function OrganicCardSmall({
  image,
  imageAlt = 'Card image',
  category,
  date,
  title,
  description,
  specs,
  badge,
  href = '#',
  className,
  surfaceColor = DEFAULT_SURFACE,
  ctaText = 'Learn more',
  accentColor = '#FF4B32',
  icon,
}: OrganicCardSmallProps) {
  const reduceMotion = useReducedMotion();
  const cutoutTitleId = useId();
  const [pointerOver, setPointerOver] = useState(false);
  const [focused, setFocused] = useState(false);
  const interactiveActive = pointerOver || focused;
  const isLight = surfaceColor === '#FFFFFF' || surfaceColor === '#F8FAFC';

  const pathTransition = reduceMotion
    ? { duration: 0.12, ease: [0.23, 1, 0.32, 1] as const }
    : { type: 'spring' as const, duration: 0.38, bounce: 0 };

  const shadowIdle = isLight ? SILHOUETTE_SHADOW_LIGHT : SILHOUETTE_SHADOW;
  const shadowHover = isLight ? SILHOUETTE_SHADOW_LIGHT_HOVER : SILHOUETTE_SHADOW_HOVER;

  return (
    <motion.a
      aria-labelledby={cutoutTitleId}
      className={cn(
        'group/organicCard relative flex h-full w-full flex-col rounded-2xl outline-none cursor-pointer transform-gpu',
        'focus-visible:outline-2 focus-visible:outline-[#FF4B32] focus-visible:outline-offset-2',
        className
      )}
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
      }}
      data-state={interactiveActive ? 'active' : 'idle'}
      href={href}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onMouseEnter={() => setPointerOver(true)}
      onMouseLeave={() => setPointerOver(false)}
      transition={{ type: 'spring', duration: 0.28, bounce: 0 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
    >
      {/* Outer shell using SVG silhouette drop-shadow */}
      <div
        className={cn(
          'isolate w-full flex flex-col h-full transform-gpu transition-[filter] duration-200 ease-out',
          reduceMotion && 'transition-none'
        )}
        style={{
          filter: interactiveActive ? shadowHover : shadowIdle,
          willChange: interactiveActive ? 'filter' : 'auto',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Upper Card Body with Rounded Top */}
        <div
          className={`flex w-full flex-1 flex-col justify-between rounded-t-2xl p-4 sm:p-5 border-t border-x ${
            isLight ? 'border-[#E2E8F0]' : 'border-[#929DA7]/20 text-white'
          }`}
          style={{ backgroundColor: surfaceColor }}
        >
          <div>
            {/* Visual Media Header */}
            <div
              className={`relative mb-4 overflow-hidden rounded-xl border ${
                isLight ? 'bg-[#F1F5F9] border-[#E2E8F0]' : 'bg-[#121417] border-[#929DA7]/15'
              }`}
            >
              <img
                alt={imageAlt}
                src={image}
                className={cn(
                  'h-[140px] sm:h-[160px] md:h-[180px] w-full origin-center object-cover',
                  'transition-transform duration-300 ease-out',
                  'motion-reduce:scale-100 motion-reduce:transition-none',
                  interactiveActive && 'scale-[1.03]'
                )}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Optional Category Pill Overlay */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                {icon && (
                  <div
                    style={{ color: accentColor }}
                    className="w-7 h-7 rounded-lg bg-[#17191C]/90 backdrop-blur-md border border-[#929DA7]/30 flex items-center justify-center shadow-sm"
                  >
                    {icon}
                  </div>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-[#17191C]/90 backdrop-blur-md border border-[#929DA7]/30 text-[10px] font-mono font-semibold text-slate-200">
                  {category}
                </span>
              </div>

              {badge && (
                <div className="absolute top-3 right-3">
                  <span
                    style={{ backgroundColor: accentColor }}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-white shadow-xs"
                  >
                    {badge}
                  </span>
                </div>
              )}
            </div>

            {/* Date / Metadata Sub-row */}
            {date && (
              <p
                className={`mb-2 font-mono text-[11px] uppercase tracking-wider ${
                  isLight ? 'text-[#64748B]' : 'text-[#929DA7]'
                }`}
              >
                <span>{date}</span>
              </p>
            )}

            {/* Card Title */}
            <h3
              id={cutoutTitleId}
              className={`text-lg sm:text-xl font-extrabold leading-snug mb-2 group-hover/organicCard:text-[#FF4B32] transition-colors ${
                isLight ? 'text-[#0F172A]' : 'text-white'
              }`}
            >
              {title}
            </h3>

            {/* Optional Description */}
            {description && (
              <p
                className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                  isLight ? 'text-[#475569]' : 'text-[#929DA7]'
                }`}
              >
                {description}
              </p>
            )}

            {/* Optional Specs Chips */}
            {specs && specs.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                {specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono truncate ${
                      isLight
                        ? 'bg-[#F8FAFC] border-[#E2E8F0] text-[#334155]'
                        : 'bg-[#141619] border-[#929DA7]/15 text-slate-300'
                    }`}
                  >
                    <Check className="w-3 h-3 text-[#FF4B32] shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Morphing Organic SVG Cutout Band */}
        <div className="relative -mt-px w-full">
          <svg
            aria-hidden="true"
            className="h-[76px] sm:h-[92px] w-full shrink-0"
            preserveAspectRatio="none"
            viewBox="0 0 670 111"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Organic card footer cutout</title>
            <motion.path
              animate={{ d: interactiveActive ? PATH_HOVER : PATH_IDLE }}
              fill={surfaceColor}
              initial={false}
              transition={pathTransition}
              className={isLight ? 'stroke-[#E2E8F0] stroke-1' : 'stroke-[#929DA7]/20 stroke-1'}
            />
          </svg>

          {/* Bottom Left CTA Text */}
          <div className="pointer-events-none absolute bottom-4 sm:bottom-5 left-5">
            <span
              style={{ color: interactiveActive ? (isLight ? '#0F172A' : '#FFFFFF') : accentColor }}
              className="text-xs sm:text-sm font-bold tracking-tight transition-colors flex items-center gap-1.5"
            >
              <span>{ctaText}</span>
            </span>
          </div>

          {/* Bottom Right Interactive Arrow in Cutout Shelf */}
          <div className="pointer-events-none absolute right-4 sm:right-5 bottom-3 sm:bottom-4">
            <div
              style={
                interactiveActive
                  ? { backgroundColor: accentColor, color: '#FFFFFF' }
                  : isLight
                  ? { backgroundColor: '#F1F5F9', color: '#0F172A' }
                  : { backgroundColor: '#141619', color: '#929DA7' }
              }
              className={cn(
                'w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300',
                interactiveActive
                  ? 'shadow-lg shadow-[#FF4B32]/30 scale-105'
                  : isLight
                  ? 'border border-[#CBD5E1]'
                  : 'border border-[#929DA7]/25'
              )}
            >
              <motion.span
                animate={
                  reduceMotion
                    ? { x: 0 }
                    : { x: interactiveActive ? 3 : 0 }
                }
                transition={
                  reduceMotion
                    ? { duration: 0.12 }
                    : { type: 'spring', duration: 0.32, bounce: 0 }
                }
                className="inline-flex"
              >
                <ArrowRight
                  aria-hidden="true"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  strokeWidth={2.2}
                />
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export const MemoizedOrganicCardSmall = React.memo(OrganicCardSmall);
export default MemoizedOrganicCardSmall;
