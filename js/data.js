var metadata_info       = {};
var metadata            = {};

var completeInformation = {};

metadata.clearMetadata = function(){
    metadata_info = {};
}

metadata.set = function(key, value){
    metadata_info[key] = value;
}