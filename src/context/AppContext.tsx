import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  CampusZone,
  DropPost,
  SpottedPost,
  TempChatRoom,
  ChatMessage,
  HostelLoungeMessage,
  ChannelItem,
  Volunteer,
  VolunteerPoll,
  StreakItem,
  Badge,
  TeaPost,
  Club,
  NotificationItem,
} from '../types';
import {
  INITIAL_USER,
  CAMPUS_ZONES,
  INITIAL_DROPS,
  INITIAL_SPOTTED,
  INITIAL_TEMP_CHAT,
  INITIAL_HOSTEL_MESSAGES,
  INITIAL_CHANNEL_POSTS,
  INITIAL_VOLUNTEERS,
  INITIAL_POLLS,
  INITIAL_STREAKS,
  INITIAL_BADGES,
  INITIAL_TEA_POSTS,
  INITIAL_CLUBS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

const RANDOM_ALIASES = [
  'NeonPhantom #402',
  'CyberFalcon #119',
  'MysticOtter #88',
  'ShadowJaguar #701',
  'EchoRaven #243',
  'CaffeineShadow #90',
  'GlitchFox #512',
];

interface PomodoroState {
  isRunning: boolean;
  secondsLeft: number;
  totalSeconds: number;
  mode: 'study' | 'break';
  sessionsCompleted: number;
  ambientSound: 'none' | 'rain' | 'library' | 'whitenoise';
}

interface AppContextType {
  // User & Location
  user: UserProfile;
  toggleLocation: () => void;
  spawnInZone: (zoneId: string) => void;
  regenerateDailyAlias: () => void;

  // Campus Zones
  zones: CampusZone[];
  selectedZone: CampusZone | null;
  setSelectedZone: (zone: CampusZone | null) => void;

  // Get to Give
  drops: DropPost[];
  hasUserDropped: boolean;
  isDropWindowActive: boolean;
  dropTimeRemainingSec: number;
  submitDrop: (frontImage: string, backImage: string, caption: string) => void;
  reactToDrop: (dropId: string, emoji: string) => void;
  triggerRandomDrop: () => void;

  // Spotted
  spottedPosts: SpottedPost[];
  claimSpotted: (postId: string) => void;
  confirmMatch: (postId: string) => void;
  activeTempChat: TempChatRoom | null;
  openChatRoom: (roomId: string) => void;
  closeChatRoom: () => void;
  sendChatMessage: (text: string) => void;

  // Hostel Mode
  isHostelModeLive: boolean;
  toggleHostelModeOverride: () => void;
  hostelMessages: HostelLoungeMessage[];
  sendHostelMessage: (text: string, room: 'girls' | 'boys' | 'common') => void;
  isGirlsHostelUnlocked: boolean;
  unlockGirlsHostel: (passcode: string) => boolean;

  // Batch & Branch Division
  channelPosts: ChannelItem[];
  selectedBatch: string;
  setSelectedBatch: (batch: string) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  createChannelPost: (data: {
    title: string;
    content: string;
    category: 'Announcement' | 'Notes' | 'ExamAlert' | 'ChitChat';
    fileAttachment?: string;
  }) => void;
  likeChannelPost: (postId: string) => void;

  // Random Pollings
  volunteers: Volunteer[];
  polls: VolunteerPoll[];
  votePoll: (pollId: string, optionId: string) => void;
  rollRandomVolunteers: () => void;

  // Streaks & Pomodoro
  streaks: StreakItem[];
  badges: Badge[];
  checkInStreak: (streakId: string) => void;
  pomodoro: PomodoroState;
  startPomodoro: () => void;
  pausePomodoro: () => void;
  resetPomodoro: () => void;
  setPomodoroMode: (mode: 'study' | 'break') => void;
  setAmbientSound: (sound: 'none' | 'rain' | 'library' | 'whitenoise') => void;

  // Private Tea Section
  teaPosts: TeaPost[];
  createTeaPost: (
    content: string,
    category: 'CampusCrush' | 'DepartmentGossip' | 'ProfQuotes' | 'HostelChronicles',
    isGuessWho: boolean,
    hints?: string[],
    realIdentity?: string
  ) => void;
  burnTeaPost: (postId: string) => void;
  reportTeaPost: (postId: string, reason: string) => void;
  guessTeaAuthor: (postId: string, guessText: string) => void;
  revealTeaAuthor: (postId: string) => void;

  // Clubs
  clubs: Club[];
  toggleClubMembership: (clubId: string) => void;
  toggleEventRsvp: (clubId: string, eventId: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  markNotificationRead: (notifId: string) => void;
  clearAllNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User State
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [zones, setZones] = useState<CampusZone[]>(CAMPUS_ZONES);
  const [selectedZone, setSelectedZone] = useState<CampusZone | null>(CAMPUS_ZONES[0]);

  // Get to Give
  const [drops, setDrops] = useState<DropPost[]>(INITIAL_DROPS);
  const [hasUserDropped, setHasUserDropped] = useState<boolean>(false);
  const [isDropWindowActive, setIsDropWindowActive] = useState<boolean>(true);
  const [dropTimeRemainingSec, setDropTimeRemainingSec] = useState<number>(180); // 3 mins

  // Spotted & Temp Chat
  const [spottedPosts, setSpottedPosts] = useState<SpottedPost[]>(INITIAL_SPOTTED);
  const [activeTempChat, setActiveTempChat] = useState<TempChatRoom | null>(null);

  // Hostel Mode
  const [hostelOverride, setHostelOverride] = useState<boolean>(true); // default on for demo
  const [hostelMessages, setHostelMessages] = useState<HostelLoungeMessage[]>(INITIAL_HOSTEL_MESSAGES);
  const [isGirlsHostelUnlocked, setIsGirlsHostelUnlocked] = useState<boolean>(false);

  // Channels
  const [channelPosts, setChannelPosts] = useState<ChannelItem[]>(INITIAL_CHANNEL_POSTS);
  const [selectedBatch, setSelectedBatch] = useState<string>('2025');
  const [selectedBranch, setSelectedBranch] = useState<string>('CSE');

  // Random Pollings & Volunteers
  const [volunteers, setVolunteers] = useState<Volunteer[]>(INITIAL_VOLUNTEERS);
  const [polls, setPolls] = useState<VolunteerPoll[]>(INITIAL_POLLS);

  // Streaks & Badges
  const [streaks, setStreaks] = useState<StreakItem[]>(INITIAL_STREAKS);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [pomodoro, setPomodoro] = useState<PomodoroState>({
    isRunning: false,
    secondsLeft: 25 * 60,
    totalSeconds: 25 * 60,
    mode: 'study',
    sessionsCompleted: 4,
    ambientSound: 'library',
  });

  // Tea Posts
  const [teaPosts, setTeaPosts] = useState<TeaPost[]>(INITIAL_TEA_POSTS);

  // Clubs
  const [clubs, setClubs] = useState<Club[]>(INITIAL_CLUBS);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  // Countdown timers
  useEffect(() => {
    let interval: any;
    if (isDropWindowActive && dropTimeRemainingSec > 0) {
      interval = setInterval(() => {
        setDropTimeRemainingSec((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isDropWindowActive, dropTimeRemainingSec]);

  // Pomodoro Timer
  useEffect(() => {
    let pomInterval: any;
    if (pomodoro.isRunning && pomodoro.secondsLeft > 0) {
      pomInterval = setInterval(() => {
        setPomodoro((prev) => {
          if (prev.secondsLeft <= 1) {
            const nextMode = prev.mode === 'study' ? 'break' : 'study';
            const nextDuration = nextMode === 'study' ? 25 * 60 : 5 * 60;
            return {
              ...prev,
              isRunning: false,
              mode: nextMode,
              secondsLeft: nextDuration,
              totalSeconds: nextDuration,
              sessionsCompleted: prev.mode === 'study' ? prev.sessionsCompleted + 1 : prev.sessionsCompleted,
            };
          }
          return { ...prev, secondsLeft: prev.secondsLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(pomInterval);
  }, [pomodoro.isRunning, pomodoro.secondsLeft]);

  // User & Location actions
  const toggleLocation = () => {
    setUser((prev) => ({
      ...prev,
      isLocationEnabled: !prev.isLocationEnabled,
      currentZoneId: !prev.isLocationEnabled ? 'zone_library' : null,
    }));
  };

  const spawnInZone = (zoneId: string) => {
    setUser((prev) => ({
      ...prev,
      isLocationEnabled: true,
      currentZoneId: zoneId,
    }));
    setZones((prev) =>
      prev.map((z) => (z.id === zoneId ? { ...z, activeStudents: z.activeStudents + 1 } : z))
    );
  };

  const regenerateDailyAlias = () => {
    const randomName = RANDOM_ALIASES[Math.floor(Math.random() * RANDOM_ALIASES.length)];
    setUser((prev) => ({
      ...prev,
      dailyAlias: randomName,
    }));
  };

  // Get to Give
  const submitDrop = (frontImage: string, backImage: string, caption: string) => {
    const newDrop: DropPost = {
      id: `drop_${Date.now()}`,
      authorName: user.name,
      authorAvatar: user.avatar,
      department: `${user.department} ${user.batch}`,
      frontImage: frontImage || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80',
      backImage: backImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      caption: caption || 'Late-night lockin vibes 🚀',
      postedAt: 'Just now',
      minutesAgo: 0,
      reactions: { '🔥': 1 },
      userReaction: '🔥',
    };
    setDrops((prev) => [newDrop, ...prev]);
    setHasUserDropped(true);
  };

  const reactToDrop = (dropId: string, emoji: string) => {
    setDrops((prev) =>
      prev.map((d) => {
        if (d.id === dropId) {
          const currentCount = d.reactions[emoji] || 0;
          return {
            ...d,
            userReaction: emoji,
            reactions: { ...d.reactions, [emoji]: currentCount + 1 },
          };
        }
        return d;
      })
    );
  };

  const triggerRandomDrop = () => {
    setIsDropWindowActive(true);
    setDropTimeRemainingSec(180);
    // add notification
    const alertNotif: NotificationItem = {
      id: `drop_alert_${Date.now()}`,
      title: '⚠️ GET TO GIVE: DROP LIVE! 📸',
      body: 'Random drop timer initiated! 3 minutes remaining to post.',
      timestamp: 'Just now',
      type: 'drop',
      read: false,
    };
    setNotifications((prev) => [alertNotif, ...prev]);
  };

  // Spotted & Temp Chat
  const claimSpotted = (postId: string) => {
    setSpottedPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            claimsCount: p.claimsCount + 1,
            hasUserClaimed: true,
          };
        }
        return p;
      })
    );
  };

  const confirmMatch = (postId: string) => {
    setSpottedPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            isMatched: true,
            chatRoomId: `room_${postId}`,
          };
        }
        return p;
      })
    );
    // auto set active temp chat
    setActiveTempChat({
      ...INITIAL_TEMP_CHAT,
      id: `room_${postId}`,
      spottedPostId: postId,
    });
  };

  const openChatRoom = (roomId: string) => {
    setActiveTempChat(INITIAL_TEMP_CHAT);
  };

  const closeChatRoom = () => {
    setActiveTempChat(null);
  };

  const sendChatMessage = (text: string) => {
    if (!activeTempChat || !text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      text: text.trim(),
      timestamp: 'Just now',
      isSelf: true,
    };
    setActiveTempChat((prev) =>
      prev ? { ...prev, messages: [...prev.messages, newMsg] } : null
    );

    // Auto reply simulation after 1.5s for realistic pair chat
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg_reply_${Date.now()}`,
        senderId: 'other',
        senderName: 'Spotted Poster',
        text: 'Glad we matched! I am at the library entrance now, see you there!',
        timestamp: 'Just now',
        isSelf: false,
      };
      setActiveTempChat((prev) =>
        prev ? { ...prev, messages: [...prev.messages, replyMsg] } : null
      );
    }, 1500);
  };

  // Hostel Mode
  const isHostelModeLive = hostelOverride; // demo toggleable
  const toggleHostelModeOverride = () => {
    setHostelOverride((prev) => !prev);
  };

  const sendHostelMessage = (text: string, room: 'girls' | 'boys' | 'common') => {
    const newMsg: HostelLoungeMessage = {
      id: `hm_${Date.now()}`,
      authorAlias: user.dailyAlias,
      authorAvatar: user.dailyAliasAvatar,
      text: text.trim(),
      room,
      timestamp: 'Just now',
      upvotes: 1,
    };
    setHostelMessages((prev) => [newMsg, ...prev]);
  };

  const unlockGirlsHostel = (passcode: string) => {
    if (passcode === '2025' || passcode === 'hostel' || passcode === 'room') {
      setIsGirlsHostelUnlocked(true);
      return true;
    }
    return false;
  };

  // Batch & Branch Channels
  const createChannelPost = (data: {
    title: string;
    content: string;
    category: 'Announcement' | 'Notes' | 'ExamAlert' | 'ChitChat';
    fileAttachment?: string;
  }) => {
    const newPost: ChannelItem = {
      id: `ch_${Date.now()}`,
      title: data.title,
      content: data.content,
      author: user.name,
      authorBranch: user.department.split(' ')[0],
      batch: selectedBatch,
      branch: selectedBranch,
      category: data.category,
      likes: 1,
      commentsCount: 0,
      createdAt: 'Just now',
      fileAttachment: data.fileAttachment,
    };
    setChannelPosts((prev) => [newPost, ...prev]);
  };

  const likeChannelPost = (postId: string) => {
    setChannelPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  // Random Pollings & Volunteers
  const votePoll = (pollId: string, optionId: string) => {
    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id === pollId && !poll.userVotedOptionId) {
          const updatedOptions = poll.options.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          );
          return {
            ...poll,
            totalVotes: poll.totalVotes + 1,
            userVotedOptionId: optionId,
            options: updatedOptions,
          };
        }
        return poll;
      })
    );
  };

  const rollRandomVolunteers = () => {
    const pool = [
      { id: 'vol_new_1', name: 'Zoya Merchant', branch: 'CSE 2026', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80', role: 'Polling Volunteer' as const, selectedDate: 'Today' },
      { id: 'vol_new_2', name: 'Devendra Patel', branch: 'Mech 2024', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80', role: 'Polling Volunteer' as const, selectedDate: 'Today' },
      { id: 'vol_new_3', name: 'Simran Walia', branch: 'ECE 2025', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80', role: 'Polling Volunteer' as const, selectedDate: 'Today' },
    ];
    setVolunteers(pool);
  };

  // Streaks & Pomodoro
  const checkInStreak = (streakId: string) => {
    setStreaks((prev) =>
      prev.map((s) =>
        s.id === streakId
          ? { ...s, count: s.count + 1, lastCheckedIn: 'Just now' }
          : s
      )
    );
  };

  const startPomodoro = () => setPomodoro((prev) => ({ ...prev, isRunning: true }));
  const pausePomodoro = () => setPomodoro((prev) => ({ ...prev, isRunning: false }));
  const resetPomodoro = () =>
    setPomodoro((prev) => ({
      ...prev,
      isRunning: false,
      secondsLeft: prev.mode === 'study' ? 25 * 60 : 5 * 60,
    }));
  const setPomodoroMode = (mode: 'study' | 'break') =>
    setPomodoro((prev) => ({
      ...prev,
      mode,
      isRunning: false,
      secondsLeft: mode === 'study' ? 25 * 60 : 5 * 60,
      totalSeconds: mode === 'study' ? 25 * 60 : 5 * 60,
    }));
  const setAmbientSound = (sound: 'none' | 'rain' | 'library' | 'whitenoise') =>
    setPomodoro((prev) => ({ ...prev, ambientSound: sound }));

  // Private Tea Section
  const createTeaPost = (
    content: string,
    category: 'CampusCrush' | 'DepartmentGossip' | 'ProfQuotes' | 'HostelChronicles',
    isGuessWho: boolean,
    hints?: string[],
    realIdentity?: string
  ) => {
    const formattedHints = hints
      ? hints.filter((h) => h.trim().length > 0).map((h, i) => ({ step: i + 1, hint: h }))
      : undefined;

    const newPost: TeaPost = {
      id: `tea_${Date.now()}`,
      authorAlias: user.dailyAlias,
      authorAvatar: user.dailyAliasAvatar,
      content,
      timestamp: 'Just now',
      category,
      burnCount: 0,
      isBurnt: false,
      reportsCount: 0,
      isReportedByUser: false,
      isGuessWho,
      hints: formattedHints,
      realIdentity: realIdentity || user.name,
      isRevealed: false,
      authorId: user.id,
      comments: [],
    };
    setTeaPosts((prev) => [newPost, ...prev]);
  };

  const burnTeaPost = (postId: string) => {
    setTeaPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextCount = p.burnCount + 1;
          return {
            ...p,
            burnCount: nextCount,
            isBurnt: nextCount >= 5, // burns away into ash after 5 burns!
          };
        }
        return p;
      })
    );
  };

  const reportTeaPost = (postId: string, reason: string) => {
    setTeaPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, isReportedByUser: true, reportsCount: p.reportsCount + 1 }
          : p
      )
    );
  };

  const guessTeaAuthor = (postId: string, guessText: string) => {
    setTeaPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: `guess_${Date.now()}`,
                authorAlias: user.dailyAlias,
                text: guessText,
                timestamp: 'Just now',
                isGuess: true,
              },
            ],
          };
        }
        return p;
      })
    );
  };

  const revealTeaAuthor = (postId: string) => {
    setTeaPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isRevealed: true } : p))
    );
  };

  // Clubs
  const toggleClubMembership = (clubId: string) => {
    setClubs((prev) =>
      prev.map((c) =>
        c.id === clubId
          ? {
              ...c,
              isMember: !c.isMember,
              membersCount: c.isMember ? c.membersCount - 1 : c.membersCount + 1,
            }
          : c
      )
    );
  };

  const toggleEventRsvp = (clubId: string, eventId: string) => {
    setClubs((prev) =>
      prev.map((c) => {
        if (c.id === clubId) {
          const updatedEvents = c.upcomingEvents.map((ev) =>
            ev.id === eventId
              ? {
                  ...ev,
                  isRsvpd: !ev.isRsvpd,
                  rsvpCount: ev.isRsvpd ? ev.rsvpCount - 1 : ev.rsvpCount + 1,
                }
              : ev
          );
          return { ...c, upcomingEvents: updatedEvents };
        }
        return c;
      })
    );
  };

  // Notifications
  const markNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        toggleLocation,
        spawnInZone,
        regenerateDailyAlias,
        zones,
        selectedZone,
        setSelectedZone,
        drops,
        hasUserDropped,
        isDropWindowActive,
        dropTimeRemainingSec,
        submitDrop,
        reactToDrop,
        triggerRandomDrop,
        spottedPosts,
        claimSpotted,
        confirmMatch,
        activeTempChat,
        openChatRoom,
        closeChatRoom,
        sendChatMessage,
        isHostelModeLive,
        toggleHostelModeOverride,
        hostelMessages,
        sendHostelMessage,
        isGirlsHostelUnlocked,
        unlockGirlsHostel,
        channelPosts,
        selectedBatch,
        setSelectedBatch,
        selectedBranch,
        setSelectedBranch,
        createChannelPost,
        likeChannelPost,
        volunteers,
        polls,
        votePoll,
        rollRandomVolunteers,
        streaks,
        badges,
        checkInStreak,
        pomodoro,
        startPomodoro,
        pausePomodoro,
        resetPomodoro,
        setPomodoroMode,
        setAmbientSound,
        teaPosts,
        createTeaPost,
        burnTeaPost,
        reportTeaPost,
        guessTeaAuthor,
        revealTeaAuthor,
        clubs,
        toggleClubMembership,
        toggleEventRsvp,
        notifications,
        unreadNotifsCount,
        isNotificationOpen,
        setIsNotificationOpen,
        markNotificationRead,
        clearAllNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
