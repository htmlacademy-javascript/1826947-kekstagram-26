import {isEscapeKey} from './util.js';

const bigPictureOverlay = document.querySelector('.big-picture');

const commentsTemplate = bigPictureOverlay.querySelector('.social__comments').content;

const closeBigPicture = document.querySelector('#picture-cancel');

const drawBigPicture = (photo) => {
  openBigPictureOverlay();
  bigPictureOverlay.querySelector('.big-picture__img').src = photo.url;
  bigPictureOverlay.querySelector('.likes-count').textContent = photo.likes;
  bigPictureOverlay.querySelector('.comments-count').textContent = photo.comments.length;
  bigPictureOverlay.querySelector('.social__caption').textContent = photo.description;

  const bigPhotoComments = commentsTemplate.cloneNode(true);
  for (let j = 0; j < bigPhotoComments.length; j++) {
    bigPhotoComments[j].querySelector('.social__picture').src = photo.comments[j].avatar;
    bigPhotoComments[j].querySelector('.social__picture').alt = photo.comments[j].name;
    bigPhotoComments[j].querySelector('social__text').textContent = photo.comments[j].message;
    bigPhotoComments[j].appendChild(commentsTemplate);
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
  bigPictureOverlay.querySelector('.social__comment-count').add('.hidden');
  bigPictureOverlay.querySelector('.comments-loader').classList.add('.hidden');
  document.querySelector('body').classList.add('.modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeBigPictureOverlay () {
  bigPictureOverlay.classList.add('hidden');
  bigPictureOverlay.querySelector('.social__comment-count').remove('.hidden');
  bigPictureOverlay.querySelector('.comments-loader').classList.remove('.hidden');
  document.querySelector('body').classList.remove('.modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

closeBigPicture.addEventListener('click', () => {
  closeBigPictureOverlay();
});

export {drawBigPicture};
