import {getRandomNumber} from './util.js';

const SHOW_RANDOM_COUNT = 10;

const compareCommentsLenght = ((a,b) => parseFloat(b.comments.length) - parseFloat(a.comments.length));

const comparePhotosId = ((a,b) => parseFloat(a.id) - parseFloat(b.id));

const showRandomPhotosArray = (array) => {
  for (let i = 0; i < SHOW_RANDOM_COUNT; i++) {
    const randomElementNumber = getRandomNumber(0, array.length - 1);
    const newArrayElement = array[randomElementNumber];

    array.splice(newArrayElement, 0, array.splice(randomElementNumber, 1)[0]);
  }

  const newArray = array.slice(0, 10);
  return newArray;
};

export {showRandomPhotosArray, compareCommentsLenght, comparePhotosId};
