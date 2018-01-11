template = {}
template.loadScripts = function(scriptUrls){
	template.loadJsFilesSequentially(scriptUrls,0);
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
 
       document.getElementsByTagName("head")[0].appendChild(fileref)
     }
     else {
       if (librariesLoadedCallback != undefined)
       		librariesLoadedCallback();
     }
 }


template.loadPartial = function(containerSelector,partialUrl,callback){
	var container = document.querySelector(containerSelector);
	console.log(container);
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

template.loadPartialWithScripts = function(containerSelector,partialUrl,scriptUrls){
	template.loadPartial(
						containerSelector,
						partialUrl,
						function(){
							template.loadScripts(scriptUrls);
						});
}


