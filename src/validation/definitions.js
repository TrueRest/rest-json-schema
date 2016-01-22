(function(){
  'use strict';
  var jsonSchema = rest.jsonSchema;
  var hash = jsonSchema.hash;

  function getReferences(definitions) {
    for (var key in definitions) {
      console.log('##########################');
      console.log('key:', key);
      console.log('value:', definitions[key]);
      var definition = definitions[key];
      rest.extend(definition, hash[definition.$ref]);


      var i;
      if(definition.allOf){
        for (i = 0; i < definition.allOf.length; i++) {
          rest.extend(definition.allOf[i], hash[definition.allOf[i].$ref]);
        }
      }
      if(definition.oneOf){
        for (i = 0; i < definition.oneOf.length; i++) {
          rest.extend(definition.oneOf[i], hash[definition.allOf[i].$ref]);
        }
      }
      if(definition.anyOf){
        for (i = 0; i < definition.anyOf.length; i++) {
          rest.extend(definition.anyOf[i], hash[definition.allOf[i].$ref]);
        }
      }
    }
  }

  function createDefinitions(definitions){
    if(!definitions){
        return;
    }

    // Create the definitions
    getReferences(definitions);

  }

  jsonSchema.createDefinitions = createDefinitions;

})();
