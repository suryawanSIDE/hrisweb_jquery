
function Route_Content(getObj) {
	
	const tagId	    	= getObj.tagId;
	
	if (typeof tagId === 'undefined') {
		// components/alert
		set_Alert({
			'type': 'danger', 
			'body': 'Empty tagId', 
			'footer': get_Alert_Footer(1)
		});
	} else {
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
			
			// myhris/profile
			case (key +'emp-prf'+ markLevel) :
				globalData[tagId]['moduleId'] = 'emp-prf';
				Profile({
					'setFunction': 'Main',
					'tagId': tagId,
					'loadMethode': loadMethode,
					'level': level
					});
				_screen_Adjust(tagId);
			break;
			// myhris/profile 
			// myhris/profile-address
			case (key +'emp-prf-addr'+ markLevel) :
				globalData[tagId]['moduleId'] = 'emp-prf-addr';
				Profile_Address({
					'setFunction': 'Main',
					'tagId': tagId,
					'loadMethode': loadMethode,
					'level': level
					});
				_screen_Adjust(tagId);
			break;
			// myhris/profile-address 
			// myhris/address
			case (key +'emp-addr'+ markLevel) :
				globalData[tagId]['moduleId'] = 'emp-addr';
				Address({
					'setFunction': 'Main',
					'tagId': tagId,
					'loadMethode': loadMethode,
					'level': level
					});
				_screen_Adjust(tagId);
			break;
			// myhris/address 
			
			// myhris/institution
			case (key +'instt'+ markLevel) :
				globalData[tagId]['moduleId'] = 'instt';
				Institution({
					'setFunction': 'Main',
					'tagId': tagId,
					'loadMethode': loadMethode,
					'level': level
					});
				_screen_Adjust(tagId);
			break;
			// myhris/institution 
			
			// myhris/structure
			case (key +'strctr'+ markLevel) :
				globalData[tagId]['moduleId'] = 'strctr';
				Structure({
					'setFunction': 'Main',
					'tagId': tagId,
					'loadMethode': loadMethode,
					'level': level
					});
				_screen_Adjust(tagId);
			break;
			// myhris/structure 
			
			// myhris/area 
			case (key +'ar-cou'+ markLevel) :
				globalData[tagId]['moduleId'] = 'ar-cou';
				Area_Country({
					'setFunction': 'Main',
					'tagId': tagId,
					'loadMethode': loadMethode,
					'level': level
					});
				_screen_Adjust(tagId);
			break;
			case (key +'ar-pv'+ markLevel) :
				globalData[tagId]['moduleId'] = 'ar-pv';
				Area_Province({
					'setFunction': 'Main',
					'tagId': tagId,
					'loadMethode': loadMethode,
					'level': level
					});
				_screen_Adjust(tagId);
			break;
			case (key +'ar-cit'+ markLevel) :
				globalData[tagId]['moduleId'] = 'ar-cit';
				Area_City({
					'setFunction': 'Main',
					'tagId': tagId,
					'loadMethode': loadMethode,
					'level': level
					});
				_screen_Adjust(tagId);
			break;
			// myhris/area 
			
			// myconfig
			case (key +'cfg-acct'+ markLevel) : 
				globalData[tagId]['moduleId'] = 'cfg-acct';
				User({
					'setFunction': 'Main',
					'tagId': tagId,
					'loadMethode': loadMethode,
					'level': level
					});
				_screen_Adjust(tagId);
			break;
			case (key +'cfg-accs'+ markLevel) : 
				globalData[tagId]['moduleId'] = 'cfg-accs';
				User_Access({
					'setFunction': 'Main',
					'tagId': tagId,
					'loadMethode': loadMethode,
					'level': level
					});
				_screen_Adjust(tagId);
			break;
			case (key +'dprt'+ markLevel) : 
				globalData[tagId]['moduleId'] = 'dprt';
				Department({
					'setFunction': 'Main',
					'tagId': tagId,
					'loadMethode': loadMethode,
					'level': level
					});
				_screen_Adjust(tagId);
			break;
			// myconfig/parameter
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
	} // alert
}