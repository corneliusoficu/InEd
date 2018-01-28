template = {}

currentPageScripts = [];
currentPageStyles  = [];

template.templateData = {};

addEventListener('popstate', function (event) {
	if(event.state){
		template.loadPartialWithAssets(
			event.state.container, 
			event.state.partial, 
			event.state.styles, 
			event.state.scripts, 
			false);
	}	
});

template.savePageIntoHistroy = function(containerSelector, partialUrl, styleUrls, scriptUrls){
	var stateObj = {
		partial:   partialUrl,
		container: containerSelector,
		styles:    [],
		scripts:   []
	}

	Array.prototype.forEach.call(styleUrls, function(element){
		stateObj.styles.push(element);
	});

	Array.prototype.forEach.call(scriptUrls, function(element){
		stateObj.scripts.push(element);
	});

	history.pushState(stateObj, null, "ined.html");
}

template.unloadStyles = function(stylesCollection){
	var styles = document.getElementsByTagName('link');
	Array.prototype.forEach.call(styles,function(element){
		if(stylesCollection.indexOf(element.getAttribute("href")) != -1){
			element.remove();
		}	
	});
}

template.loadStyles = function(stylesCollection){
	template.removeContentFromPage(currentPageStyles);
	Array.prototype.forEach.call(stylesCollection,function(element){
		var style = document.createElement('link');
		style.setAttribute('type','text/css');
		style.setAttribute('rel','stylesheet');
		style.setAttribute('href',element);
		currentPageStyles.push(style);
		document.getElementsByTagName("head")[0].appendChild(style);
	});
}


template.loadScripts = function(scriptUrls){
	template.removeContentFromPage(currentPageScripts);
	template.loadJsFilesSequentially(scriptUrls,0);
}

template.removeContentFromPage = function(contentArray){
	Array.prototype.forEach.call(contentArray, function(element){
		element.remove();
	});
	contentArray = [];
}

template.loadJsFilesSequentially = function(scriptsCollection, startIndex, librariesLoadedCallback) {
     if (scriptsCollection[startIndex]) {
       var fileref = document.createElement('script');
       fileref.setAttribute("type","text/javascript");
       fileref.setAttribute("src", scriptsCollection[startIndex]);
       fileref.onload = function(){
         startIndex = startIndex + 1;
         template.loadJsFilesSequentially(scriptsCollection, startIndex, librariesLoadedCallback)
       };
 
	   currentPageScripts.push(fileref);
	   document.getElementsByTagName("head")[0].appendChild(fileref)
     }
     else {
       if (librariesLoadedCallback != undefined)
       		librariesLoadedCallback();
     }
 }


template.loadPartial = function(containerSelector, partialUrl, callback){
	var container = document.querySelector(containerSelector);
	container.innerHTML = "";
	var xhr= new XMLHttpRequest();
	xhr.open('GET', partialUrl, true);
	xhr.onreadystatechange= function() {
	    if (this.readyState!==4) return;
	    if (this.status!==200) return; // or whatever error handling you want
	    container.innerHTML += this.responseText;
	    if(callback != undefined)
	    	callback();
	};
	xhr.send();
}

template.loadPartialWithAssets = function(containerSelector, partialUrl, styleUrls, scriptUrls, saveInHistory){
	if(saveInHistory == undefined ||(saveInHistory != undefined && saveInHistory == true))
	{
		template.savePageIntoHistroy(containerSelector, partialUrl, styleUrls, scriptUrls);
	}
	template.loadPartial(
						containerSelector,
						partialUrl,
						function(){
							template.loadStyles(styleUrls);
							template.loadScripts(scriptUrls);
						});
}

template.goBack = function(){
	window.history.back();
}

window.onload = function(){
        template.loadPartialWithAssets(
        	"body",
        	"welcome.html",
        	[],
        	["js/welcome.js"]
        );
}





