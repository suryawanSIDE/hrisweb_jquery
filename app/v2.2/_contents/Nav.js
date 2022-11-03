function set_Nav() {
	
	const loader  	= '<span class="myicon-loader glyphicon glyphicon-refresh"></span>'; 

	const result = '<div id="my-navbox" class="my-navbox my-hide">'+ 
					'<div class="my-navbox-inner">'+
						'<div class="my-navbox-title">'+
							'<a onclick="_handle_Navbar()" class="btn btn-sm btn-default btn-sm" >'+
									'<span class="glyphicon glyphicon-menu-left"></span></a>&nbsp;&nbsp;'+
							'<span class="my-navtitle">'+ appName +'</span>'+
						'</div>'+
					'<div class="my-navbox-ul">'+
						'<ul id="my-navul" class="my-navul">'+
							'<li id="nav-loader" class="my-navli">'+
								'<center><a class="my-navli-a" href="#">'+ loader +'</a></center>'+
							'</li>'+
						'</ul>'+
					'</div>'+ // my-navbox-ul
					'</div>'+ // my-navbox-inner
				'</div>'; // my-navbox

	$("#my-nav").html(result);
		
	// asyc
	navFetch();	
}

function navFetch() {
	
	// async
	$.ajax({
		type: "get",
		url: baseUrl +"myconfig/Menu/"+ appId +"/"+ get_LoginKey(), // components/key
		dataType: "json",
		// data: {}, // data
		success: (response) => {	

			const myObj = response; 
			
			if (myObj.status === 'success') {
				
				// this
				set_Nav_Lists(myObj.response_data.data);
			   
			} else if (myObj.status === 'reject') {

				// components/key
				unset_LoginKey();
				// controllers
				Load_Redirect();

			} else {
				// components/alert
				set_Alert({
					'type': 'danger', 
					'body': myObj.message, 
					'footer': get_Alert_Footer(1)
				});
			}
			
		}, // success
		error: (xhr) => {
			// components/alert
			set_Alert({
				'type': 'danger', 
				'body': 'Error: '+ xhr.status +', '+xhr.responseText, //'Error connection', 
				'footer': get_Alert_Footer(1) 
			});
		}, // error			
	}); // ajax
	
}


function set_Nav_Lists(getObj) {
	
	//$("#nav-loader").remove();
	$("#my-navul").html("");
	
	const randId  	= get_RandomKey();
	const tagModule = appId + randId + tagModule_Default;
	
	let li	= '';
		// home
		li  = li + '<li class="my-navli my-navli-active">'+
					'<a onclick="Load_Module(this, `'+ tagModule +'`)" class="my-navli-a" href="#">'+ navTitleDefault +'</a>'+
				'</li>';
				
		li  = li + _getmap_Nav_Lists({
				'objNav' : getObj
			});
		// logout
		li  = li + '<li class="my-navli">'+
					'<a onclick="Login_Validate(`logout`)" class="my-navli-a" href="#">Logout</a>'+
				'</li>';
	
	$("#my-navul").append(li + '<br><br><br><br>');

	const navHeight = (wHeight);
	$(".my-navbox-ul").css({
		'height': navHeight+'px'
	});

	function _getmap_Nav_Lists(getObj) {    
	
		const randId  		= get_RandomKey(); // elements
		var child_Padding 	= 10;
		let result 			= '';

		$.map(getObj.objNav, ( valObj, i ) => {

			var tagModule 	 = appId + randId + valObj.module_uniq;
			var result_child = '';

			result += get_Nav_List({ // elements
					'tagModule': tagModule,
					'data': valObj,
					'padding': (child_Padding * parseInt(valObj.nav_level))
					});

				// child
				if (valObj['module_child']?.length > 0) {            
					let child_item = _getmap_Nav_Lists({
						'objNav' : valObj['module_child']
					});
					result_child = '<ul id="child-'+ tagModule +'" class="my-navul my-hide">'+ child_item +'</ul>'; 
				}
			result += result_child;
			
		});
		return result;
	}
		
}


function get_Nav_List(getObj) {
	
	const tagModule = getObj.tagModule;
	const data	 	= getObj.data;
	let li_Click 	= '';	
	
	if (data.module_method == '1') {
		li_Click = '_open_Nav_Child(this, `'+ tagModule +'`)';
	} else if (data.module_method == '2') {
		li_Click = 'Load_Module(this, `'+ tagModule +'`)';
	}

	const li = '<li id="nav-li-'+ tagModule +'" class="my-navli class-module-'+ data.module_method +'" style="margin-left: '+ (getObj.padding) +'px">'+ 
				'<a onclick="'+ li_Click +'" class="my-navli-a" href="#">'+ data.module_display +'</a>'+
			'</li>';
	
	return li;
}

function _open_Nav_Child(targetThis, tagModule) {
	
	const checkStatus = $("#child-"+ tagModule).hasClass("my-hide");
	if (checkStatus === true) {		
		$("#child-"+ tagModule).removeClass("my-hide");
		$("#child-"+ tagModule).addClass("my-block");
		$(targetThis).parent().addClass("my-navli-active");
	} else {
		$("#child-"+ tagModule).removeClass("my-block");
		$("#child-"+ tagModule).addClass("my-hide");
	}
	
}

function _set_active_Nav_List(targetThis) {
	if (targetThis !== 0) {
		// reset nav 
		$(".my-navli-active").removeClass("my-navli-active");
		// nav selected 
		$(targetThis).parent().addClass("my-navli-active");
		
		let parentId = '';
		for (let i=0; i<=3; i++) {
			parentId = $(targetThis).parents("ul").attr("id");
			if (parentId !== 'my-navul') {
				let tagModule_Parent = parentId.replace('child-', '');
				$("#nav-li-"+ tagModule_Parent).addClass("my-navli-active");
				targetThis = "#nav-li-"+ tagModule_Parent;
			}
		}
		
	}
}
