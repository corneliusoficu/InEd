var chartData = {
	"Audi":{label:"Audi",color:undefined,count:30},
	"BMW":{label:"BMW",color:"#4C991A",count:20},
	"Honda":{label:"Honda",color:"#781A99",count:10},
	"Mercedes":{label:"Honda",color:"#781A99",count:10}

};


function populateEditSurface(data){
	var editor = document.getElementById('properties-panel');
	for(var key in data){
		var newSlice = document.createElement("div");
		setAttributes(newSlice,{'class':'chart-slice','id':key});

		var sliceLabel = document.createElement("p");
		var text = document.createTextNode(key);  
		sliceLabel.appendChild(text);

		var colorInput = document.createElement("input");
		setAttributes(colorInput,{"class":"color-input","type":"color","value":data[key].color});

		var countInput = document.createElement("input");
		setAttributes(countInput,{
			"class":"count-input","type":"number","value":data[key].count});
		newSlice.appendChild(sliceLabel);
		newSlice.appendChild(colorInput);
		newSlice.appendChild(countInput);
		editor.appendChild(newSlice);	
	}

	//Update chartData on change of any field in the chart editor
	var slices = document.getElementsByClassName('chart-slice');
	for( var i = 0 ; i < slices.length ; i++){
		slices[i].querySelector('.color-input').onchange = function(){
			chartData[this.parentNode.id].color = this.value;
			updateChart();
		}
		slices[i].querySelector('.count-input').onchange = function(){
			chartData[this.parentNode.id].count = this.value;
			updateChart();
		}
	}
}

function updateChart(){
	var drawing_surface = document.getElementsByClassName('drawing-surface')[0];
	drawing_surface.innerHTML = "";
	chartData = renderPieChart(chartData,drawing_surface,500);
}

var drawing_surface = document.getElementsByClassName('drawing-surface')[0];
chartData =renderPieChart(chartData,drawing_surface,500);
populateEditSurface(chartData);

window.onresize = function(){
	if(screen.width < 480){
		document.getElementsByTagName('svg')[0].setAttribute('viewBox','0 0 600 600');
		}
	else{
	document.getElementsByTagName('svg')[0].removeAttribute('viewBox');
	}
}

		
