const bigPictureTemplate = document.querySelector('.big-picture');

const commentsTemplate = bigPictureTemplate.querySelector('.social__comments')
  .content.querySelector('.social__comment');

const closeBigPicture = document.querySelector('#picture-cancel');

const drawBigPicture = (photo) => {
  bigPictureTemplate.querySelector('.big-picture__img').src = photo.url;
  bigPictureTemplate.querySelector('.likes-count').textContent = photo.likes;
  bigPictureTemplate.querySelector('.comments-count').textContent = photo.comments.length;
  bigPictureTemplate.querySelector('.social__caption').textContent = photo.description;

  const bigPhotoComments = commentsTemplate.cloneNode(true);
  for (let j = 0; j < bigPhotoComments.length; j++) {
    bigPhotoComments[j].querySelector('.social__picture').src = photo.comments[j].avatar;
    bigPhotoComments[j].querySelector('.social__picture').alt = photo.comments[j].name;
    bigPhotoComments[j].querySelector('social__text').textContent = photo.comments[j].message;
    bigPhotoComments[j].append(commentsTemplate);
  }

  bigPictureTemplate.querySelector('.social__comment-count').add('.hidden');
  bigPictureTemplate.querySelector('.comments-loader').classList.add('.hidden');
  document.querySelector('body').classList.add('.modal-open');
};

closeBigPicture.addEventListener('click', () => {
  bigPictureTemplate.classList.add('hidden');
  bigPictureTemplate.querySelector('.social__comment-count').remove('.hidden');
  bigPictureTemplate.querySelector('.comments-loader').classList.remove('.hidden');
  document.querySelector('body').classList.remove('.modal-open');
});

document.addEventListener('keydown', (evt) => {
  evt.preventDefault();
  if (KeyboardEvent.keyCode === 27) {
    bigPictureTemplate.classList.add('hidden');
    bigPictureTemplate.querySelector('.social__comment-count').classList.remove('.hidden');
    bigPictureTemplate.querySelector('.comments-loader').classList.remove('.hidden');
    document.querySelector('body').classList.remove('.modal-open');
  }
});

export {drawBigPicture};
