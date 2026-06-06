export type User = {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  isVerified?: boolean;
  residence?: string;
};

export type UserVote = {
  proposalId: string;
  proposalTitle: string;
  type: 'yes' | 'no' | 'abstain';
  timestamp: string;
  voteHash: string;
};

export type Comment = {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
  votes: number;
};

export type ProposalStatus = 'Debate' | 'Votación' | 'Resuelto' | 'Archivado';

export type VoteStats = {
  yes: number;
  no: number;
  abstain: number;
};

export type Proposal = {
  id: string;
  spaceId: string;
  author: User;
  title: string;
  description: string;
  imageUrl?: string;
  status: ProposalStatus;
  votes: VoteStats;
  comments: Comment[];
  createdAt: string;
  ledgerHash: string;
};

export type Space = {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  memberCount: number;
  icon: string;
};

export type CommunitySettings = {
  allowFreeSpaces: boolean;
  requireKYC: boolean;
};

export type Community = {
  id: string;
  name: string;
  icon: string;
  spaces: Space[];
  settings: CommunitySettings;
  collaborators: string[];
};

export type AppState = {
  currentSpace: Space | null;
  spaces: Space[];
  proposals: Proposal[];
  currentUser: User;
  userVotes: UserVote[];
};