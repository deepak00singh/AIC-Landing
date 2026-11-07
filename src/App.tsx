import { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustIndicators } from './components/TrustIndicators';
import { PlatformServices } from './components/PlatformServices';
import { WhyAICCloud } from './components/WhyAICCloud';
import { ComparisonTable } from './components/ComparisonTable';
import { UseCases } from './components/UseCases';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';

function MainLayout() {
  const { theme } = useTheme();
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [lang, setLang] = useState<string>('EN');

  return (
    <div
      className={`min-h-screen w-full flex flex-col font-sans transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-[#F8FAFC] text-[#0F172A] selection:bg-[#FF4B32]/25 selection:text-[#0F172A]'
          : 'bg-[#17191C] text-[#F8FAFC] selection:bg-[#FF4B32]/30 selection:text-white'
      }`}
    >
      {/* 1. Navigation Bar */}
      <Navbar
        currency={currency}
        onCurrencyChange={setCurrency}
        lang={lang}
        onLangChange={setLang}
      />

      <main id="main-content" className="flex-1">
        {/* 2 & 3. Hero Section & Infrastructure Dashboard Preview */}
        <Hero currency={currency} />

        {/* 4. Trust Indicators */}
        <TrustIndicators />

        {/* 5. Platform Services */}
        <PlatformServices currency={currency} />

        {/* 6. Why AIC Cloud */}
        <WhyAICCloud />

        {/* 7. Comparison Table */}
        <ComparisonTable />

        {/* 8. Use Cases */}
        <UseCases />

        {/* 9. FAQ */}
        <FAQ />

        {/* 10. Final CTA */}
        <FinalCTA currency={currency} />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Floating WhatsApp Support Widget */}
      <WhatsAppWidget />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
