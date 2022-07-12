import {getrandomNumber} from './util.js';

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

const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: DESCRIPTION[getrandomNumber(0, DESCRIPTION.length - 1)],
  likes: getrandomNumber(MIN_LIKES, MAX_LIKES)
});

export {createPhoto};
