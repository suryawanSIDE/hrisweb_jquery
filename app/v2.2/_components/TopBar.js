function set_TopBar(getObj) {
	
	const tagId = getObj.tagId;
	
	if (getObj.level === 0 && getObj.loadMethode === 1) {  // note in global
		if (globalData[tagId]['prevMark'] === 0) {
			_handle_Navbar(tagId);
			_set_active_NavBar(tagId);
		}
	}
	
	const baseLevel = $("#level-"+ tagId);
	baseLevel.find(".my-topbar").eq(0).html(get_TopBar(getObj));
}

function get_TopBar(getObj) {
	
	const tagId 	= getObj.tagId;
	let displayRow	= 0;
	if (globalData.hasOwnProperty(tagId) === false) {
		displayRow  = showRowDefault;
	} else {
		displayRow	= globalData[tagId]['dataPaging'].display_row;
	}
	
	let freezeButton = '';
	if (deviceType === 'dekstop') {
		freezeButton = '<div class="btn-group">'+
							'<button onclick="set_Popup_FreezeCol(`'+ tagId +'`)" class="btn btn-default btn-xs">'+
								'<span class="glyphicon glyphicon-indent-left"></span>&nbsp;<span class="dekstop-label">Freeze: </span><span class="my-value-freezecol dynamic-label">'+ globalData[tagId]['tableProperty']['tableFreeze'] +'</span>'+
							'</button>'+
							'<div class="my-container-freezecol my-hide"></div>'+
						'</div>'
	} 
	
	let toggle 		= '';
	let toggle_tools= '';
	let panel_right = '';
	let panel_tools = '';
	
	if (getObj.loadMethode === 1 && getObj.level === 0 ) {
		// hanya di load pada parent 1 kali
		toggle = '<button onclick="_handle_Navbar(`'+ tagId +'`)" class="my-navtoogle btn btn-default btn-sm" data-toggle="tooltip" data-placement="bottom" title="Open navigate"><span class="glyphicon glyphicon-tasks"></span></button>';
	}
	
	if (deviceType === 'dekstop' && getObj.rightPanel === 1) {
		toggle_tools = '<button onclick="_handle_Topbar_Panel(`'+ tagId +'`, this)" class="my-btn-topbar-panel-toogle btn btn-default btn-sm btn-group" data-toggle="tooltip" data-placement="bottom" title="Open tools"><span class="my-toggle-icon glyphicon glyphicon-menu-up"></span></button></button>';
	}
	
	if (getObj.loadMethode === 1 && getObj.rightPanel === 1) {
		panel_right = 
				'<div class="my-topbar-right-inner">'+
					'<span class="btn-group">'+
						'<div class="toolbar-divider btn btn-default btn-sm btn-group">&nbsp;</div>'+ // pembatas
						
						'<div class="btn-group">'+
							'<span class="btn-info-table-data-dekstop btn btn-default btn-sm">'+
								'<span class="">All: </span><span class="my-value-numrow dynamic-label">0</span>&nbsp;|&nbsp;'+
								'<span class="">/Pg: </span><span class="my-value-numrowpage dynamic-label">0</span>&nbsp;|&nbsp;'+
								'<span class="">Selected: </span><span class="my-value-numselected dynamic-label">0</span>'+
							'</span>'+
						'</div>'+
						
						'<button onclick="Refresh_Content(`'+ tagId +'`)" class="my-btn-refresh btn btn-default btn-sm btn-group" data-toggle="tooltip" data-placement="bottom" title="Reload content"><span class="glyphicon glyphicon-repeat"></span></button></button>'+
						'<div class="toolbar-divider btn btn-default btn-sm btn-group">&nbsp;</div>'+ // pembatas
					'</span>' + // btn-toolbar
				'</div>' + // my-topbar-right-inner
				
				// mobile toogle
				'<button onclick="set_Topbar_Tool_Mob(`'+ tagId +'`, this)" class="btn btn-default btn-sm my-panel-right-toggle"><span class="my-toggle-icon-mob glyphicon glyphicon-cog toggle-inactive"></span></button>'; // toogle panel right
				
		panel_tools = 
					'<div class="my-container-toolbar-collapse-inner my-hide">'+	
					
					'<span class="btn-group toolbar-group btn-action-table-data">'+
						// disini akan terisi btn action
					'</span>'+
					
					'<span class="btn-group toolbar-group btn-filter-table-data">'+
						'<div class="toolbar-divider btn btn-default btn-xs btn-group">&nbsp;</div>'+ // pembatas
							
							'<div class="btn-filter-box btn-group my-hide">'+
								'<button onclick="set_Panel_Filter(`'+ tagId +'`)" class="btn-filter btn btn-default btn-xs" data-toggle="tooltip" data-placement="bottom" title="Show panel filter">'+
									'<span class="glyphicon glyphicon-filter"></span>'+
								'</button>'+													
							'</div>'+
							
							'<div class="btn-search-box btn-group my-hide">'+
								'<button onclick="set_Popup_Search(`'+ tagId +'`)" class="btn-search btn btn-default btn-xs" data-toggle="tooltip" data-placement="bottom" title="Show panel search">'+
									'<span class="glyphicon glyphicon-search"></span>'+
								'</button>'+							
							'</div>'+
							
							freezeButton+
							
							'<div class="btn-group">'+
								'<button onclick="set_Popup_ShowRow(`'+ tagId +'`)" class="btn btn-default btn-xs">'+
									'<span class="glyphicon glyphicon-resize-vertical"></span>&nbsp;<span class="dekstop-label">Show: </span><span class="my-value-showrow dynamic-label">'+ displayRow +'</span>'+
								'</button>'+
								'<div class="my-container-showrow my-hide"></div>'+
							'</div>'+
						
						'<div class="toolbar-divider btn btn-default btn-xs btn-group">&nbsp;</div>'+ // pembatas
					'</span>'+
					
					'<span class="btn-group toolbar-group btn-paging-table-data">'+
						// disini akan terisi paging
					'</span>'+
					
					'<span class="toolbar-group btn-info-table-data-mobile my-hide">'+
						// disini akan terisi btn info pada versi mobile
					'</span>'+
					
				 '</div>'; // my-container-toolbar-collapse-inner
				 
	}
	
	const result = '<div class="my-topbar-inner">'+		
				 	'<div class="my-topbar-left">'+
						toggle + toggle_tools +
						'<span class="my-titlebar">'+ getObj.titleBar +'</span>'+
					'</div>'+  // my-topbar-left
						
					'<div class="my-topbar-right">'+ 
						panel_right +		
					'</div>'+
						
					// hidden container
					// dekstop
					'<div class="my-container-search"></div>'+
					'<div class="my-container-filter"></div>'+
				'</div>'+ // my-topbar-inner
				 
				 '<div class="my-container-toolbar-collapse">'+
					panel_tools
				 '</div>';
				
	return result;
}

function _handle_Navbar(tagId) {
	
	const navStatus = $("#my-navbox").hasClass("my-block");
	if (navStatus === false) {
		globalData[tagId]['prevMark'] = 0;
		$("#my-navbox").removeClass("my-hide");
		$("#my-navbox").addClass("my-block");
	} else {
		$("#my-navbox").removeClass("my-block");
		$("#my-navbox").addClass("my-hide");
	}
}

function _set_active_NavBar(tagId) {
	
	$(".my-navli-a").removeClass("my-navli-a-active");
	$("#nav-li-a-"+ tagId).addClass("my-navli-a-active");
}

function _handle_Topbar_Panel(tagId, targetThis) {
	
	const baseLevel  = $("#level-"+ tagId);
	const icon 		 = $(targetThis).find(".my-toggle-icon");
	const btn_status = icon.hasClass("glyphicon-menu-up");
	
	if (btn_status === true) {
		$(targetThis).find(".my-toggle-icon").removeClass("glyphicon-menu-up");
		$(targetThis).find(".my-toggle-icon").addClass("glyphicon-menu-down");
		
		baseLevel.find(".my-topbar").eq(0)
			.find(".my-container-toolbar-collapse-inner").removeClass("my-hide");
		baseLevel.find(".my-topbar").eq(0)
			.find(".my-container-toolbar-collapse-inner").addClass("my-block");
			
	} else {
		$(targetThis).find(".my-toggle-icon").removeClass("glyphicon-menu-down");
		$(targetThis).find(".my-toggle-icon").addClass("glyphicon-menu-up");
		
		baseLevel.find(".my-topbar").eq(0)
			.find(".my-container-toolbar-collapse-inner").removeClass("my-block");
		baseLevel.find(".my-topbar").eq(0)
			.find(".my-container-toolbar-collapse-inner").addClass("my-hide");
	}
}

function set_Btn_Action_DataTable(getObj) {

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
				
					'<div class="toolbar-divider btn btn-default btn-xs btn-group">&nbsp;</div>'+ // pembatas
					
					// button save formTr
					'<div class="btn-group formtr-button-box my-hide">'+
						'<button '+getObj.eventSave_All+' class="btn btn-default btn-xs bottom-action-add-tr" disable>'+
							'<span class="glyphicon glyphicon-floppy-disk"></span><span class="dekstop-label"> Save</span>'+
						'</button>'+
					'</div>'+
					
					'<div class="btn-group '+ class_detail +'">'+
						'<button '+ event_detail +' class="btn btn-default btn-xs bottom-action-detail" disabled>'+
							'<span class="glyphicon glyphicon-list-alt"></span><span class="dekstop-label"> Detail</span>'+
						'</button>'+
					'</div>'+
					'<div class="btn-group '+ class_add +'">'+
						'<button '+ event_add +' class="btn btn-default btn-xs bottom-action-add">'+
							'<span class="glyphicon glyphicon-plus"></span><span class="dekstop-label"> Add</span>'+
						'</button>'+													
					'</div>'+
					'<div class="btn-group '+ class_edit +'">'+
						'<button '+ event_edit +' onclick="" class="btn btn-default btn-xs bottom-action-edit" disabled>'+
							'<span class="glyphicon glyphicon-pencil"></span><span class="dekstop-label"> Edit</span>'+
						'</button>'+							
					'</div>'+
					'<div class="btn-group '+ class_export +'">'+
						'<button '+ event_export +' onclick="" class="btn btn-default btn-xs bottom-action-export">'+
							'<span class="glyphicon glyphicon-download"></span><span class="dekstop-label"> Export</span>'+
						'</button>'+							
					'</div>'+
					'<div class="btn-group '+ class_import +'">'+
						'<button '+ event_import +' onclick="" class="btn btn-default btn-xs bottom-action-import">'+
							'<span class="glyphicon glyphicon-upload"></span><span class="dekstop-label"> Import</span>'+
						'</button>'+							
					'</div>'+
					'<div class="btn-group '+ class_import_f +'">'+
						'<button '+ event_import_f +' onclick="" class="btn btn-default btn-xs bottom-action-import_format">'+
							'<span class="glyphicon glyphicon-download"></span><span class="dekstop-label"> Format</span>'+
						'</button>'+							
					'</div>'+
					'<div class="btn-group '+ class_delete +'">'+
						'<button '+ event_delete +' class="btn btn-default btn-xs bottom-action-delete" disabled>'+
							'<span class="glyphicon glyphicon-trash"></span><span class="dekstop-label"> Delete</span>'+
						'</button>'+
					'</div>'+					
					'<div class="toolbar-divider btn btn-default btn-xs btn-group">&nbsp;</div>'+ // pembatas
				'</span>'+
				'</div>';
				
	const baseLevel = $("#level-"+ getObj.tagId);
	baseLevel.find(".my-topbar").eq(0)
		.find(".btn-action-table-data").html(result);
}

function set_TitleBar(tagId, titleBar) {
	
	const dataLevelRow  = parseInt(globalData[tagId].dataLevelRow);
	const baseLevel		= $("#level-"+ tagId);
	
	baseLevel.find(".my-topbar").eq(0)
		.find(".my-titlebar").html(titleBar);
	
	if (dataLevelRow > 0) {
		baseLevel.find(".my-topbar").eq(0)
			.find(".my-titlebar").addClass("my-hide");
	}
	
}

function get_TitleBar(tagId) {
	
	const baseLevel = $("#level-"+ tagId);
	const result 	= baseLevel.find(".my-topbar").eq(0).find(".my-titlebar").html();
	return result;
}

function set_Num_Row(tagId, value) {
	
	const baseLevel = $("#level-"+ tagId);
	baseLevel.find(".my-topbar").eq(0)
		.find(".my-value-numrow").html(value);
}

function get_Num_Row(tagId) {
	
	const baseLevel = $("#level-"+ tagId);
	const result = parseInt(baseLevel.find(".my-topbar").eq(0).find(".my-value-numrow").html());
	return result;
}

function set_Num_Selected(tagId, value) {
	
	const baseLevel = $("#level-"+ tagId);
	baseLevel.find(".my-topbar").eq(0)
		.find(".my-value-numselected").html(value);
}

function get_Num_Selected(tagId) {
	
	const baseLevel = $("#level-"+ tagId);
	const result = parseInt(baseLevel.find(".my-topbar").eq(0).find(".my-value-numselected").html());
	return result;
}

function set_Num_Row_Page(tagId, value) {
	
	const baseLevel = $("#level-"+ tagId);
	baseLevel.find(".my-topbar").eq(0)
		.find(".my-value-numrowpage").html(value);
}

function get_Num_Row_Page(tagId) {
	
	const baseLevel = $("#level-"+ tagId);
	const result = parseInt(baseLevel.find(".my-topbar").eq(0).find(".my-value-numrowpage").html());
	return result;
}

function set_Popup_ShowRow(tagId) {
	
	const baseLevel   = $("#level-"+ tagId);
	const baseEl	  = baseLevel.find(".my-topbar").eq(0);
	const panelStatus = baseEl.find(".my-container-showrow").hasClass("my-hide");
	
	globalData[tagId]['dataShowRow'] = [];
	
		if (panelStatus === true)  {
		const display_row 	= parseInt(globalData[tagId]['dataPaging'].display_row);
		const numrow		= parseInt(globalData[tagId]['dataPaging'].numrow);
		var inc 			= dataPagingDefault.display_row;
		let active			= '';
		let result			= '';
		let item 			= '';
		
		var x = 0; 
		do {
			if (x < 100) {
				x = x+inc;
			} else if (x >= 100 && x < 500){
				inc = 100;
				x = x+inc;
			} else {
				inc = 500;
				x = x+inc;
			}

			if(numrow+inc >= x) { 
				
				// update globalData
				globalData[tagId]['dataShowRow'].push(x);
				
				if (x === display_row) {
					active= 'showrow-item-active'; //'selected';
				} else {
					active= '';
				}
				
				item += '<a href="#" onclick="Load_Display_Row(`'+ tagId +'`, '+ x +')" class="showrow-item showrow-item-'+ x +' '+ active +'">'+ x +'</a>';
			}
		} while (x < numrow && x <= 10000);

		result = '<div class="content-showrow">'+ 
				'<div style="width: 80px; padding: 4px;">'+
					'<div style="max-height: 200px; overflow: auto;">'+
						item +
					'</div>'+
				'</div>'+
				'</div>';
		
		baseEl.find(".my-container-showrow").html(result);
		baseEl.find(".my-container-showrow").removeClass("my-hide");
		baseEl.find(".my-container-showrow").addClass("my-block");
	} else {
		baseEl.find(".my-container-showrow").removeClass("my-block");
		baseEl.find(".my-container-showrow").addClass("my-hide");
	}	
	
}

function set_Popup_FreezeCol(tagId) {
	
	const baseLevel     = $("#level-"+ tagId);
	const baseEl	    = baseLevel.find(".my-topbar").eq(0);
	const baseEl_Th_Box = baseLevel.find(".my-table-head-box").eq(0);
	const panelStatus   = baseEl.find(".my-container-freezecol").hasClass("my-hide");
	
	const thLength	    = globalData[tagId]['tableProperty']['thLength'];
	const currentFreexe = parseInt(globalData[tagId]['tableProperty']['tableFreeze']);
	let active			= '';
	let result			= '';
	let item			= '';
	
		if (panelStatus === true)  {
			for (x=1; x<=(thLength-2); x++) {
				if (x === currentFreexe) {
					active= 'freezecol-item-active';
				} else {
					active= '';
				}
				let label = baseEl_Th_Box.find(".my-thead").eq(1).find(".my-th").eq(x).find(".my-th-input").val();
				item += '<a href="#" onclick="Load_Freeze_Col(`'+ tagId +'`, '+ x +')" class="freezecol-item freezecol-item-'+ x +' '+ active +'">('+ x +') '+ label +'</a>';
			}
			
		result = '<div class="content-freezecol">'+ 
				'<div style="width: 200px; padding: 4px;">'+
					'<div style="max-height: 200px; overflow: auto;">'+
						item +
					'</div>'+
				'</div>'+
				'</div>';
		
		baseEl.find(".my-container-freezecol").html(result);
		baseEl.find(".my-container-freezecol").removeClass("my-hide");
		baseEl.find(".my-container-freezecol").addClass("my-block");
	} else {
		baseEl.find(".my-container-freezecol").removeClass("my-block");
		baseEl.find(".my-container-freezecol").addClass("my-hide");
	}	
	
}

function set_Popup_Search(tagId) {
	
	const fieldSearch 	= globalData[tagId].fieldSearch;
	
	if (fieldSearch.length > 0) {
		let contentBody 	= '<table class="my-table table-bordered"><tbody>';
		$.map(fieldSearch, (objField) => {
			let value		= '';
			if (typeof globalData[tagId]['dataSearch'][objField.field] !== 'undefined') {
				value		= globalData[tagId]['dataSearch'][objField.field];
			}
			
			let class_input = 'search-input-'+ objField.field;
			contentBody +=  '<tr><td style="padding: 0px 5px;" valign="top">'+ objField.label +'</td>'+
							'<td valign="top"><input onkeypress="_press_Input_Search(event, `'+ tagId +'`)" class="search-input input-sm form-control '+ class_input +'" type="text" value="'+ value +'" /></td></tr>';
		}); // map
		
		contentBody = contentBody +'</tbody></table>'
		
		const result = `<div class="right-panel-popup my-move-tobottom">
						<div class="right-panel-popup-head">Search</div>
						<div class="search-body right-panel-popup-body">${contentBody}</div>
						<div class="right-panel-popup-footer">
							<div style="text-align: right">
							<span class="btn-group" role="toolbar">
								<button onclick="Load_Search('${tagId}', 1)" class="btn btn-sm btn-default btn-group search-action-apply">Apply</button>&nbsp;
								<button onclick="Load_Search('${tagId}', 2)" class="btn btn-sm btn-default btn-group search-action-clear">Clear</button>&nbsp;
								<button onclick="_hide_Topbar_Popup('${tagId}', 'search')" class="btn btn-sm btn-default btn-group search-action-close">Close</button>
							</span>
							</div>
						</div>
					</div>`;	
	
		const baseLevel = $("#level-"+ tagId);
		baseLevel.find(".my-topbar").eq(0)
			.find(".my-container-search").html(result);
	} // fieldSearch.length
}

function _press_Input_Search(e, tagId) {
	if (e && e.which){
		charCode = e.which;
	} else if (window.event){
		e = window.event;
		charCode = e.keyCode;
	}
	if (charCode === 13) { // enter		
		const baseLevel = $("#level-"+ tagId);
		baseLevel.find(".my-topbar").eq(0)
			.find(".search-action-apply").click();
	}	
}

function set_Global_Data_Search(tagId) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl		= baseLevel.find(".my-topbar").eq(0);
	const fieldSearch 	= globalData[tagId].fieldSearch;
	$.map(fieldSearch, (objField) => {
		let value  = baseEl.find(".search-body .search-input-"+ objField.field).val();
		globalData[tagId]['dataSearch'][objField.field] = value;
	}); // map

}

function unset_Search(tagId) {
	
	const baseLevel = $("#level-"+ tagId);
	baseLevel.find(".my-topbar").eq(0)
		.find(".search-body .search-input").val("");

	
	set_Global_Data_Search(tagId);
}

function set_Panel_Filter(tagId) {
	
	const fieldFilter = globalData[tagId].fieldFilter;
	
	if (fieldFilter.length > 0) {
		let contentBody = '<table class="my-table table-bordered"><tbody>';
		$.map(fieldFilter, (objField, i) => {
			let objItem		= globalData[tagId]['dataFilter'][objField.field].data;
			let filter_item = get_Filter_Item({
					'tagId': tagId,
					'field': objField.field,
					'value': objItem,
					'filterModel': objField.filterModel
				});

			contentBody +=  '<tr><td style="padding: 5px; width: 20%;" valign="top">'+ objField.label +'</td>'+
							'<td style="padding: 5px;" valign="top">'+
								'<span class="filter-data filter-data-'+ objField.field +'">'+ filter_item +'</span>'+ 
								'<span class="filter-container-form filter-container-form-'+ objField.field +'"></span>'+
							'</td>'+
							'<td style="padding: 5px; width: 10%;" align="center" valign="top">'+ 
								'<a data-tagid="'+ tagId +'" onclick="Filter_Form(this, '+ i +')" class="filter-a-'+ objField.field +'" href="#"><span class="glyphicon glyphicon-plus"></span></a>'+
							'</td></tr>'; 
		}); // map
		contentBody = contentBody +'</tbody></table>';
		
		const result = `<div class="right-panel-popup my-move-tobottom">
						<div class="right-panel-popup-head">Filter</div>
						<div class="filter-body right-panel-popup-body">${contentBody}</div>
						<div class="right-panel-popup-footer">
							<div style="text-align: right">
							<span class="btn-group" role="toolbar">
								<button onclick="Load_Filter('${tagId}', 1)" class="btn btn-sm btn-default btn-group">Apply</button>&nbsp;
								<button onclick="Load_Filter('${tagId}', 2)" class="btn btn-sm btn-default btn-group">Clear</button>&nbsp;
								<button onclick="_hide_Topbar_Popup('${tagId}', 'filter')" class="btn btn-sm btn-default btn-group">Close</button>
							</span>
							</div>
						</div>
					</div>`;	
		 
		const baseLevel = $("#level-"+ tagId);
		baseLevel.find(".my-topbar").eq(0)
			.find(".my-container-filter").html(result);
	
	} // fieldFilter.length
}

function set_Global_Data_Filter(tagId) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl 		= baseLevel.find(".my-topbar").eq(0);
	const fieldFilter 	= globalData[tagId].fieldFilter;
	$.map(fieldFilter, (objField) => {

		let objLength		 = baseEl.find(".filter-body .filter-data-"+ objField.field +" .filter-item").length;
		let currentValue 	 = [];	
		for (let x = 0; x < objLength; x++) {
			let itemValue = baseEl.find(".filter-body .filter-data-"+ objField.field +" .filter-item").eq(x).html();
				currentValue.push(itemValue);
		}

		// convert array to oject
		let newObjItem = {};
		$.map(currentValue, ( val, i ) => {
			newObjItem[i] = val;
		});
		

		globalData[tagId]['dataFilter'][objField.field]['data'] = newObjItem;
	}); // map
}

function unset_Filter(tagId) {
	
	const baseLevel = $("#level-"+ tagId);
	baseLevel.find(".my-topbar").eq(0)
		.find(".filter-body  .filter-data").html("");

	set_Global_Data_Filter(tagId);
}

function _hide_Topbar_Popup(tagId, targetEl) {
		
	const baseLevel    = $("#level-"+ tagId);
	const baseEl 	   = baseLevel.find(".my-topbar").eq(0);
	const baseEl_Popup = baseEl.find(".my-container-"+ targetEl +" .right-panel-popup");
		  baseEl_Popup.removeClass("my-move-tobottom");
		  baseEl_Popup.addClass("my-move-totop");
		  baseEl_Popup.addClass("my-hide");
}

function _set_active_DisplayRow(tagId, new_display_row) {
	
	const baseLevel = $("#level-"+ tagId);
	const baseEl 	= baseLevel.find(".my-topbar").eq(0);
	
    // reset     
	baseEl.find(".showrow-item").removeClass("showrow-item-active");
	
	// set active
	baseEl.find(".my-value-showrow").html(new_display_row);
	baseEl.find(".showrow-item-"+ new_display_row).addClass("showrow-item-active");
	baseEl.find(".my-container-showrow").removeClass("my-block");
	baseEl.find(".my-container-showrow").addClass("my-hide");
}

function _hide_ShowRow(tagId) {
		
	
	const baseLevel = $("#level-"+ tagId);
	const baseEl 	= baseLevel.find(".my-topbar").eq(0);
	
	baseEl.find(".my-container-showrow").removeClass("my-block");
	baseEl.find(".my-container-showrow").addClass("my-hide");
}

function _set_active_Freeze_Col(tagId, new_display_row) {
	
	const baseLevel = $("#level-"+ tagId);
	const baseEl 	= baseLevel.find(".my-topbar").eq(0);
	
    // reset     
	baseEl.find(".freezecol-item").removeClass("freezecol-item-active");
	
	// set active
	baseEl.find(".my-value-freezecol").html(new_display_row);
	baseEl.find(".freezecol-item-"+ new_display_row).addClass("freezecol-item-active");
	baseEl.find(".my-container-freezecol").removeClass("my-block");
	baseEl.find(".my-container-freezecol").addClass("my-hide");
}

function _hide_FreezeCol(tagId) {
		
	const baseLevel = $("#level-"+ tagId);
	const baseEl 	= baseLevel.find(".my-topbar").eq(0);
	
	baseEl.find(".my-container-freezecol").removeClass("my-block");
	baseEl.find(".my-container-freezecol").addClass("my-hide");
}
function _handler_btn_Filter_DataTable(getObj) {
		
	const tagId 	= getObj.tagId;
	const baseLevel = $("#level-"+ tagId);
	const baseEl 	= baseLevel.find(".my-topbar").eq(0);
	
	if (getObj.btnFilter === 1) {
		if (baseEl.find(".btn-filter-box").hasClass("my-block") === false) {
			baseEl.find(".btn-filter-box").removeClass("my-hide");
			baseEl.find(".btn-filter-box").addClass("my-block");
			baseEl.find(".btn-filter-box .btn-filter").prop("disabled", false); 
		}
	} else {
		if (baseEl.find(".btn-filter-box").hasClass("my-hide") === false) {
			baseEl.find(".btn-filter-box").removeClass("my-block");
			baseEl.find(".btn-filter-box").addClass("my-hide");
			baseEl.find(".btn-filter-box .btn-filter").prop("disabled", true); 
		}
	}

	if (getObj.btnSearch === 1) {
		if (baseEl.find(".btn-search-box").hasClass("my-block") === false) {
			baseEl.find(".btn-search-box").removeClass("my-hide");
			baseEl.find(".btn-search-box").addClass("my-block");
			baseEl.find(".btn-search-box .btn-search").prop("disabled", false); 
		}
	} else {
		if (baseEl.find(".btn-search-box").hasClass("my-hide") === false) {
			baseEl.find(".btn-search-box").removeClass("my-block");
			baseEl.find(".btn-search-box").addClass("my-hide");
			baseEl.find(".btn-search-box .btn-search").prop("disabled", true); 
		}
	}
}

function set_Topbar_Tool_Mob(tagId, targetThis) {
	
	const baseLevel  = $("#level-"+ tagId);
	const icon 		 = $(targetThis).find(".my-toggle-icon-mob");
	const btn_status = icon.hasClass("toggle-active");
	
	const baseEl 	  = baseLevel.find(".my-topbar").eq(0);
	const contentBody = baseEl.find(".btn-info-table-data-dekstop").html();
	const status_mob  = baseEl.find(".btn-info-table-data-mobile").html();
	
	if (btn_status === false) {
		$(targetThis).find(".my-toggle-icon-mob").removeClass("toggle-inactive");
		$(targetThis).find(".my-toggle-icon-mob").addClass("toggle-active");
		
		if (status_mob === '') {
			baseEl.find(".btn-info-table-data-mobile").html(contentBody);
			
			baseEl.find(".btn-info-table-data-mobile").removeClass("my-hide");
			baseEl.find(".btn-info-table-data-mobile").addClass("my-block");
			
			// delete topbar dekstop
			baseEl.find(".btn-info-table-data-dekstop").html("");
		}
			
		baseLevel.find(".my-topbar").eq(0)
			.find(".my-container-toolbar-collapse-inner").removeClass("my-hide");
		baseLevel.find(".my-topbar").eq(0)
			.find(".my-container-toolbar-collapse-inner").addClass("my-block");
		
	} else {
		$(targetThis).find(".my-toggle-icon-mob").removeClass("toggle-active");
		$(targetThis).find(".my-toggle-icon-mob").addClass("toggle-inactive");
		
		if (status_mob === '') {
			baseEl.find(".btn-info-table-data-dekstop").html(contentBody);
			
			baseEl.find(".btn-info-table-data-mobile").removeClass("my-block");
			baseEl.find(".btn-info-table-data-mobile").addClass("my-hide");
			
			// delete topbar mobile
			baseEl.find(".btn-info-table-data-mobile").html("");
		}
		
		baseLevel.find(".my-topbar").eq(0)
			.find(".my-container-toolbar-collapse-inner").removeClass("my-block");
		baseLevel.find(".my-topbar").eq(0)
			.find(".my-container-toolbar-collapse-inner").addClass("my-hide");
		
	}
	
}

function _hide_Panel_Mob(tagId) {
		
	const baseLevel   = $("#level-"+ tagId);
	const baseEl 	  = baseLevel.find(".my-topbar").eq(0);
	const contentBody = baseEl.find(".mob-right-panel-body").html();
	baseEl.find(".my-topbar-right-inner").html(contentBody);

	// delete topbar mobile
	baseEl.find(".my-container-mobrightpanel").html("");
}

function _handler_btn_Action_DataTable(tagId, selectedCount) {

	const baseLevel 	= $("#level-"+ tagId);
	const baseEl 		= baseLevel.find(".my-topbar").eq(0);
	
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
	const baseLevel = $("#level-"+ tagId);
	const baseEl 	= baseLevel.find(".my-topbar").eq(0);
	
	baseEl.find(".formtr-button-box").removeClass("my-hide");
	baseEl.find(".bottom-action-add-tr").prop("disabled", true); 
}