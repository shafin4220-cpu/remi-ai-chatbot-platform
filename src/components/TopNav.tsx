import React from 'react';
import { TargetDomain } from '../types';
import { Layout, MessageSquareCode } from 'lucide-react';

interface TopNavProps {
  currentDomain: TargetDomain;
  onSelectDomain: (domain: TargetDomain) => void;
  viewMode: 'floating' | 'studio';
  onToggleViewMode: () => void;
  onSimulateRevisit: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentDomain,
  onSelectDomain,
  viewMode,
  onToggleViewMode,
  onSimulateRevisit,
}) => {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-[#1E1A3C]/10 bg-[#1E1A3C] px-6 text-white">
      {/* Zone 1: Single text element wordmark */}
      <a href="/" className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
        Remi
      </a>

      {/* Zone 2: Domain persona switcher navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-white/70">
        <button
          onClick={() => onSelectDomain('clinic')}
          className={`transition-colors whitespace-nowrap ${
            currentDomain === 'clinic'
              ? 'text-white font-semibold underline underline-offset-8 decoration-[#FF6B4A] decoration-2'
              : 'hover:text-white'
          }`}
        >
          Clinic (Elena)
        </button>

        <button
          onClick={() => onSelectDomain('subscription')}
          className={`transition-colors whitespace-nowrap ${
            currentDomain === 'subscription'
              ? 'text-white font-semibold underline underline-offset-8 decoration-[#FF6B4A] decoration-2'
              : 'hover:text-white'
          }`}
        >
          Subscription (Marcus)
        </button>

        <button
          onClick={() => onSelectDomain('consultancy')}
          className={`transition-colors whitespace-nowrap ${
            currentDomain === 'consultancy'
              ? 'text-white font-semibold underline underline-offset-8 decoration-[#FF6B4A] decoration-2'
              : 'hover:text-white'
          }`}
        >
          Consultancy (Sophia)
        </button>

        <button
          onClick={() => onSelectDomain('new_visitor')}
          className={`transition-colors whitespace-nowrap ${
            currentDomain === 'new_visitor'
              ? 'text-white font-semibold underline underline-offset-8 decoration-[#FF6B4A] decoration-2'
              : 'hover:text-white'
          }`}
        >
          New Visitor Intake
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSimulateRevisit}
          title="Simulate user closing site and returning 2 weeks later"
          className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20 whitespace-nowrap"
        >
          <span>Simulate Return Visit</span>
        </button>

        <button
          onClick={onToggleViewMode}
          className="flex items-center gap-1.5 rounded-lg bg-[#FF6B4A] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#E85837] whitespace-nowrap"
        >
          {viewMode === 'floating' ? (
            <>
              <Layout className="h-3.5 w-3.5" />
              <span>Studio View</span>
            </>
          ) : (
            <>
              <MessageSquareCode className="h-3.5 w-3.5" />
              <span>Floating Preview</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
