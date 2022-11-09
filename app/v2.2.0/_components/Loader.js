
function set_Loader() {
	
	const result = `<div class="loader-block"><div class="loader-box">
					<div class="loader-box-head">
						<span class="loader-box-icon"><span class="myicon-loader glyphicon glyphicon-refresh"></span></span>
						<span class="loader-box-title">PROCESSING <span id="loading-progress"></span> ...</span>
					</div>
				</div></div>`;	

	$("#my-loader").html(result);

	$("#my-loader .loader-block").css({
		'height': wHeight +'px'
	});
	
}

function set_Loader_Progress(data) {
	$("#loading-progress").html(data);
}

function get_Loader() {
	
	const result = `<span class="myicon-loader-box"><span class="myicon-loader glyphicon glyphicon-refresh"></span> processing</span>`;
	return result;
}

function _hide_Loader() {
	
	$("#my-loader").html("");
	$("#loading-progress").html("");
	$(".myicon-loader-box").remove();
}
