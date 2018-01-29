function populateEditSurface(completeInformation, container){
    var editor = document.querySelector(container);
    var editorTable = document.createElement('div');
    setAttributes(editorTable,{'class':'data-editor-table','id':'chart-editor-table'});
    var newSlice = document.createElement("div");
    setAttributes(newSlice,{'class':'data-row','id':'zoomXSlice','data-row-count':i});

    var sliceLabel = document.createElement("label");
    var text = document.createTextNode("Zoom X:");  
    sliceLabel.appendChild(text);

    var zoomInXButton = document.createElement("button");
    setAttributes(zoomInXButton, {'id' : "zoomin", 'type': "button"});
    zoomInXButton.innerText = "+";
    zoomInXButton.addEventListener("click", function(){
        zoomInXGraph(completeInformation, '.drawing-surface-content');
    });

    var zoomOutXButton = document.createElement("button");
    setAttributes(zoomOutXButton, {'id' : "zoomout", 'type': "button"});
    zoomOutXButton.innerText = "-";
    zoomOutXButton.addEventListener("click", function(){
        zoomOutXGraph(completeInformation, '.drawing-surface-content');
    });


    newSlice.appendChild(sliceLabel);
    newSlice.appendChild(zoomInXButton);
    newSlice.appendChild(zoomOutXButton);
    editorTable.appendChild(newSlice);


    var newSlice = document.createElement("div");
    setAttributes(newSlice,{'class':'data-row','id':'zoomYSlice','data-row-count':i});

    var sliceLabel = document.createElement("label");
    var text = document.createTextNode("Zoom Y:");  
    sliceLabel.appendChild(text);

    var zoomInYButton = document.createElement("button");
    setAttributes(zoomInYButton, {'id' : "zoominY", 'type': "button"});
    zoomInYButton.innerText = "+";
    zoomInYButton.addEventListener("click", function(){
        zoomInYGraph(completeInformation, '.drawing-surface-content');
    });

    var zoomOutYButton = document.createElement("button");
    setAttributes(zoomOutYButton, {'id' : "zoomoutY", 'type': "button"});
    zoomOutYButton.innerText = "-";
    zoomOutYButton.addEventListener("click", function(){
        zoomOutYGraph(completeInformation, '.drawing-surface-content');
    });

    newSlice.appendChild(sliceLabel);
    newSlice.appendChild(zoomInYButton);
    newSlice.appendChild(zoomOutYButton);
    editorTable.appendChild(newSlice);




    editor.appendChild(editorTable);
}

