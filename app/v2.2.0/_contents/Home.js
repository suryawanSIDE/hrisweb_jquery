function Home(getObj) {
	
	function _Main(getObj) {
		
		const tagId		  = getObj.tagId;
		const loadMethode = getObj.loadMethode;
		const level 	  = getObj.level;
		
		if (loadMethode === 1) {  // note in global
			// global
			set_Global_Data(tagId);	

			// components/content
			set_Containter(tagId);
						
			// components/topbar
			set_TopBar({
				'tagId': tagId, 
				'level': level, 
				'rightPanel': 0,
				'loadMethode': loadMethode,
				'titleBar': 'Home'
				});			
		}
		
		const result	= '<center><h1>WELCOME</h1></center>';
	
		// components/content
		set_Content(tagId, result);
	}
	
	let functionResult 	= '';
	switch (getObj.setFunction) {
		case 'Main': 
			functionResult = _Main(getObj);
		break;
		default:
			functionResult = set_Alert({
								'type': 'danger', 
								'body': 'Undefined request object', 
								'footer': get_Alert_Footer(1) 
							});
	}
	
	return functionResult;
}
