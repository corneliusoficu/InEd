var SCRIPT_NAME_ENDING = "_generator.js";
var SCRIPT_FILE_PATH   = "js/generators/";

function loadInfographicGeneratorScript(){
    if(metadata_info.category == undefined){
        alert("Unkown infographic category!");
    }else{
        var scriptName = SCRIPT_FILE_PATH + metadata_info.category + SCRIPT_NAME_ENDING;
        template.loadScripts([scriptName]);
    }
}
document.getElementById('export-draw').onclick = function (){

}

loadInfographicGeneratorScript();
