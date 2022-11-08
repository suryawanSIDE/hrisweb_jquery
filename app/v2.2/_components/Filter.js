function Filter_Form(targetThis, indexField) {
	
	const tagId			= $(targetThis).attr("data-tagid");
	const filterField 	= globalData[tagId].fieldFilter;
	let newObj 			= {};

	switch(filterField[indexField].field) {
		default:
			newObj = {
				'tagId': tagId,
				'field': filterField[indexField].field,
				'searchInput': filterField[indexField].searchInput,
				'filterModel': filterField[indexField].filterModel
			};
	}// switchcase

	// components/form
	set_Filter_Form({
		'tagId': tagId,
		'label': filterField[indexField].label,
		'field': filterField[indexField].field,
		'contentBody': _filter_Contnt_Body(newObj) // _contents/Filter
	});

	if (filterField[indexField].filterModel === 'list') {
		_Filter_Fetch(newObj);
	}
}

function Search_Filter(tagId, field) {
	
	_Filter_Fetch({
			'tagId': tagId,
			'field': field
		});
}
	
function Reset_Filter(tagId, field, filterModel) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl_Topbar = baseLevel.find(".my-topbar").eq(0);
	const baseEl 		= baseEl_Topbar.find(".filter-body .filter-container-form-"+ field +" .select-content-header");
	
	switch(filterModel) {
		case 'rangeDate':
			baseEl.find(".input-date-filter-a").val("");
			baseEl.find(".input-date-filter-b").val("");
		break;
		default:
			baseEl.find(".input-serach-filter").val("");

			_Filter_Fetch({
					'tagId': tagId,
					'field': field
				});
	} // switchcase
}

function _Filter_Fetch(getObj) {
	
	const tagId			= getObj.tagId;
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl_Topbar = baseLevel.find(".my-topbar").eq(0);
	
	const loader 		= get_Loader(); // elements
	const baseEl_Form 	= baseEl_Topbar.find(".filter-body .filter-container-form-"+ getObj.field);
		  baseEl_Form.find(".select-content-body").html('<center>'+ loader +'</center>');

	const urlController  = globalData[tagId].urlController;
	const dataFilter 	 = globalData[tagId].dataFilter;	
	const dataSearch 	 = globalData[tagId].dataSearch;	
	const dataRules		 = globalData[tagId].dataRules;
	const search 		 = baseEl_Form.find(".select-content-header .input-serach-filter").val();
	
	// async load data
	$.ajax({
		type: "post",
		url: baseUrl + urlController,
		dataType: "json",
		data: {
			'appId': appId,
			'loginKey': get_LoginKey(), // elements
			'randomKey': get_RandomKey(), // elements
			'moduleId': globalData[tagId].moduleId,
			'reqAction': 'filter',
			'setObj': {
				'search': search,
				'field': getObj.field,
				'dataFilter': dataFilter,
				'dataSearch': dataSearch,
				'dataRules': dataRules
			}
		}, // data
		success: (response) => {	
			
			const myObj  = response;
			const dataDb = myObj.response_data.data;	

			if (myObj.status === 'success') {
				
				// current value from span filter
				let itemEl		 	= baseEl_Topbar.find(".filter-body .filter-data-"+ getObj.field +" .filter-item");
				let objLength		 = itemEl.length;
				let currentValue 	 = [];	
				for (let x = 0; x < objLength; x++) {
					let itemValue = itemEl.eq(x).html();
						currentValue.push(itemValue);
				}

				let result = '<table class="my-table-list-filter"><tbody>';

					$.map(dataDb, ( rowData) => {
						let label 	= rowData[getObj.field];
						let checked = '';

						if (currentValue.indexOf(label) > -1) {
							checked = 'checked';
						} 

						result += '<tr>'+
									'<td align="center" valign="top"><input '+ checked +' onclick="_selected_List_Filter(this, `'+ tagId +'`, `'+ getObj.field +'`)" type="checkbox" value="'+ label +'" /></td>'+
									'<td align="top">'+ label +'</td></tr>'+
								  '</tr>';
					});

				result += '</tbody></table>';
				
				// apply result
				baseEl_Form.find(".select-content-body").html(result);

			} else if (myObj.status === 'reject') {

				// components
				unset_LoginKey();

				// controllers
				Load_Redirect();

			} else {
				
				// reset body
				baseEl_Form.find(".select-content-body").html("");

				// components
				set_Alert({
					'type': 'danger', 
					'body': myObj.message, 
					'footer': get_Alert_Footer(1) // elements
				});

			}
		}, // success
		error: (xhr) => {
			
				// reset body
				baseEl_Form.find(".select-content-body").html("");
						
			// components
			set_Alert({
					'type': 'danger', 
					'body': 'Error connection', 
					'footer': get_Alert_Footer(1) // elements
				});
		}, // error
	}); // ajax
}	

function set_Filter_Form(getObj) {
	
	const tagId  = getObj.tagId;
	
	const result = '<div class="right-panel-popup my-move-tobottom">'+
					'<div class="right-panel-popup-head">Filter '+ getObj.label +'</div>'+
					'<div class="right-panel-popup-body">'+ getObj.contentBody +'</div>'+
					'<div class="right-panel-popup-footer">'+
						'<div style="text-align: right">'+
						'<span class="btn-group" role="toolbar">'+
							'<button onclick="_hide_Filter_Form(`'+ tagId +'`, `'+ getObj.field +'`)" class="btn btn-sm btn-default btn-group">Close</button>'+
						'</span>'+
						'</div>'+
					'</div>'+
				'</div></div>';	

	const baseLevel 	= $("#level-"+ tagId);
	baseLevel.find(".my-topbar").eq(0)
		.find(".filter-container-form-"+ getObj.field).html(result);
}

function _filter_Contnt_Body(getObj){
	
	const tagId  	  = getObj.tagId;	
	let searchDisplay = '';
	let result		  = '';

	if (getObj.searchInput === 0) {
		searchDisplay = 'my-hide';
	} else {
		searchDisplay = 'my-block';
	}

	switch(getObj.filterModel) {
		case 'rangeDate':
		
			const baseLevel 	= $("#level-"+ tagId);
			const baseEl_Topbar = baseLevel.find(".my-topbar").eq(0);
			const baseEl_Data   = baseEl_Topbar.find(".filter-body .filter-data-"+ getObj.field);
			
			let date_a = '';
			const date_item_a = baseEl_Data.find(".filter-item-0").html();
			if (typeof date_item_a !== 'undefined' && date_item_a !== '') {	
				date_a = date_item_a.replace("From:", "");
			}
			
			let date_b = '';
			const date_item_b = baseEl_Data.find(".filter-item-1").html();
			if (typeof date_item_b !== 'undefined' && date_item_b !== '') {	
				date_b = date_item_b.replace("To:", "");
			}
			
			result	= '<div class="select-content">'+
				'<div class="select-content-header '+ searchDisplay +'">'+
				'<table><tr>'+
					'<td><input onkeypress="_press_Input_Filter_Renge(event, `'+ tagId +'`, `'+ getObj.field +'`)" onmouseover="_calendar_Filter(`'+ tagId +'`, `'+ getObj.field +'`, `input-date-filter-a`)" type="text" class="input-date-filter-a form-control input-sm" placeholder="start date" value="'+ date_a +'" /></td>'+
					'<td><input onkeypress="_press_Input_Filter_Renge(event, `'+ tagId +'`, `'+ getObj.field +'`)" onmouseover="_calendar_Filter(`'+ tagId +'`, `'+ getObj.field +'`, `input-date-filter-b`)" type="text" class="input-date-filter-b form-control input-sm" placeholder="end date" value="'+ date_b +'" /></td>'+
					'<td><button onclick="_selected_Range_Filter(`'+ tagId +'`, `'+ getObj.field +'`)" class="btn btn-default btn-sm filter-action-date-selected" ><span class="glyphicon glyphicon-ok"></span></button></td>'+
					'<td><button onclick="Reset_Filter(`'+ tagId +'`, `'+ getObj.field +'`, `'+ getObj.filterModel +'`)" class="btn btn-default btn-sm" ><span class="glyphicon glyphicon-refresh"></span></button></td>'+
				'</tr></table>'+
				'</div>'+
				'<div class="select-content-body"></div>'+
			'</div>';
		break;
		default:
			result	= '<div class="select-content">'+
				'<div class="select-content-header '+ searchDisplay +'">'+
				'<table><tr>'+
					'<td><input onkeypress="_press_Input_Filter(event, `'+ tagId +'`, `'+ getObj.field +'`)" type="text" class="input-serach-filter form-control input-sm" placeholder="search" /></td>'+
					'<td><button onclick="Search_Filter(`'+ tagId +'`, `'+ getObj.field +'`)" class="btn btn-default btn-sm filter-action-search" ><span class="glyphicon glyphicon-search"></span></button></td>'+
					'<td><button onclick="Reset_Filter(`'+ tagId +'`, `'+ getObj.field +'`, `'+ getObj.filterModel +'`)" class="btn btn-default btn-sm filter-action-refresh" ><span class="glyphicon glyphicon-refresh"></span></button></td>'+
				'</tr></table>'+
				'</div>'+
				'<div class="select-content-body"></div>'+
			'</div>';
	} // switchcase
	
	return result;
}

function _press_Input_Filter(e, tagId, field) {
	if (e && e.which){
		charCode = e.which;
	} else if (window.event){
		e = window.event;
		charCode = e.keyCode;
	}
	
	if (charCode === 13 && globalData[tagId]['enterPressed'].Filter === false) { // enter	
		const baseLevel = $("#level-"+ tagId);
		baseLevel.find(".my-topbar").eq(0)
			.find(".filter-container-form-"+ field 
				+" .filter-action-search").click();
		
		globalData[tagId]['enterPressed'].Filter = true;
		let mytimer = setTimeout(function(){
			 globalData[tagId]['enterPressed'].Filter = false;
		}, 1000); // 1 detik
		
		globalData[tagId]['dataTimer']['_press_Input_Filter'].push(mytimer);
	}
}

function _press_Input_Filter_Renge(e, tagId, field) {
	if (e && e.which){
		charCode = e.which;
	} else if (window.event){
		e = window.event;
		charCode = e.keyCode;
	}
	
	if (charCode === 13 && globalData[tagId]['enterPressed'].Filter_Renge === false) { // enter	
		const baseLevel = $("#level-"+ tagId);
		baseLevel.find(".my-topbar").eq(0)
			.find(".filter-container-form-"+ field 
				+" .filter-action-date-selected").click();
		
		globalData[tagId]['enterPressed'].Filter_Renge = true;
		let mytimer = setTimeout(function(){
			 globalData[tagId]['enterPressed'].Filter_Renge = false;
		}, 1000); // 1 detik
		
		globalData[tagId]['dataTimer']['_press_Input_Filter_Renge'].push(mytimer);
		
		_hide_Filter_Form(tagId, field)
	}
}

function _selected_Range_Filter(tagId, field) {

	const baseLevel 	= $("#level-"+ tagId);
	const baseEl_Topbar = baseLevel.find(".my-topbar").eq(0);
	const baseEl_Form 	= baseEl_Topbar.find(".filter-body .filter-container-form-"+ field +" .select-content-header");
	const date_a 		= baseEl_Form.find(".input-date-filter-a").val();
	const date_b 		= baseEl_Form.find(".input-date-filter-b").val();
	
	let filter_text = '';

	if (date_a !== '' && date_b !== '') {
		filter_text	= '<span class="btn-group">';
		filter_text = filter_text +'<span class="btn-group filter-item-box filter-item-box-0"  style="margin-right: 0">'+
						'<span class="btn btn-default btn-xs filter-item filter-item-0">'+ 
							'From: '+ date_a +
						'</span>'+
					'</span>';
		filter_text = filter_text +'<span class="btn-group filter-item-box filter-item-box-1">'+
						'<span class="btn btn-default btn-xs filter-item filter-item-1">'+ 
							'To: '+ date_b +
						'</span>'+
						'<span onclick="_remove_Filter_Item_Range(`'+ tagId +'`, `'+ field +'`)" style="margin-right: 2px;" class="btn btn-default btn-xs">'+ 
							'<span class="glyphicon glyphicon-remove my-required"></span>'+
						'</span>'+
					'</span>';
		filter_text = filter_text +'</span>';
	}

	baseEl_Topbar.find(".filter-data-"+ field).html(filter_text);
	
	_hide_Filter_Form(tagId, field)
}

function _calendar_Filter(tagId, field, targetEl) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl_Topbar = baseLevel.find(".my-topbar").eq(0);

		baseEl_Topbar.find(".filter-body .filter-container-form-"+ field +" .select-content-header ."+ targetEl).datepicker({
			dateFormat: 'dd M yy',
			changeMonth: true,
			changeYear: true
		});
}

function _selected_List_Filter(targetThis, tagId, field) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl_Topbar = baseLevel.find(".my-topbar").eq(0);
	const fieldFilter   = globalData[tagId].fieldFilter;
	const statusCb 	    = $(targetThis).prop("checked");
	const value 	    = $(targetThis).val();
	const baseEl_Data   = baseEl_Topbar.find(".filter-body .filter-data-"+ field +" .filter-item");
	const objLength	    = baseEl_Data.length;
	let currentValue    = [];	
	for (let x = 0; x < objLength; x++) {
		let itemValue = baseEl_Data.eq(x).html();
			currentValue.push(itemValue);
	}

	// add/remove new value
	if (statusCb === true) {
		if (currentValue.indexOf(value) === -1) {
			currentValue.push(value); // checked value;
		}
	} else {
		currentValue.splice(currentValue.indexOf(value), 1);
	}
	// convert array to oject
	let newObjItem = {};
	$.map(currentValue, ( val, i ) => {
		newObjItem[i] = val;
	});
	
	let filter_text = get_Filter_Item({
			'tagId': tagId,
			'field': field,
			'value': newObjItem,
			'filterModel': fieldFilter.filterModel
		});

	baseEl_Topbar.find(".filter-data-"+ field).html(filter_text);

}

function _remove_Filter_Item(tagId, field, index) {
	
	const baseLevel 	= $("#level-"+ tagId);
	baseLevel.find(".my-topbar").eq(0)
		.find(".filter-data-"+ field 
			+" .filter-item-box-"+ index).remove();
}

function _remove_Filter_Item_Range(tagId, field) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl_Topbar = baseLevel.find(".my-topbar").eq(0);
	
	  baseEl_Topbar.find(".filter-data-"+ field 
		+" .filter-item-box-0").remove();
	  baseEl_Topbar.find(".filter-data-"+ field 
		+" .filter-item-box-1").remove();
}

function get_Filter_Item(getObj) {
	
	const tagId 	= getObj.tagId;
	const objLength = Object.keys(getObj.value).length;
	let newValue  = '';
	if (objLength > 0) {
		if (getObj.filterModel === 'rangeDate') {
				newValue = '<span class="btn-group">';
				newValue = newValue +'<span class="btn-group filter-item-box filter-item-box-0" style="margin-right: 0">'+
						'<span class="btn btn-default btn-xs filter-item filter-item-0">'+ 
							getObj.value[0] +
						'</span>'+
					'</span>';
				newValue = newValue +'<span class="btn-group filter-item-box filter-item-box-1">'+
						'<span class="btn btn-default btn-xs filter-item filter-item-1">'+ 
							getObj.value[1] +
						'</span>'+
						'<span onclick="_remove_Filter_Item_Range(`'+ tagId +'`, `'+ getObj.field +'`)" style="margin-right: 2px;" class="btn btn-default btn-xs">'+ 
							'<span class="glyphicon glyphicon-remove my-required"></span>'+
						'</span>'+
					'</span>';
				newValue = newValue +'</span>';
		} else {
			$.map(getObj.value, ( val, x ) => {
			newValue += '<span class="btn-group filter-item-box filter-item-box-'+ x +'">'+
							'<span class="btn btn-default btn-xs filter-item filter-item-'+ x +'">'+ 
							val +
							'</span>'+
							'<span onclick="_remove_Filter_Item(`'+ tagId +'`, `'+ getObj.field +'`, '+ x +')" style="margin-right: 2px;" class="btn btn-default btn-xs">'+ 
								'<span class="glyphicon glyphicon-remove my-required"></span>'+
							'</span>'+
					   '</span>';
			});
		}
	}
	
	return newValue;
}


function _hide_Filter_Form(tagId, field) {
	
	const baseLevel 	= $("#level-"+ tagId);
	baseLevel.find(".my-topbar").eq(0)
		.find(".filter-container-form-"+ field).html("");
}
