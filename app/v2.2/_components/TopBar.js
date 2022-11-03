function set_TopBar(getObj) {
	
	const tagId = getObj.tagId;
	
	if (getObj.level === 0 && getObj.loadMethode === 1) {  // note in global
		if (globalData[tagId]['prevMark'] === 0) {
			_navBar_Toggle(tagId);
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
							'<button onclick="set_Panel_FreezeCol(`'+ tagId +'`)" class="btn btn-default btn-sm">'+
								'<span class="glyphicon glyphicon-indent-left"></span>&nbsp;<span class="dekstop-label">Freeze: </span><span class="my-value-freezecol dynamic-label">'+ globalData[tagId]['tableProperty']['tableFreeze'] +'</span>'+
							'</button>'+
							'<div class="my-container-freezecol my-hide"></div>'+
						'</div>'
	} 
	
	let toggle 		= '';
	let panel_right = '';
	
	if (getObj.loadMethode === 1 && getObj.level === 0 ) {
		// hanya di load pada parent 1 kali
		toggle	= '<button onclick="_navBar_Toggle(`'+ tagId +'`)" class="my-navtoogle btn btn-default btn-sm" href="#"><span class="glyphicon glyphicon-tasks"></span></button>';
	}
	
	if (getObj.loadMethode === 1 && getObj.rightPanel === 1) {
		panel_right = 
				'<div class="my-topbar-right-inner">'+
					'<span class="btn-group">'+
						'<div class="toolbar-divider btn btn-default btn-sm btn-group">&nbsp;</div>'+ // pembatas
						'<div class="btn-filter-box btn-group my-hide">'+
							'<button onclick="set_Panel_Filter(`'+ tagId +'`)" class="btn-filter btn btn-default btn-sm" data-toggle="tooltip" data-placement="bottom" title="Show panel filter">'+
								'<span class="glyphicon glyphicon-filter"></span>'+
							'</button>'+													
						'</div>'+
						'<div class="btn-search-box btn-group my-hide">'+
							'<button onclick="set_Panel_Search(`'+ tagId +'`)" class="btn-search btn btn-default btn-sm" data-toggle="tooltip" data-placement="bottom" title="Show panel search">'+
								'<span class="glyphicon glyphicon-search"></span>'+
							'</button>'+							
						'</div>'+
						
						freezeButton+
						
						'<div class="btn-group">'+
							'<button onclick="set_Panel_ShowRow(`'+ tagId +'`)" class="btn btn-default btn-sm">'+
								'<span class="glyphicon glyphicon-resize-vertical"></span>&nbsp;<span class="dekstop-label">Show: </span><span class="my-value-showrow dynamic-label">'+ displayRow +'</span>'+
							'</button>'+
							'<div class="my-container-showrow my-hide"></div>'+
						'</div>'+
						'<div class="btn-group">'+
							'<button class="btn btn-default btn-sm">'+
								'<span class="dekstop-label">All: </span><span class="my-value-numrow dynamic-label">0</span>&nbsp;|&nbsp;'+
								'<span class="dekstop-label">/Pg: </span><span class="my-value-numrowpage dynamic-label">0</span>&nbsp;|&nbsp;'+
								'<span class="dekstop-label">Selected: </span><span class="my-value-numselected dynamic-label">0</span>'+
							'</button>'+
						'</div>'+
						
						'<button onclick="Refresh_Content(`'+ tagId +'`)" class="my-btn-refresh btn btn-default btn-sm btn-group" data-toggle="tooltip" data-placement="bottom" title="Reload content"><span class="glyphicon glyphicon-repeat"></span></button></button>'+
						'<div class="toolbar-divider btn btn-default btn-sm btn-group">&nbsp;</div>'+ // pembatas
					'</span>' + // btn-toolbar
				'</div>' + // my-topbar-right-inner

				'<button onclick="set_Right_Panel_Mob(`'+ tagId +'`)" class="btn btn-default btn-sm my-panel-right-toggle"><span class="glyphicon glyphicon-cog"></span></button>'; // toogle panel right
				
	}
	
	const result = '<div class="my-topbar-inner">'+		
				 	'<div class="my-topbar-left">'+
						toggle + 
						'<span class="my-titlebar">'+ getObj.titleBar +'</span>'+
					'</div>'+  // my-topbar-left
						'<div class="my-topbar-right">'+ 
							panel_right +		
						'</div>'+
						
					// hide container
					// dekstop
					'<div class="my-container-search"></div>'+
					'<div class="my-container-filter"></div>'+	
					// mobile
					'<div class="my-container-mobrightpanel"></div>'+
				 '</div>'; // my-topbar
	
	return result;
}
function _navBar_Toggle(tagId) {
	
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

function set_Panel_ShowRow(tagId) {
	
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

function set_Panel_FreezeCol(tagId) {
	
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

function set_Panel_Search(tagId) {
	
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
								<button onclick="_hide_Right_Panel_Popup('${tagId}', 'search')" class="btn btn-sm btn-default btn-group search-action-close">Close</button>
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
								<button onclick="_hide_Right_Panel_Popup('${tagId}', 'filter')" class="btn btn-sm btn-default btn-group">Close</button>
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

function _hide_Right_Panel_Popup(tagId, targetEl) {
		
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
function _top_Right_Panel_Btn_Handler(getObj) {
		
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

function set_Right_Panel_Mob(tagId) {
	
	const baseLevel   = $("#level-"+ tagId);
	const baseEl 	  = baseLevel.find(".my-topbar").eq(0);
	const contentBody = baseEl.find(".my-topbar-right-inner").html();
	const newBody	  = contentBody.replaceAll('btn-sm', 'btn-xs');
	const result = `<div class="mob-right-panel my-move-tobottom">
					<div class="mob-right-panel-body">${newBody}</div>
					<div class="mob-right-panel-footer">
						<hr class="my-hr">
						<div style="text-align: right"><button onclick="_hide_Panel_Mob('${tagId}')" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span> Close</button></div>
					</div>
				</div>`;	
							
	baseEl.find(".my-container-mobrightpanel").html(result);

	// delete topbar dekstop
	baseEl.find(".my-topbar-right-inner").html("");
	
}

function _hide_Panel_Mob(tagId) {
		
	const baseLevel   = $("#level-"+ tagId);
	const baseEl 	  = baseLevel.find(".my-topbar").eq(0);
	const contentBody = baseEl.find(".mob-right-panel-body").html();
	baseEl.find(".my-topbar-right-inner").html(contentBody);

	// delete topbar mobile
	baseEl.find(".my-container-mobrightpanel").html("");
}
