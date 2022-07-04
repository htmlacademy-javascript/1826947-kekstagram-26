const userDialog = document.querySelector('.pictures');

userDialog.querySelector('.pictures__title').classList.remove('visually-hidden');

const similarListElement = userDialog.append('section');
const similarPictureTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const drawPicture = function createClone(photos) {
  photos.forEach((photo) => {
    const photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    similarListElement.appendChild(photoElement);
  });
};

export {drawPicture};
