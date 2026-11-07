import React from 'react';
import { MessageSquare, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer
      id="footer"
      className={`text-xs border-t transition-colors duration-300 ${
        theme === 'light' ? 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]' : 'bg-[#111316] text-[#929DA7] border-[#929DA7]/15'
      }`}
    >
      <div className="w-full max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-16 pb-12">
        {/* Top Brand & Support Row */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b ${
            theme === 'light' ? 'border-[#E2E8F0]' : 'border-[#929DA7]/15'
          }`}
        >
          <div className="lg:col-span-5 space-y-4">
            <a href="/" className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="AIC Cloud"
                className="w-10 h-10 object-contain"
              />
              <div className="flex flex-col">
                <span
                  className={`text-lg font-bold leading-tight ${
                    theme === 'light' ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  AIC Cloud
                </span>
                <span
                  className={`text-[10px] font-medium ${
                    theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
                  }`}
                >
                  Applied Intelligence Corporation
                </span>
              </div>
            </a>
            <p
              className={`text-xs leading-relaxed max-w-sm ${
                theme === 'light' ? 'text-[#475569]' : 'text-[#929DA7]'
              }`}
            >
              Developer-focused cloud infrastructure for businesses. Everything you need to grow online.
              High-performance VPS, Bare Metal Dedicated, Cloud GPUs and App Hosting.
            </p>
            <div
              className={`flex items-center gap-2 text-[11px] ${
                theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#FF4B32] inline-block" />
              <span>MSME Registered Indian Entity • Operational Since 2024</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
            <div
              className={`p-4 rounded-2xl flex items-center gap-3 border ${
                theme === 'light'
                  ? 'bg-white border-[#CBD5E1] shadow-xs'
                  : 'bg-[#17191C] border-[#929DA7]/20'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0 border border-[#25D366]/20">
                <MessageSquare className="w-5 h-5 text-[#25D366]" />
              </div>
              <div className="text-left">
                <div
                  className={`font-bold text-xs ${
                    theme === 'light' ? 'text-[#0F172A]' : 'text-white'
                  }`}
                >
                  Chat with us on WhatsApp
                </div>
                <div
                  className={`text-[11px] ${
                    theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
                  }`}
                >
                  We reply within minutes
                </div>
              </div>
              <a
                href="https://wa.me/917022152606?text=Hi!%20I%20have%20a%20question%20about%20AIC%20Cloud."
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-colors shrink-0 cursor-pointer"
              >
                Chat Now
              </a>
            </div>
          </div>
        </div>

        {/* 6 Columns Navigation Groups */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 py-12 border-b ${
            theme === 'light' ? 'border-[#E2E8F0]' : 'border-[#929DA7]/15'
          }`}
        >
          {/* Hosting */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${
                theme === 'light' ? 'text-[#0F172A]' : 'text-white'
              }`}
            >
              Hosting
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://aiccloud.in/vps" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Cloud VPS
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/shared-hosting" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Shared Hosting
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/app-hosting" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  App Hosting
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/storage" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Cloud Storage
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/email" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Business Email
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/domains" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Domain Registration
                </a>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${
                theme === 'light' ? 'text-[#0F172A]' : 'text-white'
              }`}
            >
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://aiccloud.in/pricing" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/developers" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Developer API
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/dashboard" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/cloud-gpu" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Cloud GPU
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/bare-metal-server-india" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Bare Metal India
                </a>
              </li>
            </ul>
          </div>

          {/* Compare */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${
                theme === 'light' ? 'text-[#0F172A]' : 'text-white'
              }`}
            >
              Compare
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://aiccloud.in/cloud-vps-comparison" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  VPS Comparison 2026
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/hostinger-alternative-india" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Hostinger Alternative
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/digitalocean-alternative-india" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  DigitalOcean Alternative
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/compare/hetzner" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  AIC vs Hetzner
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/compare/contabo" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  AIC vs Contabo
                </a>
              </li>
            </ul>
          </div>

          {/* VPS Regions */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${
                theme === 'light' ? 'text-[#0F172A]' : 'text-white'
              }`}
            >
              VPS Regions
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://aiccloud.in/vps" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  VPS India (₹99/mo)
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/vps-hosting-mumbai" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  VPS Mumbai (28ms)
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/vps-hosting-delhi" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  VPS Delhi NCR
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/vps-hosting-singapore" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  VPS Singapore
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/cheap-vps-europe" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  VPS Europe (France)
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${
                theme === 'light' ? 'text-[#0F172A]' : 'text-white'
              }`}
            >
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://aiccloud.in/about" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  About AIC Cloud
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/contact" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/blog" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/partners" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Partner Programs
                </a>
              </li>
            </ul>
          </div>

          {/* Help & Legal */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-bold uppercase tracking-wider ${
                theme === 'light' ? 'text-[#0F172A]' : 'text-white'
              }`}
            >
              Help & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://aiccloud.in/docs" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Knowledge Base
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/contact" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/terms" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://aiccloud.in/refund" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4B32] transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row / Copyright */}
        <div
          className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] ${
            theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
          }`}
        >
          <div>
            © 2026 AIC Cloud. Applied Intelligence Corporation. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF4B32]" />
              <span>Proxmox KVM Clusters • Dual Currency</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
