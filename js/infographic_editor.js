var SCRIPT_NAME_ENDING = "_generator.js";
var SCRIPT_FILE_PATH   = "js/generators/";

function loadInfographicGeneratorScript(callback){
    if(metadata_info.category == undefined){
        alert("Unkown infographic category!");
    }else{
        var scriptName = SCRIPT_FILE_PATH + metadata_info.category + SCRIPT_NAME_ENDING;
        template.loadJsFilesSequentially([scriptName], 0, callback);
    }
}

document.getElementById('export-draw').onclick = function (){

}

generateInfographic = function(){
    generate(completeInformation, '.drawing-surface-content');
}

loadInfographicGeneratorScript(generateInfographic);

