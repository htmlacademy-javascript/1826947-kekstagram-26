import {drawBigPicture} from './big-picture.js';

const userDialog = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture').content;

const photosFilterField = document.querySelector('.img-filters');

function deleteData (allData) {
  allData.forEach((dataElement) => {
    dataElement.remove();
  });
}

function checkPictureAvailability (Element) {
  if (document.querySelector('.picture')) {
    deleteData(Element);
  }
}

const drawPicture = function createClone(photos) {

  const allPictures = document.querySelectorAll('.picture');
  checkPictureAvailability(allPictures);

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
  photosFilterField.classList.remove('img-filters--inactive');
};

export {drawPicture};
