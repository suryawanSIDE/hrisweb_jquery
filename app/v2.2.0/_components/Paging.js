function set_Paging(tagId) {	
	
	const numrow 		 = parseInt(globalData[tagId]['dataPaging'].numrow); // this
	const numrowpage	 = parseInt(globalData[tagId]['dataPaging'].numrowpage); // this
	const display_row	 = parseInt(globalData[tagId]['dataPaging'].display_row); 
	const max_page		 = (Math.ceil(numrow/display_row));
	
	const next_page 	 = parseInt(globalData[tagId]['dataPaging'].next_page);	
	const max_group		 = Math.ceil(max_page/defaultPageGroup);
	const count_page 	 = ((next_page-1)*defaultPageGroup);

	let result 	= '';
	if (numrow > 0 && numrow > numrowpage) {

		result = '<span class="page-box"><ul class="pagination pagination-sm">';
			
			if (next_page > 1) {
				result += '<li><a onclick="Arrow_Paging(`'+ tagId +'`, 1, `backward`)" class="nav-li-a nav-li-a-backward" href="#"><span class="glyphicon glyphicon-step-backward"></span></a></li>';
				result += '<li><a onclick="Arrow_Paging(`'+ tagId +'`, '+ (next_page-1) +', `left`)" class="nav-li-a nav-li-a-left" href="#"><span class="glyphicon glyphicon-chevron-left"></span></a></li>';
			}

			for (var i=1; i<=defaultPageGroup; i++) {
				if((count_page+i) <= max_page) {
					let page   = (count_page+i);
						result += '<li><a onclick="Load_Paging(`'+ tagId +'`, '+ page +')" class="nav-li-a nav-li-a-'+ page +'" href="#">'+ page +'</a></li>';
				}
			}
			
			if(next_page < max_group) { 
				result += '<li><a onclick="Arrow_Paging(`'+ tagId +'`, '+ (next_page+1) +', `right`)" class="nav-li-a nav-li-a-right" href="#"><span class="glyphicon glyphicon-chevron-right"></span></a></li>'+
						  '<li><a onclick="Arrow_Paging(`'+ tagId +'`, '+ (max_group) +', `forward`)" class="nav-li-a nav-li-a-forward" href="#"><span class="glyphicon glyphicon-step-forward"></span></a></li>';
			}

		result += '</ul></span>'; // page-box
	}
	
	const baseLevel 	= $("#level-"+ tagId);
	baseLevel.find(".my-topbar").eq(0)
		.find(".btn-paging-table-data").html(result);
}

function unset_Paging(tagId) {
	
	const current_display_row = globalData[tagId]['dataPaging'].display_row;

	globalData[tagId]['dataPaging'] = {
		'numrow': 0,
		'numrowpage': 0,
		'display_row': current_display_row,
		'start_row': dataPagingDefault.start_row,
		'max_page': 0,
		'current_page': dataPagingDefault.current_page,
		'next_page': dataPagingDefault.next_page
		};
}

function _page_Active(tagId, current_page) {
	
	const baseLevel 	= $("#level-"+ tagId);
	const baseEl 		= baseLevel.find(".my-topbar").eq(0);
	
    // reset     
	baseEl.find(".nav-li-a").removeClass("my-page-active");
	baseEl.find(".nav-li-a").attr("style", "");

	// set active
	baseEl.find(".nav-li-a-"+ current_page).addClass("my-page-active");
	baseEl.find(".nav-li-a-"+ current_page).attr("style", "background-color: #56B8C6; color: #fff;");
}