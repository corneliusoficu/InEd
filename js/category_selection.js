var square_button_categories = document.getElementsByClassName("square");

for(var index = 0; index < square_button_categories.length; index++){
    square_button_categories[index].addEventListener('click', function(e){
        var currentTarget = e.currentTarget;
        var parent = currentTarget.parentElement;

        switch(parent.id){
            case 'chart':
                template.loadPartial('.section-top',"chart_editor_menu.html");
                template.loadPartialWithAssets(
                    'body',
                    "chart_editor_content.html",
                    ["css/layout_chart_editor.css"],
                    ["js/generators/pie_generator.js","js/chart_editor.js","js/accordion_menu.js"]
                );
                template.unloadStyles(["css/layout.css"]);
                break;
            case 'map':
                template.loadPartialWithAssets(
                    'body',
                    'sub_category_selection.html',
                    ['js/sub_category_selection.js']);
                break;
            case 'map-continent':
                window.location.href = "input_selection.html?category=map&subcategory=continent";
                break;
            case 'map-country':
                window.location.href = "input_selection.html?category=map&subcategory=country";
                break;
            default:
                window.location.href = "data_selection.html";
                break;     
        }
    });
}



    
