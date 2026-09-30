import React, { useState } from 'react';
import { UserMemoryProfile, MemoryFact } from '../types';
import {
  Brain,
  ChevronDown,
  ChevronUp,
  Calendar,
  ShieldCheck,
  Trash2,
  Plus,
  Clock,
  UserCheck,
} from 'lucide-react';

interface MemorySummaryCardProps {
  profile: UserMemoryProfile;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onDeleteFact: (factId: string) => void;
  onAddFact: (key: string, value: string) => void;
}

export const MemorySummaryCard: React.FC<MemorySummaryCardProps> = ({
  profile,
  isExpanded,
  onToggleExpand,
  onDeleteFact,
  onAddFact,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleCreateFact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim() || !newValue.trim()) return;
    onAddFact(newKey.trim(), newValue.trim());
    setNewKey('');
    setNewValue('');
    setShowAddForm(false);
  };

  return (
    <div className="mx-4 my-2 overflow-hidden rounded-xl border border-[#1E1A3C]/10 bg-[#FFFFFF] shadow-sm transition-all duration-200">
      {/* Header bar of the card */}
      <button
        onClick={onToggleExpand}
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between px-3.5 py-2.5 text-left transition-colors hover:bg-[#F7F7FB]"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF0ED] text-[#FF6B4A]">
            <Brain className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[#111111]">
                {profile.domain === 'new_visitor' ? 'Client Memory Graph (New)' : 'Persistent Client Profile'}
              </span>
              <span className="flex items-center gap-1 rounded bg-[#1E1A3C]/5 px-1.5 py-0.5 text-[10px] font-medium text-[#1E1A3C]">
                {profile.facts.length} facts retained
              </span>
            </div>
            <p className="text-[11px] text-[#636681]">
              {profile.domain === 'new_visitor'
                ? 'Intake in progress · zero repeat questions'
                : `${profile.name} · ${profile.visitCount} visits recorded`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-[#FF6B4A]">
            {isExpanded ? 'Hide summary' : 'View memory'}
          </span>
          {isExpanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-[#636681]" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-[#636681]" />
          )}
        </div>
      </button>

      {/* Expanded details view */}
      {isExpanded && (
        <div className="border-t border-[#1E1A3C]/8 bg-[#F7F7FB]/60 p-3.5 text-xs">
          {/* Quick Stats Grid */}
          <div className="mb-3 grid grid-cols-2 gap-2 rounded-lg bg-[#FFFFFF] p-2.5 border border-[#1E1A3C]/6">
            <div className="flex items-start gap-2">
              <UserCheck className="mt-0.5 h-3.5 w-3.5 text-[#FF6B4A]" />
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#636681]">
                  Customer Identity
                </span>
                <p className="font-medium text-[#111111]">{profile.name}</p>
                <p className="text-[10px] text-[#636681]">{profile.lastVisitedDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-3.5 w-3.5 text-[#FF6B4A]" />
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#636681]">
                  Last Recorded Record
                </span>
                <p className="truncate font-medium text-[#111111]">{profile.lastRecord.title}</p>
                <p className="text-[10px] text-[#636681] truncate">{profile.lastRecord.date} · {profile.lastRecord.status}</p>
              </div>
            </div>
          </div>

          {/* Active Stored Facts List */}
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#1E1A3C]">
              Remembered Preferences & History
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1 text-[11px] font-medium text-[#FF6B4A] hover:text-[#E85837]"
            >
              <Plus className="h-3 w-3" />
              {showAddForm ? 'Cancel' : 'Teach new fact'}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleCreateFact} className="mb-3 rounded-lg border border-[#FF6B4A]/30 bg-[#FFF0ED]/40 p-2.5">
              <p className="mb-1.5 text-[11px] font-medium text-[#1E1A3C]">
                Manually record a client preference:
              </p>
              <div className="mb-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Key (e.g. Preferred Day, Roast)"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-1/2 rounded border border-[#1E1A3C]/15 bg-white px-2 py-1 text-xs text-[#111111] focus:border-[#FF6B4A] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. Wednesday mornings)"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-1/2 rounded border border-[#1E1A3C]/15 bg-white px-2 py-1 text-xs text-[#111111] focus:border-[#FF6B4A] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded bg-[#FF6B4A] py-1 text-center text-xs font-semibold text-white shadow-xs hover:bg-[#E85837]"
              >
                Store to Persistent Memory
              </button>
            </form>
          )}

          {profile.facts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#1E1A3C]/15 bg-[#FFFFFF] p-3 text-center text-[#636681]">
              <p className="text-xs">No permanent facts recorded yet.</p>
              <p className="text-[11px]">Chat with Remi or complete onboarding to build memory.</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {profile.facts.map((fact: MemoryFact) => (
                <div
                  key={fact.id}
                  className="group flex items-start justify-between rounded-lg border border-[#1E1A3C]/6 bg-[#FFFFFF] px-2.5 py-1.5 transition-colors hover:border-[#FF6B4A]/30"
                >
                  <div className="pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-[#1E1A3C]">{fact.key}:</span>
                      <span className="text-[#111111]">{fact.value}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-[10px] text-[#636681]">
                      <span>Source: {fact.source}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-[#FF6B4A]">
                        <Clock className="h-2.5 w-2.5" /> Recalled {fact.recalledCount} times
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteFact(fact.id)}
                    title="Forget this memory (GDPR & privacy compliance)"
                    className="opacity-0 transition-opacity group-hover:opacity-100 p-1 text-[#636681] hover:text-[#DC2626]"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between text-[10px] text-[#636681]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-[#16A34A]" />
              Encrypted memory profile
            </span>
            <span>Remi zero-repeat guarantee active</span>
          </div>
        </div>
      )}
    </div>
  );
};
