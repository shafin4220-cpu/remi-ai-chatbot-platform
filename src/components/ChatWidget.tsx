import React, { useState, useRef, useEffect } from 'react';
import {
  UserMemoryProfile,
  ChatMessage,
} from '../types';
import { MemorySummaryCard } from './MemorySummaryCard';
import { OnboardingInline } from './OnboardingInline';
import {
  Send,
  Bot,
  User,
  Clock,
  RefreshCw,
  Minus,
  CheckCircle2,
  Calendar,
  Package,
  FileText,
  Shield,
  HelpCircle,
} from 'lucide-react';

interface ChatWidgetProps {
  profile: UserMemoryProfile;
  messages: ChatMessage[];
  isMemoryExpanded: boolean;
  onToggleMemory: () => void;
  onSendMessage: (text: string) => void;
  onQuickReplyClick: (reply: string) => void;
  onActionClick: (actionPayload: string) => void;
  onDeleteFact: (factId: string) => void;
  onAddFact: (key: string, value: string) => void;
  onCompleteOnboarding: (data: { name: string; reason: string; preference?: string }) => void;
  onResetSession: () => void;
  onMinimize?: () => void;
  isFloating?: boolean;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  profile,
  messages,
  isMemoryExpanded,
  onToggleMemory,
  onSendMessage,
  onQuickReplyClick,
  onActionClick,
  onDeleteFact,
  onAddFact,
  onCompleteOnboarding,
  onResetSession,
  onMinimize,
  isFloating = false,
}) => {
  const [inputText, setInputText] = useState('');
  const [isOnboardingActive, setIsOnboardingActive] = useState(
    profile.domain === 'new_visitor' && profile.facts.length === 0
  );
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOnboardingActive]);

  useEffect(() => {
    if (profile.domain === 'new_visitor' && profile.facts.length === 0) {
      setIsOnboardingActive(true);
    } else {
      setIsOnboardingActive(false);
    }
  }, [profile.domain, profile.facts.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const msg = inputText.trim();
    setInputText('');
    onSendMessage(msg);
  };

  // Get active quick replies from the last bot message
  const lastBotMessage = [...messages].reverse().find((m) => m.sender === 'bot');
  const activeQuickReplies = lastBotMessage?.quickReplies || [];

  return (
    <div
      className={`flex flex-col overflow-hidden bg-[#FFFFFF] ${
        isFloating
          ? 'h-[620px] w-[390px] rounded-2xl border border-[#1E1A3C]/12 shadow-2xl transition-all sm:w-[420px]'
          : 'h-full w-full rounded-2xl border border-[#1E1A3C]/10 shadow-sm'
      }`}
    >
      {/* Widget Header in Deep Indigo-Navy (#1E1A3C) */}
      <header className="relative flex items-center justify-between border-b border-[#1E1A3C]/10 bg-[#1E1A3C] px-4 py-3 text-white">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF6B4A] to-[#FF8E75] text-white shadow-xs">
            <Bot className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#1E1A3C] bg-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold tracking-tight text-white">
                Remi
              </h3>
              <span className="text-white/40 text-xs">·</span>
              <span className="text-xs font-medium text-white/90">
                {profile.domainTitle}
              </span>
              <span className="rounded bg-white/10 px-1.5 py-0.2 text-[9px] font-medium tracking-wide text-[#FF8E75]">
                MEMORY
              </span>
            </div>
            <p className="text-[11px] text-white/70">
              {profile.domainName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onResetSession}
            title="Simulate Revisit / Reload Chat"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>

          {onMinimize && (
            <button
              onClick={onMinimize}
              title="Minimize chat panel"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Minus className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      {/* Returning Visitor Welcoming Notification Banner */}
      {profile.domain !== 'new_visitor' && (
        <div className="flex items-center justify-between border-b border-[#1E1A3C]/6 bg-[#F7F7FB] px-4 py-2 text-[11px] text-[#636681]">
          <div className="flex items-center gap-1.5 truncate">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
            <span className="font-semibold text-[#111111]">
              Recognized Client:
            </span>
            <span className="truncate text-[#1E1A3C] font-medium">
              {profile.name}
            </span>
            <span className="text-[#636681]">· Visit #{profile.visitCount}</span>
          </div>

          <button
            onClick={onToggleMemory}
            className="shrink-0 font-semibold text-[#FF6B4A] hover:underline"
          >
            {isMemoryExpanded ? 'Hide Card' : 'Memory Card'}
          </button>
        </div>
      )}

      {/* Collapsible Memory Summary Card */}
      <MemorySummaryCard
        profile={profile}
        isExpanded={isMemoryExpanded}
        onToggleExpand={onToggleMemory}
        onDeleteFact={onDeleteFact}
        onAddFact={onAddFact}
      />

      {/* Chat Messages Stream */}
      <div className="custom-scrollbar flex-1 overflow-y-auto px-4 py-3 space-y-3.5 bg-[#FAF9FC]">
        {/* Memory status subtle watermark badge */}
        <div className="my-1 flex justify-center">
          <div className="flex items-center gap-1.5 rounded-full bg-[#FFFFFF] px-3 py-1 text-[11px] font-medium text-[#636681] border border-[#1E1A3C]/8 shadow-2xs">
            <Shield className="h-3 w-3 text-[#FF6B4A]" />
            <span>Remi Never-Repeat Engine: Short-Term + Long-Term Active</span>
          </div>
        </div>

        {messages.map((message) => {
          const isBot = message.sender === 'bot';

          return (
            <div
              key={message.id}
              className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`flex max-w-[88%] gap-2.5 ${
                  isBot ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Sender Avatar */}
                <div
                  className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                    isBot
                      ? 'bg-[#1E1A3C] text-white shadow-2xs'
                      : 'bg-[#FF6B4A] text-white shadow-2xs'
                  }`}
                >
                  {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>

                {/* Message Bubble Container */}
                <div className="space-y-2">
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      isBot
                        ? 'rounded-tl-xs border border-[#1E1A3C]/8 bg-[#FFFFFF] text-[#111111] shadow-xs'
                        : 'rounded-tr-xs bg-[#1E1A3C] text-white shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>

                    {/* Visual Recall Indicator Pill */}
                    {message.recalledFacts && message.recalledFacts.length > 0 && (
                      <div className="mt-2.5 rounded-lg border border-[#FF6B4A]/25 bg-[#FFF0ED] p-2 text-[11px] text-[#1E1A3C]">
                        <div className="mb-1 flex items-center gap-1 font-semibold text-[#FF6B4A]">
                          <span>Recalled from previous records:</span>
                        </div>
                        <ul className="space-y-0.5 text-[10px] text-[#636681]">
                          {message.recalledFacts.map((fact, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="h-1 w-1 rounded-full bg-[#FF6B4A]" />
                              <span>{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* New learned fact notification */}
                    {message.newLearnedFact && (
                      <div className="mt-2 rounded-lg border border-[#16A34A]/30 bg-[#F0FDF4] p-2 text-[11px] text-[#166534]">
                        <div className="flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="h-3 w-3 text-[#16A34A]" />
                          <span>New fact remembered for future visits:</span>
                        </div>
                        <p className="mt-0.5 font-medium text-[#111111]">
                          {message.newLearnedFact.key}: {message.newLearnedFact.value}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Interactive Action Card attached to message */}
                  {message.actionCard && (
                    <div className="rounded-xl border border-[#1E1A3C]/10 bg-[#FFFFFF] p-3 shadow-xs">
                      <div className="flex items-center gap-2 mb-2">
                        {message.actionCard.type === 'appointment' && (
                          <Calendar className="h-4 w-4 text-[#FF6B4A]" />
                        )}
                        {message.actionCard.type === 'subscription' && (
                          <Package className="h-4 w-4 text-[#FF6B4A]" />
                        )}
                        {message.actionCard.type === 'advisory' && (
                          <FileText className="h-4 w-4 text-[#FF6B4A]" />
                        )}
                        {message.actionCard.type === 'success' && (
                          <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
                        )}

                        <div>
                          <h4 className="text-xs font-bold text-[#1E1A3C]">
                            {message.actionCard.title}
                          </h4>
                          <p className="text-[10px] text-[#636681]">
                            {message.actionCard.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="mb-3 space-y-1 rounded-lg bg-[#F7F7FB] p-2 text-[11px]">
                        {message.actionCard.items.map((item, i) => (
                          <div key={i} className="flex justify-between gap-2">
                            <span className="text-[#636681]">{item.label}:</span>
                            <span className="font-semibold text-[#111111] text-right truncate">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {message.actionCard.actionLabel && (
                        <div className="flex flex-col gap-1.5">
                          <button
                            onClick={() => {
                              if (message.actionCard?.actionPayload === 'START_ONBOARDING') {
                                setIsOnboardingActive(true);
                              } else if (message.actionCard?.actionPayload) {
                                onActionClick(message.actionCard.actionPayload);
                              }
                            }}
                            className="w-full rounded-lg bg-[#FF6B4A] py-2 text-center text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#E85837]"
                          >
                            {message.actionCard.actionLabel}
                          </button>

                          {message.actionCard.secondaryActionLabel && (
                            <button
                              onClick={() =>
                                onQuickReplyClick(message.actionCard?.secondaryActionLabel || '')
                              }
                              className="w-full rounded-lg border border-[#1E1A3C]/12 bg-white py-1.5 text-center text-xs font-medium text-[#1E1A3C] transition-colors hover:bg-[#F7F7FB]"
                            >
                              {message.actionCard.secondaryActionLabel}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Timestamp */}
                  <span className="text-[10px] text-[#636681] px-1">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Onboarding Interactive Card */}
        {isOnboardingActive && (
          <OnboardingInline
            domainName={profile.domainName}
            onComplete={(data) => {
              setIsOnboardingActive(false);
              onCompleteOnboarding(data);
            }}
            onCancel={() => setIsOnboardingActive(false)}
          />
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#636681]">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#1E1A3C] text-white">
              <Bot className="h-3 w-3" />
            </div>
            <div className="flex items-center gap-1 rounded-xl bg-white px-3 py-2 border border-[#1E1A3C]/8">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#FF6B4A]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#FF6B4A] [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#FF6B4A] [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Chips Bar */}
      {activeQuickReplies.length > 0 && !isOnboardingActive && (
        <div className="border-t border-[#1E1A3C]/6 bg-[#FFFFFF] px-3.5 py-2">
          <div className="mb-1.5 flex items-center justify-between text-[10px] font-semibold text-[#636681]">
            <span>SUGGESTED NEXT ACTIONS</span>
            <span className="text-[#FF6B4A] font-normal">Context-aware</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {activeQuickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => onQuickReplyClick(reply)}
                className="rounded-lg border border-[#FF6B4A]/25 bg-[#FFF0ED] px-2.5 py-1 text-[11px] font-medium text-[#FF6B4A] transition-colors hover:bg-[#FF6B4A] hover:text-white"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input Bar */}
      <footer className="border-t border-[#1E1A3C]/10 bg-[#FFFFFF] p-3">
        <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
          <input
            type="text"
            placeholder={
              profile.domain === 'new_visitor'
                ? 'Ask Remi a question or type your name...'
                : `Ask Remi anything (e.g. "I switched to espresso" or "Check my allergy")...`
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 rounded-xl border border-[#1E1A3C]/15 bg-[#F7F7FB] px-3.5 py-2 text-xs text-[#111111] placeholder:text-[#636681] focus:border-[#FF6B4A] focus:bg-white focus:outline-none"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FF6B4A] text-white shadow-xs transition-all hover:bg-[#E85837] active:scale-95 disabled:opacity-40 disabled:hover:bg-[#FF6B4A]"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] text-[#636681]">
          <span>Encrypted memory profile</span>
          <button
            onClick={() => onSendMessage('What do you remember about me?')}
            className="flex items-center gap-0.5 hover:text-[#111111]"
          >
            <HelpCircle className="h-2.5 w-2.5" />
            <span>Audit Remi's stored memories</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
