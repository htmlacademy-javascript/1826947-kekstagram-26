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

/*const uploadPicture = (picture) => {
  uploadField.src = picture.url;
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

pristine.addValidator(form.querySelector('[name="filename"]'),
  uploadPicture, 'Загрузите фотографию');

function onEffectChoose (value) {
  return photoPreview.classList.add(`.effects__preview--${value}`);
}

const chosenEffect = form.querySelector('[name="effect"]:checked');

pristine.addValidator(chosenEffect,
  onEffectChoose, 'Выберите один из эффектов');

const depthEffect = form.querySelector('.effect-level__value');

noUiSlider.create(depthEffect, {
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
      return valuetoFixed(1);
    },
    from: functuon(value) {
      return parseFloat(value);
    },
  },
});

depthEffect.noUiSlider.on('update', (...rest) => {
chosenEffect.style.opacity =  depthEffect.noUiSlider.get();
});

chosenEffect.addEventListener('change', (evt) => {
    if (evt.target.value === 'marvin') {
    depthEffect.noUiSlider.updateOptions ({
      range: {
        min = 0,
        max = 100,
      },
      step: 1,
    });
  }
  if (evt.target.value === 'phobos') {
    depthEffect.noUiSlider.updateOptions ({
      range: {
        min = 0,
        max = 3,
      },
      step: 0.1,
    });
  }
  if (evt.target.value === 'heat') {
    depthEffect.noUiSlider.updateOptions ({
      range: {
        min = 1
        max = 3,
      },
      step: 0.1,
    });
  }
  if (evt.target.value === 'none') {
    depthEffect.setAttribute('disabled', true);
  }
  depthEffect.noUiSlider.set(1);
});
*/

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

function validateHashtags (hashtag) {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  //hashtag.match(re) cначала создать массив и пройтись for
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
