function getRandomNumber (minNumber, maxNumber) {
  minNumber = Math.ceil(minNumber);   // для вычислкения наименьшего целого числа, которое больше, или равно заданному числу
  maxNumber = Math.ceil(maxNumber);   //для вычислкения наибольшего целого числа, которое больше, или равно заданному числу

  if (maxNumber <= minNumber) {
    return (maxNumber++);
  }

  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
}

const isEscapeKey = ((evt) => evt.key === 'Escape');

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertBox = document.createElement('div');
  alertBox.style.zIndex = '100';
  alertBox.style.position = 'absolute';
  alertBox.style.left = '0';
  alertBox.style.top = '0';
  alertBox.style.right = '0';
  alertBox.style.margin = '0 auto';
  alertBox.style.padding = '20px 0';
  alertBox.style.fontSize = '20px';
  alertBox.style.textAlign = 'center';
  alertBox.style.color = '#ffffff';
  alertBox.style.backgroundColor = '#ff4e4e';
  alertBox.textContent = message;

  document.body.append(alertBox);


  setTimeout(() => {
    alertBox.remove();
  }, ALERT_SHOW_TIME);
};

const showMessage = (result) => {
  const messageTemplate = document.querySelector(`#${result}`).content;
  const messageElement = messageTemplate.cloneNode(true);
  document.querySelector('body').appendChild(messageElement);

  const closeMessageButton = document.querySelector(`.${result}__button`);
  closeMessageButton.addEventListener('click', () => {
    document.querySelector(`.${result}`).remove();
  });

  document.addEventListener('click', (evt) => {
    if (evt.target.className === result) {
      document.querySelector(`.${result}`).remove();
    }
  });
};

export {getRandomNumber, isEscapeKey, showMessage, showAlert};
