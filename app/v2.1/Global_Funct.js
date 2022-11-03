
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

function replaceNull(value) {
	let new_value = '';
	if (value === null) {
		new_value = '';
	} else {
		new_value = value;
	}
	return new_value;
}

function get_ObjOther_Td(getObj) {
	let objOther = {};
		switch(getObj.valueConverter) {
			case '_event_open_file':
				objOther = {
					'tagId': getObj.tagId,
					'file_path': baseUrl_Upload + getObj.file_path
				};
			break;
			default:
				objOther = {};
		} // switch valueConverter
	
	return objOther;
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
	/*
	consumer: 
		components/Form
			get_Map_Form_Input
	*/
	
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

function get_eventListener_Form(getObj) {
	/*
	consumer: 
		components/Form
			get_Map_Form_Input
	*/
	
	const tagId  = getObj.tagId;
	let result   = '';
	let classXY  = getObj.row +'-'+ getObj.col;
	switch (getObj.eventInput) {
		case 'List_Fixed_Status_Active':
			result = 'onclick="List_Fixed_Status_Active(`'+ tagId +'`, `'+ classXY +'`)"';
		break;
		case 'List_Fixed_Currency':
			result = 'onclick="List_Fixed_Currency(`'+ tagId +'`, `'+ classXY +'`)"';
		break;
		case 'List_Autofill':
			result = 'onclick="List_Autofill(`'+ tagId +'`, `'+ classXY +'`, '+ getObj.searchInput +')"';
		break;
		case 'Pick_Date':
			result = 'onmouseover="_pick_Date(this)"';
		break;
		default: 
			result = '';
	}
	
	return result;
}

function _pick_Date(targetThis) {
	$(targetThis).datepicker({
		dateFormat: 'dd M yy'
	});
}

function _clear_TaskActive(tagId, taskType, event){
	
	const dataTaskActive = globalData[tagId]['dataTaskActive'];
	
	switch(taskType) {
		case '_hide_Form':
			dataTaskActive['formChange'] = '';
			_hide_Confirm();
			_hide_Form(tagId);
		break;
		default:
	}
}

function get_List_Result(getObj) {
	/*
	consumer: 
		components/List
			_List_Fetch()
	*/
	
	const tagId 			= getObj.tagId;
	const colId				= getObj.colId;
	const dataAutofill		= globalData[tagId]['dataAutofill'][colId];
	const listRequest 	 	= dataAutofill.listRequest;
	const listFormat	 	= dataAutofill.listFormat;
	const selectedFunction  = dataAutofill.selectedFunction;
	const eventParam  		= dataAutofill.eventParam;
	
	const currentValue		= getObj.currentValue;
	const dataDb			= getObj.dataDb;
	
	let result = '';
	if (listFormat === 'table') {
		
		switch(listRequest) {
			// sample
			case 'myto_project_number':
				result += '<table width="100%" class="table-bordered table-condensed">'+
							'<tr>'+
							'<th></th>'+
							'<th><center>Project</center></th>'+
							'<th><center>Client</center></th>'+
							'<th><center>PM</center></th>'+
							'</tr>';
			break;
			// sample
			default:
				result += '<table width="100%" class="table-bordered">'+
						 '<tr>'+
						 '<th></th>'+
						 '<th><center>Label</center></th>'+
						 '</tr>';
		} // switchcase
	}
	$.map(dataDb, ( rowData, x ) => {
		
		let label 	 	= replaceNull(rowData['col_display']);
		let label_index = label.replaceAll(' ', '_');
		let selected 	= '';
		
		//> modify module
		switch(listRequest) {
			// area
			case 'country':
				// update global dataAutofill
				dataAutofill['dataTable'][label_index] = {
								'col_display': label, 
								'col_code_area': replaceNull(rowData['col_code_area']), 
								'col_area': replaceNull(rowData['col_area'])
								};
				
				if (currentValue === label) {
					selected = 'a-item-active';
				}
				
				if (listFormat === 'table') {
					result += '<tr><td align="center" valign="top"><a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ colId +'`, `'+ label_index +'`, this)" href="#" ><span class="glyphicon glyphicon-ok"></span></a></td>'+
								'<td valign="top">'+ label +'</td>'+
								'<td valign="top">'+ replaceNull(rowData['col_code_area']) +'</td>'+
								'<td valign="top">'+ replaceNull(rowData['col_area']) +'</td>'+
								'</tr>';
				} else {
					result += '<a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ colId +'`, `'+ label_index +'`, this)" href="#" >'+ label +'</a>';
				}
				
			break;
			case 'province':
				// update global dataAutofill
				dataAutofill['dataTable'][label_index] = {
								'col_display': label, 
								'col_code_area': replaceNull(rowData['col_code_area']), 
								'col_area': replaceNull(rowData['col_area'])
								};
				
				if (currentValue === label) {
					selected = 'a-item-active';
				}
				
				if (listFormat === 'table') {
					result += '<tr><td align="center" valign="top"><a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ colId +'`, `'+ label_index +'`, this)" href="#" ><span class="glyphicon glyphicon-ok"></span></a></td>'+
								'<td valign="top">'+ label +'</td>'+
								'<td valign="top">'+ replaceNull(rowData['col_code_area']) +'</td>'+
								'<td valign="top">'+ replaceNull(rowData['col_area']) +'</td>'+
								'</tr>';
				} else {
					result += '<a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ colId +'`, `'+ label_index +'`, this)" href="#" >'+ label +'</a>';
				}
				
			break;
			// area 
			
			// sample
			case 'myto_project_number':
				// update global dataAutofill
				dataAutofill['dataTable'][label_index] = {
								'col_display': label, 
								'col_project_number': replaceNull(rowData['col_project_number']), 
								'col_client_name': replaceNull(rowData['col_client_name']), 
								'col_project_manager': replaceNull(rowData['col_project_manager'])
								};
				
				if (currentValue === label) {
					selected = 'a-item-active';
				}
				
				if (listFormat === 'table') {
					result += '<tr><td align="center" valign="top"><a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ colId +'`, `'+ label_index +'`, this)" href="#" ><span class="glyphicon glyphicon-ok"></span></a></td>'+
								'<td valign="top">'+ label +'</td>'+
								'<td valign="top">'+ replaceNull(rowData['col_client_name']) +'</td>'+
								'<td valign="top">'+ replaceNull(rowData['col_project_manager']) +'</td>'+
								'</tr>';
				} else {
					result += '<a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ colId +'`, `'+ label_index +'`, this)" href="#" >'+ label +'</a>';
				}
				
			break;
			// sample
			
			default:
				dataAutofill['dataTable'][label_index] = {
								'col_display': label
								};
				if (currentValue === label) {
					selected = 'a-item-active';
				}
				
				if (listFormat === 'table') {
					result += '<tr><td align="center" valign="top"><a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ colId +'`, `'+ label_index +'`, this)" href="#" ><span class="glyphicon glyphicon-ok"></span></a></td>'+
									'<td valign="top">'+ label +'</td>'+
									'</tr>';
				} else {
					result += '<a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ colId +'`, `'+ label_index +'`, this)" href="#" >'+ label +'</a>';
				}
		} // switchcase listRequest				
		
	}); // map
	
	if (listFormat === 'table') {
		result += '</table>';
	}
	
	return result;
}
