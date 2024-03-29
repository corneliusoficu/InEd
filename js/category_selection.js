var square_button_categories = document.getElementsByClassName("square");

function setMetadataInformation(item){
    
    if(item.classList.contains('subcategory'))
    {
        metadata.set("sub-category", item.id);
    }
    else
    {
        // Clearing the metadata so that no bad category-subcategory 
        // associations can be made
        metadata.clearMetadata();
        metadata.set("category", item.id);
    }
}

for(var index = 0; index < square_button_categories.length; index++){
    square_button_categories[index].addEventListener('click', function(e){
        var currentTarget = e.currentTarget;
        var parent = currentTarget.parentElement;

        setMetadataInformation(parent);

        switch(parent.id){
            case 'chart':
                template.loadPartialWithAssets(
                    'body',
                    "chart_type_selection.html",
                    ["css/chart_type_selection.css"],
                    ["js/chart_type_selection.js"]
                );
                break;
            case 'map':
                template.templateData["input_message"] = "Type in the region you want:";
                template.loadPartialWithAssets(
                    'body',
                    'input_selection.html',
                    ['css/input_selection.css'],
                    ['js/input_selection.js']
                );
                break; 
            default:
                template.loadPartialWithAssets(
                    'body',
                    "data_selection.html",
                    ["css/data_selection.css"],
                    ["js/data_selection.js"]
                );
                break;     
        }
    });
}




    
