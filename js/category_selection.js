var icons = document.getElementsByClassName("fa");
var icon_sizes = ["fa-lg", "fa-2x", "fa-3x", "fa-4x", "fa-5x"];
var classIcon = "fa-5x";

function categorySelection()
{
    console.log("ce pl mea mai vrei?");
    var square_button_categories = document.getElementsByClassName("square");

    for(var index = 0; index < square_button_categories.length; index++){
        square_button_categories[index].addEventListener('click', selectSubCategory);
    }

    resize();
}

function selectSubCategory(e)
{
    var currentTarget = e.currentTarget;
    var parent = currentTarget.parentElement;

    switch(parent.id)
    {
        case 'chart':
            template.loadPartial('.section-top',"chart_editor_menu.html");
            template.loadPartialWithScripts(
                '.section-content',
                "chart_editor_content.html",
                ["js/generators/pie_generator.js","js/chart_editor.js","js/accordion_menu.js"]
            );
            break;
        case 'map':
         console.log('esti cretin?');
            template.loadPartialWithScripts(
                '.section-content',
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
}
categorySelection();



    
