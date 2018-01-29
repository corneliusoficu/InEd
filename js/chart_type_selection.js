var chart_types = document.querySelectorAll('#chart-type-selection-page .subcategory');
for(var i = 0; i < chart_types.length ;i ++){
	chart_types[i].onclick = function(){
		metadata.set('subcategory',this.id.split('-')[0]);
	    template.loadPartialWithAssets(
	        'body',
	        "data_selection.html",
	        ["css/data_selection.css"],
	        ["js/data_selection.js"]
	    );
	}
}