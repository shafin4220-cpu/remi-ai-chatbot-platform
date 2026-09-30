import { ChatMessage, UserMemoryProfile } from '../types';

export function getInitialGreeting(profile: UserMemoryProfile): ChatMessage[] {
  if (profile.domain === 'new_visitor') {
    return [
      {
        id: 'msg-init-1',
        sender: 'bot',
        timestamp: 'Just now',
        text: `Welcome to ${profile.domainName}! I'm Remi, your ${profile.domainTitle}. Unlike traditional chatbots that forget who you are every time you reload, I remember your preferences, past visits, and requirements so you never have to repeat yourself.`,
        actionCard: {
          type: 'onboarding',
          title: 'Start Your Personal Client Profile',
          subtitle: 'Step 1 of 2 · Quick 15-second setup',
          items: [
            { label: 'Privacy', value: 'Private & client-encrypted' },
            { label: 'Advantage', value: 'Never re-enter history or preferences' },
          ],
          actionLabel: 'Complete 1-Click Intake',
          actionPayload: 'START_ONBOARDING',
        },
        quickReplies: [
          'Book a First Consultation',
          'Explore Services & Pricing',
          'Ask a Quick Question',
        ],
      },
    ];
  }

  if (profile.domain === 'clinic') {
    return [
      {
        id: 'msg-init-c1',
        sender: 'bot',
        timestamp: 'Just now',
        text: `Welcome back, ${profile.name}! Remi here. Wonderful to see you again. I have your patient chart open—including your Sep 12 Hydrafacial notes with Dr. Rousseau and your skin sensitivity records.`,
        recalledFacts: [
          'Patient Name: Elena Vance',
          'Last Visit: Sep 12 Hydrafacial with Dr. Rousseau',
          'Clinical Flag: Benzoyl Peroxide Contraindication',
        ],
        actionCard: {
          type: 'appointment',
          title: 'Upcoming Clinical Milestone',
          subtitle: '6-Week Routine Barrier Follow-Up Due',
          items: [
            { label: 'Recommended Doctor', value: 'Dr. Elena Rousseau' },
            { label: 'Your Preferred Window', value: 'Tuesday mornings (9:00 - 11:30 AM)' },
            { label: 'Chart Contraindication', value: 'Benzoyl Peroxide allergy verified' },
          ],
          actionLabel: 'Reserve Tuesday 9:30 AM Slot',
          actionPayload: 'CONFIRM_TUESDAY_SLOT',
          secondaryActionLabel: 'Choose Different Time',
        },
        quickReplies: [
          'Reserve Tuesday 9:30 AM Slot',
          'Ask about my Azelaic acid regimen',
          'Can I use Salicylic acid with my allergy?',
          'What do you remember about my skin?',
        ],
      },
    ];
  }

  if (profile.domain === 'subscription') {
    return [
      {
        id: 'msg-init-s1',
        sender: 'bot',
        timestamp: 'Just now',
        text: `Welcome back, ${profile.name}! Remi here with your member preferences loaded. Your next bi-weekly dispatch of whole beans (Ethiopian Yirgacheffe & Guatemala Antigua) is queued for Tuesday, Oct 3.`,
        recalledFacts: [
          'Member: Marcus Chen (8th cycle)',
          'Grind: Medium-Coarse for Chemex & Fellow Ode',
          'Next Dispatch: Oct 3, 2026',
        ],
        actionCard: {
          type: 'subscription',
          title: 'Cycle #8 Shipment Ready',
          subtitle: 'Scheduled to roast and courier on Oct 3',
          items: [
            { label: 'Bean Selection', value: '2x 12oz Medium-Light Natural Process' },
            { label: 'Grind Profile', value: 'Medium-Coarse (Chemex / Pour-over)' },
            { label: 'Delivery Gate', value: 'Leave at side porch gate' },
          ],
          actionLabel: 'Confirm Shipment as Scheduled',
          actionPayload: 'CONFIRM_SHIPMENT',
          secondaryActionLabel: 'Skip or Delay 14 Days',
        },
        quickReplies: [
          'Confirm Shipment as Scheduled',
          'Change grind to Espresso fine',
          'Skip or Delay 14 Days',
          'Recommend a floral light roast',
        ],
      },
    ];
  }

  // Consultancy
  return [
    {
      id: 'msg-init-con1',
      sender: 'bot',
      timestamp: 'Just now',
      text: `Good afternoon, ${profile.name}. Remi here—I've synchronized the advisory file for Montgomery Horizon Holdings LLC. Julian Sterling noted you were finalizing the contractor payroll details before the Q3 Oct 15 deadline.`,
      recalledFacts: [
        'Client: Sophia Montgomery',
        'Entity: Montgomery Horizon Holdings LLC & Trust',
        'Lead Advisor: Julian Sterling, CFP',
        'Format Preference: Encrypted executive PDF',
      ],
      actionCard: {
        type: 'advisory',
        title: 'Q3 Tax & Trust Review',
        subtitle: 'Advisory Session with Julian Sterling',
        items: [
          { label: 'Target Action', value: 'Contractor 1099 & K-1 filing sign-off' },
          { label: 'Usual Sync Length', value: '30-minute Zoom' },
          { label: 'Delivery Delivery', value: 'Encrypted PDF digest to your inbox' },
        ],
        actionLabel: 'Book 30-min Zoom with Julian',
        actionPayload: 'BOOK_JULIAN_ZOOM',
        secondaryActionLabel: 'Send PDF Digest Now',
      },
      quickReplies: [
        'Book 30-min Zoom with Julian',
        'Send PDF Digest Now',
        'Update LLC entity address',
        'Show my full client memory profile',
      ],
    },
  ];
}

export interface BotReplyResult {
  reply: ChatMessage;
  updatedProfile?: Partial<UserMemoryProfile>;
}

export function processUserMessage(
  text: string,
  profile: UserMemoryProfile
): BotReplyResult {
  const normalized = text.toLowerCase().trim();

  // Action payloads
  if (text === 'CONFIRM_TUESDAY_SLOT' || normalized.includes('reserve tuesday') || normalized.includes('confirm slot')) {
    return {
      reply: {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        timestamp: 'Just now',
        text: `Confirmed! I've reserved Tuesday, Oct 6 at 9:30 AM with Dr. Elena Rousseau. Because of your recorded benzoyl peroxide sensitivity, I've already flagged your treatment chart to use the gentle calendula barrier prep. You will receive a calendar confirmation shortly!`,
        recalledFacts: [
          'Doctor: Dr. Elena Rousseau',
          'Preferred Window: Tuesday mornings',
          'Contraindication: Benzoyl Peroxide safety alert sent to clinic room',
        ],
        actionCard: {
          type: 'success',
          title: 'Appointment Confirmed & Chart Flagged',
          subtitle: 'Aura Dermatology · Tuesday 9:30 AM',
          items: [
            { label: 'Specialist', value: 'Dr. Elena Rousseau' },
            { label: 'Prep Type', value: 'Calendula Gentle Barrier Protocol' },
            { label: 'Location', value: 'Suite 400 · Main Clinic' },
          ],
        },
        quickReplies: [
          'Ask about my Azelaic acid regimen',
          'Can I use Salicylic acid with my allergy?',
          'Update my emergency contact',
        ],
      },
      updatedProfile: {
        lastRecord: {
          type: 'appointment',
          title: 'Scheduled: Barrier Follow-up with Dr. Rousseau',
          date: 'Next Tuesday, 9:30 AM',
          details: 'Calendula prep · Flagged: No benzoyl peroxide',
          status: 'Confirmed in clinic schedule',
        },
      },
    };
  }

  if (text === 'CONFIRM_SHIPMENT' || normalized.includes('confirm shipment')) {
    return {
      reply: {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        timestamp: 'Just now',
        text: `All set, Marcus! Your Oct 3 dispatch is locked in with your exact Chemex medium-coarse grind and instructions for the courier to deliver by the side porch gate. No repeated address prompts needed!`,
        recalledFacts: [
          'Grind Profile: Medium-Coarse Chemex',
          'Delivery Note: Side porch gate',
        ],
        quickReplies: [
          'Change grind to Espresso fine',
          'Recommend a floral light roast',
          'Check roast date guarantee',
        ],
      },
    };
  }

  if (text === 'BOOK_JULIAN_ZOOM' || normalized.includes('book 30-min zoom')) {
    return {
      reply: {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        timestamp: 'Just now',
        text: `Scheduled! Julian Sterling's calendar is reserved for Thursday at 2:30 PM EST for a 30-minute Zoom. The calendar invite and pre-meeting encrypted PDF brief have been sent directly to ${profile.email || 'your registered corporate inbox'}.`,
        recalledFacts: [
          'Advisor: Julian Sterling',
          'Time preference: Thursday afternoon',
          'Brief format: Encrypted executive PDF',
        ],
        quickReplies: [
          'Send PDF Digest Now',
          'Add a contractor expense note',
          'Review my advisory profile',
        ],
      },
    };
  }

  // Grind change test for subscription
  if (normalized.includes('espresso') || normalized.includes('change grind')) {
    const updatedFacts = profile.facts.map((f) =>
      f.id === 'f-sub-1' || f.key.toLowerCase().includes('grind')
        ? {
            ...f,
            value: 'Fine Grind for 58mm Portafilter Espresso (Unimodal)',
            updatedAt: 'Just now',
            recalledCount: f.recalledCount + 1,
          }
        : f
    );

    return {
      reply: {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        timestamp: 'Just now',
        text: `I've updated your permanent coffee profile with Remi, Marcus! Moving forward, your subscription will be ground to **Fine Grind for 58mm Portafilter Espresso**. You will never have to re-select this on future orders or chats.`,
        newLearnedFact: {
          key: 'Brew Method & Grind',
          value: 'Fine Grind for 58mm Portafilter Espresso',
        },
        recalledFacts: ['Member: Marcus Chen', 'Previous: Medium-Coarse Chemex'],
        quickReplies: [
          'Confirm Shipment as Scheduled',
          'Recommend a low-acid espresso bean',
          'What else do you remember about me?',
        ],
      },
      updatedProfile: {
        facts: updatedFacts,
      },
    };
  }

  // Allergy / contraindication question in clinic
  if (
    normalized.includes('allergy') ||
    normalized.includes('salicylic') ||
    normalized.includes('benzoyl') ||
    normalized.includes('retin') ||
    normalized.includes('flaking') ||
    normalized.includes('azelaic')
  ) {
    return {
      reply: {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        timestamp: 'Just now',
        text: `Looking at your clinical memory profile, ${profile.name}: you have a documented erythema reaction to **Benzoyl Peroxide**, but **Salicylic Acid (BHA)** has a different mechanism of action and is generally safe. However, since you are currently using **15% Azelaic Acid at bedtime**, Dr. Rousseau advises alternating nights rather than layering them together to avoid barrier disruption.`,
        recalledFacts: [
          'Contraindication: Benzoyl Peroxide (triggers erythema)',
          'Active Regimen: 15% Azelaic Acid at bedtime',
          'Physician Guidance: Dr. Rousseau barrier recovery guidelines',
        ],
        quickReplies: [
          'Reserve Tuesday 9:30 AM Slot',
          'Add a new product to my regimen',
          'What do you remember about my skin?',
        ],
      },
    };
  }

  // Memory inspection query: "What do you know / remember about me?"
  if (
    normalized.includes('remember') ||
    normalized.includes('what do you know') ||
    normalized.includes('my memory') ||
    normalized.includes('profile')
  ) {
    const factsList = profile.facts
      .map((f) => `• **${f.key}**: ${f.value} *(from ${f.source})*`)
      .join('\n');

    return {
      reply: {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        timestamp: 'Just now',
        text: `Here is the verified memory graph Remi maintains for your profile:\n\n${
          factsList || 'No stored facts yet. As we converse, I will automatically remember your key preferences!'
        }\n\n*Total visits recorded:* **${profile.visitCount}**. You can edit or purge any attribute at any time using the Memory Summary card above.`,
        recalledFacts: profile.facts.map((f) => `${f.key}: ${f.value}`),
        quickReplies: [
          'Looks great, thank you!',
          'Update one of my preferences',
          'Book next appointment',
        ],
      },
    };
  }

  // User adding new information: "By the way, I moved" or "My phone is..." or "I prefer..."
  if (
    normalized.includes('prefer') ||
    normalized.includes('my phone') ||
    normalized.includes('i moved') ||
    normalized.includes('add') ||
    normalized.includes('changed my') ||
    normalized.includes('note that') ||
    normalized.includes('my new')
  ) {
    const newFact = {
      id: `fact-${Date.now()}`,
      category: 'preference' as const,
      key: 'Client Noted Preference',
      value: text.replace(/^(by the way|please note that|i prefer|note that|i changed my)\s*/i, '').trim(),
      recalledCount: 1,
      confidence: 1.0,
      source: 'Active Chat Memory Extraction',
      updatedAt: 'Just now',
    };

    return {
      reply: {
        id: `msg-${Date.now()}`,
        sender: 'bot',
        timestamp: 'Just now',
        text: `Got it! I have committed that directly to your persistent memory profile: **"${newFact.value}"**. You will never have to re-enter or remind our team about this again.`,
        newLearnedFact: {
          key: newFact.key,
          value: newFact.value,
        },
        quickReplies: [
          'Show my full client memory profile',
          'Ask another question',
          'Confirm upcoming schedule',
        ],
      },
      updatedProfile: {
        facts: [newFact, ...profile.facts],
      },
    };
  }

  // Default contextual fallback with high emotional intelligence and memory linkage
  return {
    reply: {
      id: `msg-${Date.now()}`,
      sender: 'bot',
      timestamp: 'Just now',
      text: `Understood, ${profile.name}. I've connected this with your past history (${profile.primaryGoal}). Our system tracks every detail across all sessions so your experience remains completely continuous. Is there anything specific you would like me to adjust or schedule?`,
      recalledFacts: [
        `Client: ${profile.name}`,
        `Primary Objective: ${profile.primaryGoal}`,
        `Visits Logged: ${profile.visitCount}`,
      ],
      quickReplies: [
        'Show my full client memory profile',
        'Book next consultation',
        'Ask about pricing & plans',
      ],
    },
  };
}
