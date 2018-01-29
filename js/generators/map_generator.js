var SVG_LOCATION = "res/svg";

var percentColors = [
    { pct: 0.0, color: { r: 0x00, g: 0x64, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0xff, g: 0x00, b: 0 } }
];

function getRemoteResource(containerSelector, partialUrl, callback){
	var container = document.querySelector(containerSelector);
	container.innerHTML = "";
    var xhr= new XMLHttpRequest();
    xhr.open('GET', partialUrl, false);
    xhr.send(null);

    if(xhr.status == 200){
        container.innerHTML += xhr.responseText;
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
    var sumTotal = numbersArray.reduce(sumReducer);
    var arrayLen = numbersArray.length;

    var proportions = [];
    
    for (var i = 0; i < arrayLen; i++) {
        proportions[i] = numbersArray[i] / sumTotal;
    }

    return proportions;
}

function generateMap(information)
{
    if(!validate(information.data))
    {
        return 0;
    }

    mapData = information.data;

    var proportions = [];
    var numbers = Object.values(mapData.regions);
    proportions = calculateProportions(numbers);

    console.log(information.metadata);
    if("configuration" in information.metadata){
        switch(information.metadata.configuration){
            case "Population":
                proportions = applyStatisticalDataTransformation(proportions);
                break;
        }
    }


    var arrayColors = proportions.map(x => getColorForPercentage(x));

    var regions = Object.keys(mapData.regions);

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
    
    getRemoteResource(container, svgLink);
    generateMap(information);
    addTooltipEvents(information.data);
    document.querySelector('svg').setAttribute('height','100%');
    document.querySelector('svg').setAttribute('width','100%');
    document.querySelector('svg').setAttribute('viewBox','0 0 800 800');
}

var map_data = {
    metadata: {
        category:       "map",
        "sub-category": "map-country",
        type:           "Germany"
    },
    data:{
        measurement:    "population",
        number_type :   "numerical",
        regions : {
            "North Rhine-Westphalia":   17837000,
            "Bavaria":                  12542000,
            "Baden-Wurttemberg":        10755000,  
            "Lower Saxony":             7914000,
            "Hesse":                    6066000,
            "Saxony":                   4143000,
            "Rhineland-Palatinate":     4052803,
            "Berlin":                   3469000,
            "Schleswig-Holstein":       2833000,
            "Brandenburg":              2500000,
            "Saxony-Anhalt":            2331000,
            "Thuringia":                2231000,	 	
            "Hamburg":                  1788000,
            "Mecklenburg-Vorpommern":   1639000,
            "Saarland":                 1018000,
            "Bremen":                   661000
        }
    }
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

function mouseOverCountry(evt){
    tooltip.setAttribute("x", evt.clientX - 30);
    tooltip.setAttribute("y", evt.clientY - 60);
    title = evt.target.getAttribute('title');
    tooltip.innerHTML = title;
    if(title in information.regions){
        tooltip.innerHTML +=": " + information.regions[title];
    }else{
        tooltip.innerHTML +=": unknown";
    }

    tooltip.setAttribute("visibility", "visible");
}



