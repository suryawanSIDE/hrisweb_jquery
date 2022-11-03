
function set_LoginForm() {
	
		const result = `<form onsubmit="Login_Submit();"><div class="login-block"><div class="login-box">
					<div class="login-box-head">
						<span class="login-box-icon"></span>
						<span class="login-box-title"><b>LOGIN</b></span>
					</div>
					<div class="login-box-body">
						<div class="input-group" style="margin-bottom: 5px;">
						  <span class="input-group-addon" id="basic-addon1"><div class="login-label">Email</div></span>
						  <input onkeypress="_press_Input_Login(event)" id="input-email" type="text" class="form-control" placeholder="Email" aria-describedby="basic-addon1">
						</div>
						<div class="input-group">
						  <span class="input-group-addon" id="basic-addon2"><div class="login-label">Password</div></span>
						  <input onkeypress="_press_Input_Login(event)" id="input-password" type="password" class="form-control" placeholder="Password" aria-describedby="basic-addon2" autocomplete="off">
						  <span onclick="_text_Pwd()" class="input-group-addon" id="basic-addon2"><span id="password-eye" class="glyphicon glyphicon-eye-close"></span></span>
						</div>
					</div>
					<div class="login-box-footer">
						<center><button onclick="Login_Submit()" id="login-action-submit" class="btn btn-sm btn-primary">Submit</button></center>
					</div>
				</div></div></form>`;	
					
	$("#my-confirm").html(result);
	
	$("#my-confirm .login-block").css({
		'height': wHeight +'px'
	});

}
function _press_Input_Login(e) {
	if (e && e.which){
		charCode = e.which;
	} else if (window.event){
		e = window.event;
		charCode = e.keyCode;
	}
	if (charCode === 13) { // enter		
		$("#login-action-submit").click();
	}
}

function Login_Submit() {
	
	const inputEmail = $("#input-email").val();
	const inputPass	 = $("#input-password").val();
	
	if (inputEmail === '') {
		// components/alert
		set_Alert({
			'type': 'warning', 
			'body': 'Please complete email', 
			'footer': get_Alert_Footer(1)
		});		
	} else if (inputPass === '') {
		// components/alert
		set_Alert({
			'type': 'warning', 
			'body': 'Please complete password', 
			'footer': get_Alert_Footer(1)
		});
	} else {

		// async
		$.ajax({
			type: "post",
			url: baseUrl + "myconfig/Login",
			dataType: "json",
			data: {
				"appId": appId,
				"input-email": inputEmail,
				"input-password": inputPass
			}, // data
			success: (response) => {	

				const myObj = response; 
				
				if (myObj.status === 'success') {
					
					const data = myObj.response_data;
					
					// update gobal user
					globalUser['reg_user'] 	= data.reg_user;
					globalUser['user_name'] = data.user_name;
					
                    // components/key
					set_LoginKey(data.loginkey);
					set_RandomKey(data.randomkey);
					// components/confirm
					_hide_Confirm()
					// components/nav
					set_Nav();
					// controllers (tagid)
					const tagId = appId + data.randomkey + tagModule_Default;
					
					// controllers
					Load_Module(0, tagId);	

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

}

function Login_Validate(reqAction) {
	
    // async
    $.ajax({
        type: "get",
        url: baseUrl +"myconfig/Login/"+ appId +"/"+ get_LoginKey() +"/"+ reqAction,
        dataType: "json",
        data: {}, // data
        success: (response) => {	

            const myObj = response; 
            
            if (myObj.status === 'logout') {
                
				// elements
                unset_LoginKey();
				unset_RandomKey();
				
				// controllers
                Load_Redirect();
				
            } else if (myObj.status === 'success') {
                
				const data = myObj.response_data;	
				
				// update gobal user
				globalUser['reg_user'] 	= data.reg_user;
				globalUser['user_name'] = data.user_name;
				
				// components/key
				set_RandomKey(data.randomkey);
				// components /nav
				set_Nav();
				
				const tagId   = appId + data.randomkey + tagModule_Default;
				
				// controllers
				Load_Module(0, tagId);	

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