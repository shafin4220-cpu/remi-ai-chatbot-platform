import React, { useState, useEffect } from 'react';
import { TargetDomain, UserMemoryProfile, ChatMessage, MemoryFact } from './types';
import {
  CLINIC_PROFILE,
  SUBSCRIPTION_PROFILE,
  CONSULTANCY_PROFILE,
  NEW_VISITOR_PROFILE,
} from './data/mockProfiles';
import {
  getInitialGreeting,
  processUserMessage,
} from './data/conversationEngine';
import { TopNav } from './components/TopNav';
import { ChatWidget } from './components/ChatWidget';
import { FloatingLauncher } from './components/FloatingLauncher';
import { HostSiteMock } from './components/HostSiteMock';
import { MemoryInspectorDrawer } from './components/MemoryInspectorDrawer';

export default function App() {
  const [currentDomain, setCurrentDomain] = useState<TargetDomain>('clinic');
  const [viewMode, setViewMode] = useState<'studio' | 'floating'>('studio');
  const [isFloatingOpen, setIsFloatingOpen] = useState(true);
  const [isMemoryExpanded, setIsMemoryExpanded] = useState(true);

  // Stored profiles state to allow editing/deleting facts
  const [profiles, setProfiles] = useState<{
    clinic: UserMemoryProfile;
    subscription: UserMemoryProfile;
    consultancy: UserMemoryProfile;
    new_visitor: UserMemoryProfile;
  }>(() => {
    const saved = localStorage.getItem('remi_profiles') || localStorage.getItem('recallbot_profiles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      clinic: CLINIC_PROFILE,
      subscription: SUBSCRIPTION_PROFILE,
      consultancy: CONSULTANCY_PROFILE,
      new_visitor: NEW_VISITOR_PROFILE,
    };
  });

  const activeProfile = profiles[currentDomain];

  // Conversation history per domain
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return getInitialGreeting(activeProfile);
  });

  // When domain switches, load appropriate greeting
  const handleSelectDomain = (domain: TargetDomain) => {
    setCurrentDomain(domain);
    const target = profiles[domain];
    setMessages(getInitialGreeting(target));
    if (domain === 'new_visitor' && target.facts.length === 0) {
      setIsMemoryExpanded(true);
    }
  };

  // Persist profiles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('remi_profiles', JSON.stringify(profiles));
    } catch {
      // ignore
    }
  }, [profiles]);

  // Handle user sending text message
  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: 'Just now',
      text,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    // Process via conversational memory engine
    setTimeout(() => {
      const result = processUserMessage(text, activeProfile);
      setMessages((prev) => [...prev, result.reply]);

      if (result.updatedProfile) {
        setProfiles((prev) => ({
          ...prev,
          [currentDomain]: {
            ...prev[currentDomain],
            ...result.updatedProfile,
          },
        }));
      }
    }, 450);
  };

  // Handle clicking quick-reply chips
  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  // Handle action button payloads (e.g. CONFIRM_TUESDAY_SLOT, etc.)
  const handleActionClick = (actionPayload: string) => {
    handleSendMessage(actionPayload);
  };

  // Delete a fact from the memory card (GDPR / privacy control)
  const handleDeleteFact = (factId: string) => {
    const updatedFacts = activeProfile.facts.filter((f) => f.id !== factId);
    setProfiles((prev) => ({
      ...prev,
      [currentDomain]: {
        ...prev[currentDomain],
        facts: updatedFacts,
      },
    }));

    // Inform user in chat
    const alertMsg: ChatMessage = {
      id: `bot-del-${Date.now()}`,
      sender: 'bot',
      timestamp: 'Just now',
      text: `Understood. I have completely erased that fact from your persistent memory profile. Our team and automated systems will no longer recall it.`,
      quickReplies: ['Show my full client memory profile', 'Ask another question'],
    };
    setMessages((prev) => [...prev, alertMsg]);
  };

  // Add a fact manually to memory card
  const handleAddFact = (key: string, value: string) => {
    const newFact = {
      id: `fact-${Date.now()}`,
      category: 'preference' as const,
      key,
      value,
      recalledCount: 1,
      confidence: 1.0,
      source: 'Direct Client Entry',
      updatedAt: 'Just now',
    };

    setProfiles((prev) => ({
      ...prev,
      [currentDomain]: {
        ...prev[currentDomain],
        facts: [newFact, ...prev[currentDomain].facts],
      },
    }));

    const confirmMsg: ChatMessage = {
      id: `bot-add-${Date.now()}`,
      sender: 'bot',
      timestamp: 'Just now',
      text: `Saved to memory! I have stored **${key}**: "${value}". I will reference this on future visits so you never have to repeat it.`,
      newLearnedFact: { key, value },
      quickReplies: ['Show my full client memory profile', 'Book an appointment'],
    };
    setMessages((prev) => [...prev, confirmMsg]);
  };

  // New Visitor Onboarding Completion
  const handleCompleteOnboarding = (data: {
    name: string;
    reason: string;
    preference?: string;
  }) => {
    const newFacts: MemoryFact[] = [
      {
        id: `fact-ob-1`,
        category: 'identity',
        key: 'Client Name',
        value: data.name,
        recalledCount: 1,
        confidence: 1.0,
        source: 'Initial Intake',
        updatedAt: 'Just now',
      },
      {
        id: `fact-ob-2`,
        category: 'clinical',
        key: 'Visit Reason',
        value: data.reason,
        recalledCount: 1,
        confidence: 1.0,
        source: 'Initial Intake',
        updatedAt: 'Just now',
      },
    ];

    if (data.preference) {
      newFacts.push({
        id: `fact-ob-3`,
        category: 'preference',
        key: 'Client Stated Preference',
        value: data.preference,
        recalledCount: 1,
        confidence: 1.0,
        source: 'Initial Intake',
        updatedAt: 'Just now',
      });
    }

    const updated: UserMemoryProfile = {
      ...activeProfile,
      name: data.name,
      visitCount: 1,
      lastVisitedDate: 'Just now',
      primaryGoal: data.reason,
      facts: newFacts,
    };

    setProfiles((prev) => ({
      ...prev,
      new_visitor: updated,
    }));

    const welcomeMsg: ChatMessage = {
      id: `msg-ob-welcome`,
      sender: 'bot',
      timestamp: 'Just now',
      text: `Welcome to ${updated.domainName}, ${data.name}! I'm Remi. Your persistent profile has been created. I've stored your primary goal (${data.reason})${
        data.preference ? ` and your preference for "${data.preference}"` : ''
      }. You will never have to re-enter this history on future visits!`,
      newLearnedFact: {
        key: 'Initial Intake',
        value: `${data.reason}${data.preference ? ` · ${data.preference}` : ''}`,
      },
      actionCard: {
        type: 'appointment',
        title: 'Initial Intake Verified',
        subtitle: `${updated.domainName} · Client #${Math.floor(1000 + Math.random() * 9000)}`,
        items: [
          { label: 'Patient Name', value: data.name },
          { label: 'Primary Reason', value: data.reason },
          { label: 'Memory Encryption', value: 'Active across all future sessions' },
        ],
        actionLabel: 'Schedule Initial Consultation Slot',
        actionPayload: 'CONFIRM_TUESDAY_SLOT',
        secondaryActionLabel: 'Ask a Question First',
      },
      quickReplies: [
        'Schedule Initial Consultation Slot',
        'Ask about pricing & treatments',
        'Show my full client memory profile',
      ],
    };

    setMessages([welcomeMsg]);
  };

  // Simulate Revisit (2 Weeks Later)
  const handleSimulateRevisit = () => {
    const nextVisitCount = activeProfile.visitCount + 1;
    const updated = {
      ...activeProfile,
      visitCount: nextVisitCount,
      lastVisitedDate: 'Just returned (14 days since prior session)',
    };

    setProfiles((prev) => ({
      ...prev,
      [currentDomain]: updated,
    }));

    // Generate returning visitor greeting that cites memories!
    const returnGreeting: ChatMessage = {
      id: `revisit-${Date.now()}`,
      sender: 'bot',
      timestamp: 'Just now',
      text: `Welcome back to ${updated.domainName}, ${updated.name}! Remi here, and this is visit #${nextVisitCount}. I've retained all your past chart records and preferences so we can pick up right where you left off.`,
      recalledFacts: updated.facts.slice(0, 3).map((f) => `${f.key}: ${f.value}`),
      actionCard: {
        type: 'appointment',
        title: `Welcome Back, ${updated.name}`,
        subtitle: `Continuous Care Record · Visit #${nextVisitCount}`,
        items: [
          { label: 'Prior Visit', value: updated.lastRecord.title },
          { label: 'Continuity Status', value: 'Zero repetition required' },
        ],
        actionLabel: 'Check Availability & Reserve Slot',
        actionPayload: 'CONFIRM_TUESDAY_SLOT',
      },
      quickReplies: [
        'Check Availability & Reserve Slot',
        'Update my current preferences',
        'Show my full client memory profile',
      ],
    };

    setMessages([returnGreeting]);
    setIsFloatingOpen(true);
  };

  // Reset current domain session to default initial
  const handleResetSession = () => {
    setMessages(getInitialGreeting(activeProfile));
  };

  // Purge Profile (GDPR compliance)
  const handlePurgeMemory = () => {
    const purged: UserMemoryProfile = {
      ...activeProfile,
      facts: [],
      visitCount: 1,
      lastVisitedDate: 'Memory Purged',
    };
    setProfiles((prev) => ({
      ...prev,
      [currentDomain]: purged,
    }));

    const purgedMsg: ChatMessage = {
      id: `purge-${Date.now()}`,
      sender: 'bot',
      timestamp: 'Just now',
      text: `Per your request, all persistent memories and preference records for this profile have been purged from Remi's database. I am now in clean-slate mode.`,
      quickReplies: ['Start new intake', 'Ask general question'],
    };
    setMessages([purgedMsg]);
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#F4F4F8] text-[#111111]">
      {/* 3-Zone Top Bar Contract */}
      <TopNav
        currentDomain={currentDomain}
        onSelectDomain={handleSelectDomain}
        viewMode={viewMode}
        onToggleViewMode={() =>
          setViewMode(viewMode === 'floating' ? 'studio' : 'floating')
        }
        onSimulateRevisit={handleSimulateRevisit}
      />

      {/* Main View Area */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'studio' ? (
          /* Studio View: Admin Dashboard + Messenger Hybrid */
          <main className="mx-auto flex h-full max-w-7xl gap-6 p-6">
            {/* Left: Chat Widget */}
            <div className="flex-1 h-full min-w-0">
              <ChatWidget
                profile={activeProfile}
                messages={messages}
                isMemoryExpanded={isMemoryExpanded}
                onToggleMemory={() => setIsMemoryExpanded(!isMemoryExpanded)}
                onSendMessage={handleSendMessage}
                onQuickReplyClick={handleQuickReply}
                onActionClick={handleActionClick}
                onDeleteFact={handleDeleteFact}
                onAddFact={handleAddFact}
                onCompleteOnboarding={handleCompleteOnboarding}
                onResetSession={handleResetSession}
                isFloating={false}
              />
            </div>

            {/* Right: Live Memory Engine Inspector */}
            <div className="hidden lg:block w-[380px] shrink-0 h-full">
              <MemoryInspectorDrawer
                profile={activeProfile}
                messages={messages}
                onSimulateRevisit={handleSimulateRevisit}
                onPurgeMemory={handlePurgeMemory}
                onAddFact={handleAddFact}
              />
            </div>
          </main>
        ) : (
          /* Floating Preview Mode: Realistic Host Website with docked bottom-right floating launcher */
          <div className="relative h-full w-full overflow-y-auto">
            <HostSiteMock
              domain={currentDomain}
              profile={activeProfile}
              onOpenChat={() => setIsFloatingOpen(true)}
            />

            {/* Floating Launcher and Expanded Panel */}
            {isFloatingOpen && (
              <div className="fixed bottom-24 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
                <ChatWidget
                  profile={activeProfile}
                  messages={messages}
                  isMemoryExpanded={isMemoryExpanded}
                  onToggleMemory={() => setIsMemoryExpanded(!isMemoryExpanded)}
                  onSendMessage={handleSendMessage}
                  onQuickReplyClick={handleQuickReply}
                  onActionClick={handleActionClick}
                  onDeleteFact={handleDeleteFact}
                  onAddFact={handleAddFact}
                  onCompleteOnboarding={handleCompleteOnboarding}
                  onResetSession={handleResetSession}
                  onMinimize={() => setIsFloatingOpen(false)}
                  isFloating={true}
                />
              </div>
            )}

            <FloatingLauncher
              isOpen={isFloatingOpen}
              onToggle={() => setIsFloatingOpen(!isFloatingOpen)}
              profile={activeProfile}
            />
          </div>
        )}
      </div>
    </div>
  );
}
