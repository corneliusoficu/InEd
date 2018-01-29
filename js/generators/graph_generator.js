var SVG_URL = "http://www.w3.org/2000/svg";
var svg;
var dataGroup;

var CIRCLE_RADIUS = 4;
var zoomX = 1;
var zoomY = 1;

function drawLineAxis(x1, x2, y1, y2){
    var newLineGroup = document.createElementNS(SVG_URL, "g");
    newLineGroup.setAttributeNS(null, "class", "grid");
    newLineGroup.setAttributeNS(null,"stroke", "#ccc");
    newLineGroup.setAttributeNS(null,"stroke-dasharray", 0);
    newLineGroup.setAttributeNS(null,"stroke-width", 3);

    var newLine = document.createElementNS(SVG_URL, "line");


    newLine.setAttributeNS(null, "x1", x1);
    newLine.setAttributeNS(null, "x2", x2);
    newLine.setAttributeNS(null, "y1", y1);
    newLine.setAttributeNS(null, "y2", y2);

    newLineGroup.appendChild(newLine);
    svg.appendChild(newLineGroup);

}

function extractAllValuesByKeyName(objectsArray, key){
    var arrayValues = []
    for(index = 0, objectsLen = objectsArray.length; index < objectsLen; index++){
        if(key in objectsArray[index]){
            arrayValues.push(objectsArray[index][key]);
        }
    }
    return arrayValues;
}

function drawPoint(x, y, value){
    var newPoint = document.createElementNS(SVG_URL, "circle");
    newPoint.setAttributeNS(null, "cx", x);
    newPoint.setAttributeNS(null, "cy", y);
    newPoint.setAttributeNS(null, "data-value", value);
    newPoint.setAttributeNS(null, "r", CIRCLE_RADIUS);
    newPoint.setAttributeNS(null, "fill", "red");
    newPoint.setAttributeNS(null, "stroke-width", 1);

    dataGroup.appendChild(newPoint);
}

reducer = (accumulator, currentValue) => accumulator+ ' ' + currentValue.x + ',' + currentValue.y;

function drawPolyline(points){
    var commaSeparatedPoints = points.reduce(reducer, "");
    var newPolyline = document.createElementNS(SVG_URL, "polyline");
    newPolyline.setAttributeNS(null, "fill", "none");
    newPolyline.setAttributeNS(null, "stroke", "#0074d9");
    newPolyline.setAttributeNS(null, "stroke-width", "3");
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
        obj.y = zoomY * obj.y;
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
    information = information.data;
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

function zoomInYGraph(points, container){
    zoomY += 0.5;
    console.log(zoomX);
    clearInner(svg);
    var clonedPoints = deepCopy(points);
    createGraph(clonedPoints, container);
}

function zoomOutYGraph(points, container){
    zoomY -= 0.5;
    console.log(zoomX);
    clearInner(svg);
    var clonedPoints = deepCopy(points);
    createGraph(clonedPoints, container);
}

deepCopy = (obj => JSON.parse(JSON.stringify(obj)));

function zoomInXGraph(points, container){
    console.log(points);
    zoomX += 0.1;
    clearInner(svg);
    var clonedPoints = deepCopy(points);
    createGraph(clonedPoints, container);
}

function zoomOutXGraph(points, container){
    zoomX -= 0.1;
    console.log(zoomX);
    clearInner(svg);
    var clonedPoints = deepCopy(points);
    createGraph(clonedPoints, container);
}
