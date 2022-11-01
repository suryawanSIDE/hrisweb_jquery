
function Route_Content(getObj) {
	
	const tagId	    	= getObj.tagId;
	const dataLevelRow	= globalData[tagId].dataLevelRow;
	const dataLevelCol	= globalData[tagId].dataLevelCol;
	
	const loadMethode 	= getObj.loadMethode;
	const level 		= dataLevelRow;
	const randId  		= get_RandomKey();
	const key 			= (appId + randId);
	const markLevel		= '-'+ dataLevelRow +'-'+ dataLevelCol;
	
	switch(tagId) {
		case (key +'home'+ markLevel) :
			globalData[tagId]['moduleId'] = tagModule_Default;
			Home({
				'setFunction': 'Main',
				'tagId': tagId,
				'loadMethode': loadMethode,
				'level': level
				});
			_screen_Adjust(tagId);	
		break;
		
		// myhris/employee
		case (key +'emp'+ markLevel) :
			globalData[tagId]['moduleId'] = 'emp';
			Employee_Profile({
				'setFunction': 'Main',
				'tagId': tagId,
				'loadMethode': loadMethode,
				'level': level
				});
			_screen_Adjust(tagId);
		break;
		// myhris/employee 
		
		// myhris/parameter
		case (key +'prm-lv'+ markLevel) : 
			globalData[tagId]['moduleId'] = 'prm-lv';
			Parameter_Leave_Type({
				'setFunction': 'Main',
				'tagId': tagId,
				'loadMethode': loadMethode,
				'level': level
				});
			_screen_Adjust(tagId);
		break;
		case (key +'prm-hdy'+ markLevel) : 
			globalData[tagId]['moduleId'] = 'prm-hdy';
			Parameter_Holiday_Type({
				'setFunction': 'Main',
				'tagId': tagId,
				'loadMethode': loadMethode,
				'level': level
				});
			_screen_Adjust(tagId);
		break;
		case (key +'prm-edu'+ markLevel) : 
			globalData[tagId]['moduleId'] = 'prm-edu';
			Parameter_Educational_Stage({
				'setFunction': 'Main',
				'tagId': tagId,
				'loadMethode': loadMethode,
				'level': level
				});
			_screen_Adjust(tagId);
		break;
		case (key +'prm-mjr_sbj'+ markLevel) : 
			globalData[tagId]['moduleId'] = 'prm-mjr_sbj';
			Parameter_Major_Subject({
				'setFunction': 'Main',
				'tagId': tagId,
				'loadMethode': loadMethode,
				'level': level
				});
			_screen_Adjust(tagId);
		break;
		case (key +'prm-rlg'+ markLevel) : 
			globalData[tagId]['moduleId'] = 'prm-rlg';
			Parameter_Religion({
				'setFunction': 'Main',
				'tagId': tagId,
				'loadMethode': loadMethode,
				'level': level
				});
			_screen_Adjust(tagId);
		break;
		case (key +'prm-rel'+ markLevel) : 
			globalData[tagId]['moduleId'] = 'prm-rel';
			Parameter_Relationship({
				'setFunction': 'Main',
				'tagId': tagId,
				'loadMethode': loadMethode,
				'level': level
				});
			_screen_Adjust(tagId);
		break;
		case (key +'prm-bk'+ markLevel) : 
			globalData[tagId]['moduleId'] = 'prm-bk';
			Parameter_Bank({
				'setFunction': 'Main',
				'tagId': tagId,
				'loadMethode': loadMethode,
				'level': level
				});
			_screen_Adjust(tagId);
		break;
		// myhris/parameter
		
		default:		
			globalData[tagId]['moduleId'] = tagModule_Default;
			Home({
				'setFunction': 'Main',
				'tagId': tagId,
				'loadMethode': loadMethode,
				'level': level
				});
			_screen_Adjust(tagId);
	} // switchcase
	
}