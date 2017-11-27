var square_button_categories = document.getElementsByClassName("square");

for(var index = 0; index < square_button_categories.length; index++){
    square_button_categories[index].addEventListener('click', selectSubCategory);
}

function selectSubCategory(e){
    var currentTarget = e.currentTarget;
    var parent = currentTarget.parentElement;

    switch(parent.id){

        case 'map':
            window.location.href = "sub_category_selection.html";
            break;
        case 'map-continent':
            window.location.href = "input_selection.html?category=map&subcategory=continent";
            break;
        case 'map-country':
            window.location.href = "input_selection.html?category=map&subcategory=country";
        default:
            window.location.href = "data_selection.html";
            break;
        
    }

    


}