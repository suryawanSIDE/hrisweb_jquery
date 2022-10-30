function set_Alert(getObj) {
	
	let alertIcon  = '';
	let alertClass = '';
	let alertTitle = '';
	switch(getObj.type) {
		case 'success':
			alertIcon  = '<span class="glyphicon glyphicon-ok-sign"></span>';
			alertClass = 'alert-box-success';
			alertTitle = 'SUCCESS';
		break;
		case 'warning':
			alertIcon  = '<span class="glyphicon glyphicon-warning-sign"></span>';
			alertClass = 'alert-box-warning';
			alertTitle = 'WARNING';
		break;
		case 'danger':
			alertIcon  = '<span class="glyphicon glyphicon-exclamation-sign"></span>';
			alertClass = 'alert-box-danger';
			alertTitle = 'DANGER';
		break;
		case 'info':
			alertIcon  = '<span class="glyphicon glyphicon-info-sign"></span>';
			alertClass = 'alert-box-info';
			alertTitle = 'INFO';
		break;
		default:
		
	} //switchcase
	
	let result = `<div class="alert-block"><div class="alert-box my-move-tobottom ${alertClass}">
					<div class="alert-box-head">
						<span class="alert-box-icon">${alertIcon}</span>
						<span class="alert-box-title">${alertTitle}</span>
					</div>
					<div class="alert-box-body">${getObj.body}</div>
					<div class="alert-box-footer">
						<hr class="my-hr">
						${getObj.footer}
					</div>
				</div></div>`;	

	$("#my-alert").html(result);
	
	// button focus
	$("#my-alert").find('.alert-action-close').focus();
			
	$("#my-alert .alert-block").css({
		'height': wHeight +'px'
	});
	
}

function _hide_Alert() {
	
	$("#my-alert").html("");
}

function get_Alert_Footer(value) {
	
	let btnClass = 'btn-sm';
	if (deviceType === 'mobile') {
		btnClass = 'btn-xs';
	} else {
		btnClass = 'btn-sm';
	}
	
	let result = '';
	if (value === 1) {
		result = `<div style="text-align: right"><button onclick="_hide_Alert()" class="btn btn-default ${btnClass} alert-action-close"><span class="glyphicon glyphicon-remove"></span> Close</button></div>`;
	}
	
	return result;
}

function _show_Alert(type, body) {
	
	set_Alert({
		'type': type, 
		'body': body, 
		'footer': get_Alert_Footer(1)
	})
}