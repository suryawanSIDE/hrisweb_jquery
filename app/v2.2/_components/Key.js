function set_LoginKey(value) {
	
	localStorage.setItem("loginKey"+ appId, value);
}

function get_LoginKey() {
	
	return localStorage.getItem("loginKey"+ appId);
}

function unset_LoginKey() {
	
	localStorage.removeItem("loginKey"+ appId);
}

function set_RandomKey(value) {
	
	sessionStorage.setItem("randomKey"+ appId, value);
}

function get_RandomKey() {
	
	return sessionStorage.getItem("randomKey"+ appId);
}

function unset_RandomKey() {
	
	sessionStorage.removeItem("randomKey"+ appId);
}
