import React from 'react';
import { TargetDomain, UserMemoryProfile } from '../types';
import {
  Calendar,
  Shield,
  Coffee,
  Building2,
  Stethoscope,
  Clock,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

interface HostSiteMockProps {
  domain: TargetDomain;
  profile: UserMemoryProfile;
  onOpenChat: () => void;
}

export const HostSiteMock: React.FC<HostSiteMockProps> = ({
  domain,
  profile,
  onOpenChat,
}) => {
  if (domain === 'clinic' || (domain === 'new_visitor' && profile.domainName.includes('Aura'))) {
    return (
      <div className="min-h-full bg-[#FAF9FB] pb-24 text-[#111111]">
        {/* Clinic Mock Banner */}
        <section className="border-b border-[#1E1A3C]/8 bg-white px-6 py-10 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B4A]">
                  Dermatology & Precision Aesthetics
                </span>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1E1A3C] sm:text-4xl text-balance">
                  Aura Dermatology & Wellness
                </h1>
                <p className="mt-3 text-sm text-[#636681] leading-relaxed">
                  Advanced dermatological therapeutics, laser resurfacing, and personalized skin health regimens overseen by board-certified physicians.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenChat}
                    className="flex items-center gap-2 rounded-xl bg-[#1E1A3C] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#2A2552]"
                  >
                    <Stethoscope className="h-4 w-4 text-[#FF6B4A]" />
                    <span>Talk to Remi (Patient Concierge)</span>
                  </button>
                  <span className="text-xs text-[#636681]">
                    Open Mon–Sat 8:00 AM – 6:00 PM EST
                  </span>
                </div>
              </div>

              {/* Patient Quick Chart Card */}
              {profile.domain !== 'new_visitor' && (
                <div className="w-full rounded-2xl border border-[#1E1A3C]/10 bg-[#FFFFFF] p-5 shadow-sm md:w-80">
                  <div className="flex items-center justify-between border-b border-[#1E1A3C]/6 pb-3">
                    <span className="text-xs font-semibold text-[#1E1A3C]">
                      Patient Quick Summary
                    </span>
                    <span className="text-[11px] text-[#FF6B4A] font-medium">
                      Active File
                    </span>
                  </div>
                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] text-[#636681]">PATIENT</span>
                      <p className="font-semibold text-[#111111]">{profile.name}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#636681]">LAST VISIT</span>
                      <p className="font-medium text-[#111111]">{profile.lastRecord.title}</p>
                      <p className="text-[10px] text-[#636681]">{profile.lastRecord.date}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#636681]">ATTENDING PHYSICIAN</span>
                      <p className="font-medium text-[#111111]">Dr. Elena Rousseau</p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenChat}
                    className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#FFF0ED] py-2 text-xs font-semibold text-[#FF6B4A] hover:bg-[#FF6B4A] hover:text-white transition-colors"
                  >
                    <Clock className="h-3.5 w-3.5" />
                    <span>Manage Appointment via Remi</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Clinic Services Grid */}
        <section className="mx-auto max-w-5xl px-6 py-10 lg:px-12">
          <h2 className="text-lg font-bold text-[#1E1A3C] mb-4">
            Clinical Services & Regimen Care
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#1E1A3C]/8 bg-white p-5 shadow-2xs">
              <h3 className="text-sm font-bold text-[#111111]">Hydrafacial MD Barrier Care</h3>
              <p className="mt-1 text-xs text-[#636681] leading-relaxed">
                4-step vacuum extraction and peptide infusion engineered for reactive and compromised skin barriers.
              </p>
            </div>

            <div className="rounded-xl border border-[#1E1A3C]/8 bg-white p-5 shadow-2xs">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF0ED] text-[#FF6B4A]">
                <Shield className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-[#111111]">Allergy & Sensitivity Audits</h3>
              <p className="mt-1 text-xs text-[#636681] leading-relaxed">
                Patch testing and contraindication screening retained permanently across patient charting.
              </p>
            </div>

            <div className="rounded-xl border border-[#1E1A3C]/8 bg-white p-5 shadow-2xs">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF0ED] text-[#FF6B4A]">
                <Calendar className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-[#111111]">Provider Continuity Schedule</h3>
              <p className="mt-1 text-xs text-[#636681] leading-relaxed">
                Never re-explain your preferred morning appointment windows or historical tolerance.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (domain === 'subscription') {
    return (
      <div className="min-h-full bg-[#FAF9FB] pb-24 text-[#111111]">
        {/* Subscription Header */}
        <section className="border-b border-[#1E1A3C]/8 bg-white px-6 py-10 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B4A]">
                  Artisan Coffee Roasters · Member Portal
                </span>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1E1A3C] sm:text-4xl">
                  RoastCraft Specialty Coffee Co.
                </h1>
                <p className="mt-3 text-sm text-[#636681] leading-relaxed">
                  Single-origin lots roasted 24 hours before dispatch, tailored to your exact grind size, brew gear, and acidity preference.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenChat}
                    className="flex items-center gap-2 rounded-xl bg-[#1E1A3C] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#2A2552]"
                  >
                    <Coffee className="h-4 w-4 text-[#FF6B4A]" />
                    <span>Manage My Subscription</span>
                  </button>
                  <span className="text-xs text-[#636681]">
                    Next dispatch cycle: Tuesday, Oct 3
                  </span>
                </div>
              </div>

              {/* Member Status Card */}
              <div className="w-full rounded-2xl border border-[#1E1A3C]/10 bg-[#FFFFFF] p-5 shadow-sm md:w-80">
                <div className="flex items-center justify-between border-b border-[#1E1A3C]/6 pb-3">
                  <span className="text-xs font-semibold text-[#1E1A3C]">
                    Subscription #RC-94182
                  </span>
                  <span className="text-[11px] text-[#16A34A] font-medium">
                    Active · Cycle #8
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#636681]">MEMBER</span>
                    <p className="font-semibold text-[#111111]">{profile.name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#636681]">NEXT DELIVERY</span>
                    <p className="font-medium text-[#111111]">Tuesday, Oct 3, 2026</p>
                    <p className="text-[10px] text-[#636681]">Guatemala Antigua & Ethiopian Yirgacheffe</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#636681]">SAVED GRIND</span>
                    <p className="font-medium text-[#111111]">Medium-Coarse for Chemex</p>
                  </div>
                </div>
                <button
                  onClick={onOpenChat}
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#FFF0ED] py-2 text-xs font-semibold text-[#FF6B4A] hover:bg-[#FF6B4A] hover:text-white transition-colors"
                >
                  <span>Adjust Grind or Skip via Remi</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Coffee Offerings */}
        <section className="mx-auto max-w-5xl px-6 py-10 lg:px-12">
          <h2 className="text-lg font-bold text-[#1E1A3C] mb-4">
            Curated Single-Origin Rotations
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#1E1A3C]/8 bg-white p-5 shadow-2xs">
              <span className="text-[11px] font-semibold text-[#FF6B4A]">Ethiopia Yirgacheffe</span>
              <h3 className="mt-1 text-sm font-bold text-[#111111]">Natural Heirloom Micro-lot</h3>
              <p className="mt-1 text-xs text-[#636681]">
                Notes of jasmine, Meyer lemon, and bergamot. Light roast.
              </p>
            </div>
            <div className="rounded-xl border border-[#1E1A3C]/8 bg-white p-5 shadow-2xs">
              <span className="text-[11px] font-semibold text-[#FF6B4A]">Guatemala Antigua</span>
              <h3 className="mt-1 text-sm font-bold text-[#111111]">Los Volcanes Washed</h3>
              <p className="mt-1 text-xs text-[#636681]">
                Notes of milk chocolate, candied orange, and toasted hazelnut.
              </p>
            </div>
            <div className="rounded-xl border border-[#1E1A3C]/8 bg-white p-5 shadow-2xs">
              <span className="text-[11px] font-semibold text-[#FF6B4A]">Colombia Huila</span>
              <h3 className="mt-1 text-sm font-bold text-[#111111]">Pink Bourbon Honey Process</h3>
              <p className="mt-1 text-xs text-[#636681]">
                Notes of guava, brown sugar, and sparkling red apple.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Consultancy
  return (
    <div className="min-h-full bg-[#FAF9FB] pb-24 text-[#111111]">
      <section className="border-b border-[#1E1A3C]/8 bg-white px-6 py-10 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B4A]">
                Private Wealth & Tax Structuring
              </span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1E1A3C] sm:text-4xl">
                Vanguard Family Wealth & Tax Advisory
              </h1>
              <p className="mt-3 text-sm text-[#636681] leading-relaxed">
                Fiduciary advisory, multi-generational trust administration, and quarterly corporate tax pass-through counsel.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenChat}
                  className="flex items-center gap-2 rounded-xl bg-[#1E1A3C] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#2A2552]"
                >
                  <Building2 className="h-4 w-4 text-[#FF6B4A]" />
                  <span>Open Client Advisory Portal</span>
                </button>
                <span className="text-xs text-[#636681]">
                  Lead Partner: Julian Sterling, CFP
                </span>
              </div>
            </div>

            <div className="w-full rounded-2xl border border-[#1E1A3C]/10 bg-[#FFFFFF] p-5 shadow-sm md:w-80">
              <div className="flex items-center justify-between border-b border-[#1E1A3C]/6 pb-3">
                <span className="text-xs font-semibold text-[#1E1A3C]">
                  Account Portfolio
                </span>
                <span className="text-[11px] text-[#16A34A] font-medium">
                  Verified KYC
                </span>
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-[#636681]">CLIENT ENTITY</span>
                  <p className="font-semibold text-[#111111]">{profile.name}</p>
                  <p className="text-[10px] text-[#636681]">Montgomery Horizon Holdings LLC</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#636681]">NEXT FISCAL DEADLINE</span>
                  <p className="font-medium text-[#111111]">Oct 15, 2026</p>
                  <p className="text-[10px] text-[#636681]">Q3 Contractor 1099 filing</p>
                </div>
              </div>
              <button
                onClick={onOpenChat}
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#FFF0ED] py-2 text-xs font-semibold text-[#FF6B4A] hover:bg-[#FF6B4A] hover:text-white transition-colors"
              >
                <span>Book 30-min Zoom via Remi</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
