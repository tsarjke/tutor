import '../styles/modal.scss';
import phoneMask from './phoneMask';

const btns = document.querySelectorAll('button[data=\'modal\']');
const modalElem = document.querySelector('.modal');
const closeBtn = document.querySelector('.modal__close');
const modelOvarlayelem = document.querySelector('.modal__overlay');
const inputPhoneElem = document.querySelector('.modal__phone');
const modalFormElem = document.querySelector('#modal');
const statusElem = document.querySelector('.modal__status');
const inputNameElem = document.querySelector('.modal__name');
const checkboxInputs = document.querySelectorAll('.chb__input');

const cleanModal = () => {
	inputPhoneElem.value = '';
	inputNameElem.value = '';
	inputPhoneElem.classList.remove('wrong');
	inputNameElem.classList.remove('wrong');
	[...checkboxInputs].forEach((input) => {
		input.nextElementSibling.classList.remove('wrong');
	});
};

const showModal = (e) => {
	e.preventDefault();
	modalElem.children[0].classList.add('active');
	modalElem.classList.add('active');
	document.body.classList.add('lock');
};

const closeModal = () => {
	modalElem.children[0].classList.remove('active');
	setTimeout(() => modalElem.classList.remove('active'), 200);
	document.body.classList.remove('lock');
	cleanStatus();
	cleanModal();
};

[...btns].forEach((btn) => {
	btn.addEventListener('click', showModal);
});

closeBtn.addEventListener('click', closeModal);
modelOvarlayelem.addEventListener('click', closeModal);

document.body.addEventListener('keyup', (e) => {
	if (e.key === 'Escape') {
		closeModal();
	}
});

const events = ['input', 'focus'];
events.forEach((ev) => {
	inputPhoneElem.addEventListener(ev, phoneMask);
});

const statusMessages = {
	loading: 'Отправка данных...',
	success: 'Данные успешно отправлены!',
	failure: 'Что-то пошло не так!',
	userError: 'Ошибка при заполнении данных!',
};

const cleanStatus = () => {
	statusElem.textContent = '';
};

const showStatus = (response) => {
	if (response.ok) {
		statusElem.textContent = statusMessages.success;
		setTimeout(() => {
			closeModal();
			cleanStatus();
		}, 2500);
	} else {
		statusElem.textContent = statusMessages.failure;
		throw new Error('post Error');
	}
	setTimeout(cleanStatus, 2500);
	return response;
};

const checkInputs = () => {
	const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
	let error = 0;
	if (!inputNameElem.value.length) {
		inputNameElem.classList.add('wrong');
		error++;
	} else {
		inputNameElem.classList.remove('wrong');
	}

	if (!phoneRegex.test(inputPhoneElem.value)) {
		inputPhoneElem.classList.add('wrong');
		error++;
	} else {
		inputPhoneElem.classList.remove('wrong');
	}

	let checkedCheckbox = 0;
	[...checkboxInputs].forEach((input) => {
		if (input.checked) {
			checkedCheckbox++;
		}
	});

	if (!checkedCheckbox) {
		[...checkboxInputs].forEach((input) => {
			input.nextElementSibling.classList.add('wrong');
		});
	} else {
		[...checkboxInputs].forEach((input) => {
			input.nextElementSibling.classList.remove('wrong');
		});
	}

	if (error) {
		return false;
	}
	return true;
};

const sendData = (e) => {
	e.preventDefault();

	statusElem.textContent = statusMessages.loading;

	if (checkInputs()) {
		const formData = new FormData(modalFormElem);
		const objData = Object.fromEntries(formData.entries());

		const options = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(objData),
		};

		fetch('./send.php', options)
			.then((response) => showStatus(response))
			.catch((error) => console.log(error));
	} else {
		statusElem.textContent = statusMessages.userError;
	}
};

modalFormElem.addEventListener('submit', sendData);
