import {isEscapeKey} from './util.js';

const bigPictureOverlay = document.querySelector('.big-picture');

const commentsTemplate = bigPictureOverlay.querySelector('.social__comments').content;

const commentsArray = Array.from(bigPictureOverlay.querySelector('.social__comments'));

const bigPhotoComment = bigPictureOverlay.querySelector('.social__comment');

const bigPictureCloseButton = document.querySelector('#picture-cancel');

const drawBigPicture = (photo) => {
  openBigPictureOverlay();
  bigPictureOverlay.querySelector('.big-picture__img').src = photo.url;
  bigPictureOverlay.querySelector('.likes-count').textContent = photo.likes;
  bigPictureOverlay.querySelector('.social__caption').textContent = photo.description;

  const newBigPhotoComment = bigPhotoComment.cloneNode(true);
  const comentsLoaderButton = bigPictureOverlay.querySelector('.social__comments-loader');

  for (let j = 0; j < commentsArray.length; j++) {
    newBigPhotoComment[j].querySelector('.social__picture').src = photo.comments[j].avatar;
    newBigPhotoComment[j].querySelector('.social__picture').alt = photo.comments[j].name;
    newBigPhotoComment[j].querySelector('social__text').textContent = photo.comments[j].message;
    newBigPhotoComment[j].appendChild(commentsTemplate);

    for (let k = 5; k < commentsTemplate.length; k++) {
      commentsTemplate[k].style.display = 'none';

      commentsTemplate.querySelector('.comments-count').textContent = commentsTemplate.length;
    }

    bigPictureOverlay.querySelector('.comments-count').textContent = commentsTemplate.length;

    comentsLoaderButton.addEventListener('click', () => {
      const step = 5;
      if (step <= commentsTemplate.length) {
        for(let l = 0 ; l < step; l++){
          commentsTemplate[l].style.display = 'block';
          commentsTemplate.querySelector('.social__comment-count')
            .textContent = `${commentsTemplate.length} из комментариев`;
        }
        bigPictureOverlay.querySelector('.comments-loader').classList.add('.hidden');
      }
    });
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
  bigPictureOverlay.querySelector('.comments-loader').classList.add('.hidden');
  document.querySelector('body').classList.add('.modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeBigPictureOverlay () {
  bigPictureOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('.modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPictureOverlay();
});

export {drawBigPicture};
