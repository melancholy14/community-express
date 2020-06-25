import { Base64 } from 'js-base64';

import { User } from './user.type';

let users: User[] = [
  {
    id: 'user1',
    name: 'User 1',
    password: Base64.encode('user1:1234')
  },
  {
    id: 'user2',
    name: 'User 2',
    password: Base64.encode('user2:qwer')
  },
  {
    id: 'user3',
    name: 'User 3',
    password: Base64.encode('user3:asdf')
  }
];

export const signup = async (user: User): Promise<Partial<User>> => {
  const { password, id, name } = user;

  if (!id || !name || !password ) {
    throw new Error('No ID, name, or password to create a new account');
  }

  const newUser = {
    id,
    name,
    password: Base64.encode(`${id}:${password}`),
  };

  users = [...users, newUser];

  return {
    id,
    name,
  };
};

export const login = async (authorization: string): Promise<Partial<User>> => {
  const userString = authorization.replace('Basic ', '');

  if (!userString) {
    throw new Error('No ID or password to login');
  }

  const user = users.find(({ password }) => password === userString);
  
  if (user) {
    const { password, ...rest } = user;
    return rest;
  }

  throw new Error("No user found");
};
