function _set_Currency_Input(value) {
	let result = '';
	
	const a = value.replaceAll('.', '');
	const b = a.replaceAll(',', '.');
	result = parseFloat(b);
	
	return result;
}

function _set_Currency(value) {
	let result = '';
	
	const currency = new Intl.NumberFormat("id-ID", {
		  style: "currency", // decimal, currency, percent 
		  currency: "IDR"
		}).format(value);
	
	const a = currency.replace('Rp', '');
	const b = a.split(',');
	const c = b[0];
	const d = parseInt(b[1]);
	
	let merge = '';
	if (d > 0) {
		merge = c +','+ d;
	} else {
		merge = c;
	}
	result = merge.substring(1, merge.length);
	
	return result;
}