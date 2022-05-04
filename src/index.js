import onMenuClick from './scripts/header';
import ibg from './scripts/ibg';
import scroll from './scripts/menuScroll';
import ChiefSlider, { onSwipeStart, onSwipeEnd } from './scripts/slider';
import './styles/slider.scss';
import './index.scss';
import './styles/null.scss';

import './styles/offer.scss';
import './styles/advantages.scss';
import './styles/footer.scss';
import './styles/description.scss';

import './scripts/modal';

ibg();

const menuIconElem = document.querySelector('.header__menu-icon');
const menuBodyElem = document.querySelector('.menu__body');
const sliderElem = document.querySelector('.offer__slider');
const logoElems = document.querySelectorAll('.logo');

[...menuBodyElem.children, menuIconElem].forEach((menuLink) => {
	menuLink.addEventListener('click', onMenuClick);
});

const linkElemList = document.querySelectorAll('a[href^="#"]');

[...linkElemList, ...logoElems].forEach((link) => {
	link.addEventListener('click', scroll);
});
//

new ChiefSlider('.slider', {
	loop: true,
});

sliderElem.addEventListener('mousedown', onSwipeStart);
document.body.addEventListener('mouseup', onSwipeEnd);
