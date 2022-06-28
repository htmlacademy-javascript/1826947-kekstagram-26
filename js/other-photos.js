import {createPost} from './post.js';

/*
Надо отбразить миниатюру, как в .html по id="picture";

Создать DOM элемент :
  адрес изобрадение url, как атрибут src ;
  лайки вывести в блок  '.picture__likes' ;
  колличество комментариев в '.picture__comments' .

Отрисовать сгенерированные DOM элементы в блок '.pictures' . Для вставки используйте DocumentFragment.
*/

const USER_DIALOG = document.querySelector('.pictures');

USER_DIALOG.querySelector('.pictures__title').classList.remove('visually-hidden');

const SIMILAR_LIST_ELEMENT = USER_DIALOG.append.documentFragment;
const SIMILAR_POST_TEMPLATE = document.querySelector('#picture')
.content.querySelector('.social');

const similarPost = createPost();

similarPost.forEach(() => {
  const photoElement = SIMILAR_POST_TEMPLATE.cloneNode(true);
  photoElement.querySelector('.picture__likes').src = createPost(url);
  photoElement.querySelector('.picture__comments').number = comments.length; //Ничего не отобразиться, т.к. не откуда взять данные
  photoElement.querySelector('.picture__likes').number = createPost(likes);
  SIMILAR_LIST_ELEMENT.appendChild(photoElement);
});


