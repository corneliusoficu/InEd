
function populateEditSurface(information,container){
	var editor = document.querySelector(container);
	var editorTable = document.createElement('div');
	setAttributes(editorTable,{'class':'data-editor-table','id':'map-editor-table'});
	data = information.data;
	for(var i = 0 ;i < data.length;i++){
		var newRow = document.createElement("div");
		setAttributes(newRow,{'class':'data-row','id':data[i].name,'data-row-count':i});

		var regionLabel = document.createElement("label");
		var text = document.createTextNode(data[i].name);  
		regionLabel.appendChild(text);

		var countInput = document.createElement("input");
		setAttributes(countInput,{
			"class":"count-input","type":"number","value":data[i].count});
		newRow.appendChild(regionLabel);
		newRow.appendChild(countInput);
		editorTable.appendChild(newRow);	
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