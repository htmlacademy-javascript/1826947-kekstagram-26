import {createComment} from './comment.js';

import {createPhoto} from './photo.js';

import {getRandomNumber} from './util.js';

const MIN_COMMENTS_COUNT = 0;

const MAX_COMMENT_COUNT = 100;


const createPhotos = () => {
  const photos = [];

  for (let i = 0; i < 25; i++) {
    const post = createPhoto(i + 1);
    const comments = [];

    for (let j = 0; j < getRandomNumber(MIN_COMMENTS_COUNT, MAX_COMMENT_COUNT); j++) {
      const comment = createComment(j + 1);
      comments.push(comment);
    }

    post.comments = comments;
    photos.push(post);
  }

  return photos;
};

export {createPhotos};
