import {drawBigPicture} from './bigpicture.js';

import {showRandomPhotosArray,
  compareCommentsLenght,
  comparePhotosId} from './filter.js';

const userDialog = document.querySelector('.pictures');

const similarPictureTemplate = document.querySelector('#picture').content;

const photosFilterField = document.querySelector('.img-filters');

const filterForm = photosFilterField.querySelector('.img-filters__form');

const allFilterButtons = filterForm.querySelectorAll('.img-filters__button');

const defaultFilterButton = filterForm.querySelector('#filter-default');
const randomFilterButton = filterForm.querySelector('#filter-random');
const mostDiscussedFilterButton = filterForm.querySelector('#filter-discussed');

function checkActiveButton () {
  allFilterButtons.forEach((filter) => {
    filter.classList.remove('img-filters__button--active');
  });
}

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

  randomFilterButton.addEventListener('click', () => {
    checkActiveButton();
    showRandomPhotosArray(photos);
    setTimeout(() => {
      drawPicture(photos);
      const allDrawnPictures = document.querySelectorAll('.picture');
      for (let i = 10; i < allDrawnPictures.length - 1; i++){
        allDrawnPictures[i].remove();
      }
    }, 500);
    randomFilterButton.classList.add('img-filters__button--active');
  });

  mostDiscussedFilterButton.addEventListener('click', () => {
    checkActiveButton();
    setTimeout(() => {
      drawPicture(photos.sort(compareCommentsLenght));
    }, 500);
    mostDiscussedFilterButton.classList.add('img-filters__button--active');
  });

  defaultFilterButton.addEventListener('click', () => {
    checkActiveButton();
    setTimeout(() => {
      drawPicture(photos.sort(comparePhotosId));
    }, 500);
    defaultFilterButton.classList.add('img-filters__button--active');
  });
};


export {drawPicture};
