import express, { Request, Response } from 'express';

import * as UserService from './user.service';
import { User } from './user.type';

export const userRouter = express.Router();

userRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const user: User = req.body;

    const created = await UserService.signup(user);

    res.status(201).send(created);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const authorization: string = req.headers.authorization || '';

    const user = await UserService.login(authorization);

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
