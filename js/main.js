import {createPhotos} from './photos.js';

import {drawPicture} from './picture.js';

import {openBigPicture} from './bigpicture.js';

drawPicture(createPhotos());

openBigPicture(createPhotos());
