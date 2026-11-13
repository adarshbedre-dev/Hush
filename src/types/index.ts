export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  batch: string;
  isLocationEnabled: boolean;
  currentZoneId: string | null;
  dailyAlias: string;
  dailyAliasAvatar: string;
  dailyAliasRegenAt: string;
  githubUsername: string;
  codeforcesHandle: string;
}

export interface CampusZone {
  id: string;
  name: string;
  category: 'Study' | 'Food' | 'Tech' | 'Social' | 'Living' | 'Sports';
  coordinates: { x: number; y: number };
  activeStudents: number;
  glowColor: string;
  description: string;
  crowdLevel: 'Low' | 'Moderate' | 'High' | 'Packed';
  vibe: string;
}

export interface DropPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  department: string;
  frontImage: string;
  backImage: string;
  caption: string;
  postedAt: string;
  minutesAgo: number;
  reactions: Record<string, number>;
  userReaction?: string;
}

export interface SpottedPost {
  id: string;
  description: string;
  location: string;
  timestamp: string;
  seekerName: string; // e.g. "Anonymous Falcon" or real alias
  avatar: string;
  clothingColor?: string;
  claimsCount: number;
  hasUserClaimed: boolean;
  isMatched: boolean;
  matchedUserId?: string;
  chatRoomId?: string;
}

export interface TempChatRoom {
  id: string;
  spottedPostId: string;
  otherPartyName: string;
  otherPartyAvatar: string;
  otherPartyBranch: string;
  expiresAt: number; // Unix timestamp for 24h
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
  selfDestructInSec?: number;
}

export interface HostelLoungeMessage {
  id: string;
  authorAlias: string;
  authorAvatar: string;
  text: string;
  room: 'girls' | 'boys' | 'common';
  timestamp: string;
  isMedia?: boolean;
  mediaUri?: string;
  upvotes: number;
}

export interface ChannelItem {
  id: string;
  title: string;
  author: string;
  authorBranch: string;
  batch: string;
  branch: string;
  category: 'Announcement' | 'Notes' | 'ExamAlert' | 'ChitChat';
  content: string;
  likes: number;
  commentsCount: number;
  createdAt: string;
  fileAttachment?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  avatar: string;
  branch: string;
  role: 'Polling Volunteer';
  selectedDate: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface VolunteerPoll {
  id: string;
  question: string;
  volunteerId: string;
  volunteerName: string;
  options: PollOption[];
  totalVotes: number;
  userVotedOptionId?: string;
  expiresInHours: number;
}

export interface StreakItem {
  id: string;
  title: string;
  count: number;
  type: 'bunk' | 'canteen' | 'study' | 'sports' | 'coding';
  icon: string;
  lastCheckedIn: string;
  badgeName: string;
  badgeColor: string;
}

export interface Badge {
  id: string;
  name: string;
  category: string;
  tier: number;
  unlocked: boolean;
  icon: string;
  description: string;
}

export interface TeaHint {
  step: number;
  hint: string;
}

export interface TeaPost {
  id: string;
  authorAlias: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  category: 'CampusCrush' | 'DepartmentGossip' | 'ProfQuotes' | 'HostelChronicles';
  burnCount: number;
  isBurnt: boolean;
  reportsCount: number;
  isReportedByUser: boolean;
  isGuessWho: boolean;
  hints?: TeaHint[];
  realIdentity?: string;
  isRevealed: boolean;
  authorId: string;
  comments: {
    id: string;
    authorAlias: string;
    text: string;
    timestamp: string;
    isGuess?: boolean;
  }[];
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  rsvpCount: number;
  isRsvpd: boolean;
  tag: string;
}

export interface Club {
  id: string;
  name: string;
  headName: string;
  headAvatar: string;
  coverImage: string;
  tagline: string;
  category: 'Tech' | 'Culture' | 'Sports' | 'Business' | 'Literary';
  membersCount: number;
  isMember: boolean;
  announcements: {
    id: string;
    title: string;
    body: string;
    timestamp: string;
  }[];
  upcomingEvents: ClubEvent[];
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  type: 'match' | 'drop' | 'tea' | 'poll' | 'hostel';
  read: boolean;
}
