import React from 'react';
import { UserMemoryProfile, ChatMessage } from '../types';
import {
  Brain,
  Database,
  History,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

interface MemoryInspectorProps {
  profile: UserMemoryProfile;
  messages: ChatMessage[];
  onSimulateRevisit: () => void;
  onPurgeMemory: () => void;
  onAddFact: (key: string, value: string) => void;
}

export const MemoryInspectorDrawer: React.FC<MemoryInspectorProps> = ({
  profile,
  messages,
  onSimulateRevisit,
  onPurgeMemory,
  onAddFact,
}) => {
  const userMessagesCount = messages.filter((m) => m.sender === 'user').length;
  const recalledTotal = profile.facts.reduce((acc, f) => acc + f.recalledCount, 0);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#1E1A3C]/10 bg-white p-5 shadow-sm">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-[#1E1A3C]/8 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1E1A3C] text-white">
            <Brain className="h-4 w-4 text-[#FF6B4A]" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#1E1A3C]">
              Remi Memory Engine Inspector
            </h2>
            <p className="text-[11px] text-[#636681]">
              Short-term conversational buffer + Long-term graph
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1 rounded bg-[#F0FDF4] px-2 py-0.5 text-[11px] font-semibold text-[#166534]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A] animate-pulse" />
          Synchronized
        </span>
      </div>

      <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto pt-4 pr-1">
        {/* Layer 1: Persistent Long-Term Customer Store */}
        <section>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-[#FF6B4A]" />
              <h3 className="text-xs font-bold text-[#1E1A3C]">
                Persistent Long-Term Profile
              </h3>
            </div>
            <span className="text-[10px] text-[#636681]">
              Survives reloads & new sessions
            </span>
          </div>

          <div className="rounded-xl border border-[#1E1A3C]/8 bg-[#F7F7FB] p-3 text-xs">
            <div className="grid grid-cols-2 gap-2 pb-2.5 border-b border-[#1E1A3C]/6">
              <div>
                <span className="text-[10px] text-[#636681] block">Customer ID</span>
                <span className="font-mono text-xs font-semibold text-[#111111]">
                  {profile.id}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#636681] block">Total Visits</span>
                <span className="text-xs font-bold text-[#FF6B4A]">
                  #{profile.visitCount} visits
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#636681] block">Last Interaction</span>
                <span className="text-xs font-medium text-[#111111] truncate block">
                  {profile.lastVisitedDate}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#636681] block">Recalls Triggered</span>
                <span className="text-xs font-semibold text-[#111111]">
                  {recalledTotal} instances
                </span>
              </div>
            </div>

            {/* List of stored facts */}
            <div className="mt-3 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#636681]">
                Stored Fact Graph ({profile.facts.length})
              </span>
              {profile.facts.length === 0 ? (
                <p className="text-[11px] text-[#636681] italic">
                  No facts recorded yet. Intake in progress.
                </p>
              ) : (
                profile.facts.map((fact) => (
                  <div
                    key={fact.id}
                    className="flex flex-col rounded-lg border border-[#1E1A3C]/6 bg-white p-2 text-[11px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1E1A3C]">{fact.key}</span>
                      <span className="rounded bg-[#FFF0ED] px-1.5 py-0.5 text-[9px] font-bold text-[#FF6B4A]">
                        {Math.round(fact.confidence * 100)}% conf
                      </span>
                    </div>
                    <p className="text-[#111111] mt-0.5">{fact.value}</p>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-[#636681]">
                      <span>Source: {fact.source}</span>
                      <span className="text-[#FF6B4A]">Recalled {fact.recalledCount}x</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Layer 2: Short-Term Dialogue Context Buffer */}
        <section>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <History className="h-3.5 w-3.5 text-[#FF6B4A]" />
              <h3 className="text-xs font-bold text-[#1E1A3C]">
                Active Chat Dialogue Buffer
              </h3>
            </div>
            <span className="text-[10px] text-[#636681]">
              Short-term turn memory
            </span>
          </div>

          <div className="rounded-xl border border-[#1E1A3C]/8 bg-[#F7F7FB] p-3 text-xs space-y-2">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#636681]">Total Conversation Turns:</span>
              <span className="font-semibold text-[#111111]">{messages.length}</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#636681]">Client Inbound Messages:</span>
              <span className="font-semibold text-[#111111]">{userMessagesCount}</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#636681]">Domain Target Context:</span>
              <span className="font-semibold text-[#FF6B4A] capitalize">{profile.domain}</span>
            </div>
          </div>
        </section>

        {/* Layer 3: Interactive Simulation Controls */}
        <section className="rounded-xl border border-[#FF6B4A]/25 bg-[#FFF0ED]/40 p-3.5">
          <h3 className="text-xs font-bold text-[#1E1A3C] mb-2 flex items-center gap-1.5">
            <span>Interactive Memory Lab</span>
          </h3>
          <p className="text-[11px] text-[#636681] mb-3 leading-relaxed">
            Test how Remi behaves when the customer returns weeks later without repeating their background:
          </p>

          <div className="space-y-2">
            <button
              onClick={onSimulateRevisit}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1E1A3C] py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#2A2552] transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#FF6B4A]" />
              <span>Simulate Revisit (2 Weeks Later)</span>
            </button>

            <button
              onClick={onPurgeMemory}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#1E1A3C]/15 bg-white py-1.5 text-xs font-medium text-[#636681] hover:text-[#DC2626] hover:border-[#DC2626]/30 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              <span>Purge Profile (GDPR "Right to be Forgotten")</span>
            </button>
          </div>
        </section>
      </div>

      <div className="mt-3 border-t border-[#1E1A3C]/8 pt-3 text-[10px] text-[#636681] flex items-center justify-between">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-[#16A34A]" />
          Remi Zero-Repeat Guarantee Active
        </span>
        <span>Remi v2.4</span>
      </div>
    </div>
  );
};
