function _date_Default() {
	
	var now = new Date();
	var result =
		("0" + now.getDate()).slice(-2) + " " +
		get_Short_Month(("0" + (now.getMonth()+1)).slice(-2)) + " " +
		now.getFullYear();
		
	return result;
}

function _time_Default() {
	
	var now = new Date();
	var result =
		("0" + now.getHours()).slice(-2) + ":" +
		("0" + now.getMinutes()).slice(-2) + ":" +
		("0" + now.getSeconds()).slice(-2);

	return result;
}

function _datetime_Default() {
	
	var now = new Date();
	var result =
		("0" + now.getDate()).slice(-2) + " " +
		get_Short_Month(("0" + (now.getMonth()+1)).slice(-2)) + " " +
		now.getFullYear() + " " +
		("0" + now.getHours()).slice(-2) + ":" +
		("0" + now.getMinutes()).slice(-2) + ":" +
		("0" + now.getSeconds()).slice(-2);

	return result;
}
function _year_Default() {
	
	var now = new Date();
	var result = now.getFullYear();
		
	return result;
}
function get_Short_Month(valMonth) {
	const month = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	let index = (parseInt(valMonth)-1);

	return month[index];
}

function _set_Date_DMY(valDate) {
	if (valDate === '') {
		result = '';
	} else {
		var now = new Date(valDate);
		var result =
			("0" + now.getDate()).slice(-2) + " " +
			get_Short_Month(("0" + (now.getMonth()+1)).slice(-2)) + " " +
			now.getFullYear();
	}
	return result;
}

function _set_Datetime_DMY(valDate) {
	
	if (valDate === '') {
		result = '';
	} else {
		var now = new Date(valDate);
		var result =
			("0" + now.getDate()).slice(-2) + " " +
			get_Short_Month(("0" + (now.getMonth()+1)).slice(-2)) + " " +
			now.getFullYear() + " " +
			("0" + now.getHours()).slice(-2) + ":" +
			("0" + now.getMinutes()).slice(-2) + ":" +
			("0" + now.getSeconds()).slice(-2);
	}
	return result;
}