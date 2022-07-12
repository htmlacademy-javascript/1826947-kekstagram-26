function getRandomNumber (minNumber, maxNumber) {
  minNumber = Math.ceil(minNumber);   // для вычислкения наименьшего целого числа, которое больше, или равно заданному числу
  maxNumber = Math.ceil(maxNumber);   //для вычислкения наибольшего целого числа, которое больше, или равно заданному числу

  if (maxNumber <= minNumber) {
    return (maxNumber++);
  }

  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
}

const isEscapeKey = ((evt) => evt.key === 'Escape');

export {getRandomNumber, isEscapeKey};
