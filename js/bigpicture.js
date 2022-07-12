import {isEscapeKey,} from './util.js';

const bigPictureTemplate = document.querySelector('.big-picture');

const commentsTemplate = bigPictureTemplate.querySelector('.social__comments')
  .content.querySelector('.social__comment');

const closeBigPicture = document.querySelector('#picture-cancel');

const drawBigPicture = (photo) => {
  openBigPictureOverlay();
  bigPictureTemplate.querySelector('.big-picture__img').src = photo.url;
  bigPictureTemplate.querySelector('.likes-count').textContent = photo.likes;
  bigPictureTemplate.querySelector('.comments-count').textContent = photo.comments.length;
  bigPictureTemplate.querySelector('.social__caption').textContent = photo.description;

  const bigPhotoComments = commentsTemplate.cloneNode(true);
  for (let j = 0; j < bigPhotoComments.length; j++) {
    bigPhotoComments[j].querySelector('.social__picture').src = photo.comments[j].avatar;
    bigPhotoComments[j].querySelector('.social__picture').alt = photo.comments[j].name;
    bigPhotoComments[j].querySelector('social__text').textContent = photo.comments[j].message;
    bigPhotoComments[j].append(commentsTemplate);
  }
};


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureOverlay();
  }
};

function openBigPictureOverlay () {
  bigPictureTemplate.classList.remove('hidden');
  bigPictureTemplate.querySelector('.social__comment-count').add('.hidden');
  bigPictureTemplate.querySelector('.comments-loader').classList.add('.hidden');
  document.querySelector('body').classList.add('.modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

function closeBigPictureOverlay () {
  bigPictureTemplate.classList.add('hidden');
  bigPictureTemplate.querySelector('.social__comment-count').remove('.hidden');
  bigPictureTemplate.querySelector('.comments-loader').classList.remove('.hidden');
  document.querySelector('body').classList.remove('.modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

closeBigPicture.addEventListener('click', () => {
  closeBigPictureOverlay();
});

export {drawBigPicture};
