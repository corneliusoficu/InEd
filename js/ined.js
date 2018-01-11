
window.onload = function(){
    document.querySelector('#goToCategorySelection').onclick = function(){
        template.loadPartialWithScripts(".section-content","category_selection.html",["js/category_selection.js"]);
    }
}