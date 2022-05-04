import '../styles/ibg.scss';
import '../styles/main.scss';
import '../styles/about.scss';

export default function ibg() {
	const ibgElemList = document.querySelectorAll('.ibg');
	ibgElemList.forEach((ibgElem) => {
		ibgElem.style.backgroundImage = `url('${ibgElem.querySelector('img').getAttribute('src')}')`;
	});
}
