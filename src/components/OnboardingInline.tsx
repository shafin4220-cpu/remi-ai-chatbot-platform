import React, { useState } from 'react';
import { UserCheck, ArrowRight } from 'lucide-react';

interface OnboardingInlineProps {
  domainName: string;
  onComplete: (data: { name: string; reason: string; preference?: string }) => void;
  onCancel: () => void;
}

export const OnboardingInline: React.FC<OnboardingInlineProps> = ({
  domainName,
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [preference, setPreference] = useState('');

  const quickReasons = [
    'Schedule initial consultation',
    'Ask about sensitive skin or allergies',
    'Explore subscription plans',
    'General questions & service overview',
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    onComplete({
      name: name.trim(),
      reason: reason.trim(),
      preference: preference.trim() || undefined,
    });
  };

  return (
    <div className="mx-4 my-3 overflow-hidden rounded-xl border border-[#FF6B4A]/30 bg-gradient-to-b from-[#FFF0ED]/80 to-[#FFFFFF] p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF6B4A] text-white">
            <UserCheck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1E1A3C]">
              New Visitor Memory Setup
            </h4>
            <p className="text-[11px] text-[#636681]">
              Step {step} of 2 · Remembers you across visits
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="text-[11px] text-[#636681] hover:text-[#111111]"
        >
          Cancel
        </button>
      </div>

      {step === 1 ? (
        <form onSubmit={handleNext} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1">
              What is your name?
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Maya Lin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-[#1E1A3C]/15 bg-white px-3 py-2 text-xs text-[#111111] shadow-2xs focus:border-[#FF6B4A] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex items-center gap-1.5 rounded-lg bg-[#FF6B4A] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#E85837] disabled:opacity-50"
            >
              Next Step
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleFinalSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1">
              Welcome, {name}! What brings you to {domainName} today?
            </label>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {quickReasons.map((qr) => (
                <button
                  type="button"
                  key={qr}
                  onClick={() => setReason(qr)}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    reason === qr
                      ? 'bg-[#1E1A3C] text-white'
                      : 'bg-white text-[#1E1A3C] border border-[#1E1A3C]/15 hover:bg-[#F7F7FB]'
                  }`}
                >
                  {qr}
                </button>
              ))}
            </div>
            <input
              type="text"
              required
              placeholder="Or type specific goal / treatment inquiry..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-lg border border-[#1E1A3C]/15 bg-white px-3 py-2 text-xs text-[#111111] shadow-2xs focus:border-[#FF6B4A] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#636681] mb-1">
              Optional preference or allergy to remember:
            </label>
            <input
              type="text"
              placeholder="e.g. Sensitive to fragrances / Prefers morning slots"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              className="w-full rounded-lg border border-[#1E1A3C]/15 bg-white px-3 py-1.5 text-xs text-[#111111] focus:border-[#FF6B4A] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-[#636681] hover:text-[#111111]"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!reason.trim()}
              className="flex items-center gap-1.5 rounded-lg bg-[#FF6B4A] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#E85837] disabled:opacity-50"
            >
              Build Persistent Profile
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
