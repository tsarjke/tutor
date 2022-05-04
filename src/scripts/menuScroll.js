export default function scroll(e) {
	e.preventDefault();
	const href = e.target.closest('a').getAttribute('href');

	const scrollTargetElem = document.querySelector(href);

	const topOffset = document.querySelector('.header').offsetHeight;
	const elementPosition = scrollTargetElem.getBoundingClientRect().top;
	const offsetPosition = elementPosition - topOffset;

	window.scrollBy({
		top: offsetPosition,
		behavior: 'smooth',
	});
}
