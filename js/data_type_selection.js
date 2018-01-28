var typeButtons = document.getElementsByClassName("type-button");

function setContent(button_item){

    for (var i = 0, len = typeButtons.length; i < len; i++){
        typeButtons[i].classList.remove('ghost-button-selected');
    }

    metadata.set("configuration", button_item.text);

    button_item.classList.add('ghost-button-selected');
}

function changeButtonState(state){
    setContent(state.target);
}

function goToDataSelection(){
    template.loadPartialWithAssets(
        'body',
        "data_selection.html",
        ["css/data_selection.css"],
        ["js/data_selection.js"]
    );
}

for (var i = 0, len = typeButtons.length; i < len; i++) {
    typeButtons[i].addEventListener('click',changeButtonState)
}

setContent(typeButtons[0]);

