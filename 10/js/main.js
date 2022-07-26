import {drawPicture} from './picture.js';

import {setFormSubmit} from './form.js';

import {showAlert} from './util.js';

import {getData} from './fetch.js';

import './filter.js';

getData(drawPicture, showAlert);

setFormSubmit();
