function Load_Module(targetThis, tagModule) {
	
	const dataLevelRow = 0;
	const dataLevelCol = 0;
	const tagId	   	   = tagModule+'-'+ dataLevelRow +'-'+ dataLevelCol;
	
	if (globalData.hasOwnProperty(tagId) === false) {
		globalData[tagId] = {};
	} 
	globalData[tagId]['dataLevelRow']   = dataLevelRow;
	globalData[tagId]['dataLevelCol']   = dataLevelCol;
	
	// contents/nav
	_set_active_Nav_List(targetThis)
	
	// components/alert
	_hide_Alert();
	// components/loader
	_hide_Loader();

	// components/content
	set_Root({
		'tagId': tagId
		});
	// routes
	Route_Content({
		'tagId': tagId,
		'loadMethode': 1, // note in global
		});				
		
}

function Load_Module_Replace(getObj) {
	
	// components/alert
	_hide_Alert();
	// components/loader
	_hide_Loader();

	// components/content
	set_Root({
		'tagId': getObj.tagId
		});
	// routes
	Route_Content({
		'tagId': getObj.tagId,
		'loadMethode': 1, // note in global
		});				
		
}

function Load_Module_Child(getObj) {
		
		// routes
		Route_Content( {
			'tagId': getObj.tagId,
			'loadMethode': 1 // note in global
			});	

}

function Reload_Content(tagId, loadMethod) {
	
	// components/alert
	_hide_Alert();
	// components/loader
	_hide_Loader();

	// routes
	Route_Content({
		'tagId': tagId,
		'loadMethode': loadMethod // note in global
		});
		
	// components/table
	_reset_Cb_All(tagId);
	// components/topbar
	set_Num_Selected(tagId, 0);
}

function Refresh_Content(tagId) {
	
	// components/paging
	unset_Paging(tagId);
	// components/topbar
	unset_Filter(tagId);
	unset_Search(tagId); 

	// components/confirm
	_hide_Confirm();
	// components/topbar
	_hide_Topbar_Popup(tagId, 'search');
	_hide_Topbar_Popup(tagId, 'filter');
	_hide_ShowRow(tagId);
	_hide_FreezeCol(tagId);
	
	const baseLevel = $("#level-"+ tagId);
	const baseEl 	= baseLevel.find(".my-topbar").eq(0);
	
	baseEl.find(".btn-filter").removeClass("btn-info");
	baseEl.find(".btn-filter").addClass("btn-default");
	baseEl.find(".btn-search").removeClass("btn-info");
	baseEl.find(".btn-search").addClass("btn-default");
	
	// routes
	Reload_Content(tagId, 2); 
}

function Load_Paging(tagId, page) {
	
	// update global data
	globalData[tagId]['dataPaging'].current_page = page;
	
	// components/paging
	_page_Active(tagId, page)

	// routes
	Reload_Content(tagId, 3); 
}

function Arrow_Paging(tagId, next_page, action) {
	
	// update global data
	const numrow 		 	= parseInt(globalData[tagId]['dataPaging'].numrow); 
	const display_row		= parseInt(globalData[tagId]['dataPaging'].display_row);
	const max_page		 	= (Math.ceil(numrow/display_row));
	const count_page 		= ((next_page-1)*defaultPageGroup);

	let page = 1;
	switch(action) {
		case 'left':
			page = (count_page+defaultPageGroup);
		break;
		case 'right':
			page = (count_page+1);
		break;
		case 'backward':
			page = 1;
		break;
		case 'forward':
			page = max_page;
		break;
		default:
		
	} //switchcase
	
	globalData[tagId]['dataPaging'].current_page = page;
	globalData[tagId]['dataPaging'].next_page = next_page;
	
	// components/paging
	_page_Active(tagId, action);

	// routes
	Reload_Content(tagId, 4); 
}

function Load_Filter(tagId, filterMethode) {
	
	// replace paging
	globalData[tagId]['dataPaging'].numrow 			= 0;
	globalData[tagId]['dataPaging'].numrowpage 		= 0;
	globalData[tagId]['dataPaging'].current_page 	= dataPagingDefault.current_page;
	globalData[tagId]['dataPaging'].next_page 		= dataPagingDefault.next_page;
	
	const baseLevel = $("#level-"+ tagId);
	const baseEl 	= baseLevel.find(".my-topbar").eq(0);
		
	if (filterMethode === 1) {
		baseEl.find(".btn-filter").removeClass("btn-default");
		baseEl.find(".btn-filter").addClass("btn-info");
	}
	
	if (filterMethode === 2) { // reset global data filter
		// components
		unset_Filter(tagId); 
		
		baseEl.find(".btn-filter").removeClass("btn-info");
		baseEl.find(".btn-filter").addClass("btn-default");
	}

	// components/topbar
	// update global data
	set_Global_Data_Filter(tagId);

	// routes
	Reload_Content(tagId, 6); 
}

function Load_Sort(tagId, field) {
	
	// components/table
	_th_Sort(tagId, field);

	// routes
	Reload_Content(tagId, 5); 
}

function Load_Search(tagId, srcMethode) {
	
	// update global data
	globalData[tagId]['dataPaging'].numrow 			= 0;
	globalData[tagId]['dataPaging'].numrowpage 		= 0;
	globalData[tagId]['dataPaging'].current_page 	= dataPagingDefault.current_page;
	globalData[tagId]['dataPaging'].next_page 		= dataPagingDefault.next_page;
	
	const baseLevel = $("#level-"+ tagId);
	const baseEl 	= baseLevel.find(".my-topbar").eq(0);
		
	if (srcMethode === 1) {
		baseEl.find(".btn-search").removeClass("btn-default");
		baseEl.find(".btn-search").addClass("btn-info");
	}
	
	if (srcMethode === 2) { // reset global data search
		// components/topbar
		unset_Search(tagId); 
		
		baseEl.find(".btn-search").removeClass("btn-info");
		baseEl.find(".btn-search").addClass("btn-default");
	}

	// components/topbar
	// update global data
	set_Global_Data_Search(tagId);

	// routes
	Reload_Content(tagId, 6); 
}

function Load_Display_Row(tagId, new_display_row) {
	
	// update global data
	globalData[tagId]['dataPaging'].display_row 	= new_display_row;
	globalData[tagId]['dataPaging'].current_page 	= dataPagingDefault.current_page;
	globalData[tagId]['dataPaging'].next_page 		= dataPagingDefault.next_page;

	// components/topbar
	_set_active_DisplayRow(tagId, new_display_row);

	// routes
	Reload_Content(tagId, 7); 
}

function Load_Freeze_Col(tagId, new_freezecol) {
	
	// update global data
	globalData[tagId]['tableProperty'].tableFreeze = new_freezecol;
	
	// components/topbar
	_set_active_Freeze_Col(tagId, new_freezecol);

	// routes
	Reload_Content(tagId, 8); 
}

function Login_Check() {
	
	if (get_LoginKey() === null) {
		// _contents/Login
		set_LoginForm();
	} else {
		// relogin
		// _contents/login
		Login_Validate('validation');
		
	}
}

function Load_Redirect() {
	
	// contents/
	set_LoginForm();
	// components/content
	_clear_Body();
}

