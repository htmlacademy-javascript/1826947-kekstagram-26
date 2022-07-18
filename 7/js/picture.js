import {drawBigPicture} from './bigpicture.js';

const userDialog = document.querySelector('.pictures');

userDialog.querySelector('.pictures__title').classList.remove('visually-hidden');

const similarPictureTemplate = document.querySelector('#picture').content;

const drawPicture = function createClone(photos) {
  photos.forEach((photo) => {
    const photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    userDialog.appendChild(photoElement);
  });

  const otherPicturesTemplate = userDialog.querySelectorAll('.picture');

  for (let i = 0; i < otherPicturesTemplate.length; i++) {
    const newPicture = otherPicturesTemplate[i];
    newPicture.addEventListener('click', (evt) => {
      evt.preventDefault();
      drawBigPicture(newPicture);
    });
  }
};


export {drawPicture};
