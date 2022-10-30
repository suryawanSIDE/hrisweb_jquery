const wWidth 				= $(window).width();
const wHeight 				= $(window).height();

var globalData 				= {};
var globalUser 				= [];
const currentUrl 			= window.location.href;
const splitUrl 				= currentUrl.split("/");
const baseUrl 				= splitUrl[0] + '//' + splitUrl[2] + '/hrisserver/';
const baseUrl_Upload		= baseUrl + '_upload/';
const appName				= 'APPMASTER';
const appId 				= 'appClientWeb_v2_';
const tagModule_Default 	= 'home';
const navTitleDefault		= 'Home';
const showRowDefault		= 25;
const tdHeightDefault		= 25; // px
const dataPagingDefault 	= {
							'numrow': 0,
							'numrowpage': 0,
							'display_row': 25,
							'start_row': 0,
							'max_page': 0,
							'current_page': 1,
							'next_page': 1
							}
const defaultPageGroup		= 3;

var deviceType = '';
if (wWidth <= 767) {
	deviceType = 'mobile';
} else {
	deviceType = 'dekstop';
}

function set_Global_Data(tagId) {
	
	// set global data randId
	const randId = get_RandomKey();
	if (globalData.hasOwnProperty(randId) === false) {
		globalData[randId] = [];
	} 
	
	// set global data 
	if (globalData.hasOwnProperty(tagId) === false) {
		globalData[tagId] = {};
	} 
	
	if (globalData.hasOwnProperty(tagId) === false) {
		const count    = parseInt(sessionStorage.getItem("countLoad")) || 0;
		const newCount = (count+1);
			  sessionStorage.setItem("countLoad", newCount);
		
		if (newCount > 3) {
			sessionStorage.setItem("countLoad", 0);
			$("#my-root").html("<center><h1>Something went wrong !</h1>Please contact Administrator</center>");
		} else {
			location.reload();
		}
		
	} else {
		
		// set default urlController
		if (globalData[tagId].hasOwnProperty('urlController') === false) {
			globalData[tagId]['urlController'] = '';
		}
		
		// set default moduleId
		if (globalData[tagId].hasOwnProperty('moduleId') === false) {
			globalData[tagId]['moduleId'] = '';
		}
		// set default dataPaging
		if (globalData[tagId].hasOwnProperty('dataPaging') === false) {
			globalData[tagId]['dataPaging'] = {
				'numrow': 0,
				'numrowpage': 0,
				'display_row': dataPagingDefault.display_row,
				'start_row': dataPagingDefault.start_row,
				'max_page': 0,
				'current_page': dataPagingDefault.current_page,
				'next_page': dataPagingDefault.next_page
				};
		}
			
		// set default fieldFilter
		if (globalData[tagId].hasOwnProperty('fieldFilter') === false) {
			globalData[tagId]['fieldFilter'] = [];
		}
		// 	set default dataFilter
		if (globalData[tagId].hasOwnProperty('dataFilter') === false) {
			globalData[tagId]['dataFilter']  = {};
		}
		
		//set default fieldSearch
		if (globalData[tagId].hasOwnProperty('fieldSearch') === false) {
			globalData[tagId]['fieldSearch'] = [];
		}
		// set default dataSearch
		if (globalData[tagId].hasOwnProperty('dataSearch') === false) {
			globalData[tagId]['dataSearch']	= {};
		}
		
		// 	set default dataSort
		if (globalData[tagId].hasOwnProperty('dataSort') === false) {
			globalData[tagId]['dataSort']  = {};
		}
		
		// 	set default dataRules
		if (globalData[tagId].hasOwnProperty('dataRules') === false) {
			globalData[tagId]['dataRules']  = {};
		}
		
		// 	set default dataShowRow
		if (globalData[tagId].hasOwnProperty('dataShowRow') === false) {
			globalData[tagId]['dataShowRow']  = [25];
		}
		
		// 	set default dataLevelRow
		if (globalData[tagId].hasOwnProperty('dataLevelRow') === false) {
			globalData[tagId]['dataLevelRow'] = 0;
		}
		
		// 	set default dataLevelCol
		if (globalData[tagId].hasOwnProperty('dataLevelCol') === false) {
			globalData[tagId]['dataLevelCol'] = '0';
		}
		
		// 	set default dataLevel_Id
		if (globalData[tagId].hasOwnProperty('dataLevel_Id') === false) {
			globalData[tagId]['dataLevel_Id'] = '0';
		}
		
		// 	set default styleModel
		if (globalData[tagId].hasOwnProperty('styleModel') === false) {
			globalData[tagId]['styleModel'] = 'default';
		}
		
		// 	set default tableProperty
		if (globalData[tagId].hasOwnProperty('tableProperty') === false) {
			globalData[tagId]['tableProperty'] = [];
			globalData[tagId]['tableProperty']['tableFreeze'] 	 = 2;
			globalData[tagId]['tableProperty']['containerWidth'] = 0;
			globalData[tagId]['tableProperty']['tableWidth']     = 0;
			globalData[tagId]['tableProperty']['thLength'] 	     = 0;
			globalData[tagId]['tableProperty']['tdWidth'] 	     = [];
			globalData[tagId]['tableProperty']['tdParamWidth']   = [];
		}
		// 	set default dataTable
		if (globalData[tagId].hasOwnProperty('dataTable') === false) {
			globalData[tagId]['dataTable'] = [];
		}
		// 	set default eventSelectedTr
		if (globalData[tagId].hasOwnProperty('eventSelectedTr') === false) {
			globalData[tagId]['eventSelectedTr'] = true;
		}
		// set default prevMark // penanda nav show/hide
		if (globalData[tagId].hasOwnProperty('prevMark') === false) {
			globalData[tagId]['prevMark'] = 0;
		}
		// 	set default dataExportType
		if (globalData[tagId].hasOwnProperty('dataExportType') === false) {
			globalData[tagId]['dataExportType'] = [];
		}
		
		// 	set default dataPermission
		if (globalData[tagId].hasOwnProperty('dataPermission') === false) {
			globalData[tagId]['dataPermission'] = {};
		}
		
		// 	set default formType
		if (globalData[tagId].hasOwnProperty('formType') === false) {
			globalData[tagId]['formType'] = '';
		}

		// 	set default dataForm
		if (globalData[tagId].hasOwnProperty('dataForm') === false) {
			globalData[tagId]['dataForm'] = [];
		}
		
		// set default dataAutofill_Param
		globalData[tagId]['dataAutofill_Param'] = [];
		
		// 	set default dataAutofill
		if (globalData[tagId].hasOwnProperty('dataAutofill') === false) {
			globalData[tagId]['dataAutofill'] = {};
		}
		
		// 	set default dataAutofill
		if (globalData[tagId].hasOwnProperty('dataTimer') === false) {
			globalData[tagId]['dataTimer'] = {};
			globalData[tagId]['dataTimer']['__Fetch_Data'] 	 		= [];
			globalData[tagId]['dataTimer']['set_Map_Table']			= [];
			globalData[tagId]['dataTimer']['_Save_Data'] 		 	= [];
			globalData[tagId]['dataTimer']['__process_Save_add']	= [];
			globalData[tagId]['dataTimer']['__process_Save_edit']	= [];
			globalData[tagId]['dataTimer']['_Form'] 			 	= [];
			globalData[tagId]['dataTimer']['__process_Form_reload']	= [];
			
		}
		
	} // check tagId
}

/*
tagId utama ada di contoller, content login, component  setNav(), elements navItem()
	globalUser = [
		'regUser':
		'userName':
		'loginId':
	]
	globalData = {
		tagId: {
				urlController: '', // to db
				moduleId: '', // to db
				dataPaging: { // to db
						numrow: numrow,
						numrowpage: numrowpage,
						display_row: display_row,
						max_page: max_page,
						current_page: current_page,
						next_page: next_page
					},
				fieldFilter: [
						{
						label: '',
						field: 'col_',
						filterModel: rangeDate, // (list/range)
						searchInput: 1, // 0/1
						defaultFilter: []
						}
					],
				dataFilter: { // to db
						field_1: {value_1, value_2, next..},
						field_2: {value_1, value_2, next..},
						next ..
					},
				fieldSearch: [
						{
						label: ID,
						column: col_reg_user
						},
						next..
					],
				dataSearch: { // to db
						field_1: value,
						field_2: value,
						next ..
					},
				dataSort: { // to db
						field_1: ASC/DESC,
						field_2: ASC/DESC
						next..
					},
				dataRules: {}, // to db
				
				dataLevelRow: 0,
				dataLevelCol: 0,
				dataLevel_Id: 0,
				tableProperty: [
					tableWidth: 0,
					tdWidth: [td_width, ...],
					tdParamWidth: [textarea_width, ...]
					],
				formType: Form/FormTr
				dataTable: [
						{col_td_1: value_td_1, col_td_2: value_td_2, next..},			
						{col_td_1: value_td_1, col_td_2: value_td_2, next..},			
						next..
					],
				dataPermission: {
						create: 1
						read: 1
						next..
					},
				dataForm: [
						{td_1, td_2, next..},
						{td_1, td_2, next..},
						next..
					],
				dataAutofill: {
					row-col: {
							formIndex: 
							listRequest:
							selectedFunction:
							dataTable: [
								{data_1, data_2, next..},
							]
						}
					}
					
				},
	tagId_next: {}
	}

loadMethod :
	1 load
	2 reload/refresh
	3 paging
	4 arrow paging << >>
	5 short
	6 filter & search
	7 display row
	8 freeze col
*/

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