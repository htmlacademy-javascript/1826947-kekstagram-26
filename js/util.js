function getRandomNumber (minNumber, maxNumber) {
  minNumber = Math.ceil(minNumber);   // для вычислкения наименьшего целого числа, которое больше, или равно заданному числу
  maxNumber = Math.ceil(maxNumber);   //для вычислкения наибольшего целого числа, которое больше, или равно заданному числу

  if (maxNumber <= minNumber) {
    return (maxNumber++);
  }

  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
}

const isEscapeKey = ((evt) => evt.key === 'Escape');

/*const showMessage = (result) => {
  const messageTemplate = document.querySelector(`#${result}`);
  const messageCloseButton = messageTemplate.querySelector(`.${result}__button`);
  const messageElement = messageTemplate.cloneNode(true);
  messageElement.style.display = 'block';
  messageCloseButton.addEventListener('click', () => {
    messageElement.style.display = 'none';
  });
  document.querySelector('body').appendChild(messageElement);

export {showMessage()};

}*/

export {getRandomNumber, isEscapeKey};
