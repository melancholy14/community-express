import express, { Request, Response } from 'express';
import * as PostService from './post.service';
import * as CommentService from './comment.service';

import { Post } from './post.type';
import { Comment } from './comment.type';

export const postRouter = express.Router();

postRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const posts: Post[] = await PostService.findAll();

    res.status(200).send(posts);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

postRouter.post('/', async (req: Request, res: Response) => {
  try {
    const post: Post = req.body;

    const newPost: Post = await PostService.create(post);

    res.status(201).send(newPost);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

postRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const post: Post = await PostService.find(id);

    res.status(200).send(post);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

postRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const post: Post = req.body;
    
    const updated = await PostService.update(id, post);
  
    res.status(200).send(updated);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// postRouter.delete('/:id', async (req: Request, res: Response) => {
//   try {
//     const id: number = parseInt(req.params.id);

//     await ItemService.remove(id);

//     res.sendStatus(200);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// })

postRouter.get('/:id/comment', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const comments = await CommentService.findAll(id);

    res.status(200).send(comments);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

postRouter.post('/:id/comment', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const comment: Comment = req.body;

    const newComment: Comment = await CommentService.create(id, comment);

    res.status(201).send(newComment);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

postRouter.put('/:id/comment/:commentId', async (req: Request, res: Response) => {
  try {
    const id = req.params.commentId;

    const comment: Comment = req.body;

    const updated: Comment = await CommentService.update(id, comment);

    res.status(200).send(updated);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
