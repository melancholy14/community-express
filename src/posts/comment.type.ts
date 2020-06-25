import { User } from '../users/user.type';

export type Comment = {
  post: string;
  id: string;
  author: Partial<User>;
  created: Date;
  content: string;
}
