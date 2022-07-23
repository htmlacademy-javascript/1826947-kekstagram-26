import {isEscapeKey} from './util.js';

const form = document.querySelector('#upload-select-image');

const uploadField = form.querySelector('#upload-file');

const photoPreview = form.querySelector('.img-upload__preview img');

const uploadOverlay = form.querySelector('.img-upload__overlay');

const cancelUpload = form.querySelector('#upload-cancel');

const scaleControl = form.querySelector('.img-upload__scale');
const scalePhotoValue = scaleControl.querySelector('.scale__control--value');
scalePhotoValue.value = `${100}%`;
const smallerScaleButton = scaleControl.querySelector('.scale__control--smaller');
const biggerScaleButton = scaleControl.querySelector('.scale__control--bigger');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span'
});

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP = 25;

scaleControl.addEventListener('click', (evt) => {
  if (evt.target === smallerScaleButton) {
    if (parseInt(scalePhotoValue.value, 10) > MIN_SCALE) {
      scalePhotoValue.value = `${parseInt(scalePhotoValue.value, 10) - STEP}%`;
      photoPreview.style.transform = `scale(${parseInt(scalePhotoValue.value, 10) / 100})`;
    }
    return scalePhotoValue.value;
  }
  if (evt.target === biggerScaleButton) {
    if (parseInt(scalePhotoValue.value, 10) < MAX_SCALE) {
      scalePhotoValue.value = `${parseInt(scalePhotoValue.value, 10) + STEP}%`;
      photoPreview.style.transform = `scale(${parseInt(scalePhotoValue.value, 10) / 100})`;
    }
    return scalePhotoValue.value;
  }
});

const slidetField = form.querySelector('.img-upload__effect-level');
slidetField.classList.add('hidden');
const depthEffectSlider = form.querySelector('.effect-level__slider');
const depthEffectValue = document.querySelector('.effect-level__value');

noUiSlider.create(depthEffectSlider, {
  range: {
    min: 1,
    max: 0,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const noneEffect = form.querySelector('#effect-none');
const chromeEffect = form.querySelector('#effect-chrome');
const sepiaEffect = form.querySelector('#effect-sepia');
const marvinEffect = form.querySelector('#effect-marvin');
const phobosEffect = form.querySelector('#effect-phobos');
const heatEffect = form.querySelector('#effect-heat');

depthEffectSlider.noUiSlider.on('update', () => {
  depthEffectValue.value = (depthEffectSlider.noUiSlider.get());
  const currentEffect = form.querySelector('[name="effect"]:checked').value;
  switch(currentEffect) {
    case 'chrome':
      photoPreview.style.filter = `grayscale(${depthEffectValue.value})`;
      break;
    case 'sepia':
      photoPreview.style.filter = `sepia(${depthEffectValue.value})`;
      break;
    case 'marvin':
      photoPreview.style.filter = `invert(${depthEffectValue.value}%)`;
      break;
    case 'phobos':
      photoPreview.style.filter = `blur(${depthEffectValue.value}px)`;
      break;
    case 'heat':
      photoPreview.style.filter = `brightness(${depthEffectValue.value})`;
      break;
    default:
      photoPreview.style.filter = 'none';
      break;
  }
});

const showSliderField = function () {
  if (slidetField.classList.contains('hidden')) {
    slidetField.classList.remove('hidden');
  }
};

noneEffect.addEventListener('click', () => {
  photoPreview.className = '';
  slidetField.classList.add('hidden');
});

chromeEffect.addEventListener('change', () => {
  photoPreview.className = '';
  showSliderField();
  depthEffectSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
  });
  depthEffectSlider.noUiSlider.set(1);
  photoPreview.classList.add(`effects__preview--${chromeEffect.value}`);
});

sepiaEffect.addEventListener('change', () => {
  photoPreview.className = '';
  showSliderField();
  depthEffectSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
  });
  photoPreview.classList.add(`effects__preview--${sepiaEffect.value}`);
  depthEffectSlider.noUiSlider.set(1);
});

marvinEffect.addEventListener('change', () => {
  showSliderField();
  photoPreview.className = '';
  depthEffectSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
  });
  depthEffectSlider.noUiSlider.set(100);
  photoPreview.classList.add(`effects__preview--${marvinEffect.value}`);
});

phobosEffect.addEventListener('change', () => {
  showSliderField();
  photoPreview.className = '';
  depthEffectSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
  });
  depthEffectSlider.noUiSlider.set(3);
  photoPreview.classList.add(`effects__preview--${phobosEffect.value}`);
});

heatEffect.addEventListener('change', () => {
  showSliderField();
  photoPreview.className = '';
  depthEffectSlider.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
  });
  depthEffectSlider.noUiSlider.set(3);
  photoPreview.classList.add(`effects__preview--${heatEffect.value}`);
});

function validateHashtags (hashtag) {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  const hashtagArray = hashtag.split(' ');
  for (let i = 0; i < hashtagArray.length; i++) {
    if (!re.test(hashtagArray[i])) {
      return false;
    }
    const lowerCasehashtagArray = [];
    hashtagArray.forEach((hashtagElement) => {
      lowerCasehashtagArray.push(hashtagElement.toLowerCase());
    });
    if (lowerCasehashtagArray[i + 1] === lowerCasehashtagArray[i]) {
      return false;
    }
    return hashtagArray.length <= 5;
  }
}


pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtags,
  'Хэштегов не должно быть больше 5. Каждый из них должен начинаться с #, не быть пустым, не содержать более 20 символов, не содержать спецсимволы (@, $, % и т. п.), не содержать символы пунктуации и пробелы. Не может быть 2-х одинаковы хэштега.'
);

function validateComments (value) {
  return value.length <= 140;
}

pristine.addValidator(
  form.querySelector('.text__description'),
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


uploadField.addEventListener('change', (evt) => {
  evt.preventDefault();
  photoPreview.src = URL.createObjectURL(event.target.files[0]);
  openUploadOverlay();
});


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  /*const success = document.querySelector('#success');
  const error = document.querySelector('#error');
  if (isValid) {
    success.style.display = 'block';
    const successCloseButton = success.querySelector('.success__button');
    if(successCloseButton) {
      successCloseButton.addEventListener('click', () => {
        success.style.display = 'none';
      });
    }
  }
  error.style.display = 'block';
  const errorCloseButton = error.querySelector('.error__button');
  if(errorCloseButton) {
    errorCloseButton.addEventListener('click', () => {
      error.style.display = 'none';
    });
  }*/
  form.reset();
});

cancelUpload.addEventListener('click', () => {
  closeUploadOverlay();
});
