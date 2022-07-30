const ALERT_SHOW_TIME = 5000;

const isEscapeKey = ((evt) => evt.key === 'Escape');

const body = document.querySelector('body');

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

const debounce = (oneFunction, time) => {
  let timeout;
  return function () {
    const fucntionCall  = () => {
      oneFunction.apply(this, arguments);
    };

    clearTimeout(timeout);
    timeout = setTimeout(fucntionCall, time);
  };
};

const showMessage = (result) => {
  const messageTemplate = document.querySelector(`#${result}`).content;
  const messageElement = messageTemplate.cloneNode(true);
  const closeMessageButton = messageElement.querySelector(`.${result}__button`);
  const CloseMessageHandler = (evt) => {
    if (evt.target === body.querySelector(`.${result}__inner`) ||
      evt.target === body.querySelector(`.${result}__title`)) {
      return evt;
    }
    body.querySelector(`.${result}`).remove();
    document.removeEventListener('click', CloseMessageHandler);
  };

  body.appendChild(messageElement);
  document.addEventListener('click', CloseMessageHandler);

  closeMessageButton.addEventListener('click', () => {
    document.querySelector(`.${result}`).remove();
    document.removeEventListener('click', CloseMessageHandler);
  });
};

function getRandomNumber (minNumber, maxNumber) {
  minNumber = Math.ceil(minNumber);
  maxNumber = Math.ceil(maxNumber);

  if (maxNumber <= minNumber) {
    return (maxNumber++);
  }

  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
}

export {getRandomNumber, isEscapeKey, showMessage, showAlert, debounce};
