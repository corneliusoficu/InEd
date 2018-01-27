var metadata_info = {};
var metadata      = {};

var uploadedData  = {};

metadata.clearMetadata = function(){
    metadata_info = {};
}

metadata.set = function(key, value){
    metadata_info[key] = value;
}