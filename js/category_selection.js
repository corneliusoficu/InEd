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

    console.log(metadata_info);
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
                    "data_selection.html",
                    ["css/data_selection.css"],
                    ["js/data_selection.js"]
                );
                //define a set of rules for checking data for every case and a special message
                //for when data is not matched


                //define function that renders the edit page for every case when the 
                uploadSuccessfull = function(){
                        //template.saveState();
                    }
                break;
            case 'map':

                template.loadPartialWithAssets(
                    'body',
                    'sub_category_selection.html',
                    ["css/sub_category_selection.css"],
                    ['js/category_selection.js']);
                break;
            case 'map-continent':   
            case 'map-country':

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


    
