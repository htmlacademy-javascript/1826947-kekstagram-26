/*
1. Пропишите тегу form правильные значения атрибутов method и адрес action для отправки.
  Если форма заполнина правильно, то после отправки покажется страница сервера (action тега form).
  Если форма заполнена НЕправильно, то покажется страница с ошибками.
  Идеально, чтобы не существовало сценария с неккоректно отправвленными данными.

2.Проверить HTML разметку проекта и дополнить недостающие атрибуты параметрами.

3. Изучить, что значит загрузка img, как, когда и каким образом показывается форма ред. img.
  Напишите код и добавьте необходимые обработчики для реализации этого пункта техзадания.
  В работе вы можете опираться на код показа окна с полноразмерной фотографией, который вы, возможно, уже написали в предыдущей домашней работе.

  выбор файла с изображением для загрузки;
  изменение масштаба изображения;
  применение одного из заранее заготовленных эффектов;
  выбор глубины эффекта с помощью ползунка;
  добавление текстового комментария;
  добавление хэш-тегов.

  4. Реализовать закрытие формы.

  Обратите внимание, что при закрытии формы дополнительно необходимо сбрасывать значение поля выбора файла '#upload-file' .

5. Код для валидации формы должен быть для :
  Хэш-теги
  Комментарий
*/
const form = document.querySelector('.img-upload__form');

const uploadPole = form.querySelector('#upload-file');

const uploadOverlay = form.querySelector('.img-upload__overlay');

const cancelUpload = form.querySelector('#upload-cancel');

const reduceImg = form.querySelector('.scale__control--smaller');

const depthEffect = form.querySelector('.effect-level__value');

const increaseImg = form.querySelector('.scale__control--bigger');

const success = document.querySelector('#success');

const error = document.querySelector('#error');

const pristine = new Pristine(form, {
  classTo: 'img-upload__form',
  errorClass: error,
  successClass: success
}, false);

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const uploadPicture = (picture) => {
  uploadPole.src = picture.url;
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

reduceImg('click', () => {
  uploadPole.width /= 0.25;
  uploadPole.height /= 0.25;
  return uploadPole.width >= 0.25;
});

pristine.addValidator(reduceImg);

increaseImg('click', () => {
  uploadPole.width *= 0.25;
  uploadPole.height *= 0.25;
  return uploadPole.width <= 1;
});

pristine.addValidator(increaseImg);

function validateHashtags (value) {
  if (value === re) {
    return form.querySelector('.text__hashtags')
      .createElement('span')
      .textContent('Хэштег должен начинаться с #, не быть пустым, не содержать спецсимволы (#, @, $ и т. п.) и пробелы');
  }
  return value.length >= 0 && value.length <= 5;
}

pristine.addValidator(form.querySelector('[name="hashtags"]'),
  validateHashtags, 'не более 5 хэштегов');

function validateComments (value) {
  return value.length >= 0 && value.length <= 140;
}

pristine.addValidator(form.querySelector('[name="description"]'),
  validateComments, 'не более 140 символов');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

cancelUpload.addEventListener('click', () => {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('.modal-open');
});

document.addEventListener('keydown', (evt) => {
  evt.preventDefault();
  if (KeyboardEvent.keyCode === 27) {
    uploadOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('.modal-open');
  }
});
