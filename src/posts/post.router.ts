import express, { Request, Response } from 'express';
import * as PostService from './post.service';
import { Post } from './post.type';

export const postRouter = express.Router();

postRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const posts: Post[] = await PostService.findAll();

    res.status(200).send(posts);
  } catch (e) {
    res.status(404).send(e.message);
  }
})

postRouter.post('/', async (req: Request, res: Response) => {
  try {
    const post: Post = req.body.item;

    await PostService.create(post);

    res.sendStatus(201);
  } catch (e) {
    res.status(404).send(e.message);
  }
})

postRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const post: Post = await PostService.find(id);

    res.status(200).send(post);
  } catch (e) {
    res.status(404).send(e.message);
  }
})

postRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const post: Post = req.body.item;
    
    await PostService.update(id, post);
  
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
})

// postRouter.delete('/:id', async (req: Request, res: Response) => {
//   try {
//     const id: number = parseInt(req.params.id);

//     await ItemService.remove(id);

//     res.sendStatus(200);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// })