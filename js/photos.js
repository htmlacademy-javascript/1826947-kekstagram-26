import {createComment} from './comment.js';

import {createPost} from './post.js';

const createPhotos = () => {
  const photos = [];

  for (let i = 0; i < 25; i++) {
    const post = createPost(i + 1);
    const comments = [];

    for (let j = 0; j < 3; j++) {
      const comment = createComment(j + 1);
      comments.push(comment);
    }

    post.comments = comments;
    photos.push(post);
  }

  return photos;
};

export {createPhotos};
