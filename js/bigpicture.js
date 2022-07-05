const bigPictureTemplate = document.querySelector('.big-picture');

const commentsTemplate = bigPictureTemplate.querySelector('.social__comments')
  .content.querySelector('.social__comment');

const openBigPicture = function (bigPhotos) {
  bigPictureTemplate.classList.remove('hidden');

  bigPhotos.forEach((bigPhoto) => {
    const bigPhotoElement = bigPictureTemplate.cloneNode(true);
    bigPhotoElement.querySelector('.big-picture__img').src = bigPhoto.url;
    bigPhotoElement.querySelector('.likes-count').textContent = bigPhoto.likes;
    bigPhotoElement.querySelector('.comments-count').textContent = bigPhoto.comments.length;
    const bigPhotoComments = commentsTemplate.cloneNode(true);
    bigPhotoComments.querySelector('.social__picture').src = bigPhoto.comments.avatar;
    bigPhotoComments.querySelector('.social__picture').alt = bigPhoto.comments.name;
    bigPhotoComments.querySelector('social__text').textContent = bigPhoto.comments.message;
    bigPhotoComments.append(commentsTemplate);
    bigPhotoElement.querySelector('.social__caption').textContent = bigPhoto.description;
    bigPictureTemplate.querySelector('.social__comment-count').add('.hidden');
    bigPictureTemplate.querySelector('.comments-loader').classList.add('.hidden');
    document.querySelector('body').classList.add('.modal-open');
  });
};

export {openBigPicture};
