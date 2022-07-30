import {drawBigPicture} from './big-picture.js';
import {debounce} from './util.js';
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

  /*function getPhotosById () {
    checkActiveButton();
    const arrayByPhotosId = debounce(drawPicture(photos.sort(comparePhotosId)), 500);
    arrayByPhotosId;
    defaultFilterButton.classList.add('img-filters__button--active');
    defaultFilterButton.removeEventListener('click', getPhotosById);
  }

  function getMostDiscussedPhotos () {
    checkActiveButton();
    const arrayByMostDiscussedPhotos = debounce(drawPicture(photos.sort(compareCommentsLenght)), 500);
    arrayByMostDiscussedPhotos;
    mostDiscussedFilterButton.classList.add('img-filters__button--active');
    mostDiscussedFilterButton.removeEventListener('click', getMostDiscussedPhotos);
  }

  function getRandomPhotos () {
    checkActiveButton();
    const arrayWithRandomPhotos = debounce(drawPicture(showRandomPhotosArray(photos)), 500);
    arrayWithRandomPhotos;
    randomFilterButton.classList.add('img-filters__button--active');
    randomFilterButton.removeEventListener('click', getRandomPhotos);
  }*/

  defaultFilterButton.addEventListener('click', function getPhotosById () {
    checkActiveButton();
    const arrayByPhotosId = debounce(drawPicture(photos.sort(comparePhotosId)), 500);
    arrayByPhotosId;
    defaultFilterButton.classList.add('img-filters__button--active');
    defaultFilterButton.removeEventListener('click', getPhotosById);
  });

  mostDiscussedFilterButton.addEventListener('click', function getMostDiscussedPhotos () {
    checkActiveButton();
    const arrayByMostDiscussedPhotos = debounce(drawPicture(photos.sort(compareCommentsLenght)), 500);
    arrayByMostDiscussedPhotos;
    mostDiscussedFilterButton.classList.add('img-filters__button--active');
    mostDiscussedFilterButton.removeEventListener('click', getMostDiscussedPhotos);
  });

  randomFilterButton.addEventListener('click', function getRandomPhotos () {
    checkActiveButton();
    const arrayWithRandomPhotos = debounce(drawPicture(showRandomPhotosArray(photos)), 500);
    arrayWithRandomPhotos;
    randomFilterButton.classList.add('img-filters__button--active');
    randomFilterButton.removeEventListener('click', getRandomPhotos);
  });
};

export {drawPicture};
