import {getRandomNumber} from './util.js';

const SHOW_RANDOM_COUNT = 10;

const compareCommentsLenght = ((a,b) => parseFloat(b.comments.length) - parseFloat(a.comments.length));

const comparePhotosId = ((a,b) => parseFloat(a.id) - parseFloat(b.id));

const showRandomPhotosArray = (array) => {
  for (let i = 0; i < SHOW_RANDOM_COUNT; i++) {
    const newArray = [];
    const randomArrayElement = getRandomNumber([i], array.length - 1);
    const newElement = array[randomArrayElement];
    if (newElement >= array.length) {
      let j = newElement - array.length + 1;
      while (j--) {
        array.push(undefined);
      }
    }
    array.splice(newElement, 0, array.splice(randomArrayElement, 1)[i]);
    newArray[i] = array[i];
    return newArray;
  }
};

export {showRandomPhotosArray, compareCommentsLenght, comparePhotosId};
