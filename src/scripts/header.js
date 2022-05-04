import '../styles/header.scss';

export default function onMenuClick(e) {
	const menuIconElem = document.querySelector('.header__menu-icon');
	const menuBodyElem = document.querySelector('.menu__body');

	if (window.innerWidth < 768 && (e.target.classList.contains('menu__link') || e.target.closest('.header__menu-icon'))) {
		menuBodyElem.classList.toggle('active');
		menuIconElem.classList.toggle('active');
		document.body.classList.toggle('lock');
	}
}
