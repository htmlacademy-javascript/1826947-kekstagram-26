import {createPhotos} from './photos.js';

import {drawPicture} from './picture.js';

import {addBigPictureHandler} from './bigpicture.js';

drawPicture(createPhotos());

addBigPictureHandler(createPhotos());
