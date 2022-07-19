import {isEscapeKey} from './util.js';

const bigPictureOverlay = document.querySelector('.big-picture');

const bigPictureCloseButton = bigPictureOverlay.querySelector('#picture-cancel');

const comentsArray = bigPictureOverlay.querySelector('.social__comments');

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

const hideCommentsPattern = function () {
  const commentsPattern = comentsArray.querySelectorAll('.social__comment');
  for (let i = 0; i < commentsPattern.length; i++) {
    commentsPattern[i].classList.add('hidden');
  }
};

const drawBigPicture = function (photo) {
  openBigPictureOverlay();
  bigPictureOverlay.querySelector('.big-picture__img img').src = photo.url;
  bigPictureOverlay.querySelector('.likes-count').textContent = photo.likes;
  bigPictureOverlay.querySelector('.social__caption').textContent = photo.description;
  hideCommentsPattern();

  for (let j = 0; j < photo.comments.length; j++) {
    const newComment = createComment(photo.comments[j]);
    newComment.classList.add('visually-hidden');
    comentsArray.appendChild(newComment);
    const SHOW_STEP_COMMENTS = 5;
    const allComments = comentsArray.querySelectorAll('.social__comment');
    const showMoreCommentsButton = bigPictureOverlay.querySelector('.social__comments-loader');
    const commentCountField = bigPictureOverlay.querySelector('.social__comment-count');
    commentCountField.querySelector('.comments-count').textContent = allComments.length;
    console.log(allComments);

    if (allComments.length >= SHOW_STEP_COMMENTS) {
      showMoreCommentsButton.classList.add('hidden');
      commentCountField.textContent = `${allComments.length} комментариев`;
      for (let k = 0; k < allComments.length; k++) {
        allComments[k].classList.remove('visually-hidden');
      }
    }

    const showMoreCommentsButtonLoader = function () {
      let unshownComnnents = allComments.length - SHOW_STEP_COMMENTS;
      if (allComments.length >= SHOW_STEP_COMMENTS) {
        showMoreCommentsButton.classList.add('hidden');
        showMoreCommentsButton.removeEventListener('click', showMoreCommentsButtonLoader);
      }
      if (unshownComnnents > SHOW_STEP_COMMENTS) {
        for (let l = 0; l < SHOW_STEP_COMMENTS; l++) {
          allComments[l].classList.remove('visually-hidden');
        }
        commentCountField.textContent = `${showMoreCommentsButtonLoader} из комментариев`;
      }
    };
    showMoreCommentsButton.addEventListener('click', showMoreCommentsButtonLoader);
  }
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureOverlay();
  }
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
