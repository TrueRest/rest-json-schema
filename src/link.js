(function(){
  'use strict';
  var jsonSchema = rest.jsonSchema;
  jsonSchema.updateLink = function(object){
    if (!object.href){
      return;
    }

    if (!object.method){
      object.method = 'GET';
    }

    if(!object.encType){
      object.encType = 'application/json';
    }
  };

})();
