export default function phoneMask(e) {
	const el = e.target;
	const clearVal = el.dataset.phoneClear;
	const pattern = el.dataset.phonePattern;
	const matrixDef = '+7 (___) ___-__-__';
	const matrix = pattern ? pattern : matrixDef;
	let i = 0;
	const def = matrix.replace(/\D/g, '');
	let val = el.value.replace(/\D/g, '');

	if (clearVal !== 'false' && e.type === 'blur') {
		if (val.length < matrix.match(/([_\d])/g).length) {
			el.value = '';
			return;
		}
	}

	if (def.length >= val.length) val = def;
	el.value = matrix.replace(/./g, (a) => /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a);
}
