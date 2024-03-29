
function populateEditSurface(information,container){
	var editor = document.querySelector(container);
	var editorTable = document.createElement('div');
	setAttributes(editorTable,{'class':'data-editor-table','id':'chart-editor-table'});
	data = information.data;
	for(var i = 0 ;i < data.length;i++){
		var newSlice = document.createElement("div");
		setAttributes(newSlice,{'class':'data-row','id':data[i].name,'data-row-count':i});

		var sliceLabel = document.createElement("label");
		var text = document.createTextNode(data[i].name);  
		sliceLabel.appendChild(text);

		var colorInput = document.createElement("input");
		setAttributes(colorInput,{"class":"color-input","type":"color","value":data[i].color});

		var countInput = document.createElement("input");
		setAttributes(countInput,{
			"class":"count-input","type":"number","value":data[i].count});
		newSlice.appendChild(colorInput);
		newSlice.appendChild(sliceLabel);
		newSlice.appendChild(countInput);
		editorTable.appendChild(newSlice);	
	}
	editor.appendChild(editorTable);
	var inputs =  document.querySelectorAll(container +' input');
	for(var i = 0; i < inputs.length; i++){
		inputs[i].onchange = function(){
			var rowNumber = this.parentElement.getAttribute('data-row-count');
			var propertyType = this.getAttribute('class').split('-')[0];
			information.data[rowNumber][propertyType] = this.value;
			generate(information, '.drawing-surface-content');
		};
	};
}