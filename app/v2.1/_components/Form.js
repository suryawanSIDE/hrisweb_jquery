
function set_Containter_Form(tagId) {
	
	const dataLevelRow   = parseInt(globalData[tagId].dataLevelRow);
	const baseLevel  	 = $("#level-"+ tagId);
	
	let contentFormStyle = 'background-color: rgba(191, 191, 190, 0.50);';
	let formStyle 		 = 'background-color: transparent;';
	if (dataLevelRow > 0) { // child
		const myContent	 	= baseLevel.find(".my-content").eq(0);
		const wContainer 	= myContent.parents(".my-container").width(); 
		contentFormStyle 	= 'background-color: rgba(191, 191, 190, 0.50); border: 1px solid #707778; border-radius: 5px; width: '+ wContainer +'px;';
		formStyle			= 'background-color: transparent; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;';
	}
	
	const result = `<div style="${contentFormStyle}" class="my-content-form my-hide">
					<div style="${formStyle}" class="my-form">
						<div class="my-form-header">
							<div class="my-form-header-left"></div>
							<div class="my-form-header-right"></div>
						</div>
						<div class="container-fluid">
							<div class="my-form-body row" style="height: ${(wHeight-40)}px;"></div>
						</div>
					</div>
				</div>`;
				
    // components/contents 
	set_Container_Prepend(tagId, result);
}
function set_Containter_Form_Float(tagId) {
	
	const dataLevelRow   = parseInt(globalData[tagId].dataLevelRow);
	const baseLevel  	 = $("#level-"+ tagId);
	
	let contentFormStyle = 'height: '+ wHeight +'px; background-color: rgba(191, 191, 190, 0.50);';
	if (dataLevelRow > 0) { // child
		contentFormStyle 	= 'left: 0px';
	}
	
	const result = `<div style="${contentFormStyle}" class="my-content-form my-hide">
					<div class="my-form" style="background-color: transparent;">
						<div class="container-fluid">
							<div class="my-form-body row"></div>
						</div>
					</div>
				</div>`;
				
    // components/contents 
	set_Container_Prepend(tagId, result);
}

function set_Form_Title(tagId, titleBar) {
	const baseLevel = $("#level-"+ tagId);
	baseLevel.find(".my-content-form").eq(0)
		.find(".my-form-header .my-form-header-left").html("Form "+ titleBar);
}

function set_Form_Button(getObj) {
	
	const tagId 	 = getObj.tagId;
	let btn_save_all = '';
	let btn_new_form = '';
	let btn_refresh	 = '';
	if (getObj.action === 'add' || getObj.action === 'edit') {
		btn_new_form = `<div class="btn-group">
							<button ${getObj.eventNewForm} class="btn btn-default btn-sm form-action-new-form">
								<span class="glyphicon glyphicon-plus"></span><span class="dekstop-label"> New</span>
							</button>	
						</div>`;
		btn_save_all = `<div class="btn-group">
							<button ${getObj.eventSave_All} class="btn btn-default btn-sm form-action-save" >
								<span class="glyphicon glyphicon-floppy-disk"></span><span class="dekstop-label"> Save</span>
							</button>
						</div>`;
						
		if (getObj.action === 'edit') {
			btn_refresh	  = `<div class="btn-group">
								<button ${getObj.eventReload_All} class="btn btn-default btn-sm form-action-reload">
									<span class="glyphicon glyphicon-refresh"></span><span class="dekstop-label"> Reload</span>
								</button>	
							</div>`;
		}
	}

	const result = `<div class="btn-group" role="toolbar">
					${btn_new_form}
					${btn_save_all}
					${btn_refresh}
					<div class="btn-group">
						<button onclick="_hide_Form('${tagId}')" class="btn btn-default btn-sm form-action-close">
							<span class="glyphicon glyphicon-remove"></span><span class="dekstop-label"> Close</span>
						</button>							
					</div>			
				</div>`;
			
	const baseLevel = $("#level-"+ tagId);
	baseLevel.find(".my-content-form").eq(0)
		.find(".my-form-header .my-form-header-right").html(result);
}

function set_Content_Form(tagId, value) {
	
	const baseLevel = $("#level-"+ tagId);
	baseLevel.find(".my-content-form").eq(0)
		.find(".my-form-body").html(value);
}

function content_Form_Append(tagId, value) {
	
	const baseLevel = $("#level-"+ tagId);
	baseLevel.find(".my-content-form").eq(0)
		.find(".my-form-body").append(value);
}

function _hide_Form(tagId) {
	
	const baseLevel 	 = $("#level-"+ tagId);
	const baseEl_Content = baseLevel.find(".my-content-form").eq(0);
	const formStatus     = baseEl_Content.hasClass("my-hide");
	
	if (formStatus === false) {
		baseEl_Content.removeClass("my-block");
		baseEl_Content.addClass("my-hide");
		baseEl_Content.find(".my-form-body").html("");
	}
	
}

function _show_Form(tagId) {
	
	const baseLevel 	 = $("#level-"+ tagId);
	const baseEl_Content = baseLevel.find(".my-content-form").eq(0);
	const formStatus 	 = baseEl_Content.hasClass("my-block");
	
	if (formStatus === false) {
		baseEl_Content.removeClass("my-hide");
		baseEl_Content.addClass("my-block");
	}	
}

function _reset_Form_Body(tagId) {
	
	const baseLevel = $("#level-"+ tagId);
	baseLevel.find(".my-content-form").eq(0)
		.find(".my-form-body").html("");
}

function _text_Pwd() {
	
	const inputType = $("#input-password").attr("type");
	if (inputType === 'password') {
		$("#input-password").attr("type", "text");
		$("#password-eye").removeClass("glyphicon-eye-close");
		$("#password-eye").addClass("glyphicon-eye-open");
	} else {
		$("#input-password").attr("type", "password");
		$("#password-eye").removeClass("glyphicon-eye-open");
		$("#password-eye").addClass("glyphicon-eye-close");
	}
}

function get_Form_Item_Tab(getObj) {
	
	let li_tabNav = '';
	$.map(getObj.formChild, ( childData, i ) => {
		let tabActive = '';
		if (getObj.tabPosition === 'bottom' && i == 0) {
			tabActive = 'active';
		}
		li_tabNav  += '<li role="presentation" class="'+ tabActive +'"><a href="#'+ childData.paneId_Child +'" aria-controls="'+ childData.paneId_Child +'" role="tab" data-toggle="tab" class="'+ childData.paneId_Child +'">'+ childData.tabTitle +'</a></li>';
	});
	
	let tabNav_Parent = '';
	if (getObj.tabPosition === 'normal') { // sertakan tab utama
		tabNav_Parent = `<li role="presentation" class="active"><a href="#${getObj.paneId_Parent}" aria-controls="${getObj.paneId_Parent}" role="tab" data-toggle="tab">${getObj.title_Parent}</a></li>`;
	}
	let tabNav = `<ul class="nav nav-tabs" role="tablist">
					${tabNav_Parent}
					${li_tabNav}
				</ul>`;
	
	
	let tabPane = '';
	$.map(getObj.formChild, ( childData, i ) => {
		let tabActive = '';
		if (getObj.tabPosition === 'bottom' && i == 0) {
			tabActive = 'active'; 
		}
		tabPane += '<div role="tabpanel" class="tab-pane '+ tabActive +'" id="'+ childData.paneId_Child +'">'+ childData.tabContent +'</div>';
	});
	
	const result = {
		'tabNav': tabNav,
		'tabPane': tabPane
	};
	return result;
}

function get_Form_Item_Button(getObj) {
	
	let result = '';
	if (getObj.body !== '') {
		result  = `<div class="form-item-button">
					<div class="form-item-button-body">
						${getObj.body}
					</div>
				</div>`;
	}
	return result;
}

function get_Map_Form_Input(getObj) {
	
	const tagId = getObj.tagId;
	const data  = getObj.data // value from db
	const row 	= getObj.row;
	let result = [];
	
	
	switch (getObj.action) {
		case 'detail': 
			$.map(getObj.fieldForm, ( colData, x ) => {
				// add new obj
				colData['tagId'] = tagId;
				colData['value'] = get_Value_Converter_Form(colData.valueConverter, data[colData.field]);
				colData['row']   = row;
				
				result.push(get_Input_Detail(colData));
			});
		break;
		default:
			$.map(getObj.fieldForm, ( colData, x ) => {
				switch (colData.input_Type) {
					case 'get_Input_Select':
						// add new obj
						colData['tagId'] = tagId;
						colData['value'] = get_Value_Converter_Form(colData.valueConverter, data[colData.field]);
						colData['row']   = row;
						colData['formType'] = getObj.formType;
						
						if (typeof colData['eventObject'] !== 'undefined') {
							// add new obj
								colData['eventObject']['tagId'] = tagId;
								colData['eventObject']['row']   = row;
							colData['eventInput']  = get_eventListener(colData['eventObject']);
						}
						// clean 
						colData['eventObject'] = ''; // clear eventObject
						
						result.push(get_Input_Select(colData));
					break;
					case 'get_Input_Textarea':
						// add new obj
						colData['tagId'] = tagId;
						colData['value'] = get_Value_Converter_Form(colData.valueConverter, data[colData.field]);
						colData['row']   = row;
						colData['formType'] = getObj.formType;
						
						if (typeof colData['eventObject'] !== 'undefined') {
							// add new obj
								colData['eventObject']['tagId'] = tagId;
								colData['eventObject']['row']   = row;
							colData['eventInput']  = get_eventListener(colData['eventObject']);
						}
						// clean 
						colData['eventObject'] = ''; // clear eventObject
						
						result.push(get_Input_Textarea(colData));
					break;
					case 'get_Input_File':
						// add new obj
						colData['tagId'] = tagId;
						colData['value'] = get_Value_Converter_Form(colData.valueConverter, data[colData.field]);
						colData['row']   = row;
						colData['formType'] = getObj.formType;
						
						if (typeof colData['eventObject'] !== 'undefined') {
							// add new obj
								colData['eventObject']['tagId'] = tagId;
								colData['eventObject']['row']   = row;
							colData['eventInput']  = get_eventListener(colData['eventObject']);
						}
						// clean 
						colData['eventObject'] = ''; // clear eventObject
						
						result.push(get_Input_File(colData));
					break;
					default: // get_Input
						// add new obj
						colData['tagId'] = tagId;
						colData['value'] = get_Value_Converter_Form(colData.valueConverter, data[colData.field]);
						colData['row']   = row;
						colData['formType'] = getObj.formType;
						
						if (typeof colData['eventObject'] !== 'undefined') {
							// add new obj
								colData['eventObject']['tagId'] = tagId;
								colData['eventObject']['row']   = row;
							colData['eventInput']  = get_eventListener(colData['eventObject']);
						}
						// clean 
						colData['eventObject'] = ''; // clear eventObject
						
						result.push(get_Input(colData));
				} // switchcase input type
			});
	} // switchcase action 
	
	return result;
}

function get_eventListener(getObj) {
	
	const tagId  = getObj.tagId;
	let result   = '';
	let classXY  = getObj.row +'-'+ getObj.col;
	switch (getObj.eventInput) {
		case 'List_Autofill_Status_Active':
			result = 'onclick="List_Autofill_Status_Active(`'+ tagId +'`, `'+ classXY +'`)"';
		break;
		case 'List_Autofill_Currency':
			result = 'onclick="List_Autofill_Currency(`'+ tagId +'`, `'+ classXY +'`)"';
		break;
		case 'List_Autofill_Purpose':
			result = 'onclick="List_Autofill_Purpose(`'+ tagId +'`, `'+ classXY +'`)"';
		break;
		case 'List_Autofill_Map_Type':
			result = 'onclick="List_Autofill_Map_Type(`'+ tagId +'`, `'+ classXY +'`)"';
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

function get_Form_Notif(getObj) {
	
	let result = '';
	if (getObj.body !== '') {
		result  = `<div class="form-item-notif">
					<div class="form-item-notif-head"><b>Warning !!</b></div>
					<div class="form-item-notif-body">${getObj.body}</div>
				</div>`;
	}
	
	return result;
}

function get_Form_Segment(getObj) {
	
	const segmentModel = getObj.segmentModel;
	
	let result = '<div class="form-segment"><div class="row">';
	switch(segmentModel) {
		case 'modify': 
			result = result + getObj.fieldForm;
		break;
		default:
			for (let i=getObj.start; i<=getObj.end; i++) {
				result = result +'<div class="'+ getObj.colClass +'">'+ getObj.fieldForm[i] +'</div>';
			}
	} // switchcase
	result = result +'</div></div>';
	
	return result;
}

function get_Notif_Input() {
	return '<span class="glyphicon glyphicon-exclamation-sign"></span> Please complete this';
}

function get_Input(getObj) {
	
	const tagId   = getObj.tagId;
	const classXY = getObj.row +'-'+ getObj.col;
	
	let inputStyle  = '';
	let require = '';
	if (getObj.require === 1) {
		inputStyle = 'border: 0.5px solid #F3432E;';
		require 	= '<span class="my-required"> * </span>';
	}
	
	if (getObj.align !== '') {
		inputStyle = inputStyle +'text-align: '+ getObj.align +';';
	}
	
	let labelCol	 = '';
	let labelRequire = '';
	if (getObj.formType === 'FormTr') {
		labelCol     = '';
		labelRequire = '';
	} else {
		labelCol     = `<div class="col-label">${getObj.label + require}:</div>`;
		labelRequire = `<span class="my-required col-notif col-notif-${classXY}"></span>`;
	}
	
	let eventInput = '';
	if (typeof getObj.eventInput !== 'undefined') {
		eventInput = getObj.eventInput;
	}
	
	const result  = `<div class="item-data-col">
					${labelCol}
					${labelRequire}
					<input 
						style="${inputStyle}" 
						onkeyup="_validate_Input(this, '${tagId}', '${classXY}')" 
						onkeypress="_press_Input(event, '${tagId}')" 
						${eventInput} 
						data-input="input" 
						data-require="${getObj.require}"
						type="${getObj.type}" 
						class="col-data col-data-${classXY} form-control input-sm" 
						value="${getObj.value}" 
						placeholder="${getObj.placeholder}" 
						${getObj.readonly} />
				</div>`;
	return result;
}

function get_Input_Select(getObj) {
	
	const tagId   = getObj.tagId;
	const classXY = getObj.row +'-'+ getObj.col;
	
	let inputStyle  = '';
	let require = '';
	if (getObj.require === 1) {
		inputStyle  = inputStyle +'border: 0.5px solid #F3432E;';
		require 	= '<span class="my-required"> * </span>';
	}
	
	if (getObj.require > -1) {
		inputStyle  = inputStyle +'background-color: #fff;';
	}
	
	if (getObj.align !== '') {
		inputStyle = inputStyle +'text-align: '+ getObj.align +';';
	}
	
	let labelCol	 = '';
	let labelRequire = '';
	if (getObj.formType === 'FormTr') {
		labelCol     = '';
		labelRequire = '';
	} else {
		labelCol     = `<div class="col-label">${getObj.label + require}:</div>`;
		labelRequire = `<span class="my-required col-notif col-notif-${classXY}"></span>`;
	}
	
	let eventInput = '';
	if (getObj.require > -1) {
		if (typeof getObj.eventInput === 'undefined') {
			eventInput = 'onclick="_show_Alert(`warning`, `Empty event`)"';
		} else {
			eventInput = getObj.eventInput;
		}
	}
	
	const result  = `<div class="item-data-col">
					${labelCol}
					${labelRequire}
					<input 
						style="${inputStyle}" 
						onchange="_validate_Input(this, '${tagId}', '${classXY}')" 
						onkeypress="_press_Input(event, '${tagId}')" 
						${eventInput} 
						data-input="input" 
						data-require="${getObj.require}"
						type="${getObj.type}" 
						class="col-data col-data-${classXY} form-control input-sm" 
						value="${getObj.value}" 
						placeholder="${getObj.placeholder}" 
						readonly="readonly" />
					<span class="select-container select-container-${classXY}"></span>
				</div>`;
	return result;
}

function get_Input_Textarea(getObj) {
	
	const tagId   = getObj.tagId;
	const classXY = getObj.row +'-'+ getObj.col;
	
	let inputBorder = '';
	let require = '';
	if (getObj.require === 1) {
		inputBorder = 'border: 0.5px solid #F3432E';
		require 	= '<span class="my-required"> * </span>';
	}
	
	let labelCol	 = '';
	let labelRequire = '';
	if (getObj.formType === 'FormTr') {
		labelCol     = '';
		labelRequire = '';
	} else {
		labelCol     = `<div class="col-label">${getObj.label + require}:</div>`;
		labelRequire = `<span class="my-required col-notif col-notif-${classXY}"></span>`;
	}
	
	const result  = `<div class="item-data-col">
					${labelCol}
					${labelRequire}
					<textarea 
						style="${inputBorder}" 
						onkeyup="_validate_Input(this, '${tagId}', '${classXY}')" 
						data-input="input" 
						data-require="${getObj.require}"
						class="col-data col-data-${classXY} form-control input-sm" 
						placeholder="${getObj.placeholder}" 
						${getObj.readonly} >${getObj.value}</textarea>
				</div>`;
	return result;
}
function get_Input_File(getObj) {
	
	const tagId   = getObj.tagId;
	const classXY = getObj.row +'-'+ getObj.col;
	
	let inputStyle  = '';
	let require = '';
	if (getObj.require === 1) {
		inputStyle = 'border: 0.5px solid #F3432E;';
		require 	= '<span class="my-required"> * </span>';
	}
	
	if (getObj.align !== '') {
		inputStyle = inputStyle +'text-align: '+ getObj.align +';';
	}
	
	let labelCol	 = '';
	let labelRequire = '';
	if (getObj.formType === 'FormTr') {
		labelCol     = '';
		labelRequire = '';
	} else {
		labelCol     = `<div class="col-label">${getObj.label + require}:</div>`;
		labelRequire = `<span class="my-required col-notif col-notif-${classXY}"></span>`;
	}
	
	
	const result  = `<div class="item-data-col">
					${labelCol}
					${labelRequire}
					<input 
						data-input="input" 
						data-require="${getObj.require}"
						type="file" 
						class="col-data col-data-${classXY} form-control input-sm" 
						value="${getObj.value}" 
						placeholder="${getObj.placeholder}" 
						${getObj.readonly} />
				</div>`;
	return result;
}

function get_Input_Detail(getObj) {
	
	let inputStyle = '';
	if (getObj.align !== '') {
		inputStyle = 'text-align: '+ getObj.align +';';
	}
	
	const classXY = getObj.row +'-'+ getObj.col;
	var value_fix = '';
	if (getObj.label === 'Password' || getObj.label === 'Slip') {
	if (getObj.type === 'password') {
		if (getObj.value !== '' && getObj.value !== null) {
			for(let i = 0; i < getObj.value.length; i++){
				value_fix = value_fix + '*';
			}
		}
	}} else {
		value_fix = getObj.value;
	}

	if (value_fix === '' || value_fix === null) {
		value_fix = '-';
	}

	const result = `<div class="item-data-col">
					<div class="col-label">${getObj.label}:</div>
					<div style="${inputStyle}" data-input="div" class="col-data col-data-${classXY} col-data-detail">${value_fix}</div>
					<hr class="my-hr">
				</div>`;
	return result;
}

function _press_Input(e, tagId) {
	if (e && e.which){
		charCode = e.which;
	} else if (window.event){
		e = window.event;
		charCode = e.keyCode;
	}
	if (charCode === 13) { // enter		
		const baseLevel = $("#level-"+ tagId);
		baseLevel.find(".my-content-form").eq(0)
			.find(".my-form-header .form-action-save").click();
	}
}

function _validate_Input(thisTarget, tagId, classXY) {
	
	const inputValue 	= $(thisTarget).val();
	const inputType	 	= $(thisTarget).attr("type");
	const requireStatus	= $(thisTarget).attr("data-require");
	
	if (requireStatus === '1') {
		
		const baseEl_Item  = $(thisTarget).closest(".item-data-col");
		const baseEl_Notif = baseEl_Item.find(".col-notif");
		const notif		   = baseEl_Notif.html();
		
		switch (inputType) {
			case 'mynumber':
				if (
				parseInt(inputValue) === 0 || 
				inputValue === ''
				) {
					if (notif === '') {
						baseEl_Notif.html(get_Notif_Input());
					} // notif
				} else {
					if (notif !== '') {
						baseEl_Notif.html("");
					} // notif
				}
			break;
			case 'mycurrency':
				let new_currency = _set_Currency_Input(inputValue);
				if (
				new_currency === 0 || 
				inputValue === ''
				) {
					if (notif === '') {
						baseEl_Notif.html(get_Notif_Input());
					} // notif
				} else {
					if (notif !== '') {
						baseEl_Notif.html("");
					} // notif
				}
			break;
			default:
				if (inputValue === '') {
					if (notif === '') {
						baseEl_Notif.html(get_Notif_Input());
					} // notif
				} else {
					if (notif !== '') {
						baseEl_Notif.html("");
					} // notif
				}
		} // switchcase
	} // requireStatus
	
	// replace value
	let new_value = '';
	switch (inputType) {
		case 'mynumber':
			new_value = inputValue.replace(/[^0-9\s]/gi, '').replace(/[_\s]/g, '');
			$(thisTarget).val(new_value);
		break;
		case 'mycurrency':
			new_value = inputValue.replace(/[^,.0-9\s]/gi, '');
			$(thisTarget).val(new_value);
		break;
		default:			
	} // switchcase
	
}

function _validate_Input_Submit(getObj) {
	
	const baseEl_Form = getObj.baseEl_Form;
	const formIndex	  = getObj.formIndex; 
	const inputIndex  = getObj.inputIndex;
	let alertField 	  = getObj.alertField;
	
		switch (getObj.type) {
		case 'mynumber':
			if (
			parseInt(getObj.value) === 0 || 
			getObj.value === ''
			) {
			alertField = alertField + getObj.label +', '
			baseEl_Form.eq(formIndex)
				.find(".item-data-col .col-notif").eq(inputIndex)
					.html(get_Notif_Input());
			}
		break; // mynumber
		case 'mycurrency':
			let check_currency = _set_Currency_Input(getObj.value);
			if (
			check_currency === 0 || 
			getObj.value === ''
			) {
				alertField = alertField + getObj.label +', '
				baseEl_Form.eq(formIndex)
					.find(".item-data-col .col-notif").eq(inputIndex)
						.html(get_Notif_Input());
			} 
		break; // mycurrency
	default:
		if (getObj.value === '') {
			alertField = alertField + getObj.label +', '
			baseEl_Form.eq(formIndex)
				.find(".item-data-col .col-notif").eq(inputIndex)
					.html(get_Notif_Input());
		} // text
	} // switchcase
	
	return alertField;
}