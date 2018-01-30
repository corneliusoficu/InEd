var SCRIPT_NAME_ENDING = "_generator.js";
var SCRIPT_FILE_PATH   = "js/generators/";
var toggledEditPanel = false;
function loadInfographicGeneratorScript(callback){
    if(metadata_info.category == undefined){
        alert("Unkown infographic category!");
    }
    else{
    	var SCRIPT_NAME_MIDDLE = null;
    	if(metadata_info.category == 'chart'){
    		SCRIPT_NAME_MIDDLE = metadata_info.subcategory;
    	}
    	else{
    		SCRIPT_NAME_MIDDLE = metadata_info.category;
    	}
	    var generatorScriptName = SCRIPT_FILE_PATH + SCRIPT_NAME_MIDDLE + SCRIPT_NAME_ENDING;
	    var editorScriptName = "js/" + SCRIPT_NAME_MIDDLE + "_editor.js";
	    template.loadJsFilesSequentially([generatorScriptName,editorScriptName], 0, callback);
    }
}

loadInfographicGeneratorScript(function (){
	if (metadata_info.category == "chart"){
		completeInformation.data = generate(completeInformation, '.drawing-surface-content');
	}else{
		generate(completeInformation, '.drawing-surface-content');
	}
	populateEditSurface(completeInformation,'.data-editor');
});
function openEditPanel(){
	document.querySelector('.drawing-surface').className+=" "+"drawing-surface-thin";
	toggledEditPanel = true;
	setTimeout(function(){
		document.querySelector('.data-editor').style.display = 'block';
		document.querySelector('.data-editor').className+=" "+"data-editor-opened";
	},100);
}
function closeEditPanel(){
	document.querySelector('.data-editor').className ="data-editor";
	document.querySelector('.drawing-surface').className = "drawing-surface";
	toggledEditPanel = false;
	setTimeout(function(){
		document.querySelector('.data-editor').style.display = 'none';
	},1000);
}

document.getElementById('edit-data-button').onclick = function(){
	if(toggledEditPanel == false){
		openEditPanel();
	}
	else{
		closeEditPanel();
	}
};
document.getElementById('restart-draw-button').onclick = function(){
	closeEditPanel();
	completeInformation.data = JSON.parse(completeInformation.metadata.text);
	generate(completeInformation, '.drawing-surface-content');
};

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}
document.getElementById('export-draw-button').addEventListener('click', function() {
	canvg(document.getElementById('print-canvas'), document.getElementsByClassName('drawing-surface-content')[0].innerHTML);
    downloadCanvas(this, 'print-canvas', 'inedGraphic.png');
}, false);


