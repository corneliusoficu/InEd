var SCRIPT_NAME_ENDING = "_generator.js";
var SCRIPT_FILE_PATH   = "js/generators/";

function loadInfographicGeneratorScript(callback){
    if(metadata_info.category == undefined){
        alert("Unkown infographic category!");
    }
    else{
    	var SCRIPT_NAME_MIDDLE = null;
    	if(metadata_info.category == 'chart'){
    		SCRIPT_NAME_MIDDLE = metadata_info.subcategory;
    	}
    	if(metadata_info.category == 'map'){
    		SCRIPT_NAME_MIDDLE = metadata_info.category;
    	}
	    var scriptName = SCRIPT_FILE_PATH + SCRIPT_NAME_MIDDLE + SCRIPT_NAME_ENDING;
	    template.loadJsFilesSequentially([scriptName], 0, callback);
    }
}

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}
document.getElementById('export-draw').addEventListener('click', function() {
	canvg(document.getElementById('print-canvas'), document.getElementsByClassName('drawing-surface-content')[0].innerHTML);
    downloadCanvas(this, 'print-canvas', 'test.png');
}, false);

document.getElementById('edit-data-button').onclick = function(){
	document.querySelector('.data-editor').className+=" "+"data-editor-opened";
	document.querySelector('.drawing-surface').className+=" "+"drawing-surface-thin";

};

generateInfographic = function(){
    generate(completeInformation, '.drawing-surface-content');
};

loadInfographicGeneratorScript(generateInfographic);

function populateEditSurface(data){
	var editor = document.getElementById('.data-editor');
	for(var key in data){
		var newSlice = document.createElement("div");
		setAttributes(newSlice,{'class':'data-row','id':key});

		var sliceLabel = document.createElement("p");
		var text = document.createTextNode(key);  
		sliceLabel.appendChild(text);

		var colorInput = document.createElement("input");
		setAttributes(colorInput,{"class":"color-input","type":"color","value":data[key].color});

		var countInput = document.createElement("input");
		setAttributes(countInput,{
			"class":"count-input","type":"number","value":data[key].count});
		newSlice.appendChild(sliceLabel);
		newSlice.appendChild(colorInput);
		newSlice.appendChild(countInput);
		editor.appendChild(newSlice);	
	}

	//Update chartData on change of any field in the chart editor
	// var slices = document.getElementsByClassName('chart-slice');
	// for( var i = 0 ; i < slices.length ; i++){
	// 	slices[i].querySelector('.color-input').onchange = function(){
	// 		chartData[this.parentNode.id].color = this.value;
	// 		updateChart();
	// 	}
	// 	slices[i].querySelector('.count-input').onchange = function(){
	// 		chartData[this.parentNode.id].count = this.value;
	// 		updateChart();
	// 	}
	// }
}

// function updateChart(){
// 	var drawing_surface = document.getElementsByClassName('drawing-surface')[0];
// 	drawing_surface.innerHTML = "";
// 	chartData = renderPieChart(chartData,drawing_surface,500);
// }

