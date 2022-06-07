function randomNumber (minNumer, maxNumber) {
  minNumer = Math.ceil(minNumer);   // для вычислкения наименьшего целого числа, которое больше, или равно заданному числу
  maxNumber = Math.ceil(maxNumber);   //для вычислкения наибольшего целого числа, которое больше, или равно заданному числу

  if (maxNumber <= minNumer) {
    return ('Пожалуйста выберите число больше' + maxNumber);
  }

  return Math.floor(Math.random() * (maxNumber - minNumer)) + minNumer;
}


function checkStringLength (targetString, maxString) {
  if (targetString > maxString) {
    return false;
  }

  return true;
}
