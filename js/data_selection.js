var radioButtons  = document.getElementsByClassName("radio-button");
var browseButtons = document.getElementsByClassName("inputfile");

var uploadIconHTML = "<i class=\"fa fa-upload upload-icon\" aria-hidden=\"true\"></i>";

var typesForms = {
    api: null,
    csv: null,
    json: null
};
function uploadSuccessfull(uploadedData){

    completeInformation["metadata"] = metadata_info;
    completeInformation["data"]     = uploadedData; 

    template.loadPartialWithAssets(
            'body',
            "infographic_editor.html",
            ["css/infographic_editor.css"],
            ["js/infographic_editor.js","js/accordion_menu.js"]
        );
}

function csvTojs(csv) {
    var chartColumns = ["Tag","Count","color"];
    var mapColumns = ["Tag","Count"];
    var headers = null;
    if(metadata_info.category == "chart"){
        headers = chartColumns;
    }
    if(metadata_info.category == "map"){
        headers = mapColumns;
    }

    var lines=csv.split("\n");
    var result = {};
    for(var i=0; i<lines.length; i++) {

        var row = lines[i];
        var separatedRowValues = [],

        queryIdx = 0,
        startValueIdx = 0,
        idx = 0;

        if (row.trim() === '') { continue; }
        while (idx < row.length) {
        /* if we meet a double quote we skip until the next one */
            var c = row[idx];

            if (c === '"') {
                do { c = row[++idx]; } while (c !== '"' && idx < row.length - 1);
            }

            if (c === ',' || (idx === row.length - 1 && row[idx - 1] != ',')) {
                /* we've got a value */
                var value = row.substr(startValueIdx, idx - startValueIdx).trim();

                /* skip first double quote */
                if (value[0] === '"') { value = value.substr(1); }
                /* skip last comma */
                if (value[value.length - 1] === ',') { value = value.substr(0, value.length - 1); }
                /* skip last double quote */
                if (value[value.length - 1] === '"') { value = value.substr(0, value.length - 1); }

                separatedRowValues.push(value);

                startValueIdx = idx + 1;
            }

            ++idx;
        }

        if("category" in metadata_info && metadata_info.category == "map"){
            if(separatedRowValues.length >= 2)
            {
                result[separatedRowValues[0]] = separatedRowValues[1];
            }
        }

    }

    console.log(result);

    return JSON.stringify(result);
}


function setContent(button_item){

    var buttonType = button_item.innerHTML;
    var buttonId =   button_item.id;

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
    
    button_item.classList.add('ghost-button-selected');
}

function changeRadioButtonsState(element){

    var currentButton = element.target;

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
        metadata_info.text = this.responseText;
        metadata_info.extension = apiUrl.split('.').pop().toLowerCase();
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

    var fileExtension = null;
    var input = form.getElementsByClassName('form-group')[0].getElementsByTagName('input')[0];
    if(input.getAttribute('type') == 'text'){
        if(input.value){
            var allowedextentions = ["csv",'xlsx','xls','json'];
            fileExtension = input.value.split('.').pop().toLowerCase();
            if (allowedextentions.includes(fileExtension) == false)
                throw "File extension must be " + allowedextentions.join('/') + ' !';;
            loadFileFromLink(input.value)
        }
        else throw "Api link not completed"
    }
    else if(input.getAttribute('type') == 'file'){
        var files = input.files;
        if(files.length == 0)
            throw "File not uploaded";
        else {
            var excelExtentions = ["csv",'xlsx','xls'];
            fileExtension = files[0].name.split('.').pop().toLowerCase();
            if (form.id == "csv-form" && excelExtentions.includes(fileExtension) == false)
                throw "File extension must be " + excelExtentions.join('/') + ' !';
            if(form.id == "json-form" && fileExtension != "json")
                throw "File extension must be json";

        }
        fr = new FileReader();
        fr.onloadend = function() {
            metadata_info.text = fr.result;
            metadata_info.extension = fileExtension;
        };
        fr.readAsText(files[0]);
    }
    //file is uploaded now


    displayProcessingStatus();
    setTimeout(function(){
        if(Object.keys(metadata_info.text).length === 0){
            displayUploadError("Upload failed!");
        }
        else{
            if(metadata_info.extension == "csv"){
                metadata_info.text = csvTojs(metadata_info.text);
            }
            try{
                uploadedData = JSON.parse(metadata_info.text);
                uploadSuccessfull(uploadedData);
            }
            catch(err){
                displayUploadError("Error with the data you provided!");
            }
        }
    },1000);

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


