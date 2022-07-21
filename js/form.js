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

const getScaleValue = function (value) {
  return parseInt(value, 10);
};

scaleControl.addEventListener('click', (evt) => {
  if (evt.target === smallerScaleButton) {
    if(getScaleValue(scalePhotoValue.value) <= 50 && getScaleValue(scalePhotoValue.value) > 25) {
      scalePhotoValue.value = `${25}%`;
      photoPreview.style.transform = 'scale(0.25)';
    }
    if(getScaleValue(scalePhotoValue.value) <= 75 && getScaleValue(scalePhotoValue.value) > 50) {
      scalePhotoValue.value = `${50}%`;
      photoPreview.style.transform = 'scale(0.5)';
    }
    if(getScaleValue(scalePhotoValue.value) <= 100 && getScaleValue(scalePhotoValue.value) > 75) {
      scalePhotoValue.value = `${75}%`;
      photoPreview.style.transform = 'scale(0.75)';
    }
  }
  if (evt.target === biggerScaleButton) {
    if(getScaleValue(scalePhotoValue.value) >= 75 && getScaleValue(scalePhotoValue.value) < 100) {
      scalePhotoValue.value = `${100}%`;
      photoPreview.style.transform = 'scale(1)';
    }
    if(getScaleValue(scalePhotoValue.value) >= 50 && getScaleValue(scalePhotoValue.value) < 75) {
      scalePhotoValue.value = `${75}%`;
      photoPreview.style.transform = 'scale(0.75)';
    }
    if(getScaleValue(scalePhotoValue.value) >= 25 && getScaleValue(scalePhotoValue.value) < 50) {
      scalePhotoValue.value = `${50}%`;
      photoPreview.style.transform = 'scale(0.5)';
    }
    if(getScaleValue(scalePhotoValue.value) >= 0 && getScaleValue(scalePhotoValue.value) < 25) {
      scalePhotoValue.value = `${25}%`;
      photoPreview.style.transform = 'scale(0.25)';
    }
  }
});

const slidetField = form.querySelector('.img-upload__effect-level');
slidetField.classList.add('hidden');
const depthEffectSlider = form.querySelector('.effect-level__slider');
const depthEffectValue = document.querySelector('.effect-level__value');
depthEffectValue.value = 1;

noUiSlider.create(depthEffectSlider, {
  range: {
    min: 0,
    max: 1,
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

depthEffectSlider.noUiSlider.on('update', () => {
  depthEffectValue.value = depthEffectSlider.noUiSlider.get();
  photoPreview.style.filter = depthEffectValue.value;
});
const noneEffect = form.querySelector('#effect-none');
const chromeEffect = form.querySelector('#effect-chrome');
const sepiaEffect = form.querySelector('#effect-sepia');
const marvinEffect = form.querySelector('#effect-marvin');
const phobosEffect = form.querySelector('#effect-phobos');
const heatEffect = form.querySelector('#effect-heat');
const showSliderField = function () {
  if (slidetField.classList.contains('hidden')) {
    slidetField.classList.remove('hidden');
  }
}

noneEffect.addEventListener('click', () => {
  photoPreview.className = "";
  photoPreview.style.filter = 0;
  slidetField.classList.add('hidden');
});
chromeEffect.addEventListener('click', () => {
  showSliderField();
  photoPreview.className = "";
  photoPreview.style.filter = 0;
  depthEffectSlider.noUiSlider.set(1);
  depthEffectSlider.addEventListener('change', () => {
    photoPreview.style.filter = `grayscale${depthEffectValue.value}`;
  });
  photoPreview.classList.add(`effects__preview--${chromeEffect.value}`);
});
sepiaEffect.addEventListener('click', () => {
  showSliderField();
  photoPreview.className = "";
  photoPreview.style.filter = 0;
  depthEffectSlider.noUiSlider.set(1);
  depthEffectSlider.addEventListener('change', () => {
    photoPreview.style.filter = `sepia${depthEffectValue.value}`;
  });
  photoPreview.classList.add(`effects__preview--${sepiaEffect.value}`);
});
marvinEffect.addEventListener('click', () => {
  showSliderField();
  photoPreview.className = "";
  photoPreview.style.filter = 0;
  console.log(marvinEffect.value);
  depthEffectSlider.noUiSlider.set(100);
  depthEffectSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
  });
  depthEffectSlider.addEventListener('change', () => {
    photoPreview.style.filter = `invert${depthEffectValue.value}`;
  });
  console.log(depthEffectValue.value);
  photoPreview.classList.add(`effects__preview--${marvinEffect.value}`);
});
phobosEffect.addEventListener('click', () => {
  showSliderField();
  photoPreview.className = "";
  photoPreview.style.filter = 0;
  depthEffectSlider.noUiSlider.set(3);
  depthEffectSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
  });
  depthEffectSlider.addEventListener('change', () => {
    photoPreview.style.filter = `blur${depthEffectValue.value}`;
  });
  photoPreview.classList.add(`effects__preview--${phobosEffect.value}`);
});
heatEffect.addEventListener('click', () => {
  showSliderField();
  photoPreview.className = "";
  photoPreview.style.filter = 0;
  depthEffectSlider.noUiSlider.set(3);
  depthEffectSlider.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
  });
  depthEffectSlider.addEventListener('change', () => {
    photoPreview.style.filter = `brightness${depthEffectValue.value}`;
  });
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
