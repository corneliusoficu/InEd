var icons = document.getElementsByClassName("fa");
var icon_sizes = ["fa-lg", "fa-2x", "fa-3x", "fa-4x", "fa-5x"];
var classIcon = "fa-5x";

function categorySelection()
{
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

        case 'map':
            window.location.href = "sub_category_selection.html";
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

function largestWidth()
{
    var mq = window.matchMedia("(min-width: 599px)");
    return mq.matches;
}

function largeWidth()
{
    var mq = window.matchMedia("(max-width: 598px)");
    return mq.matches;
}

function resize()
{
    if(largeWidth())
    {
        classIcon = "fa-2x";      
    }
    else if(largestWidth())
    {
        classIcon = "fa-5x";  
    }

    for(var index_el = 0; index_el < icons.length; index_el++)
    {
        var element = icons[index_el];
        for(var index = 0; index < icon_sizes.length; index++)
        {
            var icon_size = icon_sizes[index];
            if(element.classList.contains(icon_size) && icon_size != classIcon)
            {
                element.classList.remove(icon_size);
                element.classList.add(classIcon);
            }
        }
    }
}

window.onload   = categorySelection;
window.onresize = resize;



    
