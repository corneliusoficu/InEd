var radioButtons  = document.getElementsByClassName("radio-button");
var browseButtons = document.getElementsByClassName("inputfile");

var uploadIconHTML = "<i class=\"fa fa-upload upload-icon\" aria-hidden=\"true\"></i>";

var typesForms = {
    api: null,
    csv: null,
    json: null
};

function setContent(button){

    var buttonType = button.innerHTML;
    var buttonId = button.id;

    for (var i = 0, len = radioButtons.length; i < len; i++){

        radioButtons[i].classList.remove('ghost-button-selected');
        var form = typesForms[radioButtons[i].id];
        
        if(form){
            form.style.display = 'none';
        }
        
        
    }

    var currentForm = typesForms[buttonId];
    if(currentForm){
        currentForm.style.display = '';
    }
    

    button.classList.add('ghost-button-selected');
}

function changeRadioButtonsState(element){

    var currentButton = element.srcElement;

    setContent(currentButton);
    
}

function setFileName(input){
    var filepath = input.currentTarget.value;
    var filename = filepath.split( '\\' ).pop();

    var parentDiv = input.currentTarget.parentElement;
    var labels = document.getElementsByClassName("file-upload-label");

    for(var index = 0, len = labels.length; index < len; index++){
        var currentLabel = labels[index];
        if(currentLabel.parentElement == parentDiv && filename != ''){
            currentLabel.innerHTML = uploadIconHTML + filename;
            break;
        }
    }
}

for (var type in typesForms){
    typesForms[type] = document.getElementById(type + '-form');
}

for (var i = 0, len = radioButtons.length; i < len; i++) {
    radioButtons[i].addEventListener('click',changeRadioButtonsState)
}

setContent(radioButtons[0]);

for(var i = 0, len = browseButtons.length; i < len; i++){
    browseButtons[i].addEventListener('change', setFileName);
}



