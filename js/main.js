import {drawPicture} from './picture.js';
import {setFormSubmit} from './form.js';
import {showAlert} from './util.js';
import {getData} from './fetch.js';
import {filterPhotos} from './filter.js';

getData ((photos) => {
  drawPicture(photos);
  filterPhotos(photos);
}, showAlert);

setFormSubmit();
