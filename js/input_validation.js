const ERROR_NOT_FILLED = "You need to write something!";

var input_box = document.getElementById("search");
var validation_text = document.getElementById("validation-text");

function validateFormInput(){

    if(input_box.value == ''){
        validation_text.innerText = ERROR_NOT_FILLED;
        validation_text.style.visibility = 'visible';
        return false;
    }else{
        return true;
    }
}

input_box.onkeydown = function(e){
    if(e.keyCode == 13){
        return validateFormInput();
    }
 };

                