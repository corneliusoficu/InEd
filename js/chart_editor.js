

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

var chartData = [ 
	{name:"Audi",color:"#D15E41",percentage:30},
	{name:"BMW",color:"#4C991A",percentage:20},
	{name:"Honda",color:"#781A99",percentage:10},

	{name:"Audi",color:"#D15E41",percentage:30},
	{name:"BMW",color:"#4C991A",percentage:20},
	{name:"Honda",color:"#781A99",percentage:10},

	{name:"Audi",color:"#D15E41",percentage:30},
	{name:"BMW",color:"#4C991A",percentage:20},
	{name:"Honda",color:"#781A99",percentage:10},

	{name:"Audi",color:"#D15E41",percentage:30},
	{name:"BMW",color:"#4C991A",percentage:20},
	{name:"Honda",color:"#781A99",percentage:10},


		{name:"Audi",color:"#D15E41",percentage:30},
	{name:"BMW",color:"#4C991A",percentage:20},
	{name:"Honda",color:"#781A99",percentage:10},

	{name:"Audi",color:"#D15E41",percentage:30},
	{name:"BMW",color:"#4C991A",percentage:20},
	{name:"Honda",color:"#781A99",percentage:10},

	{name:"Audi",color:"#D15E41",percentage:30},
	{name:"BMW",color:"#4C991A",percentage:20},
	{name:"Honda",color:"#781A99",percentage:10},

	{name:"Audi",color:"#D15E41",percentage:30},
	{name:"BMW",color:"#4C991A",percentage:20},
	{name:"Honda",color:"#781A99",percentage:10},
];
console.log(chartData);
function updateChartData(){
	var newChartData = [];
	var slices = document.getElementsByClassName('chart-slice');
	for (var i = 0 ; i < slices.length ; i++){
		var name = slices[i].querySelector('p').innerHTML;
		var color = slices[i].querySelector('.color-input').value;
		var percentage = slices[i].querySelector('.percentage-input').value;
		newChartData.push({ name:name , color:color,percentage:percentage});
	}
	chartData = newChartData;
	console.log(chartData);
}

function populateEditProperties(data){
	console.log("In edit");
	var editor = document.getElementsByClassName('editor-surface')[0];
	for(var i = 0 ; i < data.length ; i++){
		var newSlice = document.createElement("div");
		newSlice.setAttribute('class','chart-slice');

		var sliceName = document.createElement("p");
		var text = document.createTextNode(data[i].name);  
		sliceName.appendChild(text);

		var colorInput = document.createElement("input");
		setAttributes(colorInput,{"class":"color-input","type":"color","value":data[i].color});


		var percentageInput = document.createElement("input");
		setAttributes(percentageInput,{
			"class":"percentage-input","type":"number","min":0,"max":100,"step":"0.1","value":data[i].percentage});

		newSlice.appendChild(sliceName);
		newSlice.appendChild(colorInput);
		newSlice.appendChild(percentageInput);




		editor.appendChild(newSlice);	
	}
	for(var i = 0 ; i < data.length ; i++){
		var newSlice = document.createElement("div");
	}
	colorInput.onchange = updateChartData();
	percentageInput.onchange = updateChartData();
}


populateEditProperties(chartData);
		
