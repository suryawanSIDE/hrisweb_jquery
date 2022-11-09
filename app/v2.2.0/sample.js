// sample->FormDisplay
/*
tampilan form 
*/
	// 1 default, tampilkan input form secara berurutan
	let objForm	 = '';
	$.map(new_fieldForm, ( val ) => {
		objForm = objForm + val;
	});

	// 2 custom form display
	let objForm	  = '';
			
	// segment 1
	const segment_1 = get_Form_Segment({
						'segmentModel': 'default',
						'start': 0,
						'end': 3,
						'colClass': 'col-sm-3',
						'fieldForm': new_fieldForm
					});
	// segment 2				
		let seg_2_block_1 = '<div class="col-sm-4">'+
					new_fieldForm[4]+
					new_fieldForm[5]+
					new_fieldForm[6]+
					new_fieldForm[7]+
					'</div>';
		let seg_2_block_2 = '<div class="col-sm-4">'+
					new_fieldForm[8]+
					new_fieldForm[9]+
					new_fieldForm[10]+
					new_fieldForm[11]+
					'</div>';
		let seg_2_block_3 = '<div class="col-sm-4">'+
					new_fieldForm[12]+
					new_fieldForm[13]+
					'</div>';
					
	let pre_segment_2 = seg_2_block_1 + seg_2_block_2 + seg_2_block_3;
	const segment_2  = get_Form_Segment({
					'segmentModel': 'modify',
					'fieldForm': pre_segment_2
					});
					
	// merge all segment
	objForm = segment_1 + segment_2;
	// start custom form display
// sample->FormDisplay

// sample->fieldForm.push
	// tanggal
			fieldForm.push({
                        'input_Type': 'get_Input',
                        'label': tableHead[col].label, // col_ars_date_dmy
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
                        'maxlength': -1,
						'placeholder': 'input-date',
						'readonly': '',
							'eventObject': {
											'eventInput': 'Pick_Date',
											'col': col
										}
                    });
		
	// autofill 
	// select funnction nya default
			fieldForm.push({ // 3
						'input_Type': 'get_Input_Select',
						'label': tableHead[col].label, // col_project_number_ref
						'field': tableHead[col].field,
							'valueConverter': '',
						'type': tableHead[col].type,
						'align': tableHead[col].align,
						'require': tableHead[col].require,
						'col': col,
						'maxlength': -1,
						'placeholder': 'select-item',
						'readonly': '',
							'eventObject': {
											'eventInput': 'List_Autofill',
											'searchInput': 1, // search 1/0
											'col': col
										}
					});
					// update globalData
					if (paramLength === 0) {
						globalData[tagId]['dataAutofill_Param'].push({
						'col': col,
						'listRequest': 'myios_project_number',
						'listFormat': 'table', // list/table
						'selectedFunction': 'Inspection_Plan_Event',
						'eventParam': '_selected_Project'
						});	
					}