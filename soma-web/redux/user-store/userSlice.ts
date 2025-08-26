import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// User Slice Types
interface UserState {
  uid: number | null;
  username: string;
  email: string;
  fullName: string | null;
  gender: 'Male' | 'Female' | null;
  dateOfBirth: string | null;
  userInterests: string[];
  profilePicture: string | null;
  bannerPicture: string | null;
  bio: string | null;
  socialMediaLinks: string[];
  relationshipStatus: 'Single' | 'Relationship' | 'Married' | 'None';
  education: string | null;
  workHistory: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  phoneNumber: string | null;
  religion: 'Christian' | 'Muslim' | 'Hindu' | 'Buddhist' | 'Jew' | 'Atheist' | 'Other' | 'None';
  starSign: 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces' | 'None';
  personalityType: 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP' | 'None';
  privacySettings: 'Public' | 'Private';
  userFacebook: string | null;
  userInstagram: string | null;
  userXTwitter: string | null;
  userThreads: string | null;
  userYouTube: string | null;
  userLinkedIn: string | null;
  userTikTok: string | null;
  userBookName: string | null;
  userBookWebsite: string | null;
  userBookImage: string | null;
  userBookDescription: string | null;
  userWebsite: string | null;
  articleDelivery: 'app' | 'email' | 'number' | 'app&email' | 'all';
  magazineDelivery: 'app' | 'email' | 'number' | 'app&email' | 'all';
  podcastDelivery: 'app' | 'email' | 'number' | 'app&email' | 'all';
  engagementLikesApp: boolean;
  engagementLikesEmail: boolean;
  engagementCommentsApp: boolean;
  engagementCommentsEmail: boolean;
  engagementSharesApp: boolean;
  engagementSharesEmail: boolean;
  engagementMentionsApp: boolean;
  engagementMentionsEmail: boolean;
  connectionsFollowersApp: boolean;
  connectionsFollowersEmail: boolean;
  connectionsSubscribersApp: boolean;
  connectionsSubscribersEmail: boolean;
  connectionsChatsApp: boolean;
  connectionsChatsEmail: boolean;
  connectionsChartsUpdatesApp: boolean;
  connectionsChartsUpdatesEmail: boolean;
  messagingChatRepliesApp: boolean;
  messagingChatRepliesEmail: boolean;
  messagingRequestsFrom: 'Everyone' | 'Paid Subscribers' | 'Free Subscribers' | 'No One';
  // Content Preferences
  filterExplicitContent: boolean;
  autoPlayVideos: boolean;
  blockedAccounts: boolean;
  mutedAccounts: boolean;
  hiddenPublications: boolean;
  manageInterests: boolean;
  // Privacy Settings
  showLikesOnProfile: boolean;
  allowMentions: boolean;
  allowGuestPosts: boolean;
  contactMatching: boolean;
}

// User Slice Initial Values
const initialState: UserState = {
  uid: null,
  username: '',
  email: '',
  fullName: null,
  gender: null,
  dateOfBirth: null,
  userInterests: [],
  profilePicture: null,
  bannerPicture: null,
  bio: null,
  socialMediaLinks: [],
  relationshipStatus: 'None',
  education: null,
  workHistory: null,
  contactEmail: null,
  contactPhone: null,
  phoneNumber: null,
  religion: 'None',
  starSign: 'None',
  personalityType: 'None',
  privacySettings: 'Public',
  userFacebook: null,
  userInstagram: null,
  userXTwitter: null,
  userThreads: null,
  userYouTube: null,
  userLinkedIn: null,
  userTikTok: null,
  userBookName: null,
  userBookWebsite: null,
  userBookImage: null,
  userBookDescription: null,
  userWebsite: null,
  // Notification Settings Default Values
  articleDelivery: 'all',
  magazineDelivery: 'all',
  podcastDelivery: 'all',
  engagementLikesApp: true,
  engagementLikesEmail: true,
  engagementCommentsApp: true,
  engagementCommentsEmail: true,
  engagementSharesApp: true,
  engagementSharesEmail: true,
  engagementMentionsApp: true,
  engagementMentionsEmail: true,
  connectionsFollowersApp: true,
  connectionsFollowersEmail: true,
  connectionsSubscribersApp: true,
  connectionsSubscribersEmail: true,
  connectionsChatsApp: true,
  connectionsChatsEmail: true,
  connectionsChartsUpdatesApp: true,
  connectionsChartsUpdatesEmail: true,
  messagingChatRepliesApp: true,
  messagingChatRepliesEmail: true,
  messagingRequestsFrom: 'Everyone',
  // Content Preferences Default Values
  filterExplicitContent: true,
  autoPlayVideos: true,
  blockedAccounts: true,
  mutedAccounts: true,
  hiddenPublications: true,
  manageInterests: true,
  // Privacy Settings Default Values
  showLikesOnProfile: true,
  allowMentions: true,
  allowGuestPosts: true,
  contactMatching: true,
};

// User Slice Functions
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      return initialState;
    },
    updateUserField: <K extends keyof UserState>(
      state: UserState,
      action: PayloadAction<{ field: K; value: UserState[K] }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

// Exporting Functions
export const { setUser, clearUser, updateUserField } = userSlice.actions;
export default userSlice.reducer; 