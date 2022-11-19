function Confirm_Form(tagId, eventId) {
	
	let btnClass = 'btn-sm';
	if (deviceType === 'mobile') {
		btnClass = 'btn-xs';
	} else {
		btnClass = 'btn-sm';
	}
	
	const baseLevel 	= $("#level-"+ tagId);
	const dataTable 	= globalData[tagId].dataTable;
	const count_checked = get_Num_Selected(tagId); // components/topbar
	const eventObj   	= globalData[tagId]['dataEvent'][eventId];
	
	let footer 		  	= '';
	let body   		  	= '';
	let newFunction		= '';
	let eventNew		= '';
	
	switch(eventObj.action) {
		case 'delete':	
			
			// button blur
			baseLevel.find(".my-footer").eq(0)
				.find(".panel-bottom-right .btn-action-delete").blur();
			
			baseLevel.find(".my-tbody").eq(0)
				.find(".my-td-cb-col-0").each(function(i) {
					if (this.checked) {
						body += '<span class="btn btn-default btn-xs btn-group confirm-item">'+ dataTable[i].col_text_alert +'</span>';
					}
			});
			
			// sample : functionDelete = Time_Sheet_Event()
			newFunction = eventObj.nextFunction;
			eventNew 	= newFunction +'(`'+ tagId +'`, `delete_Key`)';
			footer = '<div style="text-align: right">'+
					'<hr class="my-hr">'+						
					'<button onclick="'+ eventNew +'" ondbclick="'+ eventNew +'" class="btn btn-default '+ btnClass +' confirm-action-submit"><span class="glyphicon glyphicon-ok"></span> Submit</button>'+
					'<button onclick="_hide_Confirm()" class="btn btn-default '+ btnClass +' confirm-action-close"><span class="glyphicon glyphicon-remove"></span> Close</button>'+
					'</div>';
				
			set_Confirm({
				'icon': 'glyphicon-warning-sign',
				'title': 'Delete '+ count_checked +' data ?',
				'body': body, 
				'footer': footer
			});
			
			// button focus
			$("#my-confirm").find(".confirm-action-submit").focus();
			
		break;
		case 'delete_2':	
			
			newFunction = eventObj.nextFunction;
			eventNew 	= newFunction +'(`'+ tagId +'`, `'+ eventId +'`)';
			footer = '<div style="text-align: right">'+
					'<hr class="my-hr">'+						
					'<button onclick="'+ eventNew +'" ondbclick="'+ eventNew +'" class="btn btn-default '+ btnClass +' confirm-action-submit"><span class="glyphicon glyphicon-ok"></span> Ok</button>'+
					'<button onclick="_hide_Confirm()" class="btn btn-default '+ btnClass +' confirm-action-close"><span class="glyphicon glyphicon-remove"></span> Close</button>'+
					'</div>';
				
			body = '<span class="btn btn-default btn-xs btn-group confirm-item">'+ eventObj.notif +'</span>';
			
			set_Confirm({
				'icon': 'glyphicon-warning-sign',
				'title': 'Delete data ?',
				'body': body, 
				'footer': footer
			});
			
			// button focus
			$("#my-confirm").find(".confirm-action-submit").focus();
			
		break;
		case 'export':	
			
			// button blur
			baseLevel.find(".my-footer").eq(0)
				.find(".panel-bottom-right .bottom-action-export").blur();
			
			const dataExport = globalData[tagId]['dataExportType'];
			let export_type	 = '';
			$.map(dataExport, (val, x) => {
				let active = '';
				if (val === 'Excel') {
					active = 'checked';
				} else {
					active = '';
				}
				export_type += '<input type="radio" name="export_type" value="'+val+'" '+active+'> '+val+'<br>';
			});
			
			const dataExportDecSep = globalData[tagId]['dataExportDecSep'];
			let export_decimal_separator = '';
			$.map(dataExportDecSep, (val, x) => {
				let active = '';
				if (val === 'Dot (.)') {
					active = 'checked';
				} else {
					active = '';
				}
				export_decimal_separator += '<input type="radio" name="export_decimal_separator" value="'+val+'" '+active+'> '+val+'<br>';
			});
			
			
			body = '<div class="container-fluid"><div class="row">'+
					   '<div class="col-sm-4">'+
						'<b>Export Type:</b><br>'+
							export_type +
					   '</div>'+
					   '<div class="col-sm-4">'+
					   '<b>Decimal Separator:</b><br>'+
							export_decimal_separator +
					   '</div>'+
					   '<div class="col-sm-4">'+
					   '<b>Export Page:</b><br>'+
					   '<input type="radio" name="export_page" value="current_page" checked> Current Page<br>'+
					   '<input type="radio" name="export_page" value="all_page"> ('+ get_Num_Row(tagId) +' rows)'+
					   '</div>'+
				   '</div></div>';
				   
			newFunction = eventObj.nextFunction;
			eventNew 	= newFunction +'(`'+ tagId +'`, `export_Key`)';
			footer = '<div style="text-align: right">'+
					'<hr class="my-hr">'+						
					'<button onclick="'+ eventNew +'" ondbclick="'+ eventNew +'" class="btn btn-default '+ btnClass +' confirm-action-submit"><span class="glyphicon glyphicon-ok"></span> Submit</button>'+
					'<button onclick="_hide_Confirm()" class="btn btn-default '+ btnClass +' confirm-action-close"><span class="glyphicon glyphicon-remove"></span> Close</button>'+
					'</div>';
				
			set_Confirm({
				'icon': 'glyphicon glyphicon-file',
				'title': 'Export',
				'body': body, 
				'footer': footer
			});
			
			// button focus
			$("#my-confirm").find(".confirm-action-submit").focus();
			
		break;
		case 'task_active':	
		
			eventNew  	 = '_clear_TaskActive(`'+ tagId +'`, `'+ eventObj.callback +'`)';
			footer = '<div style="text-align: right">'+
					'<hr class="my-hr">'+						
					'<button onclick="'+ eventNew +'" ondbclick="'+ eventNew +'" class="btn btn-default '+ btnClass +' confirm-action-submit"><span class="glyphicon glyphicon-ok"></span> Ok</button>'+
					'<button onclick="_hide_Confirm()" class="btn btn-default '+ btnClass +' confirm-action-close"><span class="glyphicon glyphicon-remove"></span> Close</button>'+
					'</div>';
				
			const dataTaskActive = globalData[tagId]['dataTaskActive'];
			$.map(dataTaskActive, ( val, x ) => {
				body += '<span class="btn btn-default btn-xs btn-group confirm-item">'+ val +'</span>';
			});
			
			set_Confirm({
				'icon': 'glyphicon-warning-sign',
				'title': 'You have not saved data',
				'body': body, 
				'footer': footer
			});
			
			// button focus
			$("#my-confirm").find(".confirm-action-submit").focus();
			
		break;
		default:
			// components/alert
			set_Alert({
				'type': 'danger', 
				'body': 'Undefined action', 
				'footer': get_Alert_Footer(1) 
			});
	} //switchcase
}

function set_Confirm(getObj) {
	
	const result = `<div class="confirm-block"><div class="confirm-box my-move-tobottom">
					<div class="confirm-box-head">
						<span class="confirm-box-icon"><span class="glyphicon ${getObj.icon}"></span></span>
						<span class="confirm-box-title">${getObj.title}</span>
					</div>
					<div class="confirm-box-body">${getObj.body}</div>
					<div class="confirm-box-footer">${getObj.footer}</div>
				</div></div>`;	

	$("#my-confirm").html(result);

	$("#my-confirm .confirm-block").css({
		'height': wHeight +'px'
	});
	
}

function _hide_Confirm() {
	
	$("#my-confirm").html("");
}


