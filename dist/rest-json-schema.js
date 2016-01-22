/**
* Just initialize the variables
*
* @class init
*/
if(!window.rest){
  console.error('Rest not found!!!');
}
rest.jsonSchema = {};
rest.jsonSchema.hash = {};

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
      rest.extend(hash[currentString], item);

      if((typeof item === 'object') && (item !== null) && !Array.isArray(item)){
        getHash(item, currentString, hash);
      }
    }
  }

  jsonSchema.createHash = getHash;

})();

(function(){
  'use strict';
  var jsonSchema = rest.jsonSchema;
  function RestJsonSchema(data){
    var vm = this;
    rest.extend(vm, data);
    jsonSchema.createHash(vm, '#');
    jsonSchema.createDefinitions(vm.definitions);
  }

  rest.register('rest-json-schema', RestJsonSchema);
})();

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

(function(){
  'use strict';
  var jsonSchema = rest.jsonSchema;
  jsonSchema.validate = function(objectToValidate){
    var vm = this;

    vm.minItems = function(){
      return this.value.length >= objectToValidate.minItems;
    };

    vm.maxItems = function(){
      return this.value.length <= objectToValidate.maxItems;
    };

    vm.minimum = function(){
      return this.value.length >= objectToValidate.minimum;
    };

    vm.maximum = function(){
      return this.value.length <= objectToValidate.maximum;
    };

    vm.default = function(){
      if(!this.value){
        return objectToValidate.default;
      }
    };

    return vm;
  };

})();
