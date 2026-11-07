import { useState } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { COMPARISON_ROWS } from '../data/landingData';

export const ComparisonTable: React.FC = () => {
  const { theme } = useTheme();
  const [selectedMobileCompetitor, setSelectedMobileCompetitor] = useState<'bigCloud' | 'budget'>('bigCloud');

  const renderCell = (val: boolean | string, isAIC: boolean = false) => {
    if (typeof val === 'boolean') {
      if (val) {
        return (
          <div className="flex items-center justify-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                isAIC
                  ? 'bg-[#FF4B32]/15 text-[#FF4B32] border border-[#FF4B32]/35 shadow-xs'
                  : theme === 'light'
                  ? 'bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1]'
                  : 'bg-[#1C2024] text-[#929DA7] border border-[#929DA7]/25'
              }`}
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        );
      }
      return (
        <div className="flex items-center justify-center">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center ${
              theme === 'light'
                ? 'bg-[#F8FAFC] text-slate-400 border border-[#E2E8F0]'
                : 'bg-[#17191C] text-slate-500 border border-[#929DA7]/15'
            }`}
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
      );
    }

    // Text string (e.g. "Separate service", "Limited")
    return (
      <div className="flex items-center justify-center">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
            theme === 'light'
              ? 'bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]'
              : 'bg-[#17191C] text-[#929DA7] border border-[#929DA7]/30'
          }`}
        >
          <AlertCircle className="w-3 h-3 text-[#FF4B32] shrink-0" />
          <span>{val}</span>
        </span>
      </div>
    );
  };

  return (
    <section
      id="pricing"
      className={`py-20 lg:py-28 relative transition-colors duration-300 ${
        theme === 'light' ? 'bg-[#F8FAFC]' : 'bg-[#17191C]'
      }`}
    >
      <div className="w-full max-w-7xl xl:max-w-[1380px] 2xl:max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B32]/10 border border-[#FF4B32]/25 text-[#FF4B32] text-xs font-bold uppercase tracking-wider">
            Compare
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              theme === 'light' ? 'text-[#0F172A]' : 'text-white'
            }`}
          >
            How We Compare
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              theme === 'light' ? 'text-[#475569]' : 'text-[#929DA7]'
            }`}
          >
            See how AIC Cloud stacks up against the big cloud providers and budget hosting companies.
          </p>
        </div>

        {/* Mobile View Selector (for screens < 768px) */}
        <div
          className={`md:hidden flex items-center justify-center gap-2 mb-6 p-1 border rounded-xl max-w-xs mx-auto ${
            theme === 'light' ? 'bg-white border-[#CBD5E1]' : 'bg-[#1C2024] border-[#929DA7]/20'
          }`}
        >
          <button
            onClick={() => setSelectedMobileCompetitor('bigCloud')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedMobileCompetitor === 'bigCloud'
                ? 'bg-[#FF4B32] text-white shadow-xs'
                : theme === 'light'
                ? 'text-[#64748B]'
                : 'text-[#929DA7]'
            }`}
          >
            vs Big Cloud
          </button>
          <button
            onClick={() => setSelectedMobileCompetitor('budget')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedMobileCompetitor === 'budget'
                ? 'bg-[#FF4B32] text-white shadow-xs'
                : theme === 'light'
                ? 'text-[#64748B]'
                : 'text-[#929DA7]'
            }`}
          >
            vs Budget Hosting
          </button>
        </div>

        {/* Desktop & Tablet Comparison Matrix */}
        <div
          className={`hidden md:block overflow-hidden rounded-2xl border shadow-xl ${
            theme === 'light' ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#1C2024] border-[#929DA7]/20'
          }`}
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className={`border-b ${
                  theme === 'light' ? 'border-[#E2E8F0] bg-[#F1F5F9]' : 'border-[#929DA7]/20 bg-[#121417]'
                }`}
              >
                <th
                  className={`py-5 px-6 text-sm font-bold uppercase tracking-wider w-2/5 ${
                    theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
                  }`}
                >
                  Feature
                </th>
                <th className="py-5 px-6 text-center w-1/5 bg-[#FF4B32]/[0.08] border-x border-[#FF4B32]/30">
                  <div className="text-base font-extrabold text-[#FF4B32]">AIC Cloud</div>
                  <div className={`text-[11px] font-semibold ${theme === 'light' ? 'text-[#334155]' : 'text-slate-300'}`}>
                    Developer First
                  </div>
                </th>
                <th className="py-5 px-6 text-center w-1/5">
                  <div className={`text-sm font-bold ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>
                    Big Cloud
                  </div>
                  <div className={`text-[11px] ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`}>
                    AWS / GCP / Azure
                  </div>
                </th>
                <th className="py-5 px-6 text-center w-1/5">
                  <div className={`text-sm font-bold ${theme === 'light' ? 'text-[#0F172A]' : 'text-white'}`}>
                    Budget Hosting
                  </div>
                  <div className={`text-[11px] ${theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'}`}>
                    Traditional Providers
                  </div>
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y text-sm ${
                theme === 'light' ? 'divide-[#E2E8F0]' : 'divide-[#929DA7]/15'
              }`}
            >
              {COMPARISON_ROWS.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    theme === 'light' ? 'hover:bg-[#F8FAFC]' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <td
                    className={`py-4 px-6 font-semibold ${
                      theme === 'light' ? 'text-[#0F172A]' : 'text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {row.feature}
                      {row.feature === 'App Hosting Included' && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FF4B32]/15 text-[#FF4B32] border border-[#FF4B32]/25">
                          Built-in
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center bg-[#FF4B32]/[0.04] border-x border-[#FF4B32]/25 font-medium">
                    {renderCell(row.aic, true)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {renderCell(row.bigCloud)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {renderCell(row.budget)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Screen Comparison Card (for screens < 768px) */}
        <div className="md:hidden space-y-3">
          {COMPARISON_ROWS.map((row, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border shadow-sm space-y-3 ${
                theme === 'light' ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#1C2024] border-[#929DA7]/20'
              }`}
            >
              <div
                className={`font-bold text-sm border-b pb-2 ${
                  theme === 'light' ? 'text-[#0F172A] border-[#E2E8F0]' : 'text-white border-[#929DA7]/15'
                }`}
              >
                {row.feature}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* AIC Cloud Cell */}
                <div className="p-2.5 rounded-lg bg-[#FF4B32]/10 border border-[#FF4B32]/25 text-center">
                  <span className="text-[10px] font-bold text-[#FF4B32] block mb-1">
                    AIC Cloud
                  </span>
                  {renderCell(row.aic, true)}
                </div>

                {/* Selected Competitor Cell */}
                <div
                  className={`p-2.5 rounded-lg border text-center ${
                    theme === 'light' ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#17191C] border-[#929DA7]/20'
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold block mb-1 ${
                      theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
                    }`}
                  >
                    {selectedMobileCompetitor === 'bigCloud' ? 'Big Cloud' : 'Budget Hosting'}
                  </span>
                  {renderCell(
                    selectedMobileCompetitor === 'bigCloud' ? row.bigCloud : row.budget
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting note below table */}
        <div
          className={`mt-8 text-center text-xs max-w-2xl mx-auto ${
            theme === 'light' ? 'text-[#64748B]' : 'text-[#929DA7]'
          }`}
        >
          Comparison reflects verified public feature capabilities as of 2026. Big cloud refers to multi-region hyper-scalers; budget hosting refers to traditional cPanel/shared hosts.
        </div>
      </div>
    </section>
  );
};
