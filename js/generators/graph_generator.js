var SVG_URL = "http://www.w3.org/2000/svg";

function drawLineAxis(x1, x2, y1, y2){
    var newLineGroup = document.createElementNS(SVG_URL, "g");

    var newLine = document.createElementNS()

}

function generate(information, container){
    var newSVG = document.createElementNS( SVG_URL, "svg" );
    var surface = document.querySelector(container);
    surface.appendChild(newSVG);
    
    var newPolyline = document.createElementNS(SVG_URL, "polyline");
    newPolyline.setAttributeNS(null, "fill", "none");
    newPolyline.setAttributeNS(null, "stroke", "#0074d9");
    newPolyline.setAttributeNS(null, "stroke-width", "3");
    newPolyline.setAttributeNS(null, "points", "0,120 20,60 40,80 60,20");
    newSVG.appendChild(newPolyline);

    newSVG.setAttribute('height','100%');
    newSVG.setAttribute('width','100%');
    newSVG.setAttribute('viewBox','0 0 500 500');


}