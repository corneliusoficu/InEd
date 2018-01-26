function calculateSectors(data,size) {
    var sectors = [];
    var colors = [
        "#050864",
        "#61C0BF",
        "#f49d41",
        "#DA507A", 
        "#BB3D49",
        "#f4f141",
        "#DB4547",
        "#42b3f4",
        "#8E7F7C",
        "#5D63FF",
        "#E5E4E2",
    ];

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
    for (key in data){
        totalCount += parseInt(data[key].count)
    }
    for (key in data){
        sectorPercentage = parseFloat(data[key].count) / parseFloat(totalCount);
        sectorColor = data[key].color != undefined ? data[key].color : colors.pop();
        sectorsData.push({
            label:key,
            count:data[key].count,
            percentage:sectorPercentage,
            color:sectorColor
        });
    }


    sectorsData.map( function(item, key ) {
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
            label: item.label,
            color: item.color != undefined ? item.color : colors[key],
            arcSweep: arcSweep,
            L: l,
            X: X,
            Y: Y,
            R: R
        });

        R = R + a;
    })
    return sectors
}

function renderPieChart(data,canvas,size){
    sectors = calculateSectors(data,size);
    var newSVG = document.createElementNS( "http://www.w3.org/2000/svg","svg" );
    canvas.appendChild(newSVG);
    sectors.map( function(sector) {

        var newSector = document.createElementNS( "http://www.w3.org/2000/svg","path" );
        newSector.setAttributeNS(null, 'fill', sector.color);
        newSector.setAttributeNS(null, 'd', 'M' + sector.L + ',' + sector.L + ' L' + sector.L + ',0 A' + sector.L + ',' + sector.L + ' 0 ' + sector.arcSweep + ',1 ' + sector.X + ', ' + sector.Y + ' z');
        newSector.setAttributeNS(null, 'transform', 'rotate(' + sector.R + ', '+ sector.L+', '+ sector.L+')');

        newSVG.appendChild(newSector);
    })

    
    updatedData = {}
    for(var i = 0 ; i < sectors.length ; i++){
        updatedData[sectors[i].label] = {
            label:sectors[i].label,
            count:sectors[i].count,
            color:sectors[i].color
        }
    }
    return updatedData;
}


