interface ReactionComment {
  name: string;
  author: string;
}

export interface CommentType {
  auth: string;
  content: string;
  replies: Array<string>;
  reaction: Array<ReactionComment>;
  edited: boolean;
}
