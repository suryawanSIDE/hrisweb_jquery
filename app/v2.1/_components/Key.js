function set_LoginKey(value) {
	
	localStorage.setItem("loginKey", value);
}

function get_LoginKey() {
	
	return localStorage.getItem("loginKey");
}

function unset_LoginKey() {
	
	localStorage.removeItem("loginKey");
}

function set_RandomKey(value) {
	
	sessionStorage.setItem("randomKey", value);
}

function get_RandomKey() {
	
	return sessionStorage.getItem("randomKey");
}

function unset_RandomKey() {
	
	sessionStorage.removeItem("randomKey");
}
