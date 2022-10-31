
function _pick_Date(targetThis) {
	$(targetThis).datepicker({
		dateFormat: 'dd M yy'
	});
}

function replaceNull(value) {
	let new_value = '';
	if (value === null) {
		new_value = '';
	} else {
		new_value = value;
	}
	return new_value;
}

function get_Value_Converter(converter, value, getObj) {
	
	let result = '';
	
	switch (converter) {
		case '_set_datetime_DMY':
			result = _set_datetime_DMY(value);
		break;
		case '_add_icon_folder':
			result = '<span class="glyphicon glyphicon-folder-open" style="color: #F9C64A"></span>&nbsp;'+ (value);
		break;
		case '_add_icon_file':
			result = '<span class="glyphicon glyphicon-file" ></span>&nbsp;'+ (value);
		break;
		case '_event_open_file':
			result = '<a href="'+ getObj.file_path +'" target="blank"> '+ (value) +'</a>';
		break;
		default: 
			result = value;
	}
	
	return result;
}

function get_Value_Converter_Form(converter, value) {
	
	let result = '';
	
	switch (converter) {
		case '_set_datetime_DMY':
			result = _set_datetime_DMY(value);
		break;
		default: 
			result = value;
	}
	
	return result;
}

function _set_qty_Rbf_Breakdown(value) {
	let result = '';
	if (value === 0 || value === '0') {
		result = '';
	} else {
		result = value;
	}
	
	return result;
}

function _label_Index(value) {
	/*
	consumer: 
		components/List
			_List_Fetch()
	*/
	let result = '';
	
	let a = value.replaceAll(' ', '_');
	result = a;
	
	return result;
}

function _clearTimer(tagId, paramTimer) {
	
	let dataTimer = [];
	if (paramTimer === 'all') {
		dataTimer = globalData[tagId]['dataTimer'];
		$.map(globalData[tagId]['dataTimer'], ( val, x ) => {			
			$.map(val, ( item, y ) => {
				clearTimeout(item);	
			});
			globalData[tagId]['dataTimer'][val] = [];
		});
	} // all 
	else {
		dataTimer = globalData[tagId]['dataTimer'][paramTimer];
		$.map(dataTimer, ( item, y ) => {
			clearTimeout(item);
		});
		
		globalData[tagId]['dataTimer'][paramTimer] = [];
	}
	
}