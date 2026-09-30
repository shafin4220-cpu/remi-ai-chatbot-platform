export type TargetDomain = 'clinic' | 'subscription' | 'consultancy' | 'new_visitor';

export interface MemoryFact {
  id: string;
  category: 'preference' | 'clinical' | 'order' | 'scheduling' | 'identity';
  key: string;
  value: string;
  recalledCount: number;
  confidence: number; // 0 to 1
  source: string; // e.g., "Sep 12 Visit", "Onboarding", "Chat message"
  updatedAt: string;
}

export interface UserMemoryProfile {
  id: string;
  name: string;
  email?: string;
  avatarText?: string;
  domain: TargetDomain;
  domainName: string;
  domainTitle: string;
  visitCount: number;
  lastVisitedDate: string;
  primaryGoal: string;
  lastRecord: {
    type: 'appointment' | 'order' | 'consultation';
    title: string;
    date: string;
    details: string;
    status: string;
  };
  facts: MemoryFact[];
  recentTopics: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  timestamp: string;
  text: string;
  recalledFacts?: string[]; // IDs or text of memories recalled
  newLearnedFact?: {
    key: string;
    value: string;
  };
  actionCard?: {
    type: 'appointment' | 'subscription' | 'advisory' | 'success' | 'onboarding';
    title: string;
    subtitle: string;
    items: { label: string; value: string }[];
    actionLabel?: string;
    actionPayload?: string;
    secondaryActionLabel?: string;
  };
  quickReplies?: string[];
}

export interface SessionState {
  currentProfile: UserMemoryProfile;
  messages: ChatMessage[];
  isMemoryCardExpanded: boolean;
  isOnboarding: boolean;
  onboardingStep: number;
}
