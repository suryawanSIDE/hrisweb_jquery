//> modify module
function Profile(getObj) {
// ======== MAIN
    function _Main(getObj) {
        
        const tagId       = getObj.tagId;
        const loadMethode = getObj.loadMethode;
        const level       = getObj.level;
        
        const setObj      = {
                        'tagId': tagId,
                        'loadMethode': loadMethode
                        }
                      
        if (loadMethode === 1) {  // note in global
            // default globalData
            // global
            set_Global_Data(tagId);  
			
            // this 
            __Global_Data_This(tagId);
            
            // components/content
            set_Containter(tagId);
			
            // components/topbar
            set_TopBar({
                'tagId': tagId, 
                'level': level, 
                'rightPanel': 1,
                'loadMethode': loadMethode,
                'titleBar': '', // replace
				'freezeCol': 1
                }); 
            // components/form
            set_Containter_Form(tagId);
        }
        if (loadMethode === 2) {
            // default globalData
            // global
            set_Global_Data(tagId);
			
            // this 
            __Global_Data_This(tagId);
        } // reload 
        
		_clearTimer(tagId, 'all');
        _Data_Table(setObj);
    } // _Main
    
    function __Global_Data_This(tagId) {
        /*
        consumer: 
        */
        
        const Field_Search  = _Field_Search();
        const Field_Filter  = _Field_Filter();
        const Field     	= _Field();
		const tableHead 	= Field.tableHead;
		
        // set global urlController
        globalData[tagId]['urlController'] = 'myhris/Profile/'; //> modify module
        
        // set global formType
        globalData[tagId]['formType'] = 'Form'; // Form/FormTr
		
		// set global dataEvent
        globalData[tagId]['dataEvent']['detail_Key'] = {
											'eventParam': 'Form',
											'action': 'detail'
											}
		globalData[tagId]['dataEvent']['reload_Key'] = {
											'eventParam': 'Form',
											'action': 'reload'
											}
		globalData[tagId]['dataEvent']['add_Key'] = {
											'eventParam': globalData[tagId]['formType'],
											'action': 'add'
											}
		globalData[tagId]['dataEvent']['edit_Key'] = {
											'eventParam': globalData[tagId]['formType'],
											'action': 'edit'
											}
		globalData[tagId]['dataEvent']['confirm_delete_Key'] = {
											'nextFunction': 'Profile_Event',
											'action': 'delete'
											}
        globalData[tagId]['dataEvent']['delete_Key'] = {
											'eventParam': 'Delete',
											'action': 'edit'
											}
		globalData[tagId]['dataEvent']['confirm_export_Key'] = {
											'nextFunction': 'Profile_Event',
											'action': 'export'
											}
        globalData[tagId]['dataEvent']['export_Key'] = {
											'eventParam': 'Export_Table',
											'action': 'export'
											}
		
		// set global field search
        if (Object.keys(globalData[tagId].fieldSearch).length === 0) {
            globalData[tagId]['fieldSearch'] = Field_Search;
        }
        // set default dataSearch
        if (Object.keys(globalData[tagId].dataSearch).length === 0) {
        let getField = Field_Search;
            let objSearch = {};
            $.map(getField, ( val ) => {
                objSearch[val.field] = "";
            }); // map
            globalData[tagId]['dataSearch'] = objSearch;
        }
        // set global field filter
        if (Object.keys(globalData[tagId].fieldFilter).length === 0) {
            globalData[tagId]['fieldFilter'] = Field_Filter; // this
        }
        // set default dataFilter
        if (Object.keys(globalData[tagId].dataFilter).length === 0) {
            let getField_f = Field_Filter; // this
            let objFilter = {};
            $.map(getField_f, ( val ) => {
                // convert array to oject
                let newObjItem = {};
                $.map(val.defaultFilter, ( valItem, i ) => {
                    newObjItem[i] = valItem;
                });
                objFilter[val.field] = {} 
                objFilter[val.field]['filterModel'] = val.filterModel;
                objFilter[val.field]['data'] = newObjItem;
            }); // map      
            globalData[tagId]['dataFilter'] = objFilter;
        } else {
            let getField_f = Field_Filter; // this
            let objFilter = {};
            $.map(getField_f, ( val ) => {
                // convert array to oject
                let newObjItem = {};
                $.map(val.defaultFilter, ( valItem, i ) => {
                    newObjItem[i] = valItem;
                });
                objFilter[val.field] = {} 
                objFilter[val.field]['filterModel'] = val.filterModel;
                
                currentFilter = globalData[tagId]['dataFilter'][val.field].data;
                if (Object.keys(currentFilter).length === 0) {
                    objFilter[val.field]['data'] = newObjItem;
                } else {
                    objFilter[val.field]['data'] = currentFilter;
                }
            }); // map      
            globalData[tagId]['dataFilter'] = objFilter;
        }
		
		// set globalData dataRules
		globalData[tagId]['dataRules']['AreaLevel'] = 0;
		
		// update globalData styleModel
		globalData[tagId]['styleModel']  	 = 'model_1';
		
		// update globalData eventSelectedTr
		globalData[tagId]['eventSelectedTr'] = true;
		
		// update globalData dataExportType
		globalData[tagId]['dataExportType']	 = ['Excel', 'CSV (,)', 'CSV (;)'];
		
		// tableProperty
		globalData[tagId]['tableProperty']['thLength'] = tableHead.length;
			
    } // __Global_Data_This
// ======== MAIN
// ======== SETUP
    //> modify module
    function _Field() {

        let result      = {};
        let tdWidth     = 0;
        let tableWidth  = 0;
        let tableHead   = [];

        tdWidth    = 3;
        tableWidth = tdWidth;
        tableHead.push({
            // th
            'label': '-',
            'width': (tdWidth),
            'short': false,
            // td
            'type': 'checkboxAction',
            'align': 'center',
                'valueConverter': '',
            // td, form
            'field': '',
            // ======== FORM
            'field_value_default': '',
            'require': 0
            });

        tdWidth    = 5;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({
            'label': 'No',
            'width': (tdWidth),
            'short': false,
            'type': 'seqNumber',
            'align': 'center',
                'valueConverter': '',
            'field': 'seq',
            'field_value_default': '',
            'require': 0
            });
		
		tdWidth    = 10;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 2
            'label': 'ID',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_reg_employee',
            'field_value_default': '',
            'require': -1
            });
			
		tdWidth    = 8;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 3
            'label': 'Status',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_employee_status_text',
            'field_value_default': 'Aktif',
            'require': -1
            });
		
		tdWidth    = 10;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 4
            'label': 'Tgl. Bergabung',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_join_date_dmy',
            'field_value_default': '',
            'require': -1
            });
					
		tdWidth    = 20;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 5
            'label': 'Nama',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_name',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Nama Panggilan',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_nick_name',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 5;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 7
            'label': 'JK',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_sex',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 8;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 8
            'label': 'Gol. Darah',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_blood_type',
            'field_value_default': '',
            'require': 0
            });
		
		tdWidth    = 10;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 9
            'label': 'Tempat Lahir',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_pob',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ //10
            'label': 'Tgl. Lahir',
            'width': (tdWidth),
            'short': true,
            'type': 'mydate',
            'align': 'right',
                'valueConverter': [],
            'field': 'col_dob_date_dmy',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 10;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 11
            'label': 'Kebangsaan',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_nationality',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 10;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 12
            'label': 'Agama',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_religion',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 13
            'label': 'No. KTP',
            'width': (tdWidth),
            'short': true,
            'type': 'mynumber',
            'align': '',
                'valueConverter': [],
            'field': 'col_ktp',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 14
            'label': 'No. KK',
            'width': (tdWidth),
            'short': true,
            'type': 'mynumber',
            'align': '',
                'valueConverter': [],
            'field': 'col_kk',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 15
            'label': 'No. NPWP',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_npwp',
            'field_value_default': '',
            'require': 0
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 16
            'label': 'No. BPJS TK',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_bpjs_tk',
            'field_value_default': '',
            'require': 0
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 17
            'label': 'No. BPJS Kes.',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_bpjs_k',
            'field_value_default': '',
            'require': 0
            });
			
        result['tableWidth'] = tableWidth;
        result['tableHead']  = tableHead;
        result['tdHeight']   = 30;//tdHeightDefault;
        
        return result;
    } // _Field
    
    //> modify module
    function _Field_Search() {
        /*
        consumer:
            this
        */

        const field = [
				{
                'label': 'Nama',
                'field': 'col_name'
                }
            ];

        return field;
    } // _Field_Search
    
    //> modify module
    function _Field_Filter() {
        /*
        consumer:
            this
        */

        const field = [
				{
				'label': 'Status',
				'field': 'col_employee_status_text',
				'filterModel': 'list', // (list/rangeDate)
				'searchInput': 0,
				'defaultFilter': []
				}
			];

        return field;
    } // _Field_Filter
// ======== SETUP

// ======== TABLE
    function _Data_Table(getObj) {  
        /*
        consumer :
            controllers
        */
		
        const tagId         = getObj.tagId;
        const loadMethode   = getObj.loadMethode;   
        const Field         = _Field();
        const tableHead     = Field.tableHead;
        const tdHeight      = Field.tdHeight;
        const tableWidth    = (Field.tableWidth);
        
        // note in global
        if (loadMethode === 1 || loadMethode === 8) {
			 
            // components/table
            let newTable = get_Table({
                    'tagId': tagId,
                    'tableHead': tableHead,
                    'tableWidth': tableWidth
                    }); 
            // components/content
            set_Content(tagId, newTable);
            // components/table
            _table_Width({
                    'tagId': tagId,
                    'tableHead': tableHead,
                    'tableWidth': tableWidth
                    }); 
        } // load 
        
        // note in global
        if (loadMethode > 1) { // NOT first load
            // components/table
            set_Table_Body(tagId, "");
            get_Tr_Loader(tagId);
            tr_Empty_Rmv(tagId);
        }
        
        // this
        __Fetch_Data({
            'tagId': tagId,
            'tableHead': tableHead,
            'tdHeight': tdHeight,
            'loadMethode': loadMethode,
            'reqAction': 'view'
            });

    } // _Data_Table
    
    function _Export_Table(getObj) {    
        
        const Field = _Field();
			
        // this
        __Fetch_Data({
            'tagId': getObj.tagId,
            'tableHead': Field.tableHead,
            'tdHeight': Field.tdHeight,
            'loadMethode': getObj.loadMethode,
            'reqAction': 'export',
			'exportType': getObj.exportType,
			'exportPage': getObj.exportPage,
			'exportDecSep': getObj.exportDecSep // export_decimal_separator
            });

    } // Export_Table
    
    function __Fetch_Data(getObj) {
        
        const tagId         = getObj.tagId; 
        const tableHead     = getObj.tableHead;
        const tdHeight      = getObj.tdHeight;
        const loadMethode   = getObj.loadMethode;
        
        const urlController = globalData[tagId].urlController;
        const dataPaging    = globalData[tagId].dataPaging;
        const dataFilter    = globalData[tagId].dataFilter; 
        const dataSearch    = globalData[tagId].dataSearch; 
        const dataSort      = globalData[tagId].dataSort;       
        const dataRules     = globalData[tagId].dataRules;
        
        let display_row     = dataPaging.display_row;
        const current_page  = dataPaging.current_page;
        let start_row       = (parseInt(display_row) * (parseInt(current_page)-1))
        
		let exportType 	  = '';
		let exportDecSep  = '';
		if (getObj.reqAction === 'export') {
			
			exportType 	  = getObj.exportType;
			exportDecSep  = getObj.exportDecSep;
			
			if (getObj.exportPage === 'all_page') {
				start_row	= 0;
				display_row = get_Num_Row(tagId);
			}
		}
		
        // set only default filter
        let getField_f = _Field_Filter(); // this
        $.map(getField_f, ( val ) => {
            // convert array to oject
            let newObjItem = {};
            $.map(val.defaultFilter, ( valItem, i ) => {
                newObjItem[i] = valItem;
            });
            
            if (Object.keys(newObjItem).length > 0) {
                currentFilter = globalData[tagId]['dataFilter'][val.field].data;
                if (Object.keys(currentFilter).length === 0) {
                    globalData[tagId]['dataFilter'][val.field]['data'] = newObjItem;
                }
            }
        }); // map      
        
        //> modify module
        if (getObj.reqAction === 'view') {
            if (display_row > 300) {
                // components/loader
                set_Loader();
                    set_Loader_Progress(display_row +' ROWS');
            }
        } else {
            // components/loader
            set_Loader();
                set_Loader_Progress(display_row +' ROWS');
        }
        
		let selectedCb   = [];
		let selectedData = [];
		if (getObj.reqAction === 'formreload') {
			selectedCb 	 = getObj.selectedCb;
			selectedData = getObj.selectedData;
		}
		
        // async load data
        $.ajax({
            type: "post",
            url: baseUrl + urlController,
            dataType: "json",
            data: {
                'appId': appId,
                'loginKey': get_LoginKey(), // components/key
                'randomKey': get_RandomKey(), // components/key
                'moduleId': globalData[tagId].moduleId,
                'reqAction': getObj.reqAction,
                'setObj': {
                        'display_row': display_row,
                        'start_row': start_row,
                        'dataFilter': dataFilter,
                        'dataSearch': dataSearch,
                        'dataSort': dataSort,
                        'dataRules': globalData[tagId]['dataRules'],
						'exportType': exportType,
						'exportDecSep': exportDecSep, // export_decimal_separator
						'selectedCb': selectedCb,
						'selectedData': selectedData
                    }
            }, // data
            success: (response) => {    
                
                // components/loader
                _hide_Loader();
                
                if (getObj.reqAction === 'view') {
                    // components/table
                    // clean tr 
                    set_Table_Body(tagId, "");
                    tr_Loader_Rmv(tagId);
                }
                
                const myObj = response;

                if (myObj.status === 'success') {
                    if (getObj.reqAction === 'view') {
                        
                        const titleBar      = myObj.response_data.module_display;
                        const permission    = myObj.response_data.permission;
                        const dataDb        = myObj.response_data.data;         
                        const numrow        = myObj.response_data.numrow;
                        const numrowpage    = dataDb.length;
                        const max_page      = (Math.ceil(numrow/display_row));
                        
                        // push object table ke variable global
                        // replace paging
                        globalData[tagId]['dataPaging'].numrow          = numrow;
						globalData[tagId]['dataPaging'].numrowpage      = numrowpage;
                        globalData[tagId]['dataPaging'].start_row       = start_row;
                        globalData[tagId]['dataPaging'].max_page        = max_page;
                        
						// set global dataPermission
                        globalData[tagId]['dataPermission'] = permission;
                        // set global dataSort
                        if (Object.keys(globalData[tagId].dataSort).length === 0) {
                            globalData[tagId]['dataSort'] = myObj.response_data.sort_data_default;
                        }
                        
                        if (dataDb.length > 0) {
                         
                            var dataTable_Row = [];
                            $.map(dataDb, ( rowData, x ) => {
                                let dataTable_Col = {};
                                let seq = (x+1)+start_row;
                                
                                $.map(tableHead, ( colData ) => {
                                    
                                    let value = ''; 
                                    if (colData.type === 'checkboxAction') {
                                        value = '';
                                    } if (colData.type === 'seqNumber') {
                                        value = seq;
                                    } else {
                                        value = rowData[colData.field];
                                    }
                                    
                                    // condition for global variable
                                    if (colData.type !== 'checkboxAction') {
                                        dataTable_Col[colData.field] = value;
                                    }

                                }); // map col

                                // for global variable
                                    // hidden value 
                                    //> modify module
                                    // relate to _Save_Data
                                    dataTable_Col['col_data_key']   = rowData.col_data_key;
                                    dataTable_Col['col_text_alert'] = rowData.col_area;
									// additional field here 
									dataTable_Col['col_file_photo']   = rowData.col_file_photo;
									dataTable_Col['col_file_ktp'] 	  = rowData.col_file_ktp;
									dataTable_Col['col_file_kk'] 	  = rowData.col_file_kk;
									dataTable_Col['col_file_npwp'] 	  = rowData.col_file_npwp;
									dataTable_Col['col_file_bpjs_tk'] = rowData.col_file_bpjs_tk;
									dataTable_Col['col_file_bpjs_k']  = rowData.col_file_bpjs_k;
									
                                dataTable_Row.push(dataTable_Col);

                            }); // map row
                            
                            // set global dataTable
                            globalData[tagId]['dataTable'] = dataTable_Row;
                            
                            if (loadMethode === 1) { // first load
                                // handling topbar right panel button filter and search (jika rightpanel === 1)
                                // components/topbar
                                _handler_btn_Filter_DataTable({
                                    'tagId': tagId,
                                    'btnFilter': 1, //> modify module
                                    'btnSearch': 1 //> modify module
                                });                             
                            }

                            if (loadMethode === 1 || // first load
                                loadMethode === 2 || // reload
                                loadMethode === 6 // filter & search
                            ) { 
                                // components/topbar
                                set_Num_Row(tagId, numrow);  
                            }
                            
                            const mytimer = setTimeout(() => {
								// components/table
								_apply_Th_Sort(tagId),
								// components/paging
								set_Paging(tagId),              
								_page_Active(tagId, current_page),
								// components/table
								set_Map_Table({
									'tagId': tagId,
									'tableHead': tableHead,
									'tdHeight': tdHeight,
									'dataTable': globalData[tagId].dataTable
								}),
								_table_Height({
									'tagId': tagId,
									'tdHeight': tdHeight,
									'numrowpage': numrowpage
								})
                            }, 5); // 5 ms
							
							// update globaldata dataTimer
							globalData[tagId]['dataTimer']['__Fetch_Data'].push(mytimer);
                        } // check data empty
                        else {
							// components/table
							get_Tr_Empty(tagId);
						}
						
						// update globalData info_inTable
						globalData[tagId]['info_inTable'] = myObj.response_data.info_in_table;
						// update globalData info_inForm
						globalData[tagId]['info_inForm']  = myObj.response_data.info_in_form;
						
                        // components/topbar
                        set_TitleBar(tagId, titleBar);
                        
                        // components/form
                        set_Form_Title(tagId, titleBar);
                            
                        // > modify
						const eventDetail 		= 'Profile_Event(`'+ tagId +'`, `detail_Key`)';
						const eventAdd 			= 'Profile_Event(`'+ tagId +'`, `add_Key`)';
						const eventEdit			= 'Profile_Event(`'+ tagId +'`, `edit_Key`)';
						const eventExport		= 'Confirm_Form(`'+ tagId +'`, `confirm_export_Key`)';
						const eventDelete		= 'Confirm_Form(`'+ tagId +'`, `confirm_delete_Key`)';
						set_Btn_Action_DataTable({
                            'tagId': tagId,
                            'btnDetail': 1, 
                                'eventDetail': 'onclick="'+ eventDetail +'" ondblclick="'+ eventDetail +'"',
                            'btnAdd': permission.act_create, 
                                'eventAdd': 'onclick="'+ eventAdd +'" ondblclick="'+ eventAdd +'"',
                            'btnEdit': permission.act_update,
                                'eventEdit': 'onclick="'+ eventEdit +'" ondblclick="'+ eventEdit +'"',
                            'btnExport': 0,
                                'eventExport': 'onclick="'+ eventExport +'" ondblclick="'+ eventExport +'"',
                            'btnImport': 0,
                                'eventImport': '',
                            'btnImport_Format': 0, //permission.act_create,
                                'eventImport_Format': '',
                            'btnDelete': permission.act_delete,
                                'eventDelete': 'onclick="'+ eventDelete +'" ondblclick="'+ eventDelete +'"',
                        });
                    } // reqAction view
					else if (getObj.reqAction === 'formreload') {
						
						const currentData   = globalData[tagId].dataTable;
						const dataLength    = Object.keys(currentData).length;
						const dataDb        = myObj.response_data.data; 
						
						// relplace dataTable
						$.map(dataDb, ( rowData, x ) => {
							let selectedCb_Index = rowData.col_temp_index_cb;
							$.map(tableHead, ( colData, y ) => {
								// update global dataTable
								if (typeof rowData[colData.field] !== 'undefined') {
									currentData[selectedCb_Index][colData.field] = rowData[colData.field];
								}
							}); // map col
							
							// for global variable
								// hidden value 
								//> modify module
								// relate to __Fetch_Data
								currentData[selectedCb_Index]['col_data_key']   = rowData.col_data_key;
								currentData[selectedCb_Index]['col_text_alert'] = rowData.col_area;
								currentData[selectedCb_Index]['indexTr'] 		= selectedCb_Index;
								// additional field here 
								currentData[selectedCb_Index]['col_file_photo']   = rowData.col_file_photo;
								currentData[selectedCb_Index]['col_file_ktp'] 	  = rowData.col_file_ktp;
								currentData[selectedCb_Index]['col_file_kk'] 	  = rowData.col_file_kk;
								currentData[selectedCb_Index]['col_file_npwp'] 	  = rowData.col_file_npwp;
								currentData[selectedCb_Index]['col_file_bpjs_tk'] = rowData.col_file_bpjs_tk;
								currentData[selectedCb_Index]['col_file_bpjs_k']   = rowData.col_file_bpjs_k;
									
						}); // map row
						
						// update global dataTable
						globalData[tagId]['dataTable'] = currentData;
						
					} // reqAction formreload
                    else if (getObj.reqAction === 'export') {
						_hide_Confirm();
                        const fileLocation = myObj.response_data.file_location; 
                        window.open(fileLocation, '_blank');
                    } // reqAction export
                } else if (myObj.status === 'reject') {

                    // components/key
                    unset_LoginKey();

                    // controllers
                    Load_Redirect();

                } else {

                    // components/loader
                    _hide_Loader();
                    
                    if (getObj.reqAction === 'view') {
                        // components/table
                        get_Tr_Empty(tagId);
                    }
                    
                    // components/alert
                    set_Alert({
                        'type': 'danger', 
                        'body': myObj.message, 
                        'footer': get_Alert_Footer(1) 
                    });
                }
            }, // success
            error: (xhr) => {
                
                // components/loader
                _hide_Loader();

                if (getObj.reqAction === 'view') {
                    // clean tr 
                    // components/table
                    get_Tr_Empty(tagId);
                }
                // components/alert
                set_Alert({
                        'type': 'danger', 
                        'body': 'Error: '+ xhr.status +', '+xhr.responseText, //'Error connection', 
                        'footer': get_Alert_Footer(1) 
                    });
            }, // error
            
        }); // ajax
    } // __Fetch_Data
// ======== TABLE

// ======== DELETE
    function _Delete(getObj) {
        const tagId         = getObj.tagId;
        const urlController = globalData[tagId].urlController;
        const Field         = _Field();
        const tableHead     = Field.tableHead;
        let dataTable       = globalData[tagId].dataTable;
        let arrDeleteIndex  = [];
        let arrDeleteData   = [];
        let arrDeleteEl     = [];
        let dataDelete      = {};
        
        // set loader
        $("#my-confirm .confirm-box-body").append('<center>'+ get_Loader() +'</center>');

        // get all selected data
        const baseLevel     = $("#level-"+ tagId);
        baseLevel.find(".my-tbody").eq(0)
            .find(".my-tr .my-td-cb-col-0").each(function(i) {
            if (this.checked) { 
                arrDeleteIndex.push(i);
                arrDeleteData.push(dataTable[i].col_data_key);
                arrDeleteEl.push(dataTable[i].seq);
            }
        });

        // convert array to oject   
        $.map(arrDeleteData, ( val, i ) => {
            dataDelete[i] = val;
        });

        // async delete data
        $.ajax({
            type: "post",
            url: baseUrl + urlController,
            dataType: "json",
            data: {
                'appId': appId,
                'loginKey': get_LoginKey(), // components/key
                'randomKey': get_RandomKey(), // components/key
                'moduleId': globalData[tagId].moduleId,
                'reqAction': 'delete',
                'setObj': {
                    'dataDelete': dataDelete,
                    'dataRules': globalData[tagId]['dataRules']
                }
            }, // data
            success: (response) => {    
                
                const myObj  = response;
                
                if (myObj.status === 'success') {
                    
                    const num_success   = myObj.response_data.num_success;
                    const numrow        = get_Num_Row(tagId)-num_success;
                    const numrowpage    = get_Num_Row_Page(tagId)-num_success;
                    const current_page  = parseInt(globalData[tagId]['dataPaging'].current_page);
                    const next_page     = parseInt(globalData[tagId]['dataPaging'].next_page);

                    // update globalData 
                    globalData[tagId]['dataPaging'].numrow      = numrow;
                    globalData[tagId]['dataPaging'].numrowpage  = numrowpage;               
                        // delete globalData data selected
                        dataTable = dataTable.filter(function(val, i) {
                            return arrDeleteIndex.indexOf(i) == -1;                     
                        });
                        // update globalData 
                    globalData[tagId]['dataTable'] = dataTable;
                    
                    // components/confirm 
                    _hide_Confirm();
                    // components/table
                    _reset_Cb_All(tagId);
                    
                    // components/topbar
                    set_Num_Row(tagId, numrow); 
                    set_Num_Row_Page(tagId, numrowpage);
                
                    // jika data dalam 1 page tersebut kosong
                    if (numrowpage === 0) {
                        
                        if (myObj.message !== '') {
                            //components/alert
                            set_Alert({
                                'type': 'info', 
                                'body': myObj.message, 
                                'footer': get_Alert_Footer(1) 
                            }); 
                        }
                        
                        // => jika section page > 1
                        if (next_page > 1) {                        
                            const count_page      = ((next_page-1)*defaultPageGroup);
                            const minPage_Section = (count_page+1);
                            if (current_page > minPage_Section) {
                                 // => jika page dalam section masih ada => mundur 1 page
                                const page = (current_page-1);
                                // controllers
                                Load_Paging(tagId, page);
                            } else {
                                // jika page dalam section habis => mundur 1 section page
                                const new_next_page = (next_page-1);
                                // controllers
                                Arrow_Paging(tagId, new_next_page, 'left');
                            }
                        } else {
                                
                            // => jika section page > 1
                            if (current_page > 1) {
                                // => jika page > 1 => mundur 1 page
                                const page = (current_page-1);
                                // controllers
                                Load_Paging(tagId, page);
                            } else {
                                // => jika page = 1 => refresh
                                // controllers
                                Refresh_Content(tagId);
                            }                       
                        }
                        
                    } else {
                        // jika data dalam 1 page tersebut masih ada 
                        
                        // remove tr
                        if (deviceType === 'mobile') { // mobile
                            $.map(arrDeleteEl, ( seq ) => {
                                baseLevel.find(".my-tbody").eq(0)
                                    .find(".my-tr-row-"+(seq)).remove();
                            });
                        }  // mobile
                        else { // dekstop
                            $.map(arrDeleteEl, ( seq ) => {
                                baseLevel.find(".my-tbody").eq(0)
                                    .find(".my-tr-row-"+(seq)).remove();
                                baseLevel.find(".my-tbody").eq(1)
                                    .find(".my-tr-row-"+(seq)).remove();
                            });
                        } // dekstop
                        
                        if (myObj.message !== '') {
                            // components/alert
                            set_Alert({
                                'type': 'info', 
                                'body': myObj.message, 
                                'footer': get_Alert_Footer(1)
                            }); 
                        }
                        
                    }

                } else if (myObj.status === 'reject') {

                    // components/key
                    unset_LoginKey();

                    // controllers
                    Load_Redirect();

                } else {
                    
                    // components/confirm
                    _hide_Confirm();

                    // components/alert
                    set_Alert({
                        'type': 'danger', 
                        'body': myObj.message, 
                        'footer': get_Alert_Footer(1)
                    });

                }
            }, // success
            error: (xhr) => {
                
                // components/confirm
                _hide_Confirm();

                // components/alert
                set_Alert({
                    'type': 'danger', 
                    'body': 'Error: '+ xhr.status +', '+xhr.responseText, //'Error connection', 
                    'footer': get_Alert_Footer(1)
                });
                    
            }, // error
        }); // ajax
    } // _Delete
// ======== DELETE

// ======== FORM
    //> modify module
    function _Form_Start_Col() {
        return 2;
    }
    //> modify module
    function _Form_Field(tagId) {
        
        const tableHead  = _Field().tableHead; // this
        let col          = _Form_Start_Col(); //> modify module
        let fieldForm    = [];
        
        const paramLength= globalData[tagId]['dataAutofill_Param'].length;
        if (paramLength === 0) {
            globalData[tagId]['dataAutofill_Param'] = [];
        }
        
        //> modify module
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_reg_employee
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': -1,
						'placeholder': 'readonly',
						'readonly': 'readonly="readonly"'
					});
					
			col = (col+1); // 3/1
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_employee_status_text
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': -1,
						'placeholder': 'readonly',
						'readonly': 'readonly="readonly"'
					});
			
			col = (col+1); // 4/2
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_join_date_dmy
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': -1,
						'placeholder': 'readonly',
						'readonly': 'readonly="readonly"'
					});
				
			col = (col+1); // 5/3
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_name
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': 100,
						'placeholder': 'input-'+ replaceMy(tableHead[col].type) + ' max(100)',
						'readonly': ''
					});
				
			col = (col+1); // 6/4
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_nick_name
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': 100,
						'placeholder': 'input-'+ replaceMy(tableHead[col].type) + ' max(100)',
						'readonly': ''
					});
			
			col = (col+1); // 7/5
			fieldForm.push({
						'input_Type': 'get_Input_Select',
						'label': tableHead[col].label, // col_sex
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': -1,
						'placeholder': 'select-item',
						'readonly': '',
							'eventObject': {
											'eventInput': 'List_Autofill',
											'searchInput': 0, // search 1/0
											'col': col
										}
					});
					// update globalData
					if (paramLength === 0) {
						globalData[tagId]['dataAutofill_Param'].push({
						'col': col,
						'listRequest': 'sex',
						'listFormat': 'list', // list/table
						'selectedFunction': '_select_List_Autofill'
						});	
					}
			
			col = (col+1); // 8/6
			fieldForm.push({
						'input_Type': 'get_Input_Select',
						'label': tableHead[col].label, // col_blood_type
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': -1,
						'placeholder': 'select-item',
						'readonly': '',
							'eventObject': {
											'eventInput': 'List_Autofill',
											'searchInput': 0, // search 1/0
											'col': col
										}
					});
					// update globalData
					if (paramLength === 0) {
						globalData[tagId]['dataAutofill_Param'].push({
						'col': col,
						'listRequest': 'bloody_type',
						'listFormat': 'list', // list/table
						'selectedFunction': '_select_List_Autofill'
						});	
					}
					
			col = (col+1); // 9/7
			fieldForm.push({
						'input_Type': 'get_Input_Select',
						'label': tableHead[col].label, // col_pob
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': -1,
						'placeholder': 'select-item',
						'readonly': '',
							'eventObject': {
											'eventInput': 'List_Autofill',
											'searchInput': 1, // search 1/0
											'col': col
										}
					});
					// update globalData
					if (paramLength === 0) {
						globalData[tagId]['dataAutofill_Param'].push({
						'col': col,
						'listRequest': 'city',
						'listFormat': 'list', // list/table
						'selectedFunction': '_select_List_Autofill'
						});	
					}
						
			col = (col+1); // 10/8
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_dob_date_dmy
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': -1,
						'placeholder': 'input-'+ replaceMy(tableHead[col].type),
						'readonly': '',
							'eventObject': {
											'eventInput': 'Pick_Date',
											'col': col
										}
					});
			
			col = (col+1); // 11/9
			fieldForm.push({
						'input_Type': 'get_Input_Select',
						'label': tableHead[col].label, // col_nationality
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': -1,
						'placeholder': 'select-item',
						'readonly': '',
							'eventObject': {
											'eventInput': 'List_Autofill',
											'searchInput': 1, // search 1/0
											'col': col
										}
					});
					// update globalData
					if (paramLength === 0) {
						globalData[tagId]['dataAutofill_Param'].push({
						'col': col,
						'listRequest': 'country',
						'listFormat': 'list', // list/table
						'selectedFunction': '_select_List_Autofill'
						});	
					}
						
			col = (col+1); // 12/10
			fieldForm.push({
						'input_Type': 'get_Input_Select',
						'label': tableHead[col].label, // col_religion
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': -1,
						'placeholder': 'select-item',
						'readonly': '',
							'eventObject': {
											'eventInput': 'List_Autofill',
											'searchInput': 0, // search 1/0
											'col': col
										}
					});
					// update globalData
					if (paramLength === 0) {
						globalData[tagId]['dataAutofill_Param'].push({
						'col': col,
						'listRequest': 'religion',
						'listFormat': 'list', // list/table
						'selectedFunction': '_select_List_Autofill'
						});	
					}
						
			col = (col+1); // 13/11
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_ktp
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': 100,
						'placeholder': 'input-'+ replaceMy(tableHead[col].type) + ' max(100)',
						'readonly': ''
					});
					
			col = (col+1); // 14/12
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_kk
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': 100,
						'placeholder': 'input-'+ replaceMy(tableHead[col].type) + ' max(100)',
						'readonly': ''
					});
				
			col = (col+1); // 15/13
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_npwp
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': 100,
						'placeholder': 'input-'+ replaceMy(tableHead[col].type) + ' max(100)',
						'readonly': ''
					});
				
			col = (col+1); // 16/14
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_bpjs_tk
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': 100,
						'placeholder': 'input-'+ replaceMy(tableHead[col].type) + ' max(100)',
						'readonly': ''
					});
				
			col = (col+1); // 17/15
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_bpjs_k
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': 100,
						'placeholder': 'input-'+ replaceMy(tableHead[col].type) + ' max(100)',
						'readonly': ''
					});
					
			col = (col+1); // 18/16
			fieldForm.push({
                        'input_Type': 'get_Link_File_2',
                        'label': '', 
						'field': 'col_ktp',
						'field_path' : 'col_file_ktp',
							'valueConverter': '',
						//'type': '',
						//'align': '',
						//'require': -1,
						'col': col,
						//'maxlength': -1,
						//'placeholder': '',
						//'readonly': ''
					});
									
			col = (col+1); // 19/17
			fieldForm.push({
                        'input_Type': 'get_Link_File_2',
                        'label': '', 
						'field': 'col_kk',
						'field_path' : 'col_file_kk',
							'valueConverter': '',
						//'type': '',
						//'align': '',
						//'require': -1,
						'col': col,
						//'maxlength': -1,
						//'placeholder': '',
						//'readonly': ''
					});
								
			col = (col+1); // 20/18
			fieldForm.push({
                        'input_Type': 'get_Link_File_2',
                        'label': '', 
						'field': 'col_npwp',
						'field_path' : 'col_file_npwp',
							'valueConverter': '',
						//'type': '',
						//'align': '',
						//'require': -1,
						'col': col,
						//'maxlength': -1,
						//'placeholder': '',
						//'readonly': ''
					});
							
			col = (col+1); // 21/19
			fieldForm.push({
                        'input_Type': 'get_Link_File_2',
                        'label': '',
						'field': 'col_bpjs_tk',
						'field_path' : 'col_file_bpjs_tk',
							'valueConverter': '',
						//'type': '',
						//'align': '',
						//'require': -1,
						'col': col,
						//'maxlength': -1,
						//'placeholder': '',
						//'readonly': ''
					});
						
			col = (col+1); // 22/20
			fieldForm.push({
                        'input_Type': 'get_Link_File_2',
                        'label': '',
						'field': 'col_bpjs_k',
						'field_path' : 'col_file_bpjs_k',
							'valueConverter': '',
						//'type': '',
						//'align': '',
						//'require': -1,
						'col': col,
						//'maxlength': -1,
						//'placeholder': '',
						//'readonly': ''
					});
					
        return fieldForm;
        
    } // _Form_Field
    
    function _Form(getObj) {
        /*
        consumer: 
        */
        
        const tagId          = getObj.tagId;
        const action         = getObj.action;
        const baseLevel      = $("#level-"+ tagId);
        
        // set global dataForm
        globalData[tagId]['dataForm'] = [];
        
        const Field          = _Field();
        const selectedLength = get_Num_Selected(tagId); //components/topbar
        let dataTable        = {};
        
        // button blur
        const baseEl = baseLevel.find(".my-footer").eq(0);
              baseEl.find(".panel-bottom-right .btn-action-detail").blur();
              baseEl.find(".panel-bottom-right .bottom-action-add").blur();
              baseEl.find(".panel-bottom-right .btn-action-edit").blur();
        
        // components/form
        _show_Form(tagId);
        
		//> modify module
		// set global dataEvent
        globalData[tagId]['dataEvent']['save_Key'] = {
											'eventParam': 'Save_Data',
											'action': action
											}
        const eventSave_All 	= 'Profile_Event(`'+ tagId +'`, `save_Key`)';
        const eventNewForm  	= 'Profile_Event(`'+ tagId +'`, `add_Key`)';
		const eventReload_All	= 'Profile_Event(`'+ tagId +'`, `reload_Key`)';
		set_Form_Button({
            'tagId': tagId,
            'action': action,
            'eventSave_All': 'onclick="'+ eventSave_All +'" ondblclick="'+ eventSave_All +'"',
            'eventNewForm': 'onclick="'+ eventNewForm +'" ondblclick="'+ eventNewForm +'"',
			'eventReload_All': 'onclick="'+ eventReload_All +'" ondblclick="'+ eventReload_All +'"'
        });
        
        // button focus
        if (action === 'detail') {
            baseLevel.find(".my-content-form").eq(0)
                .find(".my-form-header .form-action-close").focus();
        } else {
            baseLevel.find(".my-content-form").eq(0)
                .find(".my-form-header .btn-form-action-save").focus();
        }
        
        // route 
        const levelRow_Child = 1;
        
        //> modify module
        if (selectedLength > 300) {
            // components/loader
            set_Loader();
                set_Loader_Progress(selectedLength + ' DATA');
            const mytimer = setTimeout(() => {
                __process_Form(levelRow_Child), 
				__load_Child()
                }, 5); // 5 ms
			
			// update globaldata dataTimer
			globalData[tagId]['dataTimer']['_Form'].push(mytimer);
			
        } else {
           const mytimer = setTimeout(() => {
                __process_Form(levelRow_Child), 
				__load_Child()
                }, 5); // 5 ms
		
			// update globaldata dataTimer
			globalData[tagId]['dataTimer']['_Form'].push(mytimer);
			
        }
        
        function __process_Form() {
			
			let form_Index  = 0;
			
            switch(action) {
                case 'add':
                    
                    // components/table 
                    _reset_Cb_All(tagId);
                    
                    $.map(Field.tableHead, ( val, i ) => {
                        if (i > 0 ) {
                            dataTable[val.field] = val.field_value_default;
                        }
                    }); // map
                    dataTable['col_data_key']   = 0;
                    dataTable['col_text_alert'] = '';
					// additional field here
                    dataTable['col_file_photo']   = '';
					dataTable['col_file_ktp'] 	  = '';
					dataTable['col_file_kk'] 	  = '';
					dataTable['col_file_npwp'] 	  = '';
					dataTable['col_file_bpjs_tk'] = '';
					dataTable['col_file_bpjs_k']  = '';
                   
						// components/form
                        set_Content_Form(tagId, ___Form_Item({
                            'tagId': tagId,
                            'action': action,
                            'dataTable_Index': get_Num_Row_Page(tagId)+1,
                            'data': dataTable,
							'form_Index': 0,
                               'levelRow_Child': levelRow_Child
                            }));
                            
                    // components/loader
                    _hide_Loader();
                    
                break;
				case 'reload':
					
					const mytimer = setTimeout(() => {						
						let selectedCb 	 = [];
						let selectedData = []
						baseLevel.find(".my-tbody").eq(0).find(".my-tr .my-td-cb-col-0").each(function(i) {
							if (this.checked) {
							selectedCb.push(i);
							selectedData.push(globalData[tagId]['dataTable'][i].col_data_key);
							}
						}),
						_hide_Form(tagId),
						__Fetch_Data({
							'tagId': tagId,
							'tableHead': Field.tableHead,
							'tdHeight': Field.tdHeight,
							'loadMethode': 99,
							'reqAction': 'formreload',
							'selectedCb': selectedCb,
							'selectedData': selectedData
							}),
						Profile_Event(tagId, 'edit_Key')
					}, 5); // 5 ms
					
					// update globaldata dataTimer
					globalData[tagId]['dataTimer']['__process_Form_reload'].push(mytimer);
					
				break;
				default: // edit, detail
                    
                    dataTable = globalData[tagId].dataTable;
                    form_Index  = 0;
                    baseLevel.find(".my-tbody").eq(0).find(".my-tr .my-td-cb-col-0").each(function(i) {
                        if (this.checked) {
							
                            // components/form
                            content_Form_Append(tagId, ___Form_Item({
                                'tagId': tagId,
                                'action': action,
                                'dataTable_Index': i,
                                'data': dataTable[i],
								'form_Index': form_Index,
                                    'levelRow_Child': levelRow_Child
                                }));
                                
                        form_Index++;
                        }
                    });
                    
                    // components/loader
                    _hide_Loader();
                    
            } //switchcase
        } // __process_Form
        
		function __load_Child() {
            // map child 
            const dataForm = globalData[tagId].dataForm;
            $.map(dataForm, ( data ) => { 
			        $.map(data.arrChild, ( child ) => {
                    Load_Module_Child({
                        'tagId': child.tagId
                        });
                });
            });
        } // __load_Child
        
    } // _Form

    function ___Form_Item(getObj) {
        /*
        consumer: 
        */
        const tagId             = getObj.tagId;
        const tableHead         = _Field().tableHead; // this
        const fieldForm         = _Form_Field(tagId);
        const dataTable_Index   = getObj.dataTable_Index;
        const data              = getObj.data;
        let row                 = data[tableHead[1].field];
        if (getObj.action === 'add') {
            row = getObj.dataTable_Index;
        }
        const number     = tableHead[1].label +' '+ row;
        
        //> modify module
        // update global dataAutofill
        // relate to components/list _List_Fetch()
        if (globalData[tagId]['dataAutofill_Param'].length > 0) {
            $.map(globalData[tagId].dataAutofill_Param, ( val ) => {
                // tambahkan object dataAutofill_Param ke dataAutofill
                let colId = row +'-'+ val.col;
                let dataAutofill = globalData[tagId]['dataAutofill'][colId] = {};
                    if (val.hasOwnProperty('listRequest') === true) {
                        dataAutofill['listRequest'] 	 = val.listRequest;
                    }
                    if (val.hasOwnProperty('listFormat') === true) {
                        dataAutofill['listFormat']  	 = val.listFormat;
                    }
                    if (val.hasOwnProperty('selectedFunction') === true) {
                        dataAutofill['selectedFunction'] = val.selectedFunction;
                    }
                    if (val.hasOwnProperty('eventParam') === true) {
                        dataAutofill['eventParam']  	 = val.eventParam;
                    }
					if (val.hasOwnProperty('colParent') === true) {
                        dataAutofill['colParent']   	 = val.colParent;
                    }
					if (val.hasOwnProperty('listNested') === true) {
                        dataAutofill['listNested']  	 = true;
                    } else {
						dataAutofill['listNested']  	 = false;
					}
                // tambahkan object baru ke dataAutofill
                    dataAutofill['dataTable_Index']  = dataTable_Index;
                    dataAutofill['dataTable']        = [];
					dataAutofill['form_Index']  	 = getObj.form_Index;
            		
               globalData[tagId]['dataAutofill'][colId] = dataAutofill;
            });
        }
		
        //console.log(globalData[tagId]['dataAutofill'])
        //> modify module
        // generate _Form_Field menjadi tag input
        let new_fieldForm = get_Map_Form_Input({
                        'tagId': tagId,
                        'action': getObj.action,
                        'fieldForm': fieldForm,
                        'data': data,
                        'row': row,
                        'form_Index': getObj.form_Index,
                        'formType': globalData[tagId].formType
                     });
		
		// === child
		const randId  		 = get_RandomKey();
		const key 			 = (appId + randId);
		const levelRow_Child = parseInt(getObj.levelRow_Child);
		let enable_Child_Update = 0;
		if (getObj.action === 'add' || getObj.action === 'edit') {
			enable_Child_Update = 1;
		}
			// child 1 
			const moduleId_Child_1	= 'emp-prf-addr';
			const levelCol_Child_1  = 0;
			const tabCode_Child_1	= '-tab_B';
			const tagId_Child_1	    = key + moduleId_Child_1 +'-'+ levelRow_Child +'-'+ levelCol_Child_1 + tabCode_Child_1; 
			const paneId_Child_1    = tagId_Child_1 + getObj.form_Index;
			
			let setup_Child_1	    = '';
			if (tagId_Child_1 !== tagId) {
			
				// set globaldata child START HERE
				let colParent_Ref = data[tableHead[2].field];
				globalData[tagId_Child_1] = {};
				globalData[tagId_Child_1]['dataRules'] = {};
				globalData[tagId_Child_1]['dataRules']['tagId_Parent'] 	   	  = tagId;
				globalData[tagId_Child_1]['dataRules']['dataTable_Index']  	  = dataTable_Index;
				globalData[tagId_Child_1]['dataRules']['colParent_Ref']       = colParent_Ref;
				globalData[tagId_Child_1]['dataRules']['enable_Child_Update'] = enable_Child_Update;
				globalData[tagId_Child_1]['dataLevelRow']   				  = levelRow_Child;
				globalData[tagId_Child_1]['dataLevelCol']   				  = levelCol_Child_1 + tabCode_Child_1;
				// components/content
				setup_Child_1 = {
								'tagId_Parent': tagId,
								'tagId': tagId_Child_1
								};
			} // check tagChild
			
			
        //> modify module
        let formChild	 = {};
			formChild[0] = {
					'paneId_Child': paneId_Child_1,
					'tabTitle': 'Address',
					'tabContent': get_Container_Child(setup_Child_1)
					};
			/*
			formChild[1] = {
					'paneId_Child': tagId + dataTable_Index +'-2',
					'tabTitle': 'Child 2',
					'tabContent': 'Content child 2'
					};
			*/
		
		// tab utama
		const paneId	 = tagId +'-tab_A' + dataTable_Index;
		const formTab 	 = get_Form_Item_Tab({
							'tabPosition': 'normal',
							'dataTable_Index': dataTable_Index,
							'tagId_Parent': tagId,
							'paneId_Parent': paneId,
							'title_Parent': get_TitleBar(tagId), // components/topbar
							'formChild': formChild
							});
		const formButton = get_Form_Item_Button({'body': ''});
		const formNotif  = get_Form_Notif({'body': ''});
		
		// sample->FormDisplay
		/*
		// default, tampilkan input form secara berurutan
		let objForm	 = '';
		$.map(new_fieldForm, ( val ) => {
			objForm += val;
		});*/
		
		let objForm	 = '';
		
		let customStyle_1 = 'padding-right: 5px;';
		if (deviceType === 'mobile') {
			customStyle_1 = 'padding-right: 0px;';
		}
		
		let customStyle_2 = '';
		if (deviceType === 'mobile') {
			customStyle_2 = 'margin-left: -5px;';
		}
		
		// segment 1
		let path_foto = 'app/_images/profile.png';
		if (data.col_file_photo !== '' && data.col_file_photo !== null) {
			path_foto = baseUrl_Upload + data.col_file_photo;
		}
		let pre_segment_1 = `<div class="col-sm-12">
								<span class="my-profile-img">
								<center><img style="height: 100px;" class="img-responsive img-thumbnail" src="${path_foto}" alt="profile" /></center>
								</span>
							</div>`;
		const segment_1  = get_Form_Segment({
						'segmentModel': 'modify',
						'fieldForm': pre_segment_1
						});
						
		// segment 2				
			let segment_2_block_1 = '<div class="col-sm-6">'+
						new_fieldForm[0]+ // col_reg_employee
						'</div>';
			let segment_2_block_2 = '<div class="col-sm-3">'+
						new_fieldForm[1]+ // col_employee_status_text
						'</div>';
			let segment_2_block_3 = '<div class="col-sm-3">'+
						new_fieldForm[2]+ // col_join_date_dmy
						'</div>';			
		let pre_segment_2 = segment_2_block_1 + segment_2_block_2 + segment_2_block_3;
		const segment_2  = get_Form_Segment({
						'segmentModel': 'modify',
						'fieldForm': pre_segment_2
						});
				
		// segment 3				
			let segment_3_block_1 = '<div class="col-sm-6">'+
						new_fieldForm[3]+ // col_name
						new_fieldForm[4]+ // col_nick_name
						add_Class_Row(
								'<div class="col-sm-6" style="padding-left: 0px; '+ customStyle_1 +'">'+
									new_fieldForm[5]+ // col_sex
								'</div>'+
								'<div class="col-sm-6" style="padding-left: 0px; padding-right: 0px;">'+
									new_fieldForm[6]+ // col_blood_type
								'</div>'
							) +
						'</div>';	
			let segment_3_block_2 = '<div class="col-sm-6">'+
						add_Class_Row(
								'<div class="col-sm-7" style="padding-left: 0px; '+ customStyle_1 +'">'+
									new_fieldForm[7]+ // col_pob
								'</div>'+
								'<div class="col-sm-5" style="padding-left: 0px; padding-right: 0px;">'+
									new_fieldForm[8]+ // col_dob_date_dmy
								'</div>'
							) +
						new_fieldForm[9]+ // col_nationality
						new_fieldForm[10]+ // col_religion
						'</div>';						
		let pre_segment_3 = segment_3_block_1 + segment_3_block_2;
		const segment_3  = get_Form_Segment({
						'segmentModel': 'modify',
						'fieldForm': pre_segment_3
						});
		// segment 4
			let segment_4_block_1 = '<div class="col-sm-6">'+
						add_Class_Row(
								'<div class="col-sm-10" style="padding-left: 0px; '+ customStyle_1 +'">'+
									new_fieldForm[11]+ // col_ktp
								'</div>'+
								'<div class="col-sm-2" style="'+ customStyle_2 +' padding-left: 0px; padding-right: 0px;">'+
									new_fieldForm[16]+ // col_file_ktp
								'</div>'
							) +
						add_Class_Row(
								'<div class="col-sm-10" style="padding-left: 0px; '+ customStyle_1 +'">'+
									new_fieldForm[12]+ // col_kk
								'</div>'+
								'<div class="col-sm-2" style="'+ customStyle_2 +' padding-left: 0px; padding-right: 0px;">'+
									new_fieldForm[17]+ // col_file_kk
								'</div>'
							) +
						add_Class_Row(
								'<div class="col-sm-10" style="padding-left: 0px; '+ customStyle_1 +'">'+
									new_fieldForm[13]+ // col_npwp
								'</div>'+
								'<div class="col-sm-2" style="'+ customStyle_2 +' padding-left: 0px; padding-right: 0px;">'+
									new_fieldForm[18]+ // col_file_npwp
								'</div>'
							) +
						'</div>';
			let segment_4_block_2 = '<div class="col-sm-6">'+
						add_Class_Row(
								'<div class="col-sm-10" style="padding-left: 0px; '+ customStyle_1 +'">'+
									new_fieldForm[14]+ // col_bpjs_tk
								'</div>'+
								'<div class="col-sm-2" style="'+ customStyle_2 +' padding-left: 0px; padding-right: 0px;">'+
									new_fieldForm[19]+ // col_file_bpjs_tk
								'</div>'
							) +
						add_Class_Row(
								'<div class="col-sm-10" style="padding-left: 0px; '+ customStyle_1 +'">'+
									new_fieldForm[15]+ // col_bpjs_k
								'</div>'+
								'<div class="col-sm-2" style="'+ customStyle_2 +' padding-left: 0px; padding-right: 0px;">'+
									new_fieldForm[20]+ // col_file_bpjs_k
								'</div>'
							) +
						'</div>';
		let pre_segment_4 = segment_4_block_1 + segment_4_block_2;
		const segment_4  = get_Form_Segment({
						'segmentModel': 'modify',
						'fieldForm': pre_segment_4
						});
		
		let segment_5 = '';
		if (getObj.action === 'edit') {
		// segment 5
			let tempId = tempId_Generate();
			// update globalData dataEvent
			globalData[tagId]['dataEvent'][tempId] = {
									'eventParam': 'Form_Attachment',
									'dataTable_Index': dataTable_Index,
									'row': row
									}
			let eventFormAttachment = 'Profile_Event(`'+ tagId +'`, `'+ tempId +'`)';
			segment_5 = get_Form_Segment({
							'segmentModel': 'modify',
							'fieldForm': '<div class="col-sm-12"><button onclick="'+ eventFormAttachment +'" ondblclick="'+ eventFormAttachment +'" class="btn btn-primary btn-xs">Manage File</button></div>'
						});
		} // if (getObj.action !== 'edit')

		
		objForm = segment_1 + 
				  segment_2 + 
				  segment_3 + 
				  segment_4 + 
				  segment_5;
		
		// update global dataForm 
		globalData[tagId]['dataForm'].push({
			'tableSeq': row,
			'dataTable_Index': dataTable_Index,
			'col_data_key': data['col_data_key'],
				// additional field form here
			'arrChild': [
				setup_Child_1
				]
			});
		
		let objBody_Item = '';	
        let formBody = '';
        if (formTab.tabNav === '') {
            formBody = `<div class="form-item-data">${objForm}</div>`;
        } else {
            formBody = `<div class="tab-content">
                            <div role="tabpanel" class="tab-pane active form-item-data" id="${paneId}">
                                ${objForm} 
                                ${objBody_Item}
                            </div>
                            ${formTab.tabPane}
                        </div>
                        `;
        } // formBody
        
        const result = add_Class_Row(`<div class="col-sm-1"></div>
					<div class="col-sm-10">
                    <div class="form-item form-index-${getObj.form_Index} form-item-${dataTable_Index}">
                    <div class="form-item-inner">

                        <div class="form-item-seq">${number}</div>
                        <div class="form-item-panel">
                            <div class="form-item-tab-box">${formTab.tabNav}</div>
                            <div class="form-item-button-box">${formButton}</div>
                            <div class="form-item-notif-box">${formNotif}</div>
                        </div>
                        
                        ${formBody}

                    </div>
                    </div>
                    </div>`);
		
        return result;
    } // ___Form_Item

    function _Save_Data(getObj) {
        /*
        consumer :
            this
        */
        
        const tagId         = getObj.tagId;
        const reqAction     = getObj.action;
        const urlController = globalData[tagId].urlController;
        const col           = _Form_Start_Col(); // form start field
        const Field         = _Field();
        const tableHead     = Field.tableHead;
        const tdHeight      = Field.tdHeight;
        const fieldForm     = _Form_Field(tagId);
        let alertText       = '';
        
        const baseLevel      = $("#level-"+ tagId);
        const baseEl_Form   = baseLevel.find(".my-content-form").eq(0).find(".my-form-body .form-item");
        const formLength    = baseEl_Form.length;
        
        // button blur
        baseLevel.find(".my-content-form").eq(0)
            .find(".my-form-header .btn-form-action-save").blur();
        
        //> modify module
        if (formLength > 300) {
            // components/loader
            set_Loader();
                set_Loader_Progress(formLength + ' DATA');
            const mytimer = setTimeout(() => {__process_Save()}, 5); //5 ms
			
			// update globaldata dataTimer
			globalData[tagId]['dataTimer']['_Save_Data'].push(mytimer);
			
        } else {
            if (formLength > 0 ) {
            // components/loader
            set_Loader();
                set_Loader_Progress(formLength + ' DATA');
                    __process_Save();
            } else {
                // components/alert
                set_Alert({
                    'type': 'warning', 
                    'body': 'Empty selected row', 
                    'footer': get_Alert_Footer(1)
                });

            }
        }
        
        function __process_Save() {
            let dataKey_onForm  = []; // untuk menandai col_data_key berada pada index form berapa
            let dataFormRow 	= {};
            for (let x=0; x<formLength; x++) {
                let alertField  = '';
                let formSeq     = baseEl_Form.eq(x).find(".form-item-seq").html();
                let inputLength = baseEl_Form.eq(x).find(".item-data-col .col-data").length;
                let dataFormCol = {};
                //for (let y=0; y<inputLength; y++) {
				for (let y=1; y<11; y++) {
                    let value = baseEl_Form.eq(x).find(".item-data-col .col-data").eq(y).val();         
                        
                        // set data input value
                        dataFormCol[fieldForm[y].field] = value;
                    
                    // check value
                    if (fieldForm[y].require === 1) {
                        let alertField_Temp = alertField;
                            alertField = _validate_Input_Submit({
                                    'baseEl_Form': baseEl_Form,
                                    'form_Index': x,
                                    'inputIndex': y,
                                    'alertField': alertField_Temp,
                                    'type': fieldForm[y].type,
                                    'label': fieldForm[y].label,
                                    'value': value,
                                });
                    } // require
                } // input  
                    
					// col_ktp
					const index_ktp   		= 11;
					const index_field_ktp 	= 11;
					const value_ktp   		= baseEl_Form.eq(x).find(".item-data-col .col-data").eq(index_ktp).val();         
                        // set data input value_ktp
                        dataFormCol[fieldForm[index_field_ktp].field] = value_ktp;
                    // check value_ktp
                    if (fieldForm[index_field_ktp].require === 1) {
                        let alertField_Temp = alertField;
                            alertField = _validate_Input_Submit({
                                    'baseEl_Form': baseEl_Form,
                                    'form_Index': x,
                                    'inputIndex': index_ktp,
                                    'alertField': alertField_Temp,
                                    'type': fieldForm[index_field_ktp].type,
                                    'label': fieldForm[index_field_ktp].label,
                                    'value': value_ktp,
                                });
                    } // require
					
					// col_kk
					const index_kk 			= 13;
					const index_field_kk 	= 12;
					const value_kk 			= baseEl_Form.eq(x).find(".item-data-col .col-data").eq(index_kk).val();         
                        // set data input value_kk
                        dataFormCol[fieldForm[index_field_kk].field] = value_kk;
                    // check value_kk
                    if (fieldForm[index_field_kk].require === 1) {
                        let alertField_Temp = alertField;
                            alertField = _validate_Input_Submit({
                                    'baseEl_Form': baseEl_Form,
                                    'form_Index': x,
                                    'inputIndex': index_kk,
                                    'alertField': alertField_Temp,
                                    'type': fieldForm[index_field_kk].type,
                                    'label': fieldForm[index_field_kk].label,
                                    'value': value_kk,
                                });
                    } // require
					
					// col_npwp
					const index_npwp 		= 15;
					const index_field_npwp 	= 13;
					const value_npwp 		= baseEl_Form.eq(x).find(".item-data-col .col-data").eq(index_npwp).val();         
                        // set data input value_npwp
                        dataFormCol[fieldForm[index_field_npwp].field] = value_npwp;
                    // check value_npwp
                    if (fieldForm[index_field_npwp].require === 1) {
                        let alertField_Temp = alertField;
                            alertField = _validate_Input_Submit({
                                    'baseEl_Form': baseEl_Form,
                                    'form_Index': x,
                                    'inputIndex': index_npwp,
                                    'alertField': alertField_Temp,
                                    'type': fieldForm[index_field_npwp].type,
                                    'label': fieldForm[index_field_npwp].label,
                                    'value': value_npwp,
                                });
                    } // require
					
					// col_bpjs_tk
					const index_bpjs_tk 		= 17;
					const index_field_bpjs_tk 	= 14;
					const value_bpjs_tk 		= baseEl_Form.eq(x).find(".item-data-col .col-data").eq(index_bpjs_tk).val();         
                        // set data input value_bpjs_tk
                        dataFormCol[fieldForm[index_field_bpjs_tk].field] = value_bpjs_tk;
                    // check value_bpjs_tk
                    if (fieldForm[index_field_bpjs_tk].require === 1) {
                        let alertField_Temp = alertField;
                            alertField = _validate_Input_Submit({
                                    'baseEl_Form': baseEl_Form,
                                    'form_Index': x,
                                    'inputIndex': index_bpjs_tk,
                                    'alertField': alertField_Temp,
                                    'type': fieldForm[index_field_bpjs_tk].type,
                                    'label': fieldForm[index_field_bpjs_tk].label,
                                    'value': value_bpjs_tk,
                                });
                    } // require
					
					// col_bpjs_k
					const index_bpjs_k 			= 19;
					const index_field_bpjs_k 	= 15;
					const value_bpjs_k 			= baseEl_Form.eq(x).find(".item-data-col .col-data").eq(index_bpjs_k).val();         
                        // set data input value_bpjs_k
                        dataFormCol[fieldForm[index_field_bpjs_k].field] = value_bpjs_k;
                    // check value_bpjs_k
                    if (fieldForm[index_field_bpjs_k].require === 1) {
                        let alertField_Temp = alertField;
                            alertField = _validate_Input_Submit({
                                    'baseEl_Form': baseEl_Form,
                                    'form_Index': x,
                                    'inputIndex': index_bpjs_k,
                                    'alertField': alertField_Temp,
                                    'type': fieldForm[index_field_bpjs_k].type,
                                    'label': fieldForm[index_field_bpjs_k].label,
                                    'value': value_bpjs_k,
                                });
                    } // require
					
                    // add hiden value ke form 
                    //> modify module
                    dataFormCol['tableSeq']         = globalData[tagId]['dataForm'][x].tableSeq;
                    dataFormCol['dataTable_Index']  = globalData[tagId]['dataForm'][x].dataTable_Index;
                    dataFormCol['col_data_key']     = globalData[tagId]['dataForm'][x].col_data_key;
                
				dataKey_onForm[x] = globalData[tagId]['dataForm'][x].col_data_key;
                dataFormRow[x]	  = dataFormCol;
                
                // alert text
                if (alertField !== '') {
                    let new_alertField = alertField.substring(0, (alertField.length-2));
                        alertText = alertText + ' Form ' + formSeq +' field <i>'+ new_alertField +'</i><br>';
                }
            } // form length
                
            if (alertText !== '') {     

                // components/loader
                _hide_Loader();

                // components/alert
                set_Alert({
                    'type': 'warning', 
                    'body': 'Please complete :<br>'+ alertText,  
                    'footer': get_Alert_Footer(1)
                });
				
            } else {
				
                // async save data
                $.ajax({
                    type: "post",
                    url: baseUrl + urlController,
                    dataType: "json",
                    data: {
                        'appId': appId,
                        'loginKey': get_LoginKey(), // components/key
                        'randomKey': get_RandomKey(), // components/key
                        'moduleId': globalData[tagId].moduleId,
                        'reqAction': reqAction,
                        'setObj': {
                            'dataInput': dataFormRow,
							'dataRules': globalData[tagId]['dataRules']
                        }
                    }, // data
                    success: (response) => {    
                        
                        // components/loader
                        _hide_Loader();
						tr_Empty_Rmv(tagId);
						
                        const myObj  = response;
                        
                        if (myObj.status === 'success') {
                            
							// global
							_clear_TaskActive(tagId, '_final_action_Form');
							
                            if (reqAction === 'add') {
                            
                                const num_success   = myObj.response_data.num_success;
                                const numrow        = get_Num_Row(tagId)+num_success;
                                const numrowpage    = get_Num_Row_Page(tagId)+num_success;
                                
								// replace paging
								globalData[tagId]['dataPaging'].numrow          = numrow;
								globalData[tagId]['dataPaging'].numrowpage      = numrowpage;
								
                                const display_row   = parseInt(globalData[tagId]['dataPaging'].display_row);
                                const current_page  = parseInt(globalData[tagId]['dataPaging'].current_page);
                                const start_row     = (parseInt(display_row) * (parseInt(current_page)-1));
                                
                                const currentData   = globalData[tagId].dataTable;
                                var dataLength    	= Object.keys(currentData).length;
                                const dataDb        = myObj.response_data.data; 
                                
                                set_Num_Row(tagId, numrow); 
                                set_Num_Row_Page(tagId, numrowpage);
                                
                                var arr_IndexTr   = [];
                                var dataTable_Row = [];
                                $.map(dataDb, ( rowData, x ) => {
                                    let dataTable_Col = {};
                                    var seq = (x)+start_row+numrowpage;
                                    
                                    $.map(tableHead, ( colData, y ) => {
                                        
                                        let value = ''; 
                                        if (colData.type === 'checkboxAction') {
                                            value = '';
                                        } if (colData.type === 'seqNumber') {
                                            value = seq;
                                        } else {
                                            value = rowData[colData.field];
                                        }
                                        
                                        // condition for global variable
                                        if (colData.type !== 'checkboxAction') {
                                            dataTable_Col[colData.field] = value;
                                        }
                                        
                                    }); // map col
                                    
                                    // for global variable
                                        // hidden value 
                                        //> modify module
                                        // relate to __Fetch_Data
                                        dataTable_Col['col_data_key']   = rowData.col_data_key;
                                        dataTable_Col['col_text_alert'] = rowData.col_area;
										// additional field
										dataTable_Col['col_file_photo']   = rowData.col_file_photo;
										dataTable_Col['col_file_ktp'] 	  = rowData.col_file_ktp;
										dataTable_Col['col_file_kk'] 	  = rowData.col_file_kk;
										dataTable_Col['col_file_npwp'] 	  = rowData.col_file_npwp;
										dataTable_Col['col_file_bpjs_tk'] = rowData.col_file_bpjs_tk;
										dataTable_Col['col_file_bpjs_k']  = rowData.col_file_bpjs_k;
										
                                    dataTable_Row.push(dataTable_Col);
                                    
                                    // replace globalData dataTable
                                    globalData[tagId]['dataTable'][dataLength] = dataTable_Col;
                                    
                                arr_IndexTr.push(dataLength);
								dataLength++;
                                }); // map row
                                
								const mytimer = setTimeout(() => {
									// components/table
									// add new data to table
									set_Map_Table_After_Add({
										'tagId': tagId,
										'tableHead': tableHead,
										'tdHeight': tdHeight,
										'dataTable': dataTable_Row
									}),
									_select_Tr_After_Add({
										'tagId': tagId,
										'arr_IndexTr': arr_IndexTr
									}),
									// components/topbar
									set_Num_Selected(tagId, num_success),                     
									// components/form
									_reset_Form_Body(tagId),
									//components/table
									_handler_btn_Action_DataTable(tagId, 1),
									// update form
									_Form({
										'tagId': tagId, 
										'action': 'edit'
										}),
									set_Alert({
										'type': 'info', 
										'body': myObj.message, 
										'footer': get_Alert_Footer(1) 
									})	
								}, 5); // 5 ms
                                
								// update globaldata dataTimer
								globalData[tagId]['dataTimer']['__process_Save_add'].push(mytimer);
								
                            } // reqAction = add
                            else if (reqAction === 'edit') {
                                
                                const currentData   = globalData[tagId].dataTable;
                                const dataLength    = Object.keys(currentData).length;
                                const dataDb        = myObj.response_data.data; 
                                
                                var dataTable_Row = [];
                                $.map(dataDb, ( rowData, x ) => {
                                    $.map(tableHead, ( colData, y ) => {
                                        // update global dataTable
                                        if (typeof rowData[colData.field] !== 'undefined') {
                                            currentData[x][colData.field] = rowData[colData.field];
                                        }
                                    }); // map col
                                    
                                    // for global variable
                                        // hidden value 
                                        //> modify module
                                        // relate to __Fetch_Data
                                        currentData[x]['col_data_key']   = rowData.col_data_key;
                                        currentData[x]['col_text_alert'] = rowData.col_area;
                                        currentData[x]['indexTr'] 		 = x;
										// additional field here 
										currentData[x]['col_file_photo']   = rowData.col_file_photo;
										currentData[x]['col_file_ktp'] 	   = rowData.col_file_ktp;
										currentData[x]['col_file_kk'] 	   = rowData.col_file_kk;
										currentData[x]['col_file_npwp']    = rowData.col_file_npwp;
										currentData[x]['col_file_bpjs_tk'] = rowData.col_file_bpjs_tk;
										currentData[x]['col_file_bpjs_k']  = rowData.col_file_bpjs_k;
										
                                    dataTable_Row.push(currentData[x]);
                                    
									// apply perubahan ke form hidden value
									// let form_Index = dataKey_onForm.indexOf(rowData.col_data_key);
									// update globalData dataForm
									// (sample) globalData[tagId]['dataForm'][form_Index]['col_parent_code'] 	= rowData.col_parent_code;
									
                                }); // map row
                                
                                // update global dataTable
                                globalData[tagId]['dataTable'] = currentData;
                                
								const mytimer = setTimeout(() => {
									// components/table
									// update table body
									set_Map_Table_After_Edit({
										'tagId': tagId,
										'tableHead': tableHead,
										'tdHeight': tdHeight,
										'dataTable': dataTable_Row                              
									}),
									set_Alert({
										'type': 'info', 
										'body': myObj.message, 
										'footer': get_Alert_Footer(1) 
									})
								}, 2); // 2 ms
								
								// update globaldata dataTimer
								globalData[tagId]['dataTimer']['__process_Save_edit'].push(mytimer);
								
                            } // reqAction = edit
                            else {
								// components/alert
								if (myObj.message !== '') {
									set_Alert({
										'type': 'info', 
										'body': myObj.message, 
										'footer': get_Alert_Footer(1) 
									});             
								}
							}
                        } else if (myObj.status === 'reject') {

                            // components/key
                            unset_LoginKey();

                            // controllers
                            Load_Redirect();

                        } else {
                            
                            // components/loader
                            _hide_Loader();

                            // components/alert
                            set_Alert({
                                'type': 'danger', 
                                'body': myObj.message, 
                                'footer': get_Alert_Footer(1)
                            });

                        }
                    }, // success
                    error: (xhr) => {
                        
                        // components/loader
                        _hide_Loader();

                        // components/alert
                        set_Alert({
                            'type': 'danger', 
                            'body': 'Error: '+ xhr.status +', '+xhr.responseText, //'Error connection', 
                            'footer': get_Alert_Footer(1)
                        });
                    }, // error
                }); // ajax
            } // alertText
        } // setSave
    } // _Save_Data
			
	function _Form_Attachment(getObj) {
		const tagId	 			= getObj.tagId;
		const row	 			= getObj.row;
		const dataTable_Index 	= getObj.dataTable_Index;
		const currentData   	= globalData[tagId].dataTable;
		
		const col_data_key 		= currentData[dataTable_Index].col_data_key;
		let eventConfirm		= '';
		
		const col_reg_employee 	= currentData[dataTable_Index].col_reg_employee;
		let col_file_photo 		= replaceNull(currentData[dataTable_Index].col_file_photo);
		let photo_fix			= '';
		let photo_delete		= '';
		eventConfirm 			= '';
		if (col_file_photo === '' || col_file_photo === null) {
			photo_fix = 'empty file';
		} else {
			let tempId_photo 	= tempId_Generate();
			// update globalData dataEvent
			globalData[tagId]['dataEvent'][tempId_photo] = {
										'nextFunction': 'Profile_Event',
										'eventParam': 'Form_Attachment_Delete',
										'action': 'delete_2',
										'category': 'photo',
										'notif': 'File '+ col_reg_employee,
										'col_data_key': col_data_key,
										'dataTable_Index': dataTable_Index
										}
			eventConfirm 		= 'Confirm_Form(`'+ tagId +'`, `'+ tempId_photo +'`)';
			photo_delete 		= '<button onclick="'+ eventConfirm +'" ondblclick="'+ eventConfirm +'" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove my-required"></span></button>';
			photo_fix 			= '<a href="'+ baseUrl_Upload + col_file_photo +'" target="blank"> '+ (col_reg_employee) +'</a>';
		}
		
		const col_ktp			= currentData[dataTable_Index].col_ktp;
		let col_file_ktp		= replaceNull(currentData[dataTable_Index].col_file_ktp);
		let ktp_fix				= '';
		let ktp_delete			= '';
		eventConfirm 			= '';
		if (col_file_ktp === '' || col_file_ktp === null) {
			ktp_fix = 'empty file';
		} else {
			let tempId_ktp 		= tempId_Generate();
			// update globalData dataEvent
			globalData[tagId]['dataEvent'][tempId_ktp] = {
										'nextFunction': 'Profile_Event',
										'eventParam': 'Form_Attachment_Delete',
										'action': 'delete_2',
										'category': 'ktp',
										'notif': 'File '+ col_ktp,
										'col_data_key': col_data_key,
										'dataTable_Index': dataTable_Index
										}
			eventConfirm 		= 'Confirm_Form(`'+ tagId +'`, `'+ tempId_ktp +'`)';
			ktp_delete 	 		= '<button onclick="'+ eventConfirm +'" ondblclick="'+ eventConfirm +'" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove my-required"></span></button>';
			ktp_fix 	 		= '<a href="'+ baseUrl_Upload + col_file_ktp +'" target="blank"> '+ (col_ktp) +'</a>';
		}
		
		const col_kk 			= currentData[dataTable_Index].col_kk;
		let col_file_kk 		= replaceNull(currentData[dataTable_Index].col_file_kk);
		let kk_fix				= '';
		let kk_delete			= '';
		eventConfirm 			= '';
		if (col_file_kk === '' || col_file_kk === null) {
			kk_fix = 'empty file';
		} else {
			let tempId_kk 		= tempId_Generate();
			// update globalData dataEvent
			globalData[tagId]['dataEvent'][tempId_kk] = {
										'nextFunction': 'Profile_Event',
										'eventParam': 'Form_Attachment_Delete',
										'action': 'delete_2',
										'category': 'kk',
										'notif': 'File '+ col_kk,
										'col_data_key': col_data_key,
										'dataTable_Index': dataTable_Index
										}
			eventConfirm 		= 'Confirm_Form(`'+ tagId +'`, `'+ tempId_kk +'`)';
			kk_delete 			= '<button onclick="'+ eventConfirm +'" ondblclick="'+ eventConfirm +'" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove my-required"></span></button>';
			kk_fix 				= '<a href="'+ baseUrl_Upload + col_file_kk +'" target="blank"> '+ (col_kk) +'</a>';
		}
		
		const col_npwp 			= currentData[dataTable_Index].col_npwp;
		let col_file_npwp 		= replaceNull(currentData[dataTable_Index].col_file_npwp);
		let npwp_fix			= '';
		let npwp_delete			= '';
		eventConfirm 			= '';
		if (col_file_npwp === '' || col_file_npwp === null) {
			npwp_fix = 'empty file';
		} else {
			let tempId_npwp 	= tempId_Generate();
			// update globalData dataEvent
			globalData[tagId]['dataEvent'][tempId_npwp] = {
										'nextFunction': 'Profile_Event',
										'eventParam': 'Form_Attachment_Delete',
										'action': 'delete_2',
										'category': 'npwp',
										'notif': 'File '+ col_npwp,
										'col_data_key': col_data_key,
										'dataTable_Index': dataTable_Index
										}
			eventConfirm 		= 'Confirm_Form(`'+ tagId +'`, `'+ tempId_npwp +'`)';
			npwp_delete 		= '<button onclick="'+ eventConfirm +'" ondblclick="'+ eventConfirm +'" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove my-required"></span></button>';
			npwp_fix 			= '<a href="'+ baseUrl_Upload + col_file_npwp +'" target="blank"> '+ (col_npwp) +'</a>';
		}
		
		const col_bpjs_tk	= currentData[dataTable_Index].col_bpjs_tk;
		let col_file_bpjs_tk	= replaceNull(currentData[dataTable_Index].col_file_bpjs_tk);
		let bpjs_tk_fix			= '';
		let bpjs_tk_delete		= '';
		eventConfirm 			= '';
		if (col_file_bpjs_tk === '' || col_file_bpjs_tk === null) {
			bpjs_tk_fix = 'empty file';
		} else {
			let tempId_bpjs_tk  = tempId_Generate();
			// update globalData dataEvent
			globalData[tagId]['dataEvent'][tempId_bpjs_tk] = {
										'nextFunction': 'Profile_Event',
										'eventParam': 'Form_Attachment_Delete',
										'action': 'delete_2',
										'category': 'bpjs_tk',
										'notif': 'File '+ col_bpjs_tk,
										'col_data_key': col_data_key,
										'dataTable_Index': dataTable_Index
										}
			eventConfirm 		= 'Confirm_Form(`'+ tagId +'`, `'+ tempId_bpjs_tk +'`)';
			bpjs_tk_delete 		= '<button onclick="'+ eventConfirm +'" ondblclick="'+ eventConfirm +'" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove my-required"></span></button>';
			bpjs_tk_fix 		= '<a href="'+ baseUrl_Upload + col_file_bpjs_tk +'" target="blank"> '+ (col_bpjs_tk) +'</a>';
		}
		
		const col_bpjs_k		= currentData[dataTable_Index].col_bpjs_k;
		let col_file_bpjs_k		= replaceNull(currentData[dataTable_Index].col_file_bpjs_k);
		let bpjs_k_fix			= '';
		let bpjs_k_delete		= '';
		eventConfirm 			= '';
		if (col_file_bpjs_k === '' || col_file_bpjs_k === null) {
			bpjs_k_fix = 'empty file';
		} else {
			let tempId_bpjs_k 	= tempId_Generate();
			// update globalData dataEvent
			globalData[tagId]['dataEvent'][tempId_bpjs_k] = {
										'nextFunction': 'Profile_Event',
										'eventParam': 'Form_Attachment_Delete',
										'action': 'delete_2',
										'category': 'bpjs_k',
										'notif': 'File '+ col_bpjs_k,
										'col_data_key': col_data_key,
										'dataTable_Index': dataTable_Index
										}
			eventConfirm 		= 'Confirm_Form(`'+ tagId +'`, `'+ tempId_bpjs_k +'`)';
			bpjs_k_delete 		= '<button onclick="'+ eventConfirm +'" ondblclick="'+ eventConfirm +'" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove my-required"></span></button>';
			bpjs_k_fix 			= '<a href="'+ baseUrl_Upload + col_file_bpjs_k +'" target="blank"> '+ (col_bpjs_k) +'</a>';
		}
		
		const list_file= `<table class="my-table table-condensed table-bordered">
							<tr class="${col_data_key}-photo">
								<td width="20%">Photo</td>
								<td width="70%" class="file-name">${photo_fix}</td>
								<td width="10%" class="file-act" align="center">${photo_delete}</td>
							</tr>
							<tr class="${col_data_key}-ktp">
								<td>KTP</td>
								<td class="file-name">${ktp_fix}</td>
								<td class="file-act" align="center">${ktp_delete}</td>
							</tr>
							<tr class="${col_data_key}-kk">
								<td>KK</td>
								<td class="file-name">${kk_fix}</td>
								<td class="file-act" align="center">${kk_delete}</td>
							</tr>
							<tr class="${col_data_key}-npwp">
								<td>NPWP</td>
								<td class="file-name">${npwp_fix}</td>
								<td class="file-act" align="center">${npwp_delete}</td>
							</tr>
							<tr class="${col_data_key}-bpjs_tk">
								<td>BPJS TK</td>
								<td class="file-name">${bpjs_tk_fix}</td>
								<td class="file-act" align="center">${bpjs_tk_delete}</td>
							</tr>
							<tr class="${col_data_key}-bpjs_k">
								<td>BPJS Kes.</td>
								<td class="file-name">${bpjs_k_fix}</td>
								<td class="file-act" align="center">${bpjs_k_delete}</td>
							</tr>
						</table>
						<hr class="my-hr">
						`;
		
		
		const input_file_photo = get_Input_File({
									'tagId': tagId,
									'form_Index': '',
									'formType': '',
									'value': '',
									'label': 'Photo (jpg, jpeg, png)',
									'align': '',
									'require': 0,
									'row': row,
									'col': 'file_photo',
									'placeholder': 'input-file',
									'readonly': ''
								});
		const input_file_ktp	= get_Input_File({
									'tagId': tagId,
									'form_Index': '',
									'formType': '',
									'value': '',
									'label': 'File KTP (jpg, jpeg, png, pdf)',
									'align': '',
									'require': 0,
									'row': row,
									'col': 'file_ktp',
									'placeholder': 'input-file',
									'readonly': ''
								});
		const input_file_kk	= get_Input_File({
									'tagId': tagId,
									'form_Index': '',
									'formType': '',
									'value': '',
									'label': 'File KK (jpg, jpeg, png, pdf)',
									'align': '',
									'require': 0,
									'row': row,
									'col': 'file_kk',
									'placeholder': 'input-file',
									'readonly': ''
								});
		const input_file_npwp	= get_Input_File({
									'tagId': tagId,
									'form_Index': '',
									'formType': '',
									'value': '',
									'label': 'File NPWP (jpg, jpeg, png, pdf)',
									'align': '',
									'require': 0,
									'row': row,
									'col': 'file_npwp',
									'placeholder': 'input-file',
									'readonly': ''
								});
		const input_file_bpjs_tk	= get_Input_File({
									'tagId': tagId,
									'form_Index': '',
									'formType': '',
									'value': '',
									'label': 'File BPJS TK (jpg, jpeg, png, pdf)',
									'align': '',
									'require': 0,
									'row': row,
									'col': 'file_bpjs_tk',
									'placeholder': 'input-file',
									'readonly': ''
								});
		const input_file_bpjs_k	= get_Input_File({
									'tagId': tagId,
									'form_Index': '',
									'formType': '',
									'value': '',
									'label': 'File BPJS Kes. (jpg, jpeg, png, pdf)',
									'align': '',
									'require': 0,
									'row': row,
									'col': 'file_bpjs_k',
									'placeholder': 'input-file',
									'readonly': ''
							});
							
		let tempId = tempId_Generate();
			// update globalData dataEvent
			globalData[tagId]['dataEvent'][tempId] = {
									'eventParam': 'Form_Attachment_Save',
									'row': row
									}
		const eventAttachmentSubmit = 'Profile_Event(`'+ tagId +'`, `'+ tempId +'`)';
		const btn_submit = add_Class_Row('<button onclick="'+ eventAttachmentSubmit +'" ondblclick="'+ eventAttachmentSubmit +'" class="btn btn-primary btn-sm">Submit</button>');
		
		const body = list_file + 
					 input_file_photo + 
					 input_file_ktp + 
					 input_file_kk + 
					 input_file_npwp + 
					 input_file_bpjs_tk + 
					 input_file_bpjs_k + 
					 btn_submit;
		
		const result = set_FormPopup({
					'tagId': tagId,
					'nextFunction': '',
					'title': 'Manage File',
					'body': body
					});
		
				
	} // _Form_Attachment
	
	function _Form_Attachment_Save(getObj) {
		
		set_Loader();
        
		const tagId 		= getObj.tagId;
		const row	 		= getObj.row;
		
        const baseLevel     = $("#level-"+ tagId);
        const baseEl_Form   = baseLevel.find(".my-content-form").eq(0).find(".my-form-popup");
        const formLength    = baseEl_Form.length;
        
		let alertText       = '';
        
		let form_data = new FormData();
			form_data.append("appId", appId);
			form_data.append("loginKey", get_LoginKey());
			form_data.append("randomKey", get_RandomKey());
			form_data.append("moduleId", globalData[tagId].moduleId);
			
            // let dataFormRow = {};
            for (let x=0; x<formLength; x++) {
                let alertField  = '';
               
				let baseInput_photo	= baseEl_Form.eq(x).find(".item-data-col .col-data-"+ row +"-file_photo");
				let file_prop_photo	= baseInput_photo.prop("files")[0];
				if (baseInput_photo.val() !== '') {
					form_data.append('col_file_photo_'+ x, file_prop_photo);
					form_data.append('col_file_photo_name_'+ x, file_prop_photo.name);
				}
				
				let baseInput_ktp	= baseEl_Form.eq(x).find(".item-data-col .col-data-"+ row +"-file_ktp");
				let file_prop_ktp	= baseInput_ktp.prop("files")[0];
				if (baseInput_ktp.val() !== '') {
					form_data.append('col_file_ktp_'+ x, file_prop_ktp);
					form_data.append('col_file_ktp_name_'+ x, file_prop_ktp.name);
				}
				
				let baseInput_kk	= baseEl_Form.eq(x).find(".item-data-col .col-data-"+ row +"-file_kk");
				let file_prop_kk	= baseInput_kk.prop("files")[0];
				if (baseInput_kk.val() !== '') {
					form_data.append('col_file_kk_'+ x, file_prop_kk);
					form_data.append('col_file_kk_name_'+ x, file_prop_kk.name);
				}
				
				let baseInput_npwp	= baseEl_Form.eq(x).find(".item-data-col .col-data-"+ row +"-file_npwp");
				let file_prop_npwp	= baseInput_npwp.prop("files")[0];
				if (baseInput_npwp.val() !== '') {
					form_data.append('col_file_npwp_'+ x, file_prop_npwp);
					form_data.append('col_file_npwp_name_'+ x, file_prop_npwp.name);
				}
				
				let baseInput_bpjs_tk	= baseEl_Form.eq(x).find(".item-data-col .col-data-"+ row +"-file_bpjs_tk");
				let file_prop_bpjs_tk	= baseInput_bpjs_tk.prop("files")[0];
				if (baseInput_bpjs_tk.val() !== '') {
					form_data.append('col_file_bpjs_tk_'+ x, file_prop_bpjs_tk);
					form_data.append('col_file_bpjs_tk_name_'+ x, file_prop_bpjs_tk.name);
				}
				
				let baseInput_bpjs_k	= baseEl_Form.eq(x).find(".item-data-col .col-data-"+ row +"-file_bpjs_k");
				let file_prop_bpjs_k	= baseInput_bpjs_k.prop("files")[0];
				if (baseInput_bpjs_k.val() !== '') {
					form_data.append('col_file_bpjs_k_'+ x, file_prop_bpjs_k);
					form_data.append('col_file_bpjs_k_name_'+ x, file_prop_bpjs_k.name);
				}
				
				// add hiden value ke form 
				//> modify module
				// form data
				form_data.append('tableSeq_'+ x, globalData[tagId]['dataForm'][x].tableSeq);
				form_data.append('dataTable_Index_'+ x, globalData[tagId]['dataForm'][x].dataTable_Index);
				form_data.append('col_data_key_'+ x, globalData[tagId]['dataForm'][x].col_data_key);
				// additional field form here 
				// (sample)dataFormCol['col_sample'] = globalData[tagId]['dataForm'][x].col_sample;
				
                // alert text
                if (alertField !== '') {
                    let new_alertField = alertField.substring(0, (alertField.length-2));
                        alertText += ' <i>'+ new_alertField +'</i><br>';
                }
            } // form length
            
            if (alertText !== '') {     

                // components/loader
                _hide_Loader();

                // components/alert
                set_Alert({
                    'type': 'warning', 
                    'body': 'Please complete :<br>'+ alertText,  
                    'footer': get_Alert_Footer(1)
                });

            } else {
				
                // async save data
                $.ajax({
                    type: "post",
                    url: baseUrl + "myhris/Upload/Profile",
					cache: false,
					contentType: false,
					processData: false,
                    data: form_data, // data
                    success: (response) => {    
                        
                        // components/loader
                        _hide_Loader();
						
                        const myObj  = JSON.parse(response);
                       
                        if (myObj.status === 'success') {
							
							const currentData   = globalData[tagId].dataTable;
							const dataDb        = myObj.response_data.data; 
							
							// update global dataTable
							if (typeof dataDb.col_file_photo !== 'undefined') {
								currentData[dataDb.dataTable_Index]['col_file_photo'] 	= dataDb.col_file_photo;
							}
							if (typeof dataDb.col_file_ktp !== 'undefined') {
								currentData[dataDb.dataTable_Index]['col_file_ktp'] 	= dataDb.col_file_ktp;
							}
							if (typeof dataDb.col_file_kk !== 'undefined') {
								currentData[dataDb.dataTable_Index]['col_file_kk'] 		= dataDb.col_file_kk;
							}
							if (typeof dataDb.col_file_npwp !== 'undefined') {
								currentData[dataDb.dataTable_Index]['col_file_npwp'] 	= dataDb.col_file_npwp;
							}
							if (typeof dataDb.col_file_bpjs_tk !== 'undefined') {
								currentData[dataDb.dataTable_Index]['col_file_bpjs_tk'] = dataDb.col_file_bpjs_tk;
							}
							if (typeof dataDb.col_file_bpjs_k !== 'undefined') {
								currentData[dataDb.dataTable_Index]['col_file_bpjs_k'] 	= dataDb.col_file_bpjs_k;
							}
							
							// update global dataTable
							globalData[tagId]['dataTable'] = currentData;
							
							// hide_popup
							_hide_FormPopup(tagId);
							// reload
							Profile_Event(tagId, `reload_Key`);
							
                            // components/alert
							if (myObj.message !== '') {
								set_Alert({
									'type': 'info', 
									'body': myObj.message, 
									'footer': get_Alert_Footer(1) 
								});             
                            }

                        } else if (myObj.status === 'reject') {

                            // components/key
                            unset_LoginKey();

                            // controllers
                            Load_Redirect();

                        } else {
                            
                            // components/loader
                            _hide_Loader();

                            // components/alert
                            set_Alert({
                                'type': 'danger', 
                                'body': myObj.message, 
                                'footer': get_Alert_Footer(1)
                            });

                        }
                    }, // success
                    error: (xhr) => {
                        
                        // components/loader
                        _hide_Loader();

                        // components/alert
                        set_Alert({
                            'type': 'danger', 
                            'body': 'Error: '+ xhr.status +', '+xhr.responseText, //'Error connection', 
                            'footer': get_Alert_Footer(1)
                        });
                    }, // error
                }); // ajax
            } // alertText
        } // Form_Attachment_Save
		
	function _Form_Attachment_Delete(getObj) {
		
		set_Loader();
        
		const tagId 			= getObj.tagId;
		const row	 			= getObj.row;
		const col_data_key		= getObj.col_data_key;
		const category			= getObj.category;
		const dataTable_Index 	= getObj.dataTable_Index;
		
		const urlController 	= globalData[tagId].urlController;
        const baseLevel     	= $("#level-"+ tagId);
        const baseEl_Form   	= baseLevel.find(".my-content-form").eq(0).find(".my-form-popup");
        
		let alertText       = '';
        
            if (alertText !== '') {     

                // components/loader
                _hide_Loader();

                // components/alert
                set_Alert({
                    'type': 'warning', 
                    'body': 'Please complete :<br>'+ alertText,  
                    'footer': get_Alert_Footer(1)
                });

            } else {
				
                // async save data
                $.ajax({
                    type: "post",
					url: baseUrl + urlController,
					dataType: "json",
					data: {
						'appId': appId,
						'loginKey': get_LoginKey(), // components/key
						'randomKey': get_RandomKey(), // components/key
						'moduleId': globalData[tagId].moduleId,
						'reqAction': 'delete_file',
						'setObj': {
							'col_data_key': col_data_key,
							'category': category,
							'dataRules': globalData[tagId]['dataRules']
						}
					}, // data
                    success: (response) => {    
                        
                        // components/loader
                        _hide_Loader();
						_hide_Confirm();
						
                        const myObj  = response;
                       
                        if (myObj.status === 'success') {
							
							// update tr file
							baseEl_Form.find("."+ col_data_key +"-"+ category)
								.find(".file-name").html("empty file");
							baseEl_Form.find("."+ col_data_key +"-"+ category)
								.find(".file-act").html("");
							
							const currentData   = globalData[tagId].dataTable;
							
							// additional field here 
							switch(category) {
								case 'photo':
									currentData[dataTable_Index]['col_file_photo']   = null;
								break;
								case 'ktp':
									currentData[dataTable_Index]['col_file_ktp'] 	 = null;
								break;
								case 'kk':
									currentData[dataTable_Index]['col_file_kk'] 	 = null;
								break;
								case 'npwp':
									currentData[dataTable_Index]['col_file_npwp']    = null;
								break;
								case 'bpjs_tk':
									currentData[dataTable_Index]['col_file_bpjs_tk'] = null;
								break;
								case 'bpjs_k':
									currentData[dataTable_Index]['col_file_bpjs_k']  = null;
								break;
								default:
							} // switch
							
							// update global dataTable
							globalData[tagId]['dataTable'] = currentData;
                                
							// reload
							Profile_Event(tagId, `reload_Key`);
							
                        } else if (myObj.status === 'reject') {

                            // components/key
                            unset_LoginKey();

                            // controllers
                            Load_Redirect();

                        } else {
                            
                            // components/loader
                            _hide_Loader();

                            // components/alert
                            set_Alert({
                                'type': 'danger', 
                                'body': myObj.message, 
                                'footer': get_Alert_Footer(1)
                            });

                        }
                    }, // success
                    error: (xhr) => {
                        
                        // components/loader
                        _hide_Loader();

                        // components/alert
                        set_Alert({
                            'type': 'danger', 
                            'body': 'Error: '+ xhr.status +', '+xhr.responseText, //'Error connection', 
                            'footer': get_Alert_Footer(1)
                        });
                    }, // error
                }); // ajax
            } // alertText
        } // Form_Attachment_Delete
		
// ======== FORM

    //> modify module
    let functionResult  = '';
    switch (getObj.setFunction) {
        case 'Main': 
			functionResult = _Main(getObj);
        break;
        case 'Export_Table': 
			functionResult = _Export_Table(getObj);
		break;
		case 'Delete': 
            functionResult = _Delete(getObj);
        break;
        case 'Form': 
			_clearTimer(getObj.tagId, '_Form'); // global
			_clearTimer(getObj.tagId, '__process_Form_reload'); // global
            functionResult = _Form(getObj);
        break;
        case 'Save_Data': 
            _clearTimer(getObj.tagId, '_Save_Data'); // global
            _clearTimer(getObj.tagId, '__process_Save_add'); // global
            _clearTimer(getObj.tagId, '__process_Save_edit'); // global
            functionResult = _Save_Data(getObj);
        break;
        case 'Form_Attachment':
			functionResult = _Form_Attachment(getObj);
		break;
		case 'Form_Attachment_Save':
			functionResult = _Form_Attachment_Save(getObj);
		break;
		case 'Form_Attachment_Delete':
			functionResult = _Form_Attachment_Delete(getObj);
		break;
		default:
            functionResult = set_Alert({
                                'type': 'danger', 
                                'body': 'Undefined (setFunction)', 
                                'footer': get_Alert_Footer(1) 
                            });
    }
    
    return functionResult;
}

//> modify module
function Profile_Event(tagId, eventId, targetThis) {
	
	const eventObj   	= globalData[tagId]['dataEvent'][eventId];
    const eventParam 	= eventObj.eventParam;
	
	let eventResult		= '';
    switch (eventParam) {
		case 'Export_Table': 
			const exportType 	= $("#my-confirm").find("input[name='export_type']:checked").val();
			const exportDecSep  = $("#my-confirm").find("input[name='export_decimal_separator']:checked").val();
			const exportPage 	= $("#my-confirm").find("input[name='export_page']:checked").val();
			
			eventResult = Profile({
				'setFunction': eventParam,
				'tagId': tagId,
				'exportType': exportType,
				'exportPage': exportPage,
				'exportDecSep': exportDecSep 
			});
		break;
		case 'Delete': 
			eventResult = Profile({
                'setFunction': eventParam,
                'tagId': tagId
            });
        break;
        case 'Form': 
			eventResult = Profile({
				'setFunction': eventParam,
				'tagId': tagId,
				'action': eventObj.action
			});
		break;
        case 'Save_Data': 
			eventResult = Profile({
                'setFunction': eventParam,
                'tagId': tagId,
                'action': eventObj.action
            });
        break;
        case 'Form_Attachment': 
			eventResult = Profile({
				'setFunction': eventParam,
				'tagId': tagId,				
				'row': eventObj.row,
				'dataTable_Index': eventObj.dataTable_Index
			});
		break;
		case 'Form_Attachment_Save': 
			eventResult = Profile({
				'setFunction': eventParam,
				'tagId': tagId,
				'row': eventObj.row
			});
		break;
		case 'Form_Attachment_Delete': 
			eventResult = Profile({
				'setFunction': eventParam,
				'tagId': tagId,
				'category': eventObj.category,
				'col_data_key': eventObj.col_data_key,
				'dataTable_Index': eventObj.dataTable_Index
			});
		break;
		default:
            eventResult = set_Alert({
                            'type': 'danger', 
                            'body': 'Undefined (eventParam)', 
                            'footer': get_Alert_Footer(1) 
                        });
    }
    
    return eventResult;
}
