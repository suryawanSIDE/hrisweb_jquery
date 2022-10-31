function List_Autofill_Status_Active(tagId, colId) {
  	
	const baseLevel 		= $("#level-"+ tagId);
	const formType 			= globalData[tagId].formType;
	const dataTable_Index 	= globalData[tagId]['dataAutofill'][colId].dataTable_Index;
	let baseEl_Item			= '';
	
	if (formType === 'Form') {
		baseEl_Item	 = baseLevel.find(".my-content-form").eq(0).find(".my-form-body .form-item-"+ dataTable_Index);
	} else {
		baseEl_Item	 = baseLevel.find(".my-tbody").eq(0).find(".my-tr").eq(dataTable_Index);
	}
	
	const statusEl			= baseEl_Item.find(".select-container-"+ colId).hasClass("my-block");
	const statusInnerEl		= baseEl_Item.find(".select-container-"+ colId).html();
	
	if (statusEl === false) {
		if (statusInnerEl === '') {
			const currentValue 	 = baseEl_Item.find(".col-data-"+ colId).val();
			
			const a_Value	= 'Active';
			let a_Selected	= '';
			const b_Value	= 'Inactive';
			let b_Selected	= '';

			if (currentValue === a_Value) {
				a_Selected = 'a-item-active';
			}
			if (currentValue === b_Value) {
				b_Selected = 'a-item-active';
			}

			const result = '<div class="select-content">'+
								'<div class="select-content-body">'+
									'<a class="'+ a_Selected +' list-item" onclick="_select_List_Autofill(`'+ tagId +'`, `'+ colId +'`, this)" href="#" >'+ a_Value +'</a>'+
									'<a class="'+ b_Selected +' list-item" onclick="_select_List_Autofill(`'+ tagId +'`, `'+ colId +'`, this)" href="#" >'+ b_Value +'</a>'+
								'</div>'+
							'</div>';
							
			baseEl_Item.find(".select-container-"+ colId).html(result);
			baseEl_Item.find(".select-container-"+ colId).removeClass("my-hide");
			baseEl_Item.find(".select-container-"+ colId).addClass("my-block");
		} else {
			_show_List_Autofill(tagId, colId); 
		}
	} else {
		_hide_List_Autofill(tagId, colId);
	}

} // List_Autofill_Status_Active

function List_Autofill_Currency(tagId, colId) {
  	
	const baseLevel 		= $("#level-"+ tagId);
	const formType 			= globalData[tagId].formType;
	const dataTable_Index 	= globalData[tagId]['dataAutofill'][colId].dataTable_Index;
	let baseEl_Item			= '';
	
	if (formType === 'Form') {
		baseEl_Item	 = baseLevel.find(".my-content-form").eq(0).find(".my-form-body .form-item-"+ dataTable_Index);
	} else {
		baseEl_Item	 = baseLevel.find(".my-tbody").eq(0).find(".my-tr").eq(dataTable_Index);
	}
	
	const statusEl			= baseEl_Item.find(".select-container-"+ colId).hasClass("my-block");
	const statusInnerEl		= baseEl_Item.find(".select-container-"+ colId).html();
	
	if (statusEl === false) {
		if (statusInnerEl === '') {
			const currentValue 	 = baseEl_Item.find(".col-data-"+ colId).val();
			
			const a_Value	= 'IDR';
			let a_Selected	= '';
			const b_Value	= 'USD';
			let b_Selected	= '';
			
			if (currentValue === a_Value) {
				a_Selected = 'a-item-active';
			}
			if (currentValue === b_Value) {
				b_Selected = 'a-item-active';
			}

			const result = '<div class="select-content">'+
								'<div class="select-content-body">'+
									'<a class="'+ a_Selected +' list-item" onclick="_select_List_Autofill(`'+ tagId +'`, `'+ colId +'`, this)" href="#" >'+ a_Value +'</a>'+
									'<a class="'+ b_Selected +' list-item" onclick="_select_List_Autofill(`'+ tagId +'`, `'+ colId +'`, this)" href="#" >'+ b_Value +'</a>'+
								'</div>'+
							'</div>';
							
			baseEl_Item.find(".select-container-"+ colId).html(result);
			baseEl_Item.find(".select-container-"+ colId).removeClass("my-hide");
			baseEl_Item.find(".select-container-"+ colId).addClass("my-block");
		} else {
			_show_List_Autofill(tagId, colId); 
		}
	} else {
		_hide_List_Autofill(tagId, colId);
	}

} // List_Autofill_Currency

function _select_List_Autofill(tagId, colId, targetThis) {
	
	const baseLevel 		= $("#level-"+ tagId);
	const formType 			= globalData[tagId].formType;
	const dataTable_Index 	= globalData[tagId]['dataAutofill'][colId].dataTable_Index;
	let baseEl_Item			= '';
	
	if (formType === 'Form') {
		baseEl_Item	 = baseLevel.find(".my-content-form").eq(0).find(".my-form-body .form-item-"+ dataTable_Index);
	} else {
		baseEl_Item	 = baseLevel.find(".my-tbody").eq(0).find(".my-tr").eq(dataTable_Index);
	}
	
	baseEl_Item.find(".select-container-"+ colId +" .list-item").removeClass("a-item-active");
	baseEl_Item.find(".col-data-"+ colId).val($(targetThis).html());
	baseEl_Item.find(".select-container-"+ colId).removeClass("my-block");
	baseEl_Item.find(".select-container-"+ colId).addClass("my-hide");
	
	$(targetThis).addClass('a-item-active');
}

function List_Autofill(tagId, colId, searchForm) {

	const baseLevel 		= $("#level-"+ tagId);
	const formType 			= globalData[tagId].formType;
	const dataTable_Index 	= globalData[tagId]['dataAutofill'][colId].dataTable_Index;
	let baseEl_Item			= '';
	
	if (formType === 'Form') {
		baseEl_Item	 = baseLevel.find(".my-content-form").eq(0).find(".my-form-body .form-item-"+ dataTable_Index);
	} else {
		baseEl_Item	 = baseLevel.find(".my-tbody").eq(0).find(".my-tr").eq(dataTable_Index);
	}
	
	const statusEl			= baseEl_Item.find(".select-container-"+ colId).hasClass("my-block");
	const statusInnerEl		= baseEl_Item.find(".select-container-"+ colId).html();
	
	let searchDisplay	= 'my-hide';
	if (searchForm === 1) {
		searchDisplay = 'my-block';
	}
	
	if (statusEl === false) {
		if (statusInnerEl === '') {
			const result = '<div class="select-content">'+
								'<div class="select-content-header '+ searchDisplay +'">'+
								'<table><tr>'+
									'<td><input onkeypress="_press_Input_List(event, `'+ tagId +'`, '+ dataTable_Index +', `'+ colId +'`)" type="text" class="input-serach-list form-control input-sm" placeholder="search" /></td>'+
									'<td><button onclick="Search_List_Autofill(`'+ tagId +'`, `'+ colId +'`)" class="btn btn-default btn-sm autofill-action-search" ><span class="glyphicon glyphicon-search"></span></button></td>'+
									'<td><button onclick="Reset_List_Autofill(`'+ tagId +'`, `'+ colId +'`)" class="btn btn-default btn-sm autofill-action-refresh" ><span class="glyphicon glyphicon-refresh"></span></button></td>'+
								'</tr></table>'+
								'</div>'+
								'<div class="select-content-body"></div>'+
							'</div>';

			baseEl_Item.find(".select-container-"+ colId).html(result);
			baseEl_Item.find(".select-container-"+ colId).removeClass("my-hide");
			baseEl_Item.find(".select-container-"+ colId).addClass("my-block");
			
			_List_Fetch({
				'tagId': tagId,
				'colId': colId
			});
		} else {
			_show_List_Autofill(tagId, colId); 
		}
	} else {
		_hide_List_Autofill(tagId, colId);
	}
}

function _press_Input_List(e, tagId, dataTable_Index, colId) {
	
	const baseLevel = $("#level-"+ tagId);
	const formType 	= globalData[tagId].formType;
	let baseEl_Item	= '';
	
	if (formType === 'Form') {
		baseEl_Item	 = baseLevel.find(".my-content-form").eq(0).find(".my-form-body .form-item-"+ dataTable_Index);
	} else {
		baseEl_Item	 = baseLevel.find(".my-tbody").eq(0).find(".my-tr").eq(dataTable_Index);
	}
	
	if (e && e.which){
		charCode = e.which;
	} else if (window.event){
		e = window.event;
		charCode = e.keyCode;
	}
	if (charCode === 13) { // enter	
		baseEl_Item.find(".select-container-"+ colId 
			+" .autofill-action-search").click();
	}
}

function Search_List_Autofill(tagId, colId) {
	
	_List_Fetch({
		'tagId': tagId,
		'colId': colId
	});
}

function Reset_List_Autofill(tagId, colId) {
	
	const baseLevel 		= $("#level-"+ tagId);
	const formType 			= globalData[tagId].formType;
	const dataTable_Index 	= globalData[tagId]['dataAutofill'][colId].dataTable_Index;
	let baseEl_Item			= '';
	
	if (formType === 'Form') {
		baseEl_Item	 = baseLevel.find(".my-content-form").eq(0).find(".my-form-body .form-item-"+ dataTable_Index);
	} else {
		baseEl_Item	 = baseLevel.find(".my-tbody").eq(0).find(".my-tr").eq(dataTable_Index);
	}
	
	// reset input search
	baseEl_Item.find(".select-container-"+ colId 
				+" .select-content-header .input-serach-list").val("");

	// reload 
	_List_Fetch({
		'tagId': tagId,
		'colId': colId
	});
}

function _List_Fetch(getObj) {
	
	const tagId 			= getObj.tagId;
	const dataAutofill		= globalData[tagId]['dataAutofill'][getObj.colId];
	const dataTable_Index 	= dataAutofill.dataTable_Index;
    const listRequest 	 	= dataAutofill.listRequest;
	const listFormat	 	= dataAutofill.listFormat;
	const selectedFunction  = dataAutofill.selectedFunction;
	const eventParam  		= dataAutofill.eventParam;
	
	const baseLevel 		= $("#level-"+ tagId);
	const formType 			= globalData[tagId].formType;
	let baseEl_Item			= '';
	
	if (formType === 'Form') {
		baseEl_Item	 = baseLevel.find(".my-content-form").eq(0).find(".my-form-body .form-item-"+ dataTable_Index);
	} else {
		baseEl_Item	 = baseLevel.find(".my-tbody").eq(0).find(".my-tr").eq(dataTable_Index);
	}
	
	const currentValue 	 	= baseEl_Item.find(".col-data-"+ getObj.colId).val();
	const search 		 	= baseEl_Item.find(".select-container-"+ getObj.colId +" .select-content-header .input-serach-list").val();
	
	const loader = get_Loader(); // components/loader	
	
	baseEl_Item.find(".select-container-"+ getObj.colId 
		+" .select-content-body").html('<center>'+ loader +'</center>'); // elements

	// async load data tr 
	$.ajax({
		type: "post",
		url: baseUrl +"List_Select/",
		dataType: "json",
		data: {
			'appId': appId,
			'loginKey': get_LoginKey(), // components/key
			'randomKey': get_RandomKey(), // components/key
			'listRequest': listRequest,
			'search': search
		}, // data
		success: (response) => {	
			
			const myObj  = response;
			const dataDb = myObj.response_data.data;	

			if (myObj.status === 'success') {

				let result = '';
				if (listFormat === 'table') {
					
					switch(listRequest) {
						case 'myto_project_number':
							result += '<table width="100%" class="table-bordered table-condensed">'+
										'<tr>'+
										'<th></th>'+
										'<th><center>Project</center></th>'+
										'<th><center>Client</center></th>'+
										'<th><center>PM</center></th>'+
										'</tr>';
						break;
						case 'employee_ein':
							result += '<table width="100%" class="table-bordered">'+
									  '<tr><th></th><th><center>Name</center></th></tr>';
						break;
						default:
							result += '<table width="100%" class="table-bordered">'+
									 '<tr><th></th><th><center>Label</center></th></tr>';
					} // switchcase
				}
				$.map(dataDb, ( rowData, x ) => {
					
					let label 	 	= rowData['col_display'];
					let label_index = _label_Index(label);
					let selected 	= '';
					
					//> modify module
					switch(listRequest) {
						// myto
						case 'myto_project_number':
							// update global dataAutofill
							dataAutofill['dataTable'][label_index] = {
											'col_display': rowData['col_display'], 
											'col_project_number': rowData['col_project_number'], 
											'col_client_name': rowData['col_client_name'], 
											'col_project_manager': rowData['col_project_manager']
											};
							
							if (currentValue === rowData['col_display']) {
								selected = 'a-item-active';
							}
							
							if (listFormat === 'table') {
								result += '<tr><td align="center" valign="top"><a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ getObj.colId +'`, `'+ label_index +'`, this)" href="#" ><span class="glyphicon glyphicon-ok"></span></a></td>'+
											'<td valign="top">'+ label +'</td>'+
											'<td valign="top">'+ rowData['col_client_name'] +'</td>'+
											'<td valign="top">'+ rowData['col_project_manager'] +'</td>'+
											'</tr>';
							} else {
								result += '<a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ getObj.colId +'`, `'+ label_index +'`, this)" href="#" >'+ label +'</a>';
							}
							
						break;
						// myto
						
						case 'employee_ein':
							// update global dataAutofill
							dataAutofill['dataTable'][label_index] = {
											'col_display': rowData['col_display'], 
											'col_ein': rowData['col_ein'], 
											'col_name': rowData['col_name'],
											'col_id_employee': rowData['col_id_employee'],
											'col_department': rowData['col_department']
											};
							
							if (currentValue === rowData['col_ein']) {
								selected = 'a-item-active';
							}
							
							if (listFormat === 'table') {
								result += '<tr><td align="center" valign="top"><a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ getObj.colId +'`, `'+ label_index +'`, this)" href="#" ><span class="glyphicon glyphicon-ok"></span></a></td>'+
												'<td valign="top">'+ label +'</td>'+
												'</tr>';
							} else {
								result += '<a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ getObj.colId +'`, `'+ label_index +'`, this)" href="#" >'+ label +'</a>';
							}
							
						break;
						case 'reason_category':
							// update global dataAutofill
							dataAutofill['dataTable'][label_index] = {
											'col_display': rowData['col_display'], 
											'col_id_reason_category': rowData['col_id_reason_category']
											};
							
							if (currentValue === rowData['col_display']) {
								selected = 'a-item-active';
							}
							
							if (listFormat === 'table') {
								result += '<tr><td align="center" valign="top"><a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ getObj.colId +'`, `'+ label_index +'`, this)" href="#" ><span class="glyphicon glyphicon-ok"></span></a></td>'+
												'<td valign="top">'+ label +'</td>'+
												'</tr>';
							} else {
								result += '<a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ getObj.colId +'`, `'+ label_index +'`, this)" href="#" >'+ label +'</a>';
							}
							
						break;
						case 'tax_ppn_rbf':
							// update global dataAutofill
							dataAutofill['dataTable'][label_index] = {
											'col_display': rowData['col_display'], 
											'col_id_parameter': rowData['col_id_parameter'],
											'col_value_tax': rowData['col_value_tax']
											};
							
							if (currentValue === rowData['col_display']) {
								selected = 'a-item-active';
							}
							
							if (listFormat === 'table') {
								result += '<tr><td align="center" valign="top"><a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ getObj.colId +'`, `'+ label_index +'`, this)" href="#" ><span class="glyphicon glyphicon-ok"></span></a></td>'+
												'<td valign="top">'+ label +'</td>'+
												'</tr>';
							} else {
								result += '<a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ getObj.colId +'`, `'+ label_index +'`, this)" href="#" >'+ label +'</a>';
							}
						break;
						case 'tax_pph_rbf':
							// update global dataAutofill
							dataAutofill['dataTable'][label_index] = {
											'col_display': rowData['col_display'], 
											'col_id_parameter': rowData['col_id_parameter'],
											'col_value_tax': rowData['col_value_tax']
											};
							
							if (currentValue === rowData['col_display']) {
								selected = 'a-item-active';
							}
							
							if (listFormat === 'table') {
								result += '<tr><td align="center" valign="top"><a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ getObj.colId +'`, `'+ label_index +'`, this)" href="#" ><span class="glyphicon glyphicon-ok"></span></a></td>'+
												'<td valign="top">'+ label +'</td>'+
												'</tr>';
							} else {
								result += '<a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ getObj.colId +'`, `'+ label_index +'`, this)" href="#" >'+ label +'</a>';
							}
						break;
						default:
							dataAutofill['dataTable'][label_index] = {
											'col_display': rowData['col_display']
											};
							if (currentValue === rowData['col_display']) {
								selected = 'a-item-active';
							}
							
							if (listFormat === 'table') {
								result += '<tr><td align="center" valign="top"><a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ getObj.colId +'`, `'+ label_index +'`, this)" href="#" ><span class="glyphicon glyphicon-ok"></span></a></td>'+
												'<td valign="top">'+ label +'</td>'+
												'</tr>';
							} else {
								result += '<a class="'+ selected +' list-item" onclick="'+ selectedFunction +'(`'+ eventParam +'`, `'+ tagId +'`, `'+ getObj.colId +'`, `'+ label_index +'`, this)" href="#" >'+ label +'</a>';
							}
					} // switchcase listRequest				
					
				}); // map
				
				if (listFormat === 'table') {
					result += '</table>';
				}
				
				// apply result
				baseEl_Item.find(".select-container-"+ getObj.colId 
					+" .select-content-body").html(result);

			} else if (myObj.status === 'reject') {

				// components
				unset_LoginKey();

				// controllers
				Load_Redirect();

			} else {
				
				// reset body
				baseEl_Item.find(".select-container-"+ getObj.colId 
					+" .select-content-body").html("");

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
			baseEl_Item.find(".select-container-"+ getObj.colId 
					+" .select-content-body").html("");
			
			// components
			set_Alert({
					'type': 'danger', 
					'body': 'Error connection', 
					'footer': get_Alert_Footer(1) // elements
				});
		}, // error
	}); // ajax
}

function _select_List_Autofill_Dynamic(eventParam, tagId, colId, indexData, targetThis) {
	
	const dataAutofill		= globalData[tagId]['dataAutofill'][colId];
	const dataTable_Index 	= dataAutofill.dataTable_Index;
	const dataTable 		= dataAutofill.dataTable;
	
	const baseLevel 		= $("#level-"+ tagId);
	const formType 			= globalData[tagId].formType;
	let baseEl_Item			= '';
	
	if (formType === 'Form') {
		baseEl_Item	 = baseLevel.find(".my-content-form").eq(0).find(".my-form-body .form-item-"+ dataTable_Index);
	} else {
		baseEl_Item	 = baseLevel.find(".my-tbody").eq(0).find(".my-tr").eq(dataTable_Index);
	}
	
	baseEl_Item.find(".col-data-"+ colId).val(dataTable[indexData].col_display);
	baseEl_Item.find(".select-container-"+ colId +" .list-item").removeClass("a-item-active");
	
	$(targetThis).addClass('a-item-active');
	
	_hide_List_Autofill(tagId, colId);
}

function _show_List_Autofill(tagId, colId) {
	
	const baseLevel 		= $("#level-"+ tagId);
	const formType 			= globalData[tagId].formType;
	const dataTable_Index 	= globalData[tagId]['dataAutofill'][colId].dataTable_Index;
	let baseEl_Item			= '';
	
	if (formType === 'Form') {
		baseEl_Item	 = baseLevel.find(".my-content-form").eq(0).find(".my-form-body .form-item-"+ dataTable_Index);
	} else {
		baseEl_Item	 = baseLevel.find(".my-tbody").eq(0).find(".my-tr").eq(dataTable_Index);
	}
	
	baseEl_Item.find(".select-container-"+ colId).removeClass("my-hide");
	baseEl_Item.find(".select-container-"+ colId).addClass("my-block")
}

function _hide_List_Autofill(tagId, colId) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const formType 			= globalData[tagId].formType;
	const dataTable_Index 	= globalData[tagId]['dataAutofill'][colId].dataTable_Index;
	let baseEl_Item			= '';
	
	if (formType === 'Form') {
		baseEl_Item	 = baseLevel.find(".my-content-form").eq(0).find(".my-form-body .form-item-"+ dataTable_Index);
	} else {
		baseEl_Item	 = baseLevel.find(".my-tbody").eq(0).find(".my-tr").eq(dataTable_Index);
	}
	
	baseEl_Item.find(".select-container-"+ colId).removeClass("my-block");
	baseEl_Item.find(".select-container-"+ colId).addClass("my-hide");
}
