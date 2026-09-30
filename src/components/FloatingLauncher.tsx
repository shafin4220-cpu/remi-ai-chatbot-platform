import React from 'react';
import { Bot, MessageSquare, X } from 'lucide-react';
import { UserMemoryProfile } from '../types';

interface FloatingLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
  profile: UserMemoryProfile;
}

export const FloatingLauncher: React.FC<FloatingLauncherProps> = ({
  isOpen,
  onToggle,
  profile,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Subtle popup callout when widget is closed */}
      {!isOpen && (
        <div
          onClick={onToggle}
          className="mb-3 flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#1E1A3C]/12 bg-white px-3.5 py-2 shadow-lg transition-all hover:scale-105 hover:border-[#FF6B4A]/40"
        >
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B4A]">Remi</span>
              <span className="text-[10px] text-[#636681]">· Memory Bot</span>
            </div>
            <p className="text-xs font-semibold text-[#111111]">
              {profile.domain === 'new_visitor'
                ? 'Welcome! Need recommendations?'
                : `Welcome back, ${profile.name.split(' ')[0]}!`}
            </p>
            <p className="text-[10px] text-[#636681]">
              {profile.facts.length > 0
                ? `${profile.facts.length} remembered preferences on file`
                : 'Zero-repeat memory concierge ready'}
            </p>
          </div>
          <span className="ml-1 flex h-2 w-2 rounded-full bg-[#16A34A]" />
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={onToggle}
        aria-label={isOpen ? 'Close Remi chat' : 'Open Remi memory chat'}
        title={isOpen ? 'Close Remi' : 'Chat with Remi'}
        className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E1A3C] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#2A2552] focus:outline-none"
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90" />
        ) : (
          <>
            <Bot className="h-7 w-7 text-white" />
            {/* Memory indicator badge */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6B4A] text-[10px] font-bold text-white shadow-xs">
              {profile.facts.length > 0 ? profile.facts.length : 1}
            </span>
          </>
        )}
      </button>
    </div>
  );
};
