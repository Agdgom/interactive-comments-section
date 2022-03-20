export type CommentNoReplies = Omit<Comment, 'replies'>;
export interface Comment {
  id: number | string;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: CommentNoReplies[];
}
export interface User {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}
export interface OutPutComment {
  id: number | string;
  content: string;
}
