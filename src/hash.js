(function(){
  'use strict';
  var jsonSchema = rest.jsonSchema;
  function getHash(data, stringInitial){
    var hash = jsonSchema.hash;
    for (var k in data) {
      var item = data[k];
      var currentString = stringInitial + ('/' + k);

      if(!hash[currentString]){
        hash[currentString] = {};
      }
      if(typeof item === 'object'){
        rest.extend(hash[currentString], item);
      }else{
        hash[currentString][k] = item;
      }

      if((typeof item === 'object') && (item !== null) && !Array.isArray(item)){
        getHash(item, currentString, hash);
      }
    }
  }

  jsonSchema.createHash = getHash;

})();
