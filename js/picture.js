import {drawBigPicture} from './bigpicture.js';

const userDialog = document.querySelector('.pictures');

const similarPictureTemplate = document.querySelector('#picture').content;


const drawPicture = function createClone(photos) {
  photos.forEach((photo) => {
    const photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture').addEventListener('click', () => {
      drawBigPicture(photo);
    });
    userDialog.appendChild(photoElement);
    userDialog.querySelector('.pictures__title').classList.remove('visually-hidden');
  });
};

export {drawPicture};
