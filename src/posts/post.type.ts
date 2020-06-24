import { User } from '../users/user.interface';

export type Post = {
  id: string;
  title: string;
  author: Partial<User>;
  created: Date;
  content: string;
}
