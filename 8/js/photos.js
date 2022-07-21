import {createComment} from './comment.js';

import {createPhoto} from './photo.js';

const createPhotos = () => {
  const photos = [];

  for (let i = 0; i < 25; i++) {
    const post = createPhoto(i + 1);
    const comments = [];

    for (let j = 0; j < 4; j++) {
      const comment = createComment(j + 1);
      comments.push(comment);
    }

    post.comments = comments;
    photos.push(post);
  }

  return photos;
};

export {createPhotos};
