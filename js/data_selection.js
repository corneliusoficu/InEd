var radioButtons = document.getElementsByClassName("radio-button");

var descriptionText = {
    'JSON'    : "JSON",
    'API'     : "API",
    'CSV/XLS' : "CSV",

}

function setContent(button){

    var buttonType = button.innerHTML;
    
    for (var i = 0, len = radioButtons.length; i < len; i++){
        radioButtons[i].classList.remove('ghost-button-selected');
    }

    button.classList.add('ghost-button-selected');
}

function changeRadioButtonsState(element){

    var currentButton = element.srcElement;

    setContent(currentButton);
    
}

for (var i = 0, len = radioButtons.length; i < len; i++) {
    radioButtons[i].addEventListener('click',changeRadioButtonsState)
}

setContent(radioButtons[0]);