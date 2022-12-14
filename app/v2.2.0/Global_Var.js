const wWidth 				= $(window).width();
const wHeight 				= $(window).height();

var globalData 				= [];
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
		
		// 	set default info_inTable
		if (globalData[tagId].hasOwnProperty('info_inTable') === false) {
			globalData[tagId]['info_inTable'] = '';
		}
		
		// 	set default info_inForm
		if (globalData[tagId].hasOwnProperty('info_inForm') === false) {
			globalData[tagId]['info_inForm'] = '';
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
		//if (globalData[tagId].hasOwnProperty('dataTable') === false) {
			globalData[tagId]['dataTable'] = [];
		//}
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
		// 	set default dataExportDecSep
		if (globalData[tagId].hasOwnProperty('dataExportDecSep') === false) {
			globalData[tagId]['dataExportDecSep'] = ['Dot (.)', 'Coma (,)'];
		}
		
		// 	set default dataPermission
		if (globalData[tagId].hasOwnProperty('dataPermission') === false) {
			globalData[tagId]['dataPermission'] = {};
		}
		
		// 	set default enterPressed
		//if (globalData[tagId].hasOwnProperty('enterPressed') === false) {
			globalData[tagId]['enterPressed'] = {
				'Form': false,
				'List': false,
				'Search': false,
				'Filter': false,
				'Filter_Renge': false
				};
		//}
		
		// 	set default formType
		if (globalData[tagId].hasOwnProperty('formType') === false) {
			globalData[tagId]['formType'] = '';
		}

		// 	set default dataEvent
		//if (globalData[tagId].hasOwnProperty('dataEvent') === false) {
			globalData[tagId]['dataEvent'] = [];
		//}
		
		// 	set default dataForm
		//if (globalData[tagId].hasOwnProperty('dataForm') === false) {
			globalData[tagId]['dataForm'] = [];
		//}
		
		// set default dataAutofill_Param
		globalData[tagId]['dataAutofill_Param'] = [];
		
		// 	set default dataAutofill
		//if (globalData[tagId].hasOwnProperty('dataAutofill') === false) {
			globalData[tagId]['dataAutofill'] = {};
		//}
		
		// 	set default dataAutofill
		//if (globalData[tagId].hasOwnProperty('dataTimer') === false) {
			globalData[tagId]['dataTimer'] = {
				'__Fetch_Data': [],
				'set_Map_Table': [],
				'_Save_Data': [],
				'__process_Save_add': [],
				'__process_Save_edit': [],
				'_Form': [],
				'__process_Form_reload': [],
				'_press_Input': [],
				'_press_Input_Search': [],
				'_press_Input_Filter': [],
				'_press_Input_Filter_Renge': [],
				'_press_Input_List': []
				};
		//}
		
		// 	set default dataTaskActive
		//if (globalData[tagId].hasOwnProperty('dataTaskActive') === false) {
			globalData[tagId]['dataTaskActive'] = {};
			globalData[tagId]['dataTaskActive']['formChange'] = '';
		//}
		
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
				dataShowRow: [25, 50, next..],
				
				info_inTable: '',
				info_inForm: '',
				dataLevelRow: 0,
				dataLevelCol: 0,
				dataLevel_Id: 0,
				styleModel: 'default',
				tableProperty: [
					tableFreeze: 2,
					containerWidth: 0,
					tableWidth: 0,
					thLength: 0,
					tdWidth: [td_width, ...],
					tdParamWidth: [textarea_width, ...]
					],
				dataTable: [
						{col_td_1: value_td_1, col_td_2: value_td_2, next..},			
						{col_td_1: value_td_1, col_td_2: value_td_2, next..},			
						next..
					],
				eventSelectedTr: true/false,
				prevMark: 0, 0/1
				dataExportType: ['Excel', 'CSV'],
				dataExportDecSep: ['Dot (.)', 'Coma (,)'];
				dataPermission: {
						create: 1
						read: 1
						next..
					},
				enterPressed: {
					'Form': true/false,
					'List': true/false,
					'Search': true/false,
					'Filter': true/false,
					'Filter_Renge': true/false
					},
				formType: Form/FormTr,
				dataEvent: [
					tempId: {}
				],
				dataForm: [
						{td_1, td_2, next..},
						{td_1, td_2, next..},
						next..
					],
				dataAutofill_Param: [
						col: col,
						listRequest: myios_project_number,
						listFormat': list/table
						selectedFunction: Inspection_Plan_Event,
						eventParam: _selected_Project
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
					},
				dataTimer: {
						__Fetch_Data: [setTimeout ID],
						set_Map_Table: [setTimeout ID],
						_Save_Data: [setTimeout ID],
						__process_Save_add: [setTimeout ID],
						__process_Save_edit: [setTimeout ID],
						_Form: [setTimeout ID],
						__process_Form_reload: [setTimeout ID],
						_press_Input: [setTimeout ID],
						_press_Input_Search: [setTimeout ID],
						_press_Input_Filter: [setTimeout ID],
						_press_Input_Filter_Renge: [setTimeout ID],
						_press_Input_List: [setTimeout ID]	
					},
				dataTaskActive: {
					formChange: 'title form'
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
