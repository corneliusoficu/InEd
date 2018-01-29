var colors = [];
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    }
    if(colors.includes(color) == false){
        colors.push(color);
        return color;
    }
    else return getRandomColor();
}
function createRectangle(xCoord, yCoord, width, height,color) {
    var newRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    newRect.setAttributeNS(null, "width", width);
    newRect.setAttributeNS(null, "height", height);
    newRect.setAttributeNS(null, "x", xCoord);
    newRect.setAttributeNS(null, "y", yCoord);
    newRect.setAttributeNS(null, "fill", color);
    return newRect;
}

// function createLabel(index, xCoord, yCoord, id) {
//   var newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
//   newText.textContent = data.labelText[index] + " (" + data.values[index]+ ")";
//   newText.setAttributeNS(null, "id", "label_" + id);
//   newText.setAttributeNS(null, "fill", data.labelColors[index%data.labelColors.length]);
//   newText.setAttributeNS(null, "font-family", data.labelFont);
//   newText.setAttributeNS(null, "x", xCoord);
//   newText.setAttributeNS(null, "y", yCoord + data.barHeight/2);
//   newText.style.visibility = "hidden";
//   return newText;
// }


// function displayLabels() {
//   for(var i=0; i<data.labelsObjects.length; ++i) {
//     data.labelsObjects[i].style.visibility = "visible";
//   }
// }

function generate(information,container){
    var newSVG = document.createElementNS( "http://www.w3.org/2000/svg","svg" );
    var data = information.data;
    console.log(data);
    console.log(data.length);
    var height = 500;
    var width = 500;
    var x = 0;
    data.sort(function(a,b){
        return b.count - a.count;
    });
    var max_count = data[0].count;
    data.forEach(function(element){
        var rndColor = getRandomColor();
        var rectHeight = height * element.count / max_count;
        var rectWidth = width/data.length;
        var y = height - rectHeight;
        var newRect = createRectangle(x,y,rectWidth,rectHeight,rndColor);
        newSVG.appendChild(newRect);
        x += rectWidth;
    });
    newSVG.setAttribute('height','100%');
    newSVG.setAttribute('width','100%');
    newSVG.setAttribute('viewBox','0 0 500 500');
    newSVG.style.tranform = "rotate(180deg)";
    document.querySelector(container).appendChild(newSVG);
}