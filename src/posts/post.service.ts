import { v4 as uuidv4 } from 'uuid';
import { Post } from './post.type';

let posts: Post[] = [
  {
    id: '116583c2-3f81-46fe-a5a1-89e6304597ba',
    title: 'Lorem ipsum dolor sit amet',
    author: {
      id: 'user1',
      name: 'User 1',
    },
    created: new Date('2020-06-20'),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel ex posuere, luctus justo eu, eleifend urna. Donec a turpis a enim facilisis mollis. Nullam vel laoreet quam. Ut imperdiet commodo erat. Donec aliquam iaculis magna quis dictum. Integer malesuada congue ligula sed scelerisque. Nunc ultricies dolor ligula, id tristique arcu vulputate sed. Nunc semper tempus leo, laoreet consectetur lorem consequat nec. Curabitur molestie lacinia orci eget venenatis.',
  },
  {
    id: '8f7a0014-9efe-46c1-8cbb-8ab12941e7de',
    title: 'Suspendisse potenti',
    author: {
      id: 'user2',
      name: 'User 2',
    },
    created: new Date('2020-06-20'),
    content:
      'Suspendisse potenti. In dignissim arcu vitae dui accumsan, non aliquet justo luctus. Integer id quam eu elit pellentesque egestas. Duis eget cursus quam, sit amet facilisis quam. Nullam et justo nisi. Morbi non velit urna. Suspendisse potenti. Nullam dignissim mauris justo, nec consectetur quam rhoncus in.',
  },
  {
    id: '04f855e3-9fb5-4791-98f6-3da9718d7cb3',
    title: 'Nam ac sapien non urna laoreet elementum ac quis eros.',
    author: {
      id: 'user1',
      name: 'User 1',
    },
    created: new Date('2020-06-21'),
    content:
      'Nam ac sapien non urna laoreet elementum ac quis eros. Morbi tincidunt consequat ultrices. Morbi accumsan iaculis diam, sed vestibulum tellus pretium quis. Fusce egestas efficitur arcu, quis porttitor sapien consectetur vel. In hac habitasse platea dictumst. Aenean mattis efficitur condimentum. Ut sed odio scelerisque, dignissim nulla nec, semper dolor. Suspendisse auctor risus felis, quis feugiat tortor euismod nec. In ornare mi tincidunt viverra maximus. In sed hendrerit metus. Suspendisse et felis sed mi cursus rhoncus quis non nulla. Proin nec orci vel velit tincidunt vestibulum eu sed ligula.',
  },
  {
    id: '7247c82e-6e48-4390-93e5-b3359b9e5f6d',
    title: 'Duis ultrices sit amet magna id blandit.',
    author: {
      id: 'user2',
      name: 'User 2',
    },
    created: new Date('2020-06-22'),
    content:
      'Duis ultrices sit amet magna id blandit. Nulla facilisi. Aliquam vehicula nec ex quis egestas. Nullam lacinia, nibh ut fermentum pellentesque, sem lorem finibus erat, eget tristique mauris erat in augue. Nulla elementum vehicula justo, egestas scelerisque lectus faucibus nec. Etiam id libero sagittis, mollis felis eu, bibendum mi. Donec ut turpis ut turpis aliquet ultrices.',
  },
  {
    id: '28419dd3-6be6-4cf2-b204-a5dcbf051f20',
    title: 'Proin pellentesque eros sit amet faucibus sagittis.',
    author: {
      id: 'user1',
      name: 'User 1',
    },
    created: new Date('2020-06-23'),
    content:
      'Proin pellentesque eros sit amet faucibus sagittis. Aliquam tellus ex, facilisis eu erat a, molestie dictum tellus. Donec dictum rutrum felis et semper. Suspendisse tortor velit, suscipit a risus ac, vestibulum congue enim. Fusce sed nunc tincidunt, porta erat ut, cursus eros. Aenean augue massa, egestas nec neque non, porttitor porttitor libero. Aenean consequat quam id felis ultricies dictum. Aliquam sodales mollis ex, quis convallis eros sagittis vel. Nam porttitor mi sit amet pulvinar tincidunt. Donec tincidunt, tortor ut bibendum interdum, ex risus gravida eros, non rhoncus mauris sapien eu quam. Phasellus sit amet tempus augue. Pellentesque consequat lobortis diam, ut pellentesque nisi aliquet sed. Vestibulum vulputate rutrum dolor ut congue. Nulla ut tincidunt dui. Cras commodo tincidunt tempor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  },
];

export const findAll = async (): Promise<Post[]> => {
  return posts;
};

export const find = async (postId: string): Promise<Post> => {
  const post = posts.find(({ id }) => id === postId);

  if (post) {
    return post;
  }

  throw new Error('No post found');
};

export const create = async (post: Post): Promise<Post> => {
  if (!post.title || !post.content) {
    throw new Error('No title or content to create a new post');
  }

  if (!post.author) {
    throw new Error('No author to create a new post');
  }

  const newPost = {
    ...post,
    id: uuidv4(),
    created: new Date(),
  };

  posts = [...posts, newPost];

  return newPost;
};

export const update = async (postId: string, post: Post): Promise<Post> => {
  if (!post.title || !post.content) {
    throw new Error('No title or content to update the post');
  }

  const postIndex = posts.findIndex(({ id }) => id === postId);

  if (postIndex > -1) {
    posts[postIndex] = {
      ...posts[postIndex],
      ...post,
    };
    return posts[postIndex];
  }

  throw new Error('No post found to update');
};

export const remove = async (postId: string): Promise<void> => {
  const postIndex = posts.findIndex(({ id }) => id === postId);

  if (postIndex > -1) {
    posts.splice(postIndex, 1);
    return;
  }

  throw new Error('No post found to delete');
};
