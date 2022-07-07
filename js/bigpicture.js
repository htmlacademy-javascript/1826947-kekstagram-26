const bigPictureTemplate = document.querySelector('.big-picture');

const commentsTemplate = bigPictureTemplate.querySelector('.social__comments')
  .content.querySelector('.social__comment');

const closeBigPicture = document.querySelector('#picture-cancel');

const addBigPictureHandler = function (photos) {
  bigPictureTemplate.addEventListener('click', () => {
    for (let i = 0; i < bigPictureTemplate.length; i++) {
      bigPictureTemplate.querySelector('.big-picture__img').src = photos[i].url;
      bigPictureTemplate.querySelector('.likes-count').textContent = photos[i].likes;
      bigPictureTemplate.querySelector('.comments-count').textContent = photos[i].comments.length;

      const bigPhotoComments = commentsTemplate.cloneNode(true);
      for (let j = 0; j < bigPhotoComments.length; j++) {
        bigPhotoComments[j].querySelector('.social__picture').src = photos[i].comments[j].avatar;
        bigPhotoComments[j].querySelector('.social__picture').alt = photos[i].comments[j].name;
        bigPhotoComments[j].querySelector('social__text').textContent = photos[i].comments[j].message;
        bigPhotoComments[j].append(commentsTemplate);
      }
    }

    bigPictureTemplate.querySelector('.social__caption').textContent = photos.description;
    bigPictureTemplate.querySelector('.social__comment-count').add('.hidden');
    bigPictureTemplate.querySelector('.comments-loader').classList.add('.hidden');
    document.querySelector('body').classList.add('.modal-open');
  });
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

export {addBigPictureHandler};
