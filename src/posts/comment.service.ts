import { v4 as uuidv4 } from 'uuid';
import { Comment } from './comment.type';

let comments: Comment[] = [
  {
    post: '116583c2-3f81-46fe-a5a1-89e6304597ba',
    id: '6e02b31b-7c85-4b65-a553-0c581da61c4a',
    author: {
      id: 'user3',
      name: 'User 3',
    },
    created: new Date('2020-06-23'),
    content: 'Maecenas sed lacus mollis, congue nunc ut, congue risus.'
  },
  {
    post: '116583c2-3f81-46fe-a5a1-89e6304597ba',
    id: 'b4f7cb23-b304-46db-9a87-ea0dd9a61438',
    author: {
      id: 'user2',
      name: 'User 2',
    },
    created: new Date('2020-06-20'),
    content: 'Aenean feugiat ipsum nunc, sed suscipit felis luctus dictum. Vivamus dignissim, nisi quis consectetur pellentesque, lorem dui imperdiet turpis, quis tristique lorem magna a nisl.'
  },
  {
    post: '04f855e3-9fb5-4791-98f6-3da9718d7cb3',
    id: 'c87a8bf2-2bf2-40fd-a47e-0ccd4b26edce',
    author: {
      id: 'user2',
      name: 'User 2',
    },
    created: new Date('2020-06-21'),
    content: 'Cras et rhoncus sapien, eu aliquam erat.'
  },
  {
    post: '7247c82e-6e48-4390-93e5-b3359b9e5f6d',
    id: '33155e81-cc43-43f7-8a19-d2a1636b1304',
    author: {
      id: 'user3',
      name: 'User 3',
    },
    created: new Date('2020-06-22'),
    content: 'Donec eu posuere lacus. Nam cursus porttitor dui, at fermentum erat egestas vitae.'
  },
  {
    post: '7247c82e-6e48-4390-93e5-b3359b9e5f6d',
    id: 'ea5e9a71-b83d-488d-aac9-5ba9e792f007',
    author: {
      id: 'user1',
      name: 'User 1',
    },
    created: new Date('2020-06-23'),
    content: 'Vestibulum dignissim orci eget felis porttitor dignissim.'
  }
];

export const findAll = async (postId: string): Promise<Comment[]> => {
  return comments.filter(({ post }) => post === postId);
};

export const create = async (postId: string, comment: Comment): Promise<Comment> => {
  if (!comment.content) {
    throw new Error('No content to create a new comment');
  }

  if (!comment.author) {
    throw new Error('No author to create a new comment');
  }

  const newComment = {
    ...comment,
    id: uuidv4(),
    created: new Date(),
    post: postId,
  };

  comments = [...comments, newComment];

  return newComment;
};

export const update = async (postId: string, commentId: string, comment: Comment): Promise<Comment> => {
  if (!comment.content) {
    throw new Error('No content to update the comment');
  }

  const commentIndex = comments.findIndex(({ id }) => id === commentId);

  if (commentIndex > -1) {
    if (comments[commentIndex].post !== postId) {
      throw new Error('No comment found on this post');
    }

    comments[commentIndex] = {
      ...comments[commentIndex],
      ...comment
    };
    return comments[commentIndex];
  }

  throw new Error("No comment found to update");
};

export const remove = async (postId: string, commentId: string): Promise<void> => {
  const commentIndex = comments.findIndex(({ id }) => id === commentId);

  if (commentIndex > -1) {
    if (comments[commentIndex].post !== postId) {
      throw new Error('No comment found on this post');
    }

    comments.splice(commentIndex, 1);
    return;
  }

  throw new Error("No comment found to delete");
};
