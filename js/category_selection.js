var square_button_categories = document.getElementsByClassName("square");

for(var index = 0; index < square_button_categories.length; index++){
    square_button_categories[index].addEventListener('click', selectSubCategory);
}

function selectSubCategory(e){
    var currentTarget = e.currentTarget;
    var parent = currentTarget.parentElement;
    if(parent.id == 'map'){
        window.location.href = "sub_category_selection.html";
    }else{
        
    }
}