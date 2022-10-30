//> modify module
function JA_All(getObj) {
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
            // default global data
            // global
            set_Global_Data(tagId);  
			
            // this 
            __Global_Data_This(tagId);
            
            // components/content
            set_Containter(tagId);
			
			const Field     = _Field();
			const tableHead = Field.tableHead;
			globalData[tagId]['tableProperty']['thLength'] = tableHead.length;
			
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
            // default global data
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
        
        // set global urlController
        globalData[tagId]['urlController'] = 'myios/JA_All/'; //> modify module
        
        // set global formType
        globalData[tagId]['formType'] = 'Form';
        
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
		
		// update globalData styleModel
		globalData[tagId]['styleModel']  	 = 'model_1';
		// update globalData eventSelectedTr
		globalData[tagId]['eventSelectedTr'] = true;
		// update globalData dataExportType
		globalData[tagId]['dataExportType']	 = ['Excel', 'CSV (,)', 'CSV (;)'];
		
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
			
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 2
            'label': 'JA',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_reg_assignment',
            'field_value_default': '',
            'require': 1
            });
			
		tdWidth    = 10;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 3
            'label': 'JA Date',
            'width': (tdWidth),
            'short': true,
            'type': 'date',
            'align': 'right',
                'valueConverter': [],
            'field': 'col_assignment_date_dmy',
            'field_value_default': '',
            'require': -1
            });
			
		tdWidth    = 10;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 4
            'label': 'Status',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_status_ja',
            'field_value_default': '',
            'require': 1
            });
		tdWidth    = 10;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 5
            'label': 'Status Date',
            'width': (tdWidth),
            'short': true,
            'type': 'date',
            'align': 'right',
                'valueConverter': [],
            'field': 'col_status_date_dmy',
            'field_value_default': '',
            'require': 0
            });
				
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Title',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_assignment_title',
            'field_value_default': '',
            'require': 1
            });
			
		tdWidth    = 10;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Project',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': 'right',
                'valueConverter': [],
            'field': 'col_project_number_ref',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Contract',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_contract_number_ref',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Client',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_client_name',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'PM',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_project_manager',
            'field_value_default': '',
            'require': 1
            });
			
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Mob Date',
            'width': (tdWidth),
            'short': true,
            'type': 'date',
            'align': 'right',
                'valueConverter': [],
            'field': 'col_mob_date_dmy',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Demob Date',
            'width': (tdWidth),
            'short': true,
            'type': 'date',
            'align': 'right',
                'valueConverter': [],
            'field': 'col_demob_date_dmy',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Inspector',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_merge_inspector',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Equipment',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_merge_equipment',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Location Type',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_location_type',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Inspection Location',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_location_fix',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Remark',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_remark',
            'field_value_default': '',
            'require': 1
            });
		
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Appointment Letter',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_appointment_letter',
            'field_value_default': '',
            'require': 1
            });
			
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'ARS No.',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_ars_no',
            'field_value_default': '',
            'require': 1
            });

		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Supporting Doc.',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_supporting_doc',
            'field_value_default': '',
            'require': 1
            });
			
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Output BA',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_status_sw_yes',
            'field_value_default': '',
            'require': 1
            });	
			
		tdWidth    = 15;
        tableWidth = (tableWidth+tdWidth);
        tableHead.push({ // 6
            'label': 'Certificate Status',
            'width': (tdWidth),
            'short': true,
            'type': 'text',
            'align': '',
                'valueConverter': [],
            'field': 'col_certificate_status',
            'field_value_default': '',
            'require': 1
            });
			
        result['tableWidth'] = tableWidth;
        result['tableHead']  = tableHead;
        result['tdHeight']   = 35;//tdHeightDefault;
        
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
                'label': 'JA',
                'field': 'col_reg_assignment'
                },
				{
                'label': 'Project No.',
                'field': 'col_project_number_ref'
                },
                {
                'label': 'Title',
                'field': 'col_assignment_title'
                },
                {
                'label': 'Client',
                'field': 'col_client_name'
                },
                {
                'label': 'Contract',
                'field': 'col_contract_number_ref'
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
				'label': 'Project',
				'field': 'col_project_number_ref',
				'filterModel': 'list', // (list/rangeDate)
				'searchInput': 1,
				'defaultFilter': []
				},
				{
				'label': 'Client',
				'field': 'col_client_name',
				'filterModel': 'list', // (list/rangeDate)
				'searchInput': 1,
				'defaultFilter': []
				},
				{
				'label': 'Status',
				'field': 'col_status_ja',
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
			'exportPage': getObj.exportPage
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
        
		let exportType = '';
		if (getObj.reqAction === 'export') {
			
			exportType = getObj.exportType;
			
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
			selectedCb = getObj.selectedCb;
			$.map(getObj.selectedCb, ( val, indexCb ) => {
				selectedData.push(globalData[tagId]['dataTable'][val].col_data_key);
			});
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
                                    dataTable_Col['col_text_alert'] = rowData.col_reg_assignment;
									// additional field
									
                                dataTable_Row.push(dataTable_Col);

                            }); // map row
                            
                            // set global dataTable
                            globalData[tagId]['dataTable'] = dataTable_Row;
                            
                            if (loadMethode === 1) { // first load
                                // handling topbar right panel button filter and search (jika rightpanel === 1)
                                // components/topbar
                                _top_Right_Panel_Btn_Handler({
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
                        
                        // components/topbar
                        set_TitleBar(tagId, titleBar);
                        
                        // components/form
                        set_Form_Title(tagId, titleBar);
                            
                        const formType = globalData[tagId].formType;
                        set_Right_Panel_Bottom({
                            'tagId': tagId,
                            'btnDetail': permission.btn_read, 
                                'eventDetail': 'onclick="JA_All_Event(`Form`, `'+ tagId +'`, `detail`)"',
                            'btnAdd': permission.btn_create, 
                                'eventAdd': 'onclick="JA_All_Event(`'+ formType +'`, `'+ tagId +'`, `add`)" ondblclick="JA_All_Event(`'+ formType +'`, `'+ tagId +'`, `add`)"',
                            'btnEdit': permission.btn_update,
                                'eventEdit': 'onclick="JA_All_Event(`'+ formType +'`, `'+ tagId +'`, `edit`)" ondblclick="JA_All_Event(`'+ formType +'`, `'+ tagId +'`, `edit`)"',
                            'btnExport': permission.btn_export,
                                'eventExport': 'onclick="Confirm_Form(`'+ tagId +'`, `export`, `JA_All_Event`)" ondblclick="Confirm_Form(`'+ tagId +'`, `export`, `JA_All_Event`)"',
                            'btnImport': permission.btn_import,
                                'eventImport': '',
                            'btnImport_Format': permission.format_import,
                                'eventImport_Format': '',
                            'btnDelete': permission.btn_delete,
                                'eventDelete': 'onclick="Confirm_Form(`'+ tagId +'`, `delete`, `JA_All_Event`)" ondblclick="Confirm_Form(`'+ tagId +'`, `delete`, `JA_All_Event`)"',
                        });
                    } // reqAction view
					else if (getObj.reqAction === 'formreload') {
						
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
								currentData[x]['col_text_alert'] = rowData.col_reg_assignment;
								currentData[x]['indexTr'] 		 = x;
								// additional field
								
							dataTable_Row.push(currentData[x]);
							
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
                    unset_LoginKey("loginKey");

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

                    // update global data 
                    globalData[tagId]['dataPaging'].numrow      = numrow;
                    globalData[tagId]['dataPaging'].numrowpage  = numrowpage;               
                        // delete data global data selected
                        dataTable = dataTable.filter(function(val, i) {
                            return arrDeleteIndex.indexOf(i) == -1;                     
                        });
                        // update global data 
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
                    unset_LoginKey("loginKey");

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
						'input_Type': 'get_Input_Select',
						'label': tableHead[col].label, // col_project_number_ref
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
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
						'listRequest': 'myto_project_number',
						'listFormat': 'table', // list/table
						'selectedFunction': 'JA_All_Event',
						'eventParam': '_selected_Project'
						});	
					}
					
			col = (col+1); // 3
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_map_title
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'placeholder': 'readonly',
						'readonly': 'readonly="readonly"'
					});
					
			col = (col+1); // 4
			fieldForm.push({
                        'input_Type': 'get_Input_Select',
                        'label': tableHead[col].label, // col_map_type_reporting
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
                        'placeholder': 'select-item',
						'readonly': '',
							'eventObject': {
											'eventInput': 'List_Autofill_Map_Type',
											'col': col
										}
					});
					// update globalData
					if (paramLength === 0) {
						globalData[tagId]['dataAutofill_Param'].push({
						'col': col
						});	
					}	
					
			col = (col+1); // 5
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_tag_number
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
                        'placeholder': 'input-'+ tableHead[col].type,
						'readonly': ''
                    });
					
			col = (col+1); // 6
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_pm_name
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
                        'placeholder': 'readonly',
						'readonly': 'readonly="readonly"'
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
              baseEl.find(".panel-bottom-right .bottom-action-detail").blur();
              baseEl.find(".panel-bottom-right .bottom-action-add").blur();
              baseEl.find(".panel-bottom-right .bottom-action-edit").blur();
        
        // components/form
        _show_Form(tagId);
        //> modify module
        set_Form_Button({
            'tagId': tagId,
            'action': action,
            'eventSave_All': 'onclick="JA_All_Event(`Save_Data`, `'+ tagId +'`, `'+ action +'`)"',
            'eventNewForm': 'onclick="JA_All_Event(`Form`, `'+ tagId +'`, `add`)"',
			'eventReload_All': 'onclick="JA_All_Event(`Form`, `'+ tagId +'`, `reload`)"'
        });
        
        // button focus
        if (action === 'detail') {
            baseLevel.find(".my-content-form").eq(0)
                .find(".my-form-header .form-action-close").focus();
        } else {
            baseLevel.find(".my-content-form").eq(0)
                .find(".my-form-header .form-action-save").focus();
        }
        
        // route 
        const levelRow_Child = 1;
        // child => globalRoute[levelRow_Child] = [];
        
        //> modify module
        if (selectedLength > 300) {
            // components/loader
            set_Loader();
                set_Loader_Progress(selectedLength + ' DATA');
            const mytimer = setTimeout(() => {
                __process_Form(levelRow_Child)
                }, 5); // 5 ms
			
			// update globaldata dataTimer
			globalData[tagId]['dataTimer']['_Form'].push(mytimer);
			
        } else {
            __process_Form(levelRow_Child);
        }
        
        function __process_Form() {
			
			let form_Index  = 0;
			
            switch(action) {
                case 'reload':
					
					const mytimer = setTimeout(() => {
						let selectedCb = [];
						baseLevel.find(".my-tbody").eq(0).find(".my-tr .my-td-cb-col-0").each(function(i) {
							if (this.checked) {
							selectedCb.push(i);
							}
						}),
						_hide_Form(tagId),
						__Fetch_Data({
							'tagId': tagId,
							'tableHead': Field.tableHead,
							'tdHeight': Field.tdHeight,
							'loadMethode': 99,
							'reqAction': 'formreload',
							'selectedCb': selectedCb
							}),
						JA_All_Event(`Form`, tagId, `edit`)
					}, 5); // 5 ms
					
					// update globaldata dataTimer
					globalData[tagId]['dataTimer']['__process_Form_reload'].push(mytimer);
					
				break;
				default: // edit, detail
                    
                    dataTable = globalData[tagId].dataTable;
                    form_Index  = 0;
                    baseLevel.find(".my-tbody").eq(0).find(".my-tr .my-td-cb-col-0").each(function(i) {
                        if (this.checked) {

                        // route
                        // child =>  globalRoute[levelRow_Child][form_Index] = [];
                                                    
                            // components/form
                            content_Form_Append(tagId, ___Form_Item({
                                'tagId': tagId,
                                'action': action,
                                'dataTable_Index': i,
                                'data': dataTable[i],
                                    // child => 'levelRow_Child': levelRow_Child,
                                    // child => 'form_Index': form_Index
                                }));
                                
                        form_Index++;
                        }
                    });
                    
                    // components/loader
                    _hide_Loader();
                    
            } //switchcase
        } // __process_Form
        
		/*
		// child => 
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
        */
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
                        dataAutofill['listRequest'] = val.listRequest;
                    }
                    if (val.hasOwnProperty('listFormat') === true) {
                        dataAutofill['listFormat'] = val.listFormat;
                    }
                    if (val.hasOwnProperty('selectedFunction') === true) {
                        dataAutofill['selectedFunction'] = val.selectedFunction;
                    }
                    if (val.hasOwnProperty('eventParam') === true) {
                        dataAutofill['eventParam'] = val.eventParam;
                    }
                // tambahkan object baru ke dataAutofill
                    dataAutofill['dataTable_Index']  = dataTable_Index;
                    dataAutofill['dataTable']        = [];
            });
        }
		
        //console.log(globalData[tagId]['dataAutofill'])
        //> modify module
        // generate _Form_Field menjadi tag input
        let new_fieldForm = get_Map_Form_Input({
                        'tagId': tagId,
                        'action': getObj.action,
                        'fieldForm': fieldForm,
                        'data': getObj.data,
                        'row': row,
                        'formType': globalData[tagId].formType
                     });

        //> modify module
       let formChild	 = {};
			/*
			formChild[0] = {
					'paneId_Child': tagId + dataTable_Index +'-1',
					'tabTitle': 'Child 1',
					'tabContent': 'Content child 1'
					};
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
		// default, tampilkan input form secara berurutan
		let objForm	 = '';
		$.map(new_fieldForm, ( val ) => {
			objForm = objForm + val;
		});
		
		// update global dataForm 
		globalData[tagId]['dataForm'].push({
			'tableSeq': row,
			'dataTable_Index': dataTable_Index,
			'col_data_key': data['col_data_key'],
			'arrChild': []
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
        
        const result = `<div class="col-sm-6">
                    <div class="form-item form-item-${dataTable_Index}">
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
                    </div>`;
		
        return result;
    } // ___Form_Item

// ======== FORM

    //> modify module
    let functionResult  = '';
    switch (getObj.setFunction) {
        case 'Main': 
			functionResult = _Main(getObj);
        break;
        case 'Form': 
			_clearTimer(getObj.tagId, '_Form'); // global
			_clearTimer(getObj.tagId, '__process_Form_reload'); // global
            functionResult = _Form(getObj);
        break;
        case 'Export_Table': 
			functionResult = _Export_Table(getObj);
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
function JA_All_Event(eventParam, param_1, param_2, param_3, param_4) {
   
	let eventResult= '';
    switch (eventParam) {
		case 'Form': 
			eventResult = JA_All({
				'setFunction': eventParam,
				'tagId': param_1,
				'action': param_2
			});
		break;
        case 'Export_Table': 
			const exportType = $("#my-confirm").find("input[name='export_type']:checked").val();
			const exportPage = $("#my-confirm").find("input[name='export_page']:checked").val();
			
			eventResult = JA_All({
				'setFunction': eventParam,
				'tagId': param_1,
				'exportType': exportType,
				'exportPage': exportPage
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
