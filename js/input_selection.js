var ERROR_NOT_FILLED = "You need to write something!";

var input_box       = document.getElementById("search");
var validation_text = document.getElementById("validation-text");
var guidanceMessage = document.getElementById("input-message");

function validateFormInput(){

    if(input_box.value == ''){
        validation_text.innerText = ERROR_NOT_FILLED;
        validation_text.style.visibility = 'visible';
        return false;
    }else{
        metadata.set("type", input_box.value);
        return true;
    }
}

input_box.onkeydown = function(e){
    if(e.keyCode == 13){
        return validateFormInput();
    }
};

function goToDataSelection(){
    template.loadPartialWithAssets(
        'body',
        "data_selection.html",
        ["css/data_selection.css"],
        ["js/data_selection.js"]
    );
}

if('input_message' in template.templateData){
    guidanceMessage.innerHTML = template.templateData['input_message'];
}
