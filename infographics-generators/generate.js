var percentColors = [
    { pct: 0.0, color: { r: 0x00, g: 0x64, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0xff, g: 0x00, b: 0 } }
];
    

function applyStatisticalDataTransformation(values, transformationType)
{
    var transformedValues = values.map(function(value){
        switch(transformationType)
        {
            case "population":
                return (Math.asin(Math.sqrt(value)));
            default:
                return value;
        }
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

const sumReducer = (accumulator, currentValue) => accumulator + currentValue;

function calculateProportions(numbersArray)
{
    var sumTotal = numbersArray.reduce(sumReducer);
    console.log(sumTotal);
    var arrayLen = numbersArray.length;

    var proportions = [];
    
    for (var i = 0; i < arrayLen; i++) {
        proportions[i] = numbersArray[i] / sumTotal;
    }

    return proportions;
}

function generateMap(mapData)
{
    if(!validate(mapData))
    {
        return 0;
    }

    var proportions = [];
    var numbers = Object.values(mapData.regions);

    console.log(numbers);

    console.log(numbers);

    if(mapData.number_type == "numerical")
    {
        proportions = calculateProportions(numbers);
        if("measurement" in mapData)
        {
            proportions = applyStatisticalDataTransformation(proportions, mapData.measurement);
        }
    }
    else if(mapData.number_type == "percentage")
    {
        proportions = numbers;
    }

    console.log(proportions);

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

var map_data = {
    measurement:    "population",
    area_id :       "germany",
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

generateMap(map_data);


