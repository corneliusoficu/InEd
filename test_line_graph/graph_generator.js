var SVG_URL = "http://www.w3.org/2000/svg";
var svg;
var dataGroup;

var CIRCLE_RADIUS = 1;
var zoomX = 1;
var zoomY = 1;

function drawLineAxis(x1, x2, y1, y2){
    var newLineGroup = document.createElementNS(SVG_URL, "g");
    newLineGroup.setAttributeNS(null, "class", "grid");
    var newLine = document.createElementNS(SVG_URL, "line");

    newLine.setAttributeNS(null, "x1", x1);
    newLine.setAttributeNS(null, "x2", x2);
    newLine.setAttributeNS(null, "y1", y1);
    newLine.setAttributeNS(null, "y2", y2);

    newLineGroup.appendChild(newLine);
    svg.appendChild(newLineGroup);

}

function drawAxisXPoints(points, minX, maxX){
    
}

function drawPoint(x, y, value){
    var newPoint = document.createElementNS(SVG_URL, "circle");
    newPoint.setAttributeNS(null, "cx", x);
    newPoint.setAttributeNS(null, "cy", y);
    newPoint.setAttributeNS(null, "data-value", value);
    newPoint.setAttributeNS(null, "r", CIRCLE_RADIUS);
    dataGroup.appendChild(newPoint);
}

reducer = (accumulator, currentValue) => accumulator+ ' ' + currentValue.x + ',' + currentValue.y;

function drawPolyline(points){
    var commaSeparatedPoints = points.reduce(reducer, "");
    var newPolyline = document.createElementNS(SVG_URL, "polyline");
    newPolyline.setAttributeNS(null, "fill", "none");
    newPolyline.setAttributeNS(null, "stroke", "#0074d9");
    newPolyline.setAttributeNS(null, "stroke-width", "1");
    newPolyline.setAttributeNS(null, "points", commaSeparatedPoints);
    svg.appendChild(newPolyline);
}

function sortPointsX(a, b){
    if(a.x === b.x){
        return 0;
    }else{
        return a.x < b.x ? -1 : 1;
    }
}

function sortPointsY(a, b){
    if(a.y === b.y){
        return 0;
    }else{
        return a.y < b.y ? -1 : 1;
    }
}

function applyStatisticalSeparation(points){
    points.map(function(obj){
        obj.x = zoomX * obj.x;
        console.log(obj.x);
        obj.y = obj.y;
        return obj;
    });
}

function findBoundingPoints(points){
    boundingPoints = {
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0,
    }

    boundingPoints.minX = points.reduce(function(a, b){
        return a.x == Math.min(a.x, b.x)? a: b;
    }).x;

    boundingPoints.minY = points.reduce(function(a, b){
        return a.y == Math.min(a.y, b.y)? a: b;
    }).y;

    boundingPoints.maxX = points.reduce(function(a, b){
        return a.x == Math.max(a.x, b.x)? a: b;
    }).x;

    boundingPoints.maxY = points.reduce(function(a, b){
        return a.y == Math.max(a.y, b.y)? a: b;
    }).y;

    return boundingPoints;

}

function createGraph(information, container){
    var surface = document.querySelector(container);
    surface.appendChild(svg);
    
    dataGroup = document.createElementNS(SVG_URL, "g");
    dataGroup.setAttributeNS(null, "class", "data");
    
    svg.appendChild(dataGroup);

    svg.setAttribute('height','100%');
    svg.setAttribute('width','100%');
    svg.setAttribute('viewBox','0 0 1024 500');

   
    applyStatisticalSeparation(information);

    var boundingPoints = findBoundingPoints(information);

    drawLineAxis(boundingPoints.minX, boundingPoints.minX, boundingPoints.minY, boundingPoints.maxY);
    drawLineAxis(boundingPoints.minX, boundingPoints.maxX ,boundingPoints.maxY ,boundingPoints.maxY);


    information.sort(sortPointsY);
    information.sort(sortPointsX);

    drawPolyline(information);

    for(var index = 0, lenPoints = information.length; index < lenPoints; index++){
        drawPoint(information[index].x, information[index].y, information[index].value);
    }
}

function generate(information, container){
    svg = document.createElementNS( SVG_URL, "svg" );
    createGraph(information, container);
    
}

function clearInner(node){
    while(node.hasChildNodes()){
        clear(node.firstChild);
    }
}

function clear(node){
    while(node.hasChildNodes()){
        clear(node.firstChild);
    }
    node.parentNode.removeChild(node);
}

var backupPoints;



function zoomInGraph(){
    
    zoomX += 1;
    zoomY += 0.3;
    console.log(zoomX);
    clearInner(svg);
    var clonedPoints = points.map(a=>Object.assign({}, a));
    createGraph(clonedPoints, ".drawing-board");
}

function zoomOutGraph(){
    zoomX -= 1;
    zoomY -= 0.3;
    console.log(zoomX);
    clearInner(svg);
    var clonedPoints = points.map(a=>Object.assign({}, a));
    createGraph(clonedPoints, ".drawing-board");
}

var points = [
    { x: 50, y: 71, value: "" },
    { x: 12, y: 80, value: "" },
    { x: 65, y: 55, value: "" },
    { x: 77, y: 71, value: "" },
    { x: 70, y: 53, value: "" },
    { x: 29, y: 22, value: "" },
    { x: 42, y: 38, value: "" },
    { x: 5, y: 57, value: "" },
    { x: 54, y: 35, value: "" },
    { x: 39, y: 38, value: "" },
    { x: 0, y: 61, value: "" },
    { x: 18, y: 79, value: "" },
    { x: 21, y: 48, value: "" },
    { x: 67, y: 7, value: "" },
    { x: 54, y: 6, value: "" },
    { x: 54, y: 47, value: "" },
    { x: 34, y: 62, value: "" },
    { x: 59, y: 97, value: "" },
    { x: 96, y: 57, value: "" },
    { x: 22, y: 18, value: "" },
    { x: 50, y: 82, value: "" },
    { x: 57, y: 14, value: "" },
    { x: 8, y: 48, value: "" },
    { x: 51, y: 95, value: "" },
    { x: 37, y: 62, value: "" },
    { x: 80, y: 21, value: "" },
    { x: 57, y: 80, value: "" },
    { x: 34, y: 11, value: "" },
    { x: 15, y: 64, value: "" },
    { x: 29, y: 42, value: "" },
    { x: 87, y: 91, value: "" },
    { x: 44, y: 6, value: "" },
    { x: 36, y: 63, value: "" },
    { x: 25, y: 78, value: "" },
    { x: 17, y: 43, value: "" },
    { x: 72, y: 58, value: "" },
    { x: 54, y: 18, value: "" },
    { x: 61, y: 67, value: "" },
    { x: 71, y: 22, value: "" },
    { x: 22, y: 84, value: "" },
    { x: 86, y: 54, value: "" },
    { x: 8, y: 96, value: "" },
    { x: 91, y: 17, value: "" },
    { x: 14, y: 66, value: "" },
    { x: 9, y: 81, value: "" },
    { x: 24, y: 97, value: "" },
    { x: 9, y: 77, value: "" },
    { x: 85, y: 40, value: "" },
    { x: 28, y: 16, value: "" },
    { x: 49, y: 3 , value: "" }
]


var clonedPoints = points.map(a=>Object.assign({}, a));
generate(clonedPoints, ".drawing-board");