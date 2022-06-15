function getrandomNumber (minNumer, maxNumber) {
  minNumer = Math.ceil(minNumer);   // для вычислкения наименьшего целого числа, которое больше, или равно заданному числу
  maxNumber = Math.ceil(maxNumber);   //для вычислкения наибольшего целого числа, которое больше, или равно заданному числу

  if (maxNumber <= minNumer) {
    return ('Пожалуйста выберите число больше' + maxNumber);
  }

  return Math.floor(Math.random() * (maxNumber - minNumer)) + minNumer;
}


function checkStringLength (targetString, maxString) {
  if (targetString.length > maxString) {
    return false;
  }

  return true;
}

/*
СОЗДАТЬ 25 СГЕНЕРИРОВАННЫХ ОБЪЕКТОВ(ПОСТОВ В КЕКСАГРАМ)
  id (от 1 до 25) !НЕ ПОВТОРЯЮТСЯ
  url (photos/{{i}}.jpg), {{i}} = id  !
  description самостоятельное придуманное описание
  likes (от 14 до 200)

  КОММЕНТАРИИ К ПОСТАМ
  coments - рандомное колличество. Генерируются случайно
  id случайное число !НЕ ПОВТОРЯЮТСЯ
  avatar = img/avatar-{{случайное число от 1 до 6}}.svg
 */

const POSTID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

const DESCRIPTION = [
  'Классный был день.',
  'Ням, ням, ням',
  'ВАААААУУУУУУУ',
  'А чем вы занимаетесь на выходных?',
  'ШИК, БЛЕСК, КРА СО ТА',
  'НЕ, НУ ТЫ ВИДЕЛ?!',
  'А вообще я пить хочу!',
  'I wonder how, I wonder why...',
  'Such a sunny day, and its my',
  'ВОТ ЭТО ВЕЗЕНИЕ'
];

const MINLIKES = 14;

const MAXLIKES = 200;

const COMMENTID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAME = [
  'Виктор',
  'Мария',
  'Иван',
  'Наталья',
  'Станислав',
  'Маргарита',
  'Виктор',
  'Яна',
  'Денис',
  'Дарья',
  'Макар',
  'Анастасия',
  'Егор',
  'Татьяна'
];

const AVATAR = [1, 2, 3, 4, 5, 6];

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex ;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const createPost = () => {;

  return {
    id: POSTID[shuffle(POSTID)],
    url: 'photos/' + POSTID[shuffle(POSTID)] + '.jpg',
    description: DESCRIPTION[getrandomNumber(0, DESCRIPTION.length - 1)],
    likes: getrandomNumber(MINLIKES, MAXLIKES),
  }
}

const createComment = () => {

  return {
    id: COMMENTID[shuffle(COMMENTID)],
    avatar: AVATAR[getrandomNumber (0, AVATAR.length - 1)],
    message: MESSAGE[getrandomNumber (0, MESSAGE.length - 1)],
    name: NAME[getrandomNumber (0, NAME.length - 1)],
  }
}
