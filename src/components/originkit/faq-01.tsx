import React, { useState, useMemo } from 'react';
import { Search, HelpCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { FAQ_LIST } from '../../data/landingData';
// @ts-ignore
import { KeycapWall, KeycapButton } from './faq-01-core.js';
import './faq-01.css';

export interface Faq01Props {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  askLink?: string;
  items?: Array<{ id: string; q: string; a: string; category?: string }>;
}

export const Faq01: React.FC<Faq01Props> = ({
  title = 'Questions we get from developers.',
  subtitle = 'Everything you need to know about our cloud instances, bare-metal servers, multi-currency billing, and 24/7 technical support.',
  eyebrow = 'Frequently Asked Questions',
  askLink = 'https://wa.me/917022152606?text=Hi!%20I%20have%20a%20question%20about%20AIC%20Cloud.',
  items = FAQ_LIST,
}) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Billing & Payment', 'Servers & Locations', 'Support'];

  const filteredFaqs = useMemo(() => {
    return items.filter((item) => {
      const matchesCat =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesQuery =
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div id="faq" className="faq-01">
      <section className="faq">
        {/* Sticky Left Column */}
        <div className="side">
          <p className="eyebrow">
            <kbd>?</kbd> {eyebrow}
          </p>
          <h2>{title}</h2>
          <p>{subtitle}</p>

          {/* Interactive Mechanical Keycap Wall Window */}
          <figure className="set" style={{ margin: 0 }}>
            <div id="wall" aria-label="AIC Cloud interactive server nodes">
              <KeycapWall
                background={theme === 'light' ? '#F8FAFC' : '#121417'}
                baseColor={theme === 'light' ? '#FFFFFF' : '#1C2024'}
                accentColor={theme === 'light' ? '#94A3B8' : '#929DA7'}
                lightKeys={38}
                font={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
                  fontWeight: 600,
                  fontSize: 20,
                }}
                size={46}
                gap={6}
                rounded={16}
                speed={20}
                hover={60}
                keys={{ tall: 4, texture: 100, presses: 30 }}
                style={{ width: '100%', height: '100%', minWidth: 0, minHeight: 0 }}
              />
            </div>
            <figcaption>AIC Cloud · Tier-4 Datacenter · 99.99% SLA</figcaption>
          </figure>

          {/* 3D Interactive ASK Key Button */}
          <div className="ask">
            <div id="askKey">
              <KeycapButton
                label="ASK"
                font={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
                  fontWeight: 700,
                  fontSize: '17px',
                  letterSpacing: '0.08em',
                }}
                colors={{
                  fill: '#FF4B32',
                  textColor: '#FFFFFF',
                  hoverTextColor: '#FFFFFF',
                }}
                prism={{
                  color: '#FF6B55',
                  float: 7,
                  intensity: 95,
                  thickness: 14,
                  hoverFloat: 5,
                }}
                padding="14px 28px"
                rounded={24}
                camera={{ tilt: 44, rotate: -34 }}
                link={askLink}
                newTab={true}
                style={{ minWidth: 0, minHeight: 0 }}
              />
            </div>
            <p>
              <b>Ask engineering support</b>
              A cloud architect replies in &lt; 5 minutes on WhatsApp &amp; tickets.
            </p>
          </div>
        </div>

        {/* Right Accordion Column */}
        <div className="flex flex-col gap-6 w-full">
          {/* Search Box & Category Filters */}
          <div className="space-y-3 pb-2">
            <div className="relative">
              <Search
                className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                  theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. UPI, Mumbai datacenter, refund, GPU)..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#FF4B32]/30 focus:border-[#FF4B32] ${
                  theme === 'light'
                    ? 'bg-white border-[#CBD5E1] text-[#0F172A] placeholder-[#94A3B8]'
                    : 'bg-[#14171A] border-[#929DA7]/20 text-white placeholder-[#929DA7]/70'
                }`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#FF4B32] text-white shadow-xs'
                      : theme === 'light'
                      ? 'bg-white text-[#475569] hover:bg-[#F1F5F9] border border-[#CBD5E1]'
                      : 'bg-[#14171A] text-[#929DA7] hover:bg-[#1F2429] border border-[#929DA7]/15'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Native One-At-A-Time OriginKit Details/Summary Accordion List */}
          <div className="list">
            {filteredFaqs.length === 0 ? (
              <div
                className={`text-center py-12 rounded-2xl border my-4 ${
                  theme === 'light'
                    ? 'bg-white border-[#E2E8F0]'
                    : 'bg-[#14171A] border-[#929DA7]/15'
                }`}
              >
                <HelpCircle className={`w-8 h-8 mx-auto mb-2 ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`} />
                <p className={`text-sm font-semibold ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>
                  No matching questions found
                </p>
                <p className={`text-xs mt-1 ${theme === 'light' ? 'text-[#475569]' : 'text-[#929DA7]'}`}>
                  Try searching for other terms or reset the filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-3 text-xs font-bold text-[#FF4B32] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredFaqs.map((item, idx) => (
                <details key={item.id} name="aic-faq" open={idx === 0}>
                  <summary>
                    <span>{item.q}</span>
                    <span className="cap" aria-hidden="true" />
                  </summary>
                  <div className="answer">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq01;

