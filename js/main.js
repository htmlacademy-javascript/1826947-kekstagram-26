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

const MIN_LIKES = 14;

const MAX_LIKES = 200;

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

const MIN_AVATAR = 1;

const MAX_AVATAR = 6;

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

const createPost = (id) => {
  return {
    id: id,
    url: 'photos/' + id + '.jpg',
    description: DESCRIPTION[getrandomNumber(0, DESCRIPTION.length - 1)],
    likes: getrandomNumber(MIN_LIKES, MAX_LIKES),
  }
}

const createComment = (id) => {
  return {
    id: id,
    avatar: 'img/avatar-' + getrandomNumber (MIN_AVATAR, MAX_AVATAR) + '.svg',
    message: MESSAGE[getrandomNumber (0, MESSAGE.length - 1)],
    name: NAME[getrandomNumber (0, NAME.length - 1)],
  }
}

const createPhotos = () => {
  const photos = [];

  for (let i = 0; i < 25; i++) {
    const post = createPost(i + 1);
    const comments = [];

    for (let j = 0; j < 3; j++) {
      const comment = createComment(j + 1);
      comments.push(comment);
    }

    post.comments = comments;
    photos.push(post);
  }

  return photos;
}
