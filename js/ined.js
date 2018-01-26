inedGlobalVars = {}
window.onload = function(){
    document.querySelector('#goToCategorySelection').onclick = function(){
        template.loadPartialWithAssets(
        	"body",
        	"category_selection.html",
        	["css/category_selection.css"],
        	["js/category_selection.js"]
        );
    }
}