function _clear_Body() {

	$("#my-alert").html("");
	$("#my-loader").html("");
	$("#my-nav").html("");
	$("#my-root").html("");
}

function set_Root(getObj) {
	
	const result 	= `<div id="level-${getObj.tagId}">
					<div class="my-topbar my-topbar-parent"></div>
					<div class="my-container"></div>
                    <div class="my-footer my-footer-parent">
						<div class="row">
							<div class="panel-bottom-left col-sm-6"></div>
							<div class="panel-bottom-right col-sm-6"></div>
						</div>
					</div>
				   </div>`;

	$("#my-root").html(result);
}

function set_Container_Prepend(tagId, value) {
	
	const baseLevel = $("#level-"+ tagId);
	baseLevel.find(".my-container").eq(0).prepend(value);
}

function set_Container_Append(tagId, value) {
	
	const baseLevel = $("#level-"+ tagId);
		baseLevel.find(".my-container").eq(0).append(value);
}

function set_Containter(tagId) {
	
	set_Container_Append(tagId, `<div class="my-content"></div>`);
}

function set_Content(tagId, value) {
	
	const baseLevel = $("#level-"+ tagId);
	baseLevel.find(".my-content").eq(0).html(value);
}

function _screen_Adjust(tagId) {

	const dataLevelRow  = parseInt(globalData[tagId].dataLevelRow);
	const baseLevel 	= $("#level-"+ tagId);

	// childMethod
	let childMethod = '';
	if (typeof globalData[tagId]['childMethod'] === 'undefined') {
		childMethod = 'default';
	} else {
		childMethod = globalData[tagId]['childMethod'];
	}

	_conten_Height(tagId);

	if (dataLevelRow > 0 && childMethod === 'default') {
		// footer
		const baseEl = baseLevel.find(".my-footer").eq(0);

		baseEl.removeClass("my-hide");
		baseEl.css({
				'border-bottom-left-radius': '4px',
				'border-bottom-right-radius': '4px'
			});

	} // dataLevelRow > 0
}

function _conten_Height(tagId) {
	
	const dataLevelRow   = parseInt(globalData[tagId].dataLevelRow);
	const baseLevel 	 = $("#level-"+ tagId);
	const baseEl_Tobar 	 = baseLevel.find(".my-topbar").eq(0);
	const baseEl_Content = baseLevel.find(".my-content").eq(0);
	const baseEl_Footer	 = baseLevel.find(".my-footer").eq(0);
	
	// jika ada other box;
	let otherBoxHeight	= 0;
	const otherBox		= baseLevel.find(".my-content-panel").eq(0).length;
	if (otherBox > 0) {
		otherBoxHeight = baseLevel.find(".my-content-panel").eq(0).height(); 
	}
	
	// childMethod
	let childMethod = '';
	if (typeof globalData[tagId]['childMethod'] === 'undefined') {
		childMethod = 'default';
	} else {
		childMethod = globalData[tagId]['childMethod'];
	}

	let boxHeight 	= (wHeight-otherBoxHeight-baseEl_Tobar.height()-baseEl_Footer.height());
	/*
	if (deviceType === 'mobile') { // mobile
		boxHeight 	= (wHeight-otherBoxHeight-130); // 178 = tinggi (toolbar 50, footer 80)
	} else {
		boxHeight 	= (wHeight-otherBoxHeight-100); // 148 = tinggi (toolbar 50 footer 50)
	}*/

	if (dataLevelRow === 0) {
		baseEl_Content.css({
			"height": boxHeight +"px",
			"max-height": boxHeight +"px"
		});
	} else {
		if (childMethod === 'replaceParent') {
			baseEl_Content.css({
				"height": boxHeight +"px",
				"max-height": boxHeight +"px"
			});
		} else {
			baseEl_Content.css("max-height", boxHeight +"px");
		}
	}


}
function get_Container_Child(getObj) {
	
	const result 	= `<div data="${getObj.tagId_Parent}" >
                    <div id="level-${getObj.tagId}">
                        <div class="my-topbar my-topbar-child"></div>
                        <div class="my-container"></div>
						<div class="my-footer my-footer-child">
							<div class="row">
								<div class="panel-bottom-left col-sm-6"></div>
								<div class="panel-bottom-right col-sm-6"></div>
							</div>
						</div>
                    </div>
                  </div>`;

	return result;
}