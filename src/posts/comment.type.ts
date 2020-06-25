import { User } from '../users/user.interface';

export type Comment = {
  post: string;
  id: string;
  author: Partial<User>;
  created: Date;
  content: string;
}
