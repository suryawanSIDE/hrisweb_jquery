function get_Table(getObj) {
	
	const tagId 		= getObj.tagId;
	const tableHead 	= getObj.tableHead;
	const tableWidth	= 0;
	
	let styleModel = '';
	let tableClass = '';
	if (typeof globalData[tagId]['styleModel'] === 'undefined') {
		styleModel = 'default';
		tableClass = 'table-bordered';
	} else {
		styleModel = globalData[tagId]['styleModel'];
		if (styleModel === 'model_1') {
			tableClass = 'table-bordered';
		} else {
			tableClass = '';
		}
	}
	
	if (deviceType === 'mobile') {
		return _mobile();
	} else {
		return _dekstop();
	}
	
	function _mobile() {
		// create thead
		var th_0 = '<tr>';
		var th_1 = '<tr>';
		$.map(tableHead, ( val, y ) => {
			
			//let classX	= 'row-0';
			let classY	= 'col-'+ y;
			let classXY	= '0-'+ y;
			
			if (val.type === 'checkboxAction') {
				th_0 += '<th class="my-th my-th-'+ classXY +' my-th-'+ classY +' my-th-'+ styleModel +'">'+ 
							'<div class="my-th-label">'+
							'</div>'+
						'</th>';
			} else {
				th_0 += '<th class="my-th my-th-'+ classXY +' my-th-'+ classY +'">'+ 
							'<div class="my-th-label">'+
								val.label
							'</div>'+
						'</th>';
			} // val.type
		});
		
		th_0 += '</tr>';
		
		// loading
		const loader   = get_Loader();
		const trLoader = `<div class="tr-loader"><center>${loader}</center></div>`;;
		
		const table_head = `<div class="my-table-head-box my-hide"> 
								<table class="my-table-head table-bordered">
									<thead class="my-thead">
										${th_0}
									</thead>
								</table>
							</div>`;
						
		const table_data = `<div class="my-table-data-box">
								${trLoader}						
								<table class="my-table-data my-table">
									<tbody class="my-tbody">
									</tbody>
								</table>
							</div>`;

		const result = '<div class="my-table-container">'+ table_head + table_data +'</div>';
		
		return result;
	} // mobile
	
	function _dekstop() {
		// create thead
		var th_0 = '<tr>';
		var th_1 = '<tr>';
		$.map(tableHead, ( val, y ) => {
			
			//let classX	= 'row-0';
			let classY	= 'col-'+ y;
			let classXY	= '0-'+ y;
			
			if (val.type === 'checkboxAction') {
				th_0 += '<th class="my-th my-th-'+ classXY +' my-th-'+ styleModel +'">'+ 
							'<div class="th-sizer th-sizer-'+ classY +'">'+
								'<input class="my-th-cb my-th-cb-'+ classXY +' my-th-cb-'+ classY +'" onclick="_select_Cb_All(`'+ tagId +'`)" type="checkbox" />'+
							'</div>'+
						'</th>';
				// tdFreeze_Bottom
				th_1 += '<th class="my-th my-th-'+ classXY +' my-th-'+ styleModel +'">'+ 
							'<div class="th-sizer th-sizer-'+ classY +'">'+
								'-'+ 
							'</div>'+
						'</th>';
			} else {
				if (y <= globalData[tagId]['tableProperty']['tableFreeze']) {
					th_0 += '<th class="my-th my-th-'+ classXY +' my-th-'+ classY +' my-th-'+ styleModel +'">'+ 
								'<div onmouseover="_colResize(this, `'+ tagId +'`, `'+ y +'`)" class="th-sizer th-sizer-'+ classY +'">'+
								'<table class="my-table"></tbody><tr>'+
									'<td onclick="Load_Sort(`'+ tagId +'`, `'+ val.field +'`)" ><input type="text" class="my-th-input" value="'+ val.label +'" readonly="readonly" style="text-align: center;" /></td>'+
									'<td ><span class="my-th-sort-icon my-th-sort-icon-'+ val.field +'"></span></td>' +
								'</tr></tbody></table>'+
								'</div>'+
							'</th>';
					// tdFreeze_Bottom
					th_1 += '<th class="my-th my-th-'+ classXY +' my-th-'+ classY +' my-th-'+ styleModel +'">'+ 
							'<div class="th-sizer th-sizer-'+ classY +'">'+
								'<input type="text" class="my-th-input" value="'+ val.label +'" readonly="readonly" style="text-align: center;" />'+ 
							'</div>'+
						'</th>';
				} // tableFreeze
				else {
					th_1 += '<th class="my-th my-th-'+ classXY +' my-th-'+ classY +' my-th-'+ styleModel +'">'+ 
							'<div onmouseover="_colResize(this, `'+ tagId +'`, `'+ y +'`)" class="th-sizer th-sizer-'+ classY +'">'+
							'<table class="my-table"></tbody><tr>'+
								'<td onclick="Load_Sort(`'+ tagId +'`, `'+ val.field +'`)" ><input type="text" class="my-th-input" value="'+ val.label +'" readonly="readonly" style="text-align: center;" /></td>'+
								'<td ><span class="my-th-sort-icon my-th-sort-icon-'+ val.field +'"></span></td>' +
							'</tr></tbody></table>'+
							'</div>'+
						'</th>';
				} // tableFreeze
			} // val.type
		});
		
		th_0 += '</tr>';
		th_1 += '</tr>';
		
		// loading
		const loader   = get_Loader();
		const trLoader = `<div class="tr-loader"><center>${loader}</center></div>`;;
		
		const table_head = `<div class="my-table-head-box"> 
								<table class="my-table-head ${tableClass}" style="position: absolute;">
									<thead class="my-thead">
										${th_0}
									</thead>
								</table>
								<table class="my-table-head ${tableClass}">
									<thead class="my-thead">
										${th_1}
									</thead>
								</table>
							</div>`;
						
		const table_data = `<div class="my-table-data-box" onscroll="_scroll_Freeze(this, '${tagId}')">
								${trLoader}						
								<div class="my-table-data-box-freeze" style="overflow: hidden; background-color: #fff; position: absolute;">
									<table class="my-table-data ${tableClass}" >
										<tbody class="my-tbody">
										</tbody>
									</table>
								</div>
								<table class="my-table-data ${tableClass}">
									<tbody class="my-tbody">
									</tbody>
								</table>
							</div>`;

		const result = '<div class="my-table-container">'+ table_head + table_data +'</div>';
		
		return result;
	} // dekstop	
}

function set_Map_Table(getObj) {
	
	const tagId 		= getObj.tagId;
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl_Th_Box = baseLevel.find(".my-table-head-box").eq(0);
	const baseEl_Tb_Box = baseLevel.find(".my-table-data-box").eq(0);
	const dataTable		= getObj.dataTable;
	
	const processID		= 'dataTable-'+ parseInt(Math.random() * 1000);
		baseEl_Tb_Box.find(".my-tbody").addClass(processID);
	
	const data_numrow 		= dataTable.length;
	let data_numrowpage		= 0;
	let data_display_row	= data_numrow;
	let data_start_row		= 0;
	let data_max_page		= 1;
	let data_current_page	= 1;
	
	if (data_numrow >= 200) {
		data_display_row	= 100;
		data_start_row		= 0;
		data_max_page		= (data_numrow/data_display_row);
		data_current_page	= 1;
	}
	
	for(let i=data_current_page; i<=data_max_page; i++) { // show ke table per 100 baris
		let max_part = (i*data_display_row);
		for(let x=data_start_row; x<max_part; x++) {
			if (dataTable.hasOwnProperty(x)) {
			
			let time = 0.1;
			if (i > 1) {
				time = 0.5;
			}
			
			let mytimer = setTimeout(() => {
					_set_Map_Table_Execute({
									'mapTableType': 'append',
									'tagId': tagId,
									'tableHead': getObj.tableHead,
									'tdHeight': getObj.tdHeight,
									'rowData': dataTable[x]
								}),
					data_numrowpage++;
					if (data_numrowpage===(max_part)) {
						set_Num_Row_Page(tagId, data_numrowpage);
					}
				}, time); // 1/5 ms	
				
				// update globaldata dataTimer
				globalData[tagId]['dataTimer']['set_Map_Table'].push(mytimer);
				
			} // hasOwnProperty
		} // for row 
		
	data_start_row	  = (i*data_display_row);
	data_current_page = i;
	} // for data_current_page
		
} // set_Map_Table

function set_Map_Table_After_Add(getObj) {
	
	const tagId 		= getObj.tagId;
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl_Th_Box = baseLevel.find(".my-table-head-box").eq(0);
	const baseEl_Tb_Box = baseLevel.find(".my-table-data-box").eq(0);
	const dataTable		= getObj.dataTable;
	
	// reset globalData dataTaskActive formChange
	globalData[tagId]['dataTaskActive']['formChange'] = '';
	
	$.map(dataTable, ( rowData, x ) => {
		_set_Map_Table_Execute({
						'mapTableType': 'append',
						'tagId': tagId,
						'tableHead': getObj.tableHead,
						'tdHeight': getObj.tdHeight,
						'rowData': dataTable[x]
					});
	}); // row 	
	
} // set_Map_Table_After_Add

function set_Map_Table_After_Edit(getObj) {
	
	const tagId 		= getObj.tagId;
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl_Th_Box = baseLevel.find(".my-table-head-box").eq(0);
	const baseEl_Tb_Box = baseLevel.find(".my-table-data-box").eq(0);
	const dataTable		= getObj.dataTable;
	
	// reset globalData dataTaskActive formChange
	globalData[tagId]['dataTaskActive']['formChange'] = '';
	
	const contentForm 	= baseLevel.find(".my-content-form").eq(0);
	if (contentForm.find(".my-form-header .form-action-new_form").prop("disabled") === true) {
		contentForm.find(".my-form-header .form-action-new_form").prop("disabled", false); 
	}
	if (contentForm.find(".my-form-header .form-action-reload").prop("disabled") === true) {
		contentForm.find(".my-form-header .form-action-reload").prop("disabled", false); 
	}
	
	$.map(dataTable, ( rowData, x ) => {
		_set_Map_Table_Execute({
					'mapTableType': 'replace',
					'tagId': tagId,
					'tableHead': getObj.tableHead,
					'tdHeight': getObj.tdHeight,
					'rowData': dataTable[x]
				});
	}); // row 
}

function _set_Map_Table_Execute(getObj) {
	/*
	consumer: 
		set_Map_Table,
		set_Map_Table_After_Add,
		set_Map_Table_After_Edit
	*/
	
	const tagId 		= getObj.tagId;
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl_Tb_Box = baseLevel.find(".my-table-data-box").eq(0);
	const rowData		= getObj.rowData;
	
	if (deviceType === 'mobile') {
		_mobile();
	} else {
		_dekstop();
	}
	
	function _mobile() {
		
		let file_path = '';
		var seq  = rowData.seq;
		let td_0 = [];	
		$.map(getObj.tableHead, ( colData, y ) => {			
			
			let value = '';
			if (typeof rowData[colData.field] !== 'undefined') {
				value = rowData[colData.field];
			}
			
			td_0[y] = { // object td
					'tagId': tagId,
					'row': seq,
					'col': y,
					'type': colData.type,
					'width': 0, //width, //colData.width,
					'height': getObj.tdHeight,
					'align': colData.align,
					'value': value,
						'valueConverter': colData.valueConverter,
						'otherParam': []
				};
				
			// extend obj td
			if ($.inArray('_event_open_file', colData.valueConverter) !== -1) {
				file_path = rowData['col_file_path'];
				td_0[y]['otherParam']['file_path'] = file_path;
			} // _event_open_file
			
		}); // col
		
		let tr_0 = {
			'row' : seq,
			'objTd': td_0,
				'action': ''
			};
			
		// result
		if (getObj.mapTableType === 'append') {
			baseEl_Tb_Box.find(".my-tbody").eq(0).append(get_Tr(tr_0));
		} else if (getObj.mapTableType === 'replace') {
			// replace tr
			baseEl_Tb_Box.find(".my-tbody").eq(0)
				.find(".my-tr").eq(rowData.indexTr)
					.replaceWith(get_Tr(tr_0));	
			
			// selected tr
			baseEl_Tb_Box.find(".my-tbody").eq(0)
				.find(".my-tr").eq(rowData.indexTr)
					.addClass("my-tr-active");
					
			// selected cb
			baseEl_Tb_Box.find(".my-tbody").eq(0)
				.find(".my-tr .my-td-cb-col-0")
					.eq(rowData.indexTr).prop("checked", true);	
		} // replace
	} // mobile
	
	function _dekstop() {
		
		let file_path = '';
		var seq  = rowData.seq;
		let td_0 = [];
		let td_1 = [];		
		$.map(getObj.tableHead, ( colData, y ) => {			
			
			let width = globalData[tagId]['tableProperty']['tdWidth'][y];
			
			let value = '';
			if (typeof rowData[colData.field] !== 'undefined') {
				value = rowData[colData.field];
			}
			
			if (y <= globalData[tagId]['tableProperty']['tableFreeze']) {
				
				td_0[y] = { // object td
						'tagId': tagId,
						'row': seq,
						'col': y,
						'type': colData.type,
						'width': width, //colData.width,
						'height': getObj.tdHeight,
						'align': colData.align,
						'value': value,
							'valueConverter': colData.valueConverter,
							'otherParam': []
					};
				// tdFreeze_Bottom
				td_1[y] = { // object td
						'tagId': tagId,
						'row': seq,
						'col': y,
						'type': 'tdFreeze_Bottom', //colData.type,
						'width': width, //colData.width,
						'height': getObj.tdHeight,
						'align': colData.align,
						'value': value,
							'valueConverter': colData.valueConverter,
							'otherParam': []
					};	
				
				// extend obj td
				if ($.inArray('_event_open_file', colData.valueConverter) !== -1) {
					file_path = rowData['col_file_path'];
					td_0[y]['otherParam']['file_path'] = file_path;
					td_1[y]['otherParam']['file_path'] = file_path;
				} // _event_open_file
				
			} // tableFreeze
			else {
				td_1[y] = { // object td
						'tagId': tagId,
						'row': seq,
						'col': y,
						'type': colData.type,
						'width': width, //colData.width,
						'height': getObj.tdHeight,
						'align': colData.align,
						'value': value,
							'valueConverter': colData.valueConverter,
							'otherParam': []
					};
				
				// extend obj td
				if ($.inArray('_event_open_file', colData.valueConverter) !== -1) {
					file_path = rowData['col_file_path'];
					td_1[y]['otherParam']['file_path'] = file_path;
				} // _event_open_file
				
			} // tableFreeze
			
		}); // col
		
		let tr_0 = {
			'row' : seq,
			'objTd': td_0,
				'action': ''
			};
			
		let tr_1 = {
			'row' : seq,
			'objTd': td_1,
				'action': ''
			};
		
		// result 
		if (getObj.mapTableType === 'append') {
			baseEl_Tb_Box.find(".my-tbody").eq(0).append(get_Tr(tr_0));
			baseEl_Tb_Box.find(".my-tbody").eq(1).append(get_Tr(tr_1));
		} else if (getObj.mapTableType === 'replace') {
			// replace tr
			baseEl_Tb_Box.find(".my-tbody").eq(0)
				.find(".my-tr").eq(rowData.indexTr)
					.replaceWith(get_Tr(tr_0));	
			baseEl_Tb_Box.find(".my-tbody").eq(1)
				.find(".my-tr").eq(rowData.indexTr)
					.replaceWith(get_Tr(tr_1));	
			
			// selected tr
			baseEl_Tb_Box.find(".my-tbody").eq(0)
				.find(".my-tr").eq(rowData.indexTr)
					.addClass("my-tr-active");
			baseEl_Tb_Box.find(".my-tbody").eq(1)
				.find(".my-tr").eq(rowData.indexTr)
					.addClass("my-tr-active");
					
			// selected cb
			baseEl_Tb_Box.find(".my-tbody").eq(0)
				.find(".my-tr .my-td-cb-col-0")
					.eq(rowData.indexTr).prop("checked", true);	
		} // replace
	} // dekstop
} // set_Map_Table_Append

function set_Table_Body(tagId, value) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl_Tb_Box	= baseLevel.find(".my-table-data-box").eq(0);
	
	baseEl_Tb_Box.find(".my-tbody").html(value);
}

function get_Tr_Loader(tagId) {
	
	const baseLevel = $("#level-"+ tagId);
	const baseEl 	= baseLevel.find(".my-table-data-box").eq(0);
	
	if (baseEl.find(".tr-loader").length === 0) {
		const loader    = get_Loader();
		const result    = `<div class="tr-loader"><center>${loader}</center></div>`;
			baseEl.prepend(result);
	}
}
function tr_Loader_Rmv(tagId) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl 		= baseLevel.find(".my-table-data-box").eq(0);
		
		baseEl.find(".tr-loader").remove();
}


function get_Tr_Empty(tagId) {
	
	const baseLevel = $("#level-"+ tagId);
	const baseEl 	= baseLevel.find(".my-table-data-box").eq(0);
	
	if (baseEl.find(".tr-empty").length === 0) {
		const result    = `<div class="tr-empty"><center><i>Empty</i></center></div>`;
		baseEl.prepend(result);
	}
}
function tr_Empty_Rmv(tagId) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl 		= baseLevel.find(".my-table-data-box").eq(0);
		
		baseEl.find(".tr-empty").remove();
}

function get_Tr(getObj) {
	
	if (deviceType === 'mobile') {
		return _mobile();
	} else {
		return _dekstop();
	}
	
	function _mobile() {
		const classX	= 'row-'+getObj.row;
		const dataTd	= getObj.objTd;
		
		let trSelected	= '';
		let trMark		= '';
		let action		= '';
		if (
		getObj.action === 'add' ||
		getObj.action === 'edit'
		) {
			trSelected	= 'my-tr-active';
			trMark		= 'tr-'+ getObj.action;
			action		= getObj.action;
		}
		
		let tr = '<tr class="my-tr my-tr-'+ classX +' '+ trMark +' '+ trSelected +'" ><td><div class="mobile-table-td">';
				
			$.map(dataTd, ( val ) => {
				tr += get_Td(val, action);
			}); 
			
			tr += '</div><td></tr>';
		
		return tr;
	} // mobile
	
	function _dekstop() {
		const classX	= 'row-'+getObj.row;
		const dataTd	= getObj.objTd;
		
		let trSelected	= '';
		let trMark		= '';
		let action		= '';
		if (
		getObj.action === 'add' ||
		getObj.action === 'edit'
		) {
			trSelected	= 'my-tr-active';
			trMark		= 'tr-'+ getObj.action;
			action		= getObj.action;
		}
		
		let tr = '<tr class="my-tr my-tr-'+ classX +' '+ trMark +' '+ trSelected +'" >';

			$.map(dataTd, ( val ) => {
				tr += get_Td(val, action);
			}); 
			
			tr += '</tr>';
		
		return tr;
	} // dekstop
}

function get_Td(getObj, action) {
	
	if (deviceType === 'mobile') {
		return _mobile();
	} else {
		return _dekstop();
	}
	
	function _mobile() {
		const tagId 	= getObj.tagId;
		const classX	= 'row-'+ getObj.row;
		const classY	= 'col-'+ getObj.col;
		const classXY	= getObj.row +'-'+ getObj.col;
		
		const baseLevel 	= $("#level-"+ tagId);
		const baseEl_Th_Box	= baseLevel.find(".my-table-head-box").eq(0);
		const label			= baseEl_Th_Box.find('.my-th-'+ classY +' .my-th-label').html();
		
		let td = '<div>error</div>';	
		if (getObj.type === 'FormTr') {	
			td = '<div class="my-td-'+ classXY +' my-td-'+ classY +'" valign="top">'+
					getObj.value+ // isinya input
				'</div>';
		} else if (getObj.type === 'checkboxAction') {	
			let cbSelected = '';
			if (action !== '') {
				cbSelected = 'checked';
			}
			
			td = '<div class="my-td-'+ classXY +'" valign="top">'+
					'<div class="td-sizer td-sizer-'+ classX +' td-sizer-'+ classY +'">'+
						'<input '+ cbSelected +' onclick="_select_Cb(this, `'+ tagId +'`)" class="my-td-cb my-td-cb-'+ classXY +' my-td-cb-'+ classY +'" type="checkbox" />'+
					'</div>'+
				'</div>';
		} else {		
			let value = '';
			if (getObj.type === 'seqNumber') {
				value = getObj.row;
			} else {
				value = replaceNull(getObj.value); // global
				$.map(getObj.valueConverter, ( valueConverter ) => {
					
					// global_funct
					let objOther = get_Td_objOther({
										'tagId': tagId,
										'valueConverter': valueConverter,
										'file_path': getObj['otherParam'].file_path
									});
					convert = get_Value_Converter(valueConverter, value, objOther);
					value 	= convert;
				});
			}

			let align = '';
			if (getObj.align === '') {
				align = 'left';
			} else {
				align = getObj.align;
			}
			
			let type = '';
			if (getObj.type === '') {
				type = 'text';
			} else {
				type = getObj.type;
			}
			
			let eventSelectedTr = '';
			if (globalData[tagId]['eventSelectedTr'] === true) {
				eventSelectedTr = 'onclick="_select_Tr(this, `'+ tagId +'`)"';
			}
			
			if (getObj.type === 'seqNumber') {
				align = 'left';
				// div
				td = '<div '+ eventSelectedTr +' class="my-td-'+ classXY +' my-td-'+ classY +'" valign="top">'+
						'<span class="col-label">'+ label +' &nbsp;</span>'+
						'<span class="td-sizer td-sizer-'+ classX +' td-sizer-'+ classY +'" >'+
							'<span class="my-td-textarea my-td-textarea-'+ classXY +' my-td-textarea-'+ classY +'" style="text-align: '+ align +';" readonly="readonly" >'+ 
								value+
							'</span>'+
						'</span>'+
						'<hr class="my-hr">'+
					'</div>';
			} else {
				// div
				let space = '';
				if (value === '') {
					space = '&nbsp;';
				} 
				td = '<div '+ eventSelectedTr +' class="my-td-'+ classXY +' my-td-'+ classY +'" valign="top">'+
						'<div class="col-label">'+ label +'</div>'+
						'<div class="td-sizer td-sizer-'+ classX +' td-sizer-'+ classY +'" >'+
							'<div class="my-td-textarea my-td-textarea-'+ classXY +' my-td-textarea-'+ classY +'" style="text-align: '+ align +';" readonly="readonly" >'+ 
								value+
							'</div>'+
						'</div>'+ space +
						'<hr class="my-hr">'+
					'</div>';
			}
		}
		
		return td;
	} // mobile
	
	function _dekstop() {
		const tagId 	= getObj.tagId;
		const classX	= 'row-'+ getObj.row;
		const classY	= 'col-'+ getObj.col;
		const classXY	= getObj.row +'-'+ getObj.col;
		
		let heightStyle = '';
		if (getObj.height === 0) {
			heightStyle = 'height: '+ tdHeightDefault +'px;';
		} else {
			heightStyle =  'height: '+ getObj.height +'px;';
		}
		
		let eventSelectedTr = '';
		if (globalData[tagId]['eventSelectedTr'] === true) {
			eventSelectedTr = 'onclick="_select_Tr(this, `'+ tagId +'`)"';
		}
		
		let td = '<td>error</td>';	
		if (getObj.type === 'FormTr') {	
			td = '<td class="my-td-'+ classXY +' my-td-'+ classY +'" valign="top">'+
					'<div class="td-sizer td-sizer-'+ classX +' td-sizer-'+ classY +'" style="width: '+ getObj.width +'px; '+ heightStyle +'">'+
						getObj.value+ // isinya input
					'</div>'+
				 '</td>';
		} else if (getObj.type === 'checkboxAction') {	
			let cbSelected = '';
			if (action !== '') {
				cbSelected = 'checked';
			}
			td = '<td class="my-td-'+ classXY +' my-td-'+ classY +'" valign="top" align="center">'+
					'<div onmouseover="_rowResize(this, `'+ tagId +'`, `'+ getObj.row +'`)" class="td-sizer td-sizer-'+ classX +' td-sizer-'+ classY +'" style="width: '+ getObj.width +'px; '+ heightStyle +'">'+
						'<input '+ cbSelected +' onclick="_select_Cb(this, `'+ tagId +'`)" class="my-td-cb my-td-cb-'+ classXY +' my-td-cb-'+ classY +'" type="checkbox" />'+
					'</div>'+
				 '</td>';
		} else {
			let value = '';
			if (getObj.type === 'seqNumber') {
				value = getObj.row;
			} else {				
				value = replaceNull(getObj.value); // global
				$.map(getObj.valueConverter, ( valueConverter ) => {
					
					// global_funct
					let objOther = get_Td_objOther({
										'tagId': tagId,
										'valueConverter': valueConverter,
										'file_path': getObj['otherParam'].file_path
									});
					convert = get_Value_Converter(valueConverter, value, objOther);
					value = convert;
				});
			}

			let align = '';
			if (getObj.align === '') {
				align = 'left';
			} else {
				align = getObj.align;
			}
			
			let type = '';
			if (getObj.type === '') {
				type = 'text';
			} else {
				type = getObj.type;
			}
		
			// textarea
			td = '<td '+ eventSelectedTr +' class="my-td-'+ classXY +' my-td-'+ classY +'" valign="top">'+
					'<div class="td-sizer td-sizer-'+ classX +' td-sizer-'+ classY +'" style="width: '+ getObj.width +'px; '+ heightStyle +'">'+
						'<div class="my-td-textarea my-td-textarea-'+ classXY +' my-td-textarea-'+ classY +'" style="padding: 3px; text-align: '+ align +';" readonly="readonly" >'+ 
							value+
						'</div>'+
					'</div>'+
				'</td>';

		}
		
		return td;
	} // dekstop
}
function _colResize(targetThis, tagId, col) {
	
	if (deviceType === 'mobile') {
		//_mobile();
	} else {
		_dekstop();
	}
	
	function _dekstop() {
		const baseLevel 	= $("#level-"+ tagId);
		const baseEl_Th_Box	= baseLevel.find(".my-table-head-box").eq(0);
		const baseEl_Tb_Box	= baseLevel.find(".my-table-data-box").eq(0);
		let thisHeight 		= $(targetThis).height();
		
		$(targetThis).resizable({
			'create': ( event, ui ) => {
				baseEl_Th_Box.find(".ui-resizable-e").attr({
					'style': 'z-index: 1; cursor: col-resize;'
					});
				baseEl_Th_Box.find(".ui-resizable-s").attr({
					'style': 'display: none;'
					});
				baseEl_Th_Box.find(".ui-resizable-se").attr({
					'style': 'display: none;'
					});
			},
			'resize': ( event, ui ) => {
				
				const current_tableWidth = baseEl_Th_Box.width();
				const current_tdWidth 	 = parseFloat(globalData[tagId]['tableProperty']['tdWidth'][col]);
				
				const tdBefore 		 	 = parseFloat(globalData[tagId]['tableProperty']['tdParamWidth'][(col-1)]);
				const tdAfter    	 	 = $(targetThis).width();
				const updateWidth_Fix 	 = (current_tableWidth-current_tdWidth)+tdAfter;
				
				if (tdBefore !== tdAfter) {
					
					// update globalData tableProperty
					globalData[tagId]['tableProperty']['tableWidth']   = updateWidth_Fix;
					globalData[tagId]['tableProperty']['tdWidth'][col] = tdAfter;
						
					baseEl_Th_Box.css("width", updateWidth_Fix); 
						baseEl_Th_Box.find(".th-sizer-col-"+ col).css("width", tdAfter);
					
					baseEl_Tb_Box.css("width", updateWidth_Fix); 
						baseEl_Tb_Box.find(".td-sizer-col-"+ col).css("width", tdAfter);
					
					
				}
				
			},
			'maxHeight': thisHeight,
			'minHeight': thisHeight
		});
	} // dekstop
}

function _rowResize(targetThis, tagId, row) {
	
	if (deviceType === 'mobile') {
		//_mobile();
	} else {
		_dekstop();
	}
	
	function _dekstop() {
		const baseLevel 	= $("#level-"+ tagId);
		const baseEl_Tb_Box	= baseLevel.find(".my-table-data-box").eq(0);
		
		$(targetThis).resizable({
			'create': ( event, ui ) => {
				baseEl_Tb_Box.find(".ui-resizable-s").attr({
					'style': 'z-index: 1; cursor: row-resize;'
					});
				baseEl_Tb_Box.find(".ui-resizable-e").attr({
					'style': 'display: none;'
					});
				baseEl_Tb_Box.find(".ui-resizable-se").attr({
					'style': 'display: none;'
					});
			},
			'resize': ( event, ui ) => {
				
				// all col in row
				baseEl_Tb_Box.find(".td-sizer-row-"+ row).css("height", $(targetThis).height());
					
			}
		});
	} // dekstop
}

function _th_Sort(tagId, field) {
	
	if (deviceType === 'mobile') {
		_mobile();
	} else {
		_dekstop();
	}
	
	function _dekstop() {
		const baseLevel 	= $("#level-"+ tagId);
		const baseEl 		= baseLevel.find(".my-table-head-box").eq(0);
		
		const defaultIcon = ''; //'<span class="glyphicon glyphicon-minus"></span>';
		const shortStatus = baseEl.find(".my-th-sort-icon-"+ field).attr("data");
		let sortIcon 	  = '';
		let newStatus 	  = ''
		
		if (shortStatus === '' || shortStatus === 'ASC') {
			// if null or ASC do DESC
			sortIcon = '<span class="glyphicon glyphicon-sort-by-attributes"></span>';
			newStatus = 'DESC';
		} else {
			// if DESC do ASC 
			sortIcon = '<span class="glyphicon glyphicon-sort-by-attributes-alt"></span>';
			newStatus = 'ASC';
		}

		// update global data short
		globalData[tagId]['dataSort'] = {}
		globalData[tagId]['dataSort'][field] = newStatus;
		
		// reset all short
		baseEl.find(".my-thead .my-th-sort-icon").html(defaultIcon);
		baseEl.find(".my-thead .my-th-sort-icon-"+ field).attr("data", "");
		// apply new short
		baseEl.find(".my-thead .my-th-sort-icon-"+ field).attr("data", newStatus);
		baseEl.find(".my-thead .my-th-sort-icon-"+ field).html(sortIcon);
	} // dekstop
}

function _apply_Th_Sort(tagId) {
	
	if (deviceType === 'mobile') {
		//_mobile();
	} else {
		_dekstop();
	}
	
	function _dekstop() {
		const baseLevel 	= $("#level-"+ tagId);
		const baseEl 		= baseLevel.find(".my-table-head-box").eq(0);
		
		const dataSort = globalData[tagId].dataSort;
		let sortIcon 	= '';
		$.map(dataSort, (value, index) => {
			if (value === 'ASC') {
				sortIcon = '<span class="glyphicon glyphicon-sort-by-attributes"></span>';
			} else {
				sortIcon = '<span class="glyphicon glyphicon-sort-by-attributes-alt"></span>';
			}
			
			baseEl.find(".my-thead .my-th-sort-icon-"+ index).attr("data", value);
			baseEl.find(".my-thead .my-th-sort-icon-"+ index).html(sortIcon);
		}); // map
	} // dekstop
}

function _apply_Th_Filter(tagId, tableField) {
	
	if (deviceType === 'mobile') {
		//_mobile();
	} else {
		_dekstop();
	}
	
	function _dekstop() {
		const baseLevel 	= $("#level-"+ tagId);
		const baseEl 		= baseLevel.find(".my-thead").eq(0);
		
		const dataFilter = globalData[tagId].dataFilter;
		let sortIcon 	= '';
		$.map(dataFilter, (value, index) => {
			if (value === 'ASC') {
				sortIcon = '<span class="glyphicon glyphicon-sort-by-attributes"></span>';
			} else {
				sortIcon = '<span class="glyphicon glyphicon-sort-by-attributes-alt"></span>';
			}
			
			baseEl.find(".my-th-sort-icon-"+ index).attr("data", value);
			baseEl.find(".my-th-sort-icon-"+ index).html(sortIcon);
		}); // map
	} // dekstop
}

function _table_Width(getObj) {
	
	if (deviceType === 'mobile') {
		//_mobile();
	} else {
		_dekstop();
	}
	
	function _dekstop() {
		const tagId 		 = getObj.tagId;
		const tableHead 	 = getObj.tableHead;
		const baseLevel 	 = $("#level-"+ tagId);
		const baseEl_Cont	 = baseLevel.find(".my-table-container").eq(0);
		const baseEl_Th_Box	 = baseLevel.find(".my-table-head-box").eq(0);
		const baseEl_Tb_Box	 = baseLevel.find(".my-table-data-box").eq(0);
		
		baseEl_Th_Box.find(".my-table-head").eq(0).css('z-index', 1);
		baseEl_Th_Box.find(".my-table-head").eq(1).css('z-index', 0);
		
		// update global data 
		if (globalData[tagId]['tableProperty'].containerWidth === 0) {
			const contWidth = baseEl_Cont.width();
				globalData[tagId]['tableProperty']['containerWidth'] = contWidth;
		}
		const newContWidth = globalData[tagId]['tableProperty'].containerWidth;
		
		if (globalData[tagId]['tableProperty'].tableWidth === 0) {
			const countWidth_Tbl  = ((getObj.tableWidth/100)*newContWidth);
				globalData[tagId]['tableProperty']['tableWidth'] = countWidth_Tbl;
		}
		const tableWidth = globalData[tagId]['tableProperty'].tableWidth;
		
		baseEl_Th_Box.css({
			'width': tableWidth +'px'
			});
		baseEl_Tb_Box.css({
			'width': tableWidth +'px'
			});
			
		$.map(tableHead, ( val, y ) => {
			
			// update globalData tableProperty
			if (typeof globalData[tagId]['tableProperty']['tdWidth'][y] === 'undefined') {
				// set default td width
				const widthStyle = ((val.width/100)*(newContWidth-18));
					globalData[tagId]['tableProperty']['tdWidth'][y] = widthStyle;
					globalData[tagId]['tableProperty']['tdParamWidth'][y] = widthStyle;
			}
			
			const tdWidth = globalData[tagId]['tableProperty']['tdWidth'][y];
			
			baseEl_Th_Box.find(".th-sizer-col-"+ y).css("width", tdWidth +"px");
			baseEl_Tb_Box.find(".td-sizer-col-"+ y).css("width", tdWidth +"px");
			
		});	
	} // dekstop
	
} // _table_Width

function _table_Height(getObj) {
	
	if (deviceType === 'mobile') {
		_mobile();
	} else {
		_dekstop();
	}
	
	function _mobile() {
		const tagId			= getObj.tagId;
		const tdHeight		= getObj.tdHeight;
		const numrowpage	= getObj.numrowpage;
	
		let dataLevelRow 	= 0;
		if (typeof globalData[tagId].dataLevelRow === 'undefined') {
			dataLevelRow 	= 0;
		} else {
			dataLevelRow 	= parseInt(globalData[tagId].dataLevelRow);
		}
		
		const baseLevel 	= $("#level-"+ tagId);
		const myContent 	= baseLevel.find(".my-content").eq(0);
		const myContent_Pad	= parseFloat(myContent.css("padding"))*2;
		const baseEl_Tb_Box	= baseLevel.find(".my-table-data-box").eq(0);
		const tableHeight 	= (numrowpage*tdHeight);
		
		let tableBoxHeight 	= ((parseFloat(myContent.css("max-height"))-myContent_Pad)-40)+28; // 40 scrollbar x, 28 table-head
		
		if (dataLevelRow == 0) {
			baseEl_Tb_Box.css("height", tableBoxHeight +"px");
		} 
		
		// scroll position bottom
		/*
		let tbodyHeight = baseLevel.find(".my-table-data-box").eq(0).find(".my-table-data").eq(0).height();
			baseEl_Tb_Box.scrollTop(tbodyHeight);
		*/
	}
	
	function _dekstop() {	
		const tagId			= getObj.tagId;
		const tdHeight		= getObj.tdHeight;
		const numrowpage	= getObj.numrowpage;
	
		let dataLevelRow 	= 0;
		if (typeof globalData[tagId].dataLevelRow === 'undefined') {
			dataLevelRow 	= 0;
		} else {
			dataLevelRow 	= parseInt(globalData[tagId].dataLevelRow);
		}
		
		const baseLevel 	= $("#level-"+ tagId);
		const myContent 	= baseLevel.find(".my-content").eq(0);
		const myContent_Pad	= parseFloat(myContent.css("padding"))*2;
		const baseEl_Tb_Box	= baseLevel.find(".my-table-data-box").eq(0);
		const tableHeight 	= (numrowpage*tdHeight);
		
		let tableBoxHeight 	= ((parseFloat(myContent.css("max-height"))-myContent_Pad)-40); // 40 scrollbar x
		
		if (dataLevelRow == 0) {
			baseEl_Tb_Box.css("height", tableBoxHeight +"px");
			
			baseEl_Tb_Box.find(".my-table-data-box-freeze").css({
				'z-index': 1,
				'height': tableBoxHeight +'px'
				});
				
		} else {
			let fix_tableBoxHeight = 0
			if (tableHeight < tableBoxHeight) {
				fix_tableBoxHeight = (tableHeight+7);
			} else {
				fix_tableBoxHeight = tableBoxHeight;
			}	
			
			baseEl_Tb_Box.css("height", fix_tableBoxHeight +"px");
			
			baseEl_Tb_Box.find(".my-table-data-box-freeze").css({
				'z-index': 1,
				'height': fix_tableBoxHeight +'px'
				});
		}
		
		baseEl_Tb_Box.find(".my-table-data").eq(1).css('z-index', 0);
		
		// scroll position bottom
		/*
		let tbodyHeight = baseLevel.find(".my-table-data-box").eq(0).find(".my-table-data").eq(1).height();
			baseEl_Tb_Box.scrollTop(tbodyHeight);
			*/
	} // dekstop
}

function _scroll_Freeze(targetThis, tagId) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl 		= baseLevel.find(".my-table-data-box-freeze").eq(0);
	
	$(baseEl).scrollTop($(targetThis).scrollTop());
}

function _reset_Cb_All(tagId) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl_Th_Box	= baseLevel.find(".my-table-head-box").eq(0);
	const baseEl_Tb_Box	= baseLevel.find(".my-table-data-box").eq(0);
	
	baseEl_Th_Box.find(".my-thead .my-th-cb-col-0").prop("checked", false); // cb all row
	baseEl_Tb_Box.find(".my-tbody .my-tr .my-td-cb-col-0").prop("checked", false); 
	baseEl_Tb_Box.find(".my-tbody .my-tr").removeClass("my-tr-active");
	
		set_Num_Selected(tagId, 0); 
		
	// enable/disable button edit & delete
	const num_selected = parseInt(get_Num_Selected(tagId));
	//components/table 
	_bottom_Right_Panel_Btn_Handler(tagId, num_selected);
}

function _select_Cb_All(tagId) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl_Th_Box	= baseLevel.find(".my-table-head-box").eq(0);
	const baseEl_Tb_Box	= baseLevel.find(".my-table-data-box").eq(0);
		
	const statusCb 	 	= baseEl_Th_Box.find(".my-thead").eq(0).find(".my-th-cb-col-0").prop("checked");
	
	if (statusCb === true) {
		baseEl_Tb_Box.find(".my-tbody").eq(0).find(".my-tr .my-td-cb-col-0").prop("checked", true); // cb all row
		baseEl_Tb_Box.find(".my-tbody .my-tr").addClass("my-tr-active");
		
		set_Num_Selected(tagId, baseEl_Tb_Box.find(".my-tbody").eq(0).find(".my-tr .my-td-cb-col-0").length);
	} else {
		baseEl_Tb_Box.find(".my-tbody").eq(0).find(".my-tr .my-td-cb-col-0").prop("checked", false); // cb all row
		baseEl_Tb_Box.find(".my-tbody .my-tr").removeClass("my-tr-active");
		
		set_Num_Selected(tagId, 0); 
	}

	// enable/disable button edit & delete
	const num_selected = parseInt(get_Num_Selected(tagId)); // components/topbar
	//components/table
	_bottom_Right_Panel_Btn_Handler(tagId, num_selected);
}

function _select_Cb(targetThis, tagId) {
	
	if (deviceType === 'mobile') {
		_mobile();
	} else {
		_dekstop();
	}
	
	function _mobile() {
		const baseLevel 	= $("#level-"+ tagId);
		const baseEl_Th_Box	= baseLevel.find(".my-table-head-box").eq(0);
		const baseEl_Tb_Box	= baseLevel.find(".my-table-data-box").eq(0);
		
		const baseEl_Tr		= $(targetThis).parents("tr");
		const getClass 		= baseEl_Tr.attr("class");
		const arrClass		= getClass.split(" ");
		
		const selectCount	= get_Num_Selected(tagId); // components/topbar
		const numrowpage	= globalData[tagId]['dataPaging'].numrowpage;
		let newSelectCount	= 0;
		
		// tbody 
		// arrClass[1] = 'my-tr-'+ classX
		const baseEl_Tr_0	= baseEl_Tb_Box.find(".my-tbody").eq(0).find("."+ arrClass[1]);
		
		const statusCb 		= $(targetThis).prop("checked");
		const indexCb		= baseEl_Tb_Box.find(".my-tbody").eq(0).indexOf(targetThis);
		
		if (statusCb === true) {
			
			baseEl_Tr_0.addClass("my-tr-active");
			
			// update globalData selectedCb
			//globalData[tagId]['selectedCb'].push
			
			newSelectCount = (selectCount+1);
			
			
		} else {
			
			baseEl_Tr_0.removeClass("my-tr-active");
			
			newSelectCount = (selectCount-1);
		}
		
		// components/topbar
		set_Num_Selected(tagId, newSelectCount);
		//components/table
		_bottom_Right_Panel_Btn_Handler(tagId, newSelectCount);
	} // mobile
	
	function _dekstop() {
		const baseLevel 	= $("#level-"+ tagId);
		const baseEl_Th_Box	= baseLevel.find(".my-table-head-box").eq(0);
		const baseEl_Tb_Box	= baseLevel.find(".my-table-data-box").eq(0);
		
		const baseEl_Tr		= $(targetThis).parents("tr");
		const getClass 		= baseEl_Tr.attr("class");
		const arrClass		= getClass.split(" ");
		
		const selectCount	= get_Num_Selected(tagId); // components/topbar
		const numrowpage	= globalData[tagId]['dataPaging'].numrowpage;
		let newSelectCount	= 0;
		
		// tbody 
		// arrClass[1] = 'my-tr-'+ classX
		const baseEl_Tr_0	= baseEl_Tb_Box.find(".my-tbody").eq(0).find("."+ arrClass[1]);
		const baseEl_Tr_1	= baseEl_Tb_Box.find(".my-tbody").eq(1).find("."+ arrClass[1]);
		
		const statusCb 		= $(targetThis).prop("checked");
		const allCb 		= baseEl_Tb_Box.find(".my-tbody").eq(0).find(".my-tr .my-td-cb-col-0");
		
		if (statusCb === true) {
			
			baseEl_Tr_0.addClass("my-tr-active");
			baseEl_Tr_1.addClass("my-tr-active");
				
			newSelectCount = (selectCount+1);
		} else {
			
			baseEl_Tr_0.removeClass("my-tr-active");
			baseEl_Tr_1.removeClass("my-tr-active");
			
			newSelectCount = (selectCount-1);
		}
		
		// jika jumlah td yang di ceklis dalam q page sama dengan jumlah per page
		if (parseInt(newSelectCount) === parseInt(numrowpage)) {
			baseEl_Th_Box.find(".my-thead").eq(0)
				.find(".my-th-cb-col-0").prop("checked", true);
		} else {
			baseEl_Th_Box.find(".my-thead").eq(0)
				.find(".my-th-cb-col-0").prop("checked", false);
		}

		// components/topbar
		set_Num_Selected(tagId, newSelectCount);
		//components/table
		_bottom_Right_Panel_Btn_Handler(tagId, newSelectCount);
	} // dekstop
}

function _select_Tr(targetThis, tagId) {
	
	//note get class  $(targetThis).parents("tr").attr("class").split(/\s+/)[1];
	
	if (deviceType === 'mobile') {
		_mobile();
	} else {
		_dekstop();
	}
	function _mobile() {
		const baseLevel 	= $("#level-"+ tagId);
		const baseEl_Th_Box	= baseLevel.find(".my-table-head-box").eq(0);
		const baseEl_Tb_Box	= baseLevel.find(".my-table-data-box").eq(0);
		
		const baseEl_Tr		= $(targetThis).parents("tr");
		const getClass 		= baseEl_Tr.attr("class");
		const arrClass		= getClass.split(" ");
		
		const selectCount	= get_Num_Selected(tagId); // components/topbar
		const numrowpage	= globalData[tagId]['dataPaging'].numrowpage;
		let newSelectCount	= 0;
		
		// tbody 
		const baseEl_Tr_0	= baseEl_Tb_Box.find(".my-tbody").eq(0).find("."+ arrClass[1]);
		const baseEl_Cb_0	= baseEl_Tr_0.find(".my-td-cb").eq(0);
		const statusCb 		= baseEl_Cb_0.prop("checked");
		
		if (statusCb === false) {
			baseEl_Cb_0.prop("checked", true);
			baseEl_Tr_0.addClass("my-tr-active");
			
			newSelectCount = (selectCount+1);
		} else {
			baseEl_Cb_0.prop("checked", false);
			baseEl_Tr_0.removeClass("my-tr-active");
				
			newSelectCount = (selectCount-1);
		}
		
		// components/topbar
		set_Num_Selected(tagId, newSelectCount);
		//components/table
		_bottom_Right_Panel_Btn_Handler(tagId, newSelectCount);
	} // mobile
	
	function _dekstop() {
		const baseLevel 	= $("#level-"+ tagId);
		const baseEl_Th_Box	= baseLevel.find(".my-table-head-box").eq(0);
		const baseEl_Tb_Box	= baseLevel.find(".my-table-data-box").eq(0);
		
		const baseEl_Tr		= $(targetThis).parents("tr");
		const getClass 		= baseEl_Tr.attr("class");
		const arrClass		= getClass.split(" ");
		
		const selectCount	= get_Num_Selected(tagId); // components/topbar
		const numrowpage	= globalData[tagId]['dataPaging'].numrowpage;
		let newSelectCount	= 0;
		
		// tbody 
		const baseEl_Tr_0	= baseEl_Tb_Box.find(".my-tbody").eq(0).find("."+ arrClass[1]);
		const baseEl_Tr_1	= baseEl_Tb_Box.find(".my-tbody").eq(1).find("."+ arrClass[1]);
		
		const baseEl_Cb_0	= baseEl_Tr_0.find(".my-td-cb").eq(0);
		const statusCb 		= baseEl_Cb_0.prop("checked");
		
		if (statusCb === false) {
			baseEl_Cb_0.prop("checked", true);
			baseEl_Tr_0.addClass("my-tr-active");
			baseEl_Tr_1.addClass("my-tr-active");
			
			newSelectCount = (selectCount+1);
		} else {
			baseEl_Cb_0.prop("checked", false);
			baseEl_Tr_0.removeClass("my-tr-active");
			baseEl_Tr_1.removeClass("my-tr-active");
				
			newSelectCount = (selectCount-1);
		}
		
		// jika jumlah td yang di ceklis dalam q page sama dengan jumlah per page
		if (parseInt(newSelectCount) === parseInt(numrowpage)) {
			baseEl_Th_Box.find(".my-thead").eq(0)
				.find(".my-th-cb-col-0").prop("checked", true); // cb all row
		} else {
			baseEl_Th_Box.find(".my-thead").eq(0)
				.find(".my-th-cb-col-0").prop("checked", false); // cb all row
		}

		// components/topbar
		set_Num_Selected(tagId, newSelectCount);
		//components/table
		_bottom_Right_Panel_Btn_Handler(tagId, newSelectCount);
	} // dekstop
}
function _select_Tr_After_Add(getObj) {
	
	const tagId		= getObj['tagId'];
	const indexTr 	= getObj['indexTr'];
	const baseLevel = $("#level-"+ tagId);
	
    // selected cb                              
	baseLevel.find(".my-tbody").eq(0).find(".my-tr .my-td-cb-col-0")
		.eq(indexTr).prop("checked", true);
	// selected tr
	baseLevel.find(".my-tbody").eq(0).find(".my-tr")
		.eq(indexTr).addClass("my-tr-active");
	
	if (deviceType === 'dekstop') {
		baseLevel.find(".my-tbody").eq(1).find(".my-tr")
			.eq(indexTr).addClass("my-tr-active");
	}
}

function set_Right_Panel_Bottom(getObj) {

	let class_detail 	= 'my-hide';
	let event_detail	= '';
	let class_add		= 'my-hide';
	let event_add		= '';
	let class_edit		= 'my-hide';
	let event_edit		= '';
	let class_export	= 'my-hide';
	let event_export	= '';
	let class_import	= 'my-hide';
	let event_import	= '';
	let class_import_f	= 'my-hide';
	let event_import_f	= '';
	let class_delete	= 'my-hide';
	let event_delete	= '';

	if (getObj.btnDetail === 1) {
		class_detail 	= 'my-block';
		event_detail	= getObj.eventDetail;
	}
	if (getObj.btnAdd === 1) {
		class_add		= 'my-block';
		event_add		= getObj.eventAdd;
	}
	if (getObj.btnEdit === 1) {
		class_edit		= 'my-block';
		event_edit		= getObj.eventEdit;
	}
	if (getObj.btnExport === 1) {
		class_export	= 'my-block';
		event_export	= getObj.eventExport;
	}
	if (getObj.btnImport === 1) {
		class_import	= 'my-block';
		event_import	= getObj.eventImport;
	}
	if (getObj.btnImport_Format === 1) {
		class_import_f	= 'my-block';
		event_import_f	= getObj.eventImport_Format;
	}
	if (getObj.btnDelete === 1) {
		class_delete	= 'my-block';
		event_delete	= getObj.eventDelete;
	}
	
	let btn_status = '';
	if (
	class_detail === 'my-hide' && 
	class_add === 'my-hide' && 
	class_edit === 'my-hide' && 
	class_export === 'my-hide' && 
	class_import === 'my-hide' && 
	class_import_f === 'my-hide' && 
	class_delete === 'my-hide'
	) {
		btn_status = 'my-hide';
	}
	
	/*
	mark-bottom-toolbar
		parameter append button add formTr & action status 
	*/
	const result ='<div class="my-footer-action-box '+ btn_status +'">'+
				'<span class="btn-group" role="toolbar">'+
				
					'<div class="toolbar-divider btn btn-default btn-sm btn-group">&nbsp;</div>'+ // pembatas
					
					// button save formTr
					'<div class="btn-group formtr-button-box my-hide">'+
						'<button '+getObj.eventSave_All+' class="btn btn-default btn-sm bottom-action-add-tr" disable>'+
							'<span class="glyphicon glyphicon-floppy-disk"></span><span class="dekstop-label"> Save</span>'+
						'</button>'+
					'</div>'+
					
					'<div class="btn-group '+ class_detail +'">'+
						'<button '+ event_detail +' class="btn btn-default btn-sm bottom-action-detail" disabled>'+
							'<span class="glyphicon glyphicon-list-alt"></span><span class="dekstop-label"> Detail</span>'+
						'</button>'+
					'</div>'+
					'<div class="btn-group '+ class_add +'">'+
						'<button '+ event_add +' class="btn btn-default btn-sm bottom-action-add">'+
							'<span class="glyphicon glyphicon-plus"></span><span class="dekstop-label"> Add</span>'+
						'</button>'+													
					'</div>'+
					'<div class="btn-group '+ class_edit +'">'+
						'<button '+ event_edit +' onclick="" class="btn btn-default btn-sm bottom-action-edit" disabled>'+
							'<span class="glyphicon glyphicon-pencil"></span><span class="dekstop-label"> Edit</span>'+
						'</button>'+							
					'</div>'+
					'<div class="btn-group '+ class_export +'">'+
						'<button '+ event_export +' onclick="" class="btn btn-default btn-sm bottom-action-export">'+
							'<span class="glyphicon glyphicon-download"></span><span class="dekstop-label"> Export</span>'+
						'</button>'+							
					'</div>'+
					'<div class="btn-group '+ class_import +'">'+
						'<button '+ event_import +' onclick="" class="btn btn-default btn-sm bottom-action-import">'+
							'<span class="glyphicon glyphicon-upload"></span><span class="dekstop-label"> Import</span>'+
						'</button>'+							
					'</div>'+
					'<div class="btn-group '+ class_import_f +'">'+
						'<button '+ event_import_f +' onclick="" class="btn btn-default btn-sm bottom-action-import_format">'+
							'<span class="glyphicon glyphicon-download"></span><span class="dekstop-label"> Format</span>'+
						'</button>'+							
					'</div>'+
					'<div class="btn-group '+ class_delete +'">'+
						'<button '+ event_delete +' class="btn btn-default btn-sm bottom-action-delete" disabled>'+
							'<span class="glyphicon glyphicon-trash"></span><span class="dekstop-label"> Delete</span>'+
						'</button>'+
					'</div>'+					
					'<div class="toolbar-divider btn btn-default btn-sm btn-group">&nbsp;</div>'+ // pembatas
				'</span>'+
				'</div>';
				
	const baseLevel 	= $("#level-"+ getObj.tagId);
	baseLevel.find(".my-footer").eq(0)
		.find(".panel-bottom-right").html(result);
}

function _bottom_Right_Panel_Btn_Handler(tagId, selectedCount) {

	const baseLevel 	= $("#level-"+ tagId);
	const baseEl 		= baseLevel.find(".my-footer").eq(0);
	
	// enable/disable button edit & delete
	if (selectedCount > 0) {
		if (baseEl.find(".bottom-action-detail").prop("disabled") === true) {
			baseEl.find(".bottom-action-detail").prop("disabled", false); 
		}
		if (baseEl.find(".bottom-action-edit").prop("disabled") === true) {
			baseEl.find(".bottom-action-edit").prop("disabled", false); 
		}
		if (baseEl.find(".bottom-action-delete").prop("disabled") === true) {
			baseEl.find(".bottom-action-delete").prop("disabled", false); 
		}
	} else {
		if (baseEl.find(".bottom-action-detail").prop("disabled") === false) {
			baseEl.find(".bottom-action-detail").prop("disabled", true); 
		}
		if (baseEl.find(".bottom-action-edit").prop("disabled") === false) {
			baseEl.find(".bottom-action-edit").prop("disabled", true); 
		}
		if (baseEl.find(".bottom-action-delete").prop("disabled") === false) {
			baseEl.find(".bottom-action-delete").prop("disabled", true); 
		}
	}
}

function _show_FormTr_Button(tagId) {
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl 		= baseLevel.find(".my-footer").eq(0);
	
	baseEl.find(".formtr-button-box").removeClass("my-hide");
	baseEl.find(".bottom-action-add-tr").prop("disabled", true); 
}





