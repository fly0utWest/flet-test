export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  postId: number;
  id: number;
  email: string;
  name: string;
  body: string;
}
