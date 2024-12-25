export interface Post {
  id: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  date: string;
  isExpanded?: boolean;
}

export interface IndustryLeaderContent {
  name: string;
  posts: Post[];
}