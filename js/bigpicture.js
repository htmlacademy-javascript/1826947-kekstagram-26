import {isEscapeKey} from './util.js';

const bigPictureOverlay = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPictureOverlay.querySelector('#picture-cancel');
const commentsArray = bigPictureOverlay.querySelector('.social__comments');
const showMoreCommentsButton = bigPictureOverlay.querySelector('.social__comments-loader');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureOverlay();
  }
};

const createComment = function (comment) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');
  commentElement.style.width = 35;
  commentElement.style.height = 35;
  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentElement.appendChild(commentAvatar);
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  commentElement.appendChild(commentText);
  return commentElement;
};

const removeCommentsPattern = function () {
  const commentsPattern = commentsArray.querySelectorAll('.social__comment');
  for (let i = 0; i < commentsPattern.length; i++) {
    commentsPattern[i].remove();
  }
};

const drawBigPicture = function (photo) {
  openBigPictureOverlay();
  bigPictureOverlay.querySelector('.big-picture__img img').src = photo.url;
  bigPictureOverlay.querySelector('.likes-count').textContent = photo.likes;
  bigPictureOverlay.querySelector('.social__caption').textContent = photo.description;
  removeCommentsPattern();

  const createComments = function () {
    for (let j = 0; j < photo.comments.length; j++) {
      const newComment = createComment(photo.comments[j]);
      commentsArray.appendChild(newComment);
    }

    const SHOW_STEP_COMMENTS = 5;
    const allComments = commentsArray.querySelectorAll('.social__comment');
    const commentCountField = bigPictureOverlay.querySelector('.social__comment-count');

    if (showMoreCommentsButton.classList.contains('hidden')) {
      showMoreCommentsButton.classList.remove('hidden');
    }

    for (let i = 0; i < allComments.length; i++) {
      allComments[i].classList.add('hidden');
    }

    if (allComments.length <= SHOW_STEP_COMMENTS) {
      for (let k = 0; k < allComments.length; k++) {
        allComments[k].classList.remove('hidden');
      }
      showMoreCommentsButton.classList.add('hidden');
      commentCountField.textContent = `${allComments.length} из ${allComments.length} комментариев`;
    }

    if (allComments.length > SHOW_STEP_COMMENTS) {
      for (let l = 0; l < SHOW_STEP_COMMENTS; l++) {
        allComments[l].classList.remove('hidden');
      }
      commentCountField.textContent = `SHOW_STEP_COMMENTS из ${allComments.length} комментариев`;
    }

    const showMoreCommentsButtonLoader = function () {
      const allShownComments = commentsArray.querySelectorAll('li:not(.hidden)');
      let willShowComments = allShownComments.length + SHOW_STEP_COMMENTS;

      if (allComments.length <= willShowComments) {
        for (let l = 0; l < allComments.length; l++) {
          willShowComments = allComments.length;
          allComments[l].classList.remove('hidden');
          showMoreCommentsButton.classList.add('hidden');
        }
      }

      if (allComments.length > willShowComments) {
        for (let k = allShownComments.length; k < willShowComments; k++) {
          allComments[k].classList.remove('hidden');
        }
      }
      commentCountField.textContent = `${willShowComments} из ${allComments.length} комментариев`;
    };
    showMoreCommentsButton.addEventListener('click', showMoreCommentsButtonLoader);
  };
  createComments();
};

function openBigPictureOverlay () {
  bigPictureOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
  document.querySelector('body').classList.add('modal-open');
}

function closeBigPictureOverlay () {
  bigPictureOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.querySelector('body').classList.remove('modal-open');
}

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPictureOverlay();
});

export {drawBigPicture};
