const SELECT_CONTINENT_MESSAGE = 'Type the name of the continent:';
const SELECT_CUNTRY_MESSAGE    = 'Type the name of the country:';

function findGetParameter(parameterName){
    var result = null, tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

var inputMessage = document.getElementById('input-message');

var category    = findGetParameter(   'category');
var subcategory = findGetParameter('subcategory');

switch(category){
    case 'map':
    
        if(subcategory == 'continent'){
            inputMessage.innerHTML = SELECT_CONTINENT_MESSAGE;
        }else if(subcategory == 'country'){
            inputMessage.innerHTML = SELECT_CUNTRY_MESSAGE;
        }else{
            window.history.back();
        }
        break;

    default:
        window.history.back();

}