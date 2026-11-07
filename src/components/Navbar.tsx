import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  Globe,
  Menu,
  X,
  Server,
  HardDrive,
  Cpu,
  Layers,
  Mail,
  Database,
  ArrowRight,
  ExternalLink,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { NAV_PRODUCTS } from '../data/landingData';

interface NavbarProps {
  currency: 'INR' | 'USD';
  onCurrencyChange: (c: 'INR' | 'USD') => void;
  lang: string;
  onLangChange: (l: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onCurrencyChange,
  lang,
  onLangChange,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server':
        return <Server className="w-4 h-4 text-[#FF4B32]" />;
      case 'HardDrive':
        return <HardDrive className={`w-4 h-4 ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`} />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-[#FF4B32]" />;
      case 'Layers':
        return <Layers className={`w-4 h-4 ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`} />;
      case 'Mail':
        return <Mail className="w-4 h-4 text-[#FF4B32]" />;
      case 'Database':
        return <Database className={`w-4 h-4 ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`} />;
      default:
        return <Server className="w-4 h-4 text-[#FF4B32]" />;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        theme === 'light'
          ? isScrolled
            ? 'bg-[#FFFFFF]/90 backdrop-blur-md shadow-sm border-b border-[#E2E8F0] py-2.5'
            : 'bg-[#FFFFFF]/80 backdrop-blur-sm border-b border-[#E2E8F0]/70 py-3.5'
          : isScrolled
          ? 'bg-[#17191C]/92 backdrop-blur-md shadow-lg shadow-black/20 border-b border-[#929DA7]/15 py-2.5'
          : 'bg-[#17191C]/80 backdrop-blur-sm border-b border-[#929DA7]/10 py-3.5'
      }`}
    >
      <div className="w-full max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#FF4B32]/30 rounded-lg p-1"
          >
            <img
              src="/logo.png"
              alt="AIC Cloud Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col text-left">
              <span
                className={`text-lg sm:text-xl font-bold tracking-tight leading-tight ${
                  theme === 'light' ? 'text-[#0F172A]' : 'text-white'
                }`}
              >
                AIC Cloud
              </span>
              <span
                className={`text-[10px] sm:text-xs font-semibold tracking-wider uppercase -mt-0.5 ${
                  theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
                }`}
              >
                Cloud Infrastructure
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  productsOpen
                    ? 'text-[#FF4B32] bg-[#FF4B32]/10'
                    : theme === 'light'
                    ? 'text-[#334155] hover:text-[#FF4B32] hover:bg-[#F1F5F9]'
                    : 'text-slate-200 hover:text-[#FF4B32] hover:bg-white/[0.04]'
                }`}
                onClick={() => setProductsOpen(!productsOpen)}
                aria-expanded={productsOpen}
                aria-haspopup="true"
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    productsOpen ? 'rotate-180 text-[#FF4B32]' : theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
                  }`}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {productsOpen && (
                <div
                  className={`absolute top-full left-0 mt-1.5 w-[560px] rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2.5 animate-in fade-in slide-in-from-top-2 duration-150 ${
                    theme === 'light'
                      ? 'bg-[#FFFFFF] border border-[#E2E8F0] shadow-slate-300/40'
                      : 'bg-[#1C2024] border border-[#929DA7]/20 shadow-black/60'
                  }`}
                >
                  {NAV_PRODUCTS.map((prod) => (
                    <a
                      key={prod.name}
                      href={prod.href}
                      onClick={() => setProductsOpen(false)}
                      className={`group flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                        theme === 'light' ? 'hover:bg-[#F8FAFC]' : 'hover:bg-white/[0.05]'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                          theme === 'light'
                            ? 'bg-[#F1F5F9] border-[#E2E8F0] group-hover:border-[#FF4B32]/40'
                            : 'bg-[#17191C] border-[#929DA7]/20 group-hover:border-[#FF4B32]/40'
                        }`}
                      >
                        {getProductIcon(prod.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-semibold transition-colors group-hover:text-[#FF4B32] ${
                              theme === 'light' ? 'text-[#0F172A]' : 'text-white'
                            }`}
                          >
                            {prod.name}
                          </span>
                          {prod.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FF4B32]/15 text-[#FF4B32] border border-[#FF4B32]/25">
                              {prod.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-xs line-clamp-1 mt-0.5 ${
                            theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
                          }`}
                        >
                          {prod.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                  <div
                    className={`col-span-2 pt-2 mt-1 border-t flex items-center justify-between px-2 text-xs ${
                      theme === 'light'
                        ? 'border-[#E2E8F0] text-[#64748B]'
                        : 'border-[#929DA7]/15 text-[#929DA7]'
                    }`}
                  >
                    <span>Enterprise hardware • 99.9% Uptime SLA</span>
                    <a
                      href="#platform-services"
                      onClick={() => setProductsOpen(false)}
                      className="text-[#FF4B32] font-semibold flex items-center gap-1 hover:underline"
                    >
                      View all services <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#pricing"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                theme === 'light'
                  ? 'text-[#334155] hover:text-[#FF4B32] hover:bg-[#F1F5F9]'
                  : 'text-slate-200 hover:text-[#FF4B32] hover:bg-white/[0.04]'
              }`}
            >
              Pricing
            </a>
            <a
              href="#use-cases"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                theme === 'light'
                  ? 'text-[#334155] hover:text-[#FF4B32] hover:bg-[#F1F5F9]'
                  : 'text-slate-200 hover:text-[#FF4B32] hover:bg-white/[0.04]'
              }`}
            >
              Developers
            </a>
            <a
              href="#why-aic"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                theme === 'light'
                  ? 'text-[#334155] hover:text-[#FF4B32] hover:bg-[#F1F5F9]'
                  : 'text-slate-200 hover:text-[#FF4B32] hover:bg-white/[0.04]'
              }`}
            >
              About
            </a>
            <a
              href="#faq"
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                theme === 'light'
                  ? 'text-[#334155] hover:text-[#FF4B32] hover:bg-[#F1F5F9]'
                  : 'text-slate-200 hover:text-[#FF4B32] hover:bg-white/[0.04]'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Desktop Controls (Currency, Lang, Theme Switcher, Dashboard Button) */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Theme Toggle Button (Light / Dark) */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all cursor-pointer border ${
                theme === 'light'
                  ? 'bg-[#F1F5F9] border-[#CBD5E1] text-[#0F172A] hover:bg-[#E2E8F0] shadow-xs'
                  : 'bg-[#1C2024] border-[#929DA7]/25 text-[#929DA7] hover:text-white hover:bg-white/[0.06]'
              }`}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Option 1 Light Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-[#0F172A]" />
              ) : (
                <Sun className="w-4 h-4 text-[#FF4B32]" />
              )}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer border ${
                  theme === 'light'
                    ? 'text-[#334155] bg-white border-[#CBD5E1] hover:bg-[#F1F5F9]'
                    : 'text-slate-300 bg-[#1C2024] border-[#929DA7]/20 hover:bg-white/[0.06]'
                }`}
                aria-label="Select Language"
              >
                <Globe className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`} />
                <span>{lang}</span>
                <ChevronDown className={`w-3 h-3 ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`} />
              </button>
              {langOpen && (
                <div
                  className={`absolute right-0 mt-1 w-28 rounded-xl shadow-xl border py-1 z-50 text-xs font-medium ${
                    theme === 'light'
                      ? 'bg-white border-[#CBD5E1] shadow-slate-300/40'
                      : 'bg-[#1C2024] border-[#929DA7]/25 shadow-black/60'
                  }`}
                  onMouseLeave={() => setLangOpen(false)}
                >
                  {['EN', 'HI', 'AR', 'ZH', 'ES', 'FR'].map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        onLangChange(l);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 transition-colors flex items-center justify-between ${
                        lang === l
                          ? 'text-[#FF4B32] font-bold bg-[#FF4B32]/10'
                          : theme === 'light'
                          ? 'text-[#334155] hover:bg-[#F1F5F9]'
                          : 'text-slate-200 hover:bg-white/[0.06]'
                      }`}
                    >
                      <span>{l}</span>
                      {lang === l && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B32]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  theme === 'light'
                    ? 'text-[#334155] bg-white border-[#CBD5E1] hover:bg-[#F1F5F9]'
                    : 'text-slate-200 bg-[#1C2024] border-[#929DA7]/25 hover:bg-white/[0.06]'
                }`}
                aria-label="Select Currency"
              >
                {currency === 'INR' ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-4 h-3 rounded-xs flex items-center justify-center text-[9px] font-bold leading-none">
                      🇮🇳
                    </span>
                    <span>INR (₹)</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <span className="w-4 h-3 rounded-xs flex items-center justify-center text-[9px] font-bold leading-none">
                      🇺🇸
                    </span>
                    <span>USD ($)</span>
                  </span>
                )}
                <ChevronDown className={`w-3 h-3 ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`} />
              </button>
              {currencyOpen && (
                <div
                  className={`absolute right-0 mt-1 w-32 rounded-xl shadow-xl border py-1 z-50 text-xs font-medium ${
                    theme === 'light'
                      ? 'bg-white border-[#CBD5E1] shadow-slate-300/40'
                      : 'bg-[#1C2024] border-[#929DA7]/25 shadow-black/60'
                  }`}
                  onMouseLeave={() => setCurrencyOpen(false)}
                >
                  <button
                    onClick={() => {
                      onCurrencyChange('INR');
                      setCurrencyOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 transition-colors flex items-center gap-2 ${
                      currency === 'INR'
                        ? 'text-[#FF4B32] font-bold bg-[#FF4B32]/10'
                        : theme === 'light'
                        ? 'text-[#334155] hover:bg-[#F1F5F9]'
                        : 'text-slate-200 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>🇮🇳</span>
                    <span>INR (₹)</span>
                  </button>
                  <button
                    onClick={() => {
                      onCurrencyChange('USD');
                      setCurrencyOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 transition-colors flex items-center gap-2 ${
                      currency === 'USD'
                        ? 'text-[#FF4B32] font-bold bg-[#FF4B32]/10'
                        : theme === 'light'
                        ? 'text-[#334155] hover:bg-[#F1F5F9]'
                        : 'text-slate-200 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>🇺🇸</span>
                    <span>USD ($)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Dashboard Link / Button (Vibrant Coral Orange) */}
            <a
              href="https://aiccloud.in/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#FF4B32] hover:bg-[#E63E26] shadow-md shadow-[#FF4B32]/25 transition-all hover:shadow-[#FF4B32]/40 active:scale-95"
            >
              <span>Dashboard</span>
              <ExternalLink className="w-3 h-3 opacity-90" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button & Mobile Theme Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className={`p-1.5 text-xs font-semibold rounded-md border ${
                theme === 'light'
                  ? 'border-[#CBD5E1] bg-white text-[#0F172A]'
                  : 'border-[#929DA7]/25 bg-[#1C2024] text-slate-200'
              }`}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#FF4B32]" />}
            </button>
            <button
              onClick={() => onCurrencyChange(currency === 'INR' ? 'USD' : 'INR')}
              className={`px-2 py-1 text-xs font-semibold rounded-md border ${
                theme === 'light'
                  ? 'border-[#CBD5E1] bg-white text-[#0F172A]'
                  : 'border-[#929DA7]/25 bg-[#1C2024] text-slate-200'
              }`}
            >
              {currency}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'light' ? 'text-[#334155] hover:bg-[#F1F5F9]' : 'text-slate-300 hover:bg-white/[0.06]'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200 ${
            theme === 'light'
              ? 'bg-[#FFFFFF] border-[#E2E8F0]'
              : 'bg-[#17191C] border-[#929DA7]/20'
          }`}
        >
          <div className="space-y-1">
            <p
              className={`px-3 text-xs font-bold uppercase tracking-wider ${
                theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
              }`}
            >
              Products
            </p>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {NAV_PRODUCTS.map((prod) => (
                <a
                  key={prod.name}
                  href={prod.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-lg flex items-center gap-2 text-xs font-semibold ${
                    theme === 'light' ? 'hover:bg-[#F8FAFC] text-[#0F172A]' : 'hover:bg-white/[0.05] text-slate-200'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border ${
                      theme === 'light' ? 'bg-[#F1F5F9] border-[#E2E8F0]' : 'bg-[#1C2024] border-[#929DA7]/20'
                    }`}
                  >
                    {getProductIcon(prod.icon)}
                  </div>
                  <span className="truncate">{prod.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div
            className={`pt-2 border-t flex flex-col gap-1 ${
              theme === 'light' ? 'border-[#E2E8F0]' : 'border-[#929DA7]/15'
            }`}
          >
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 text-sm font-semibold rounded-lg ${
                theme === 'light' ? 'text-[#334155] hover:bg-[#F1F5F9]' : 'text-slate-200 hover:bg-white/[0.05]'
              }`}
            >
              Pricing
            </a>
            <a
              href="#use-cases"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 text-sm font-semibold rounded-lg ${
                theme === 'light' ? 'text-[#334155] hover:bg-[#F1F5F9]' : 'text-slate-200 hover:bg-white/[0.05]'
              }`}
            >
              Developers & Use Cases
            </a>
            <a
              href="#why-aic"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 text-sm font-semibold rounded-lg ${
                theme === 'light' ? 'text-[#334155] hover:bg-[#F1F5F9]' : 'text-slate-200 hover:bg-white/[0.05]'
              }`}
            >
              Why AIC Cloud
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 text-sm font-semibold rounded-lg ${
                theme === 'light' ? 'text-[#334155] hover:bg-[#F1F5F9]' : 'text-slate-200 hover:bg-white/[0.05]'
              }`}
            >
              FAQ
            </a>
          </div>

          <div
            className={`pt-3 border-t flex items-center justify-between ${
              theme === 'light' ? 'border-[#E2E8F0]' : 'border-[#929DA7]/15'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`text-xs ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`}>Language:</span>
              <span className={`text-xs font-bold ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>{lang}</span>
            </div>
            <a
              href="https://aiccloud.in/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold text-white bg-[#FF4B32] hover:bg-[#E63E26] rounded-lg shadow-sm"
            >
              Launch Dashboard →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
