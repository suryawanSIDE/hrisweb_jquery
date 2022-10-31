function List_Fixed_Status_Active(tagId, colId) {
  	
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
									'<a class="'+ a_Selected +' list-item" onclick="_select_List_Fixed(`'+ tagId +'`, `'+ colId +'`, this)" href="#" >'+ a_Value +'</a>'+
									'<a class="'+ b_Selected +' list-item" onclick="_select_List_Fixed(`'+ tagId +'`, `'+ colId +'`, this)" href="#" >'+ b_Value +'</a>'+
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

} // List_Fixed_Status_Active

function List_Fixed_Currency(tagId, colId) {
  	
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
									'<a class="'+ a_Selected +' list-item" onclick="_select_List_Fixed(`'+ tagId +'`, `'+ colId +'`, this)" href="#" >'+ a_Value +'</a>'+
									'<a class="'+ b_Selected +' list-item" onclick="_select_List_Fixed(`'+ tagId +'`, `'+ colId +'`, this)" href="#" >'+ b_Value +'</a>'+
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

} // List_Fixed_Currency

function _select_List_Fixed(tagId, colId, targetThis) {
	
	const baseLevel 		= $("#level-"+ tagId);
	const formType 			= globalData[tagId].formType;
	const dataTable_Index 	= globalData[tagId]['dataAutofill'][colId].dataTable_Index;
	let baseEl_Item			= '';
	
	let title_form  = get_Form_Title(tagId);
	globalData[tagId]['dataTaskActive']['formChange'] = title_form;
	
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
	} else {
		
		let title_form  = get_Form_Title(tagId);
		globalData[tagId]['dataTaskActive']['formChange'] = title_form;
		
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
	const colId				= getObj.colId;
	const dataAutofill		= globalData[tagId]['dataAutofill'][colId];
	const dataTable_Index 	= dataAutofill.dataTable_Index;
    const listRequest 	 	= dataAutofill.listRequest;
	
	const baseLevel 		= $("#level-"+ tagId);
	const formType 			= globalData[tagId].formType;
	let baseEl_Item			= '';
	
	if (formType === 'Form') {
		baseEl_Item	 = baseLevel.find(".my-content-form").eq(0).find(".my-form-body .form-item-"+ dataTable_Index);
	} else {
		baseEl_Item	 = baseLevel.find(".my-tbody").eq(0).find(".my-tr").eq(dataTable_Index);
	}
	
	const currentValue 	 	= baseEl_Item.find(".col-data-"+ colId).val();
	const search 		 	= baseEl_Item.find(".select-container-"+ colId +" .select-content-header .input-serach-list").val();
	
	const loader = get_Loader(); // components/loader	
	
	baseEl_Item.find(".select-container-"+ colId 
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
				
				// apply result
				baseEl_Item.find(".select-container-"+ colId 
					+" .select-content-body").html(
									// global_funct
									get_List_Result({
										'tagId': tagId,
										'colId': colId,
										'currentValue': currentValue,
										'dataDb': dataDb
									})
								);

			} else if (myObj.status === 'reject') {

				// components
				unset_LoginKey();

				// controllers
				Load_Redirect();

			} else {
				
				// reset body
				baseEl_Item.find(".select-container-"+ colId 
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
			baseEl_Item.find(".select-container-"+ colId 
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

function _select_List_Autofill(eventParam, tagId, colId, indexData, targetThis) {
	
	const dataAutofill		= globalData[tagId]['dataAutofill'][colId];
	const dataTable_Index 	= dataAutofill.dataTable_Index;
	const dataTable 		= dataAutofill.dataTable;
	
	const baseLevel 		= $("#level-"+ tagId);
	const formType 			= globalData[tagId].formType;
	let baseEl_Item			= '';
	
	let title_form  = get_Form_Title(tagId);
	globalData[tagId]['dataTaskActive']['formChange'] = title_form;
	
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
