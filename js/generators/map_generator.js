var SVG_LOCATION = "res/svg";
var svg;

var REGION_NAME_KEY = "name";
var REGION_VALUE_KEY = "count";

var percentColors = [
    { pct: 0.0, color: { r: 0x00, g: 0x64, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0xff, g: 0x00, b: 0 } }
];

function createTooltip(){
    var tooltipTextElement =document.createElementNS("http://www.w3.org/2000/svg", "text");
    tooltipTextElement.setAttribute('id', "tooltip");
    tooltipTextElement.setAttribute("class", "tooltip");
    tooltipTextElement.setAttribute('x', 0);
    tooltipTextElement.setAttribute('y', 0);
    tooltipTextElement.setAttribute('visibility', "hidden");
    document.querySelector("svg g").appendChild(tooltipTextElement);
    console.log(tooltipTextElement);
}

//TODO: Fix for y coordinate
function cursorPoint(evt){

    var pt = svg.createSVGPoint();
    
    pt.x = evt.clientX;
    pt.y = evt.clientY + 30;

    transfom = pt.matrixTransform(svg.getScreenCTM().inverse());
    return transfom;
}

function getRemoteResourceSVG(containerSelector, partialUrl, callback){
	var container = document.querySelector(containerSelector);
	container.innerHTML = "";
    var xhr= new XMLHttpRequest();
    xhr.open('GET', partialUrl, false);
    xhr.send(null);

    if(xhr.status == 200){
        container.innerHTML += xhr.responseText;
        svgElement = document.querySelector("svg");
        svgElement.setAttribute("height", "100%");
        svgElement.setAttribute("width", "100%");
        svgElement.setAttribute('viewBox','0 0 800 800');
        svg = svgElement;

    }else{
        alert("We couldn't find any resource for the data you specified!");
    }
}
    
function applyStatisticalDataTransformation(values)
{
    var transformedValues = values.map(function(value){
       return (Math.asin(Math.sqrt(value)));
    });

    return transformedValues;
}

var getColorForPercentage = function(pct) {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = rangePct;
    var pctUpper = 1 - rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
} 

function validate(data)
{
    return 1;
}

var sumReducer = (accumulator, currentValue) => accumulator + currentValue;

function calculateProportions(numbersArray)
{
    newNumbersArray = numbersArray.map(x => parseFloat(x));

    var sumTotal = newNumbersArray.reduce(sumReducer);
    console.log(sumTotal);
    console.log(newNumbersArray);
    var arrayLen = newNumbersArray.length;

    var proportions = [];
    
    for (var i = 0; i < arrayLen; i++) {
        proportions[i] = newNumbersArray[i] / sumTotal;
    }

    console.log(proportions);

    return proportions;
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

function generateMap(information)
{
    if(!validate(information.data))
    {
        return 0;
    }

    mapData = information.data;

    var proportions = [];
    
    var values = extractAllValuesByKeyName(information.data, REGION_VALUE_KEY);
    
    if("configuration" in information.metadata){
        switch(information.metadata.configuration){
            case "Population":
                proportions = calculateProportions(values);
                proportions = applyStatisticalDataTransformation(proportions);
                break;
            case "Percentage":
                proportions = values;
                break;
            default:
                proportions = calculateProportions(values);
                break;
        }
    }

    var arrayColors = proportions.map(x => getColorForPercentage(x));

    var regions = extractAllValuesByKeyName(information.data, REGION_NAME_KEY);

    for(index = 0, lengthRegions = regions.length; index < lengthRegions; index++)
    {
        var svgElement = document.querySelector('path[title=\"'+ regions[index] +'\"]');

        if(svgElement)
        {
            svgElement.style.fill = arrayColors[index];
        }
    }
}

function generate(information, container){
    var country = information.metadata.type.toLowerCase();
    var svgLink = SVG_LOCATION + '/' + country + '.svg'; 
    
    getRemoteResourceSVG(container, svgLink);
    generateMap(information);
    createTooltip();
    addTooltipEvents(information.data);

    return information;
}

var tooltip;
var information;

function addTooltipEvents(dataInformation){
    information = dataInformation;
    tooltip = document.getElementById('tooltip');
    var countries = document.getElementsByTagName("path");

    for(index = 0, pathLen = countries.length; index < pathLen; index++){
        countries[index].addEventListener("mousemove", mouseOverCountry);
        countries[index].addEventListener("mouseout", mouseOutCountry);
    }
}

function mouseOutCountry(evt){
    tooltip.setAttribute("visibility", "hidden");
}

function findValueInObjectsArray(keySearched){
    
    for(index = 0, len = information.length; index < len; index++){
        object = information[index];
        if(REGION_NAME_KEY in object && object[REGION_NAME_KEY] == keySearched){
            if(REGION_VALUE_KEY in object){
                return object[REGION_VALUE_KEY];
            }
        }
    }

    return 'Unknown';
}

function mouseOverCountry(evt){
    
    var loc = cursorPoint(evt);
    
    tooltip.setAttribute("x", Math.round(loc.x));
    tooltip.setAttribute("y",Math.round(loc.y));


    title = evt.target.getAttribute('title');
    tooltip.innerHTML = title;
    value = findValueInObjectsArray(title);
    
    tooltip.innerHTML +=": " + value;

    tooltip.setAttribute("visibility", "visible");
}



