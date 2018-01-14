var radioButtons  = document.getElementsByClassName("radio-button");
var browseButtons = document.getElementsByClassName("inputfile");

var uploadIconHTML = "<i class=\"fa fa-upload upload-icon\" aria-hidden=\"true\"></i>";

var typesForms = {
    api: null,
    csv: null,
    json: null
};
document.getElementById("back-to-category-selection").onclick = function(){
       template.loadPartialWithAssets(
            "body",
            "category_selection.html",
            ["css/category_selection.css"],
            ["js/category_selection.js"]
            );
}

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
function loadFileFromLink(apiUrl){
    var xhr= new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onreadystatechange= function() {
        if (this.readyState!==4) return;
        if (this.status!==200) return;
        inedGlobalVars.data.type = this.responseType;
        inedGlobalVars.data.text = this.responseText;
    };
    xhr.send();
}
function displayProcessingStatus(){
    var currentWindow = document.getElementsByClassName('section-bottom-data-selection')[0];
    var loadingWindow = document.getElementsByClassName('processing-status')[0];
    currentWindow.style.display = 'none';
    loadingWindow.style.display = 'block';
}
function displayUploadError(errorMessage){
    var currentWindow = document.getElementsByClassName('section-bottom-data-selection')[0];
    var loadingWindow = document.getElementsByClassName('processing-status')[0];
    currentWindow.style.display = 'block';
    loadingWindow.style.display = 'none';
    var error = document.getElementById('upload-error-message');
    error.innerHTML = errorMessage;
    error.style.display = 'block';
}
function getFileFromForm(form){
    inedGlobalVars.data = {};
    var input = form.getElementsByClassName('form-group')[0].getElementsByTagName('input')[0];
    if(input.getAttribute('type') == 'text'){
        if(input.value)
            loadFileFromLink(input.value)
        else throw "Api link not completed"
    }
    else if(input.getAttribute('type') == 'file'){
        var files = input.files;
        console.log(files[0]);
        if(files.length == 0)
            throw "File not uploaded";
        fr = new FileReader();
        inedGlobalVars.data.text = fr.readAsText(files[0]);
    }
    displayProcessingStatus();
    setTimeout(function(){
            if(Object.keys(inedGlobalVars.data).length === 0){
                displayUploadError("Upload failed!");
            }
            else{
                uploadSuccessfull();
            }
        },3000);

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
document.getElementById('upload-data-button').onclick = function (){
    var forms = document.getElementsByClassName('form-content');
    Array.prototype.forEach.call(forms,function(form){
        if(form.style.display != 'none'){
            try{
                getFileFromForm(form);
            }
            catch(err){
                displayUploadError(err);
            }
        }
    });
}


