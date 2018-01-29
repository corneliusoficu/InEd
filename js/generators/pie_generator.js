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

function calculateSectors(data,size) {
    var sectors = [];
    var l = size / 2
    var a = 0 // Angle
    var aRad = 0 // Angle in Rad
    var z = 0 // Size z
    var x = 0 // Side x
    var y = 0 // Side y
    var X = 0 // SVG X coordinate
    var Y = 0 // SVG Y coordinate
    var R = 0 // Rotation

    var sectorsData = []
    var totalCount = 0
    for (var i = 0; i < data.length; i++){
        totalCount += parseInt(data[i].count);
    }
    for (var i = 0; i < data.length; i++){
        var sectorPercentage = parseFloat(data[i].count) / parseFloat(totalCount);
        sectorsData.push({
            name:data[i].name,
            count:data[i].count,
            percentage:sectorPercentage,
            color: data[i].color == undefined ? getRandomColor() : data[i].color
        });
    }
    sectorsData.forEach(function(item){
        a = 360 * item.percentage;
        aCalc = ( a > 180 ) ? 360 - a : a;
        aRad = aCalc * Math.PI / 180;
        z = Math.sqrt( 2*l*l - ( 2*l*l*Math.cos(aRad) ) );
        if( aCalc <= 90 ) {
            x = l*Math.sin(aRad);
        }
        else {
            x = l*Math.sin((180 - aCalc) * Math.PI/180 );
        }
        
        y = Math.sqrt( z*z - x*x );
        Y = y;

        if( a <= 180 ) {
            X = l + x;
            arcSweep = 0;
        }
        else {
            X = l - x;
            arcSweep = 1;
        }
        sectors.push({
            percentage: item.percentage,
            count : item.count,
            name: item.name,
            color: item.color,
            arcSweep: arcSweep,
            L: l,
            X: X,
            Y: Y,
            R: R
        });
        R = R + a;
    });
    return sectors
}

function generate(information,container){
    colors = [];
    sectors = calculateSectors(information.data,500);
    var newSVG = document.createElementNS( "http://www.w3.org/2000/svg","svg" );
    document.querySelector(container).appendChild(newSVG);
    updatedData = [];
    sectors.forEach( function(sector) {
        var newSector = document.createElementNS( "http://www.w3.org/2000/svg","path" );
        newSector.setAttributeNS(null, 'fill', sector.color);
        newSector.setAttributeNS(null, 'd', 'M' + sector.L + ',' + sector.L + ' L' + sector.L + ',0 A' + sector.L + ',' + sector.L + ' 0 ' + sector.arcSweep + ',1 ' + sector.X + ', ' + sector.Y + ' z');
        newSector.setAttributeNS(null, 'transform', 'rotate(' + sector.R + ', '+ sector.L+', '+ sector.L+')');
        newSVG.appendChild(newSector);
        updatedData.push({
            "name":sector.name,
            "count":sector.count,
            "color":sector.color
        });
    });
    newSVG.setAttribute('height','100%');
    newSVG.setAttribute('width','100%');
    newSVG.setAttribute('viewBox','0 0 500 500');

    return updatedData;
}
