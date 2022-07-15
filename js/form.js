import {isEscapeKey} from './util.js';

const form = document.querySelector('.img-upload__form');

const uploadField = form.querySelector('#upload-file');

//c onst preview = form.querySelector('.img-upload__preview');

const uploadOverlay = form.querySelector('.img-upload__overlay');

const cancelUpload = form.querySelector('#upload-cancel');

//const scalePhoto = form.querySelector('.img-upload__scale');

//const photoScaleMassive = [0.25, 0.5, 0.75, 1];

//const depthEffect = form.querySelector('.effect-level__value');

const hashtagField = form.querySelector('.text__hashtags');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__form',
  errorClass: 'error',
  successClass: 'success',
  errorTextParent: 'img-upload__form',
  errorTextTag: 'span'
}, false);

/*const uploadPicture = (picture) => {
  uploadField.src = picture.url;
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

pristine.addValidator(form.querySelector('[name="filename"]'),
  uploadPicture, 'Загрузите фотографию');

function onEffectChoose (value) {
  return preview.classList.add(`.effects__preview--${value}`);
}

pristine.addValidator(form.querySelector('[name="effect"]:checked'),
  onEffectChoose, 'Выберите один из эффектов');

function onEffectIntensive (value) {
  if (value !== 'none') {
    let min = 0;
    let max = 1;
    if (value === 'blur') {
      max = 3;
      if (value === 'brightness') {
        min = 1;
      }
    }
    return value.length >= min && value.length <= max;
  }
  return depthEffect.classList.add('.hidden');
}

pristine.addValidator(form.querySelector('[name="effect-level"]'),
  onEffectIntensive(form.querySelector('[name="effect"]:checked')),
  'Выберите интенсивность применения эффекта');

function changePhotoScale () {
  const maxScale = photoScaleMassive.length - 1;
  const minScale = photoScaleMassive[0];
  scalePhoto.querySelector('.scale__control--smaller')
    .addEventListener('click', () => {
      photoScaleMassive.length --;
    });

  scalePhoto.querySelector('.scale__control--bigger')
    .addEventListener('click', () => {
      photoScaleMassive.length ++;
    });

  return changePhotoScale >= minScale && changePhotoScale <= maxScale;
}

pristine.addValidator(form.querySelector('[name="scale"]'),
  changePhotoScale(), 'Фотография не может быть меньше 25% от её размера и больше изначального');
*/
/*function validateHashtags (value) {
  if (! re.test(value)) {
    return hashtagField.setCustomValidity(
      `Хэш-тег должен начинается с символа # (решётка)

      Хэш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`,);
  }
  return value.length <= 5;
} */

function validateHashtags () {
  const array = hashtagField.value.toLowerCase().trim().split(' ');
  const uniqueHashstag = new Set(array);
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const MAX_HASHTAGS = 5;

  array.forEach((hashtag) => {
    if (!re.test(hashtag)) {
      hashtagField.setCustomValidity(
        `Хэш-тег должен начинается с символа # (решётка)
        Хэш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
    }
    if (array.length !== uniqueHashstag.size) {
      hashtagField.setCustomValidity('Хэш-теги не должны повторяться');
    }
    hashtagField.setCustomValidity('');
  });

  hashtagField.reportValidity();
  return array.length <= MAX_HASHTAGS;
}

pristine.addValidator(form.querySelector('[name="hashtags"]'),
  validateHashtags,
  'не более 5 хэштегов'
);

function validateComments (value) {
  return value.length <= 140;
}

pristine.addValidator(form.querySelector('[name="description"]'),
  validateComments,
  'не более 140 символов'
);

function openUploadOverlay () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
  document.querySelector('body').classList.add('.modal-open');
}

function closeUploadOverlay () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.querySelector('body').classList.remove('.modal-open');
}

uploadField.addEventListener('click', (evt) => {
  evt.preventDefault();
  openUploadOverlay();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  closeUploadOverlay();
  form.reset();
});

cancelUpload.addEventListener('click', () => {
  closeUploadOverlay();
});
