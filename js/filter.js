const SHOW_RANDOM_COUNT = 10;
const DEBOUNCE_TIMER = 500;

import {getRandomNumber, debounce} from './util.js';
import {drawPicture} from './picture.js';

const filterForm = document.querySelector('.img-filters__form');
const allFilterButtons = filterForm.querySelectorAll('.img-filters__button');
const defaultFilterButton = filterForm.querySelector('#filter-default');
const randomFilterButton = filterForm.querySelector('#filter-random');
const mostDiscussedFilterButton = filterForm.querySelector('#filter-discussed');

const compareCommentsLenght = ((a,b) => parseFloat(b.comments.length) - parseFloat(a.comments.length));
const comparePhotosId = ((a,b) => parseFloat(a.id) - parseFloat(b.id));

const showRandomPhotosArray = (array) => {
  for (let i = 0; i < SHOW_RANDOM_COUNT; i++) {
    const randomElementNumber = getRandomNumber([i], array.length - 1);
    const newArrayElement = array[randomElementNumber];

    array.splice(newArrayElement, 0, array.splice(randomElementNumber, 1)[0]);
  }
  const newArray = array.slice(0, SHOW_RANDOM_COUNT);
  return newArray;
};

function checkActiveButton () {
  allFilterButtons.forEach((filter) => {
    filter.classList.remove('img-filters__button--active');
  });
}

const filterPhotos = (photos) => {
  defaultFilterButton.addEventListener('click', () => {
    checkActiveButton();
    debounce(drawPicture(photos.sort(comparePhotosId)), DEBOUNCE_TIMER);

    defaultFilterButton.classList.add('img-filters__button--active');
  });

  mostDiscussedFilterButton.addEventListener('click', () => {
    checkActiveButton();
    debounce(drawPicture(photos.sort(compareCommentsLenght)), DEBOUNCE_TIMER);
    mostDiscussedFilterButton.classList.add('img-filters__button--active');
  });

  randomFilterButton.addEventListener('click', () => {
    checkActiveButton();
    debounce(drawPicture(showRandomPhotosArray(photos.slice())), DEBOUNCE_TIMER);
    randomFilterButton.classList.add('img-filters__button--active');
  });
};

export {filterPhotos};
