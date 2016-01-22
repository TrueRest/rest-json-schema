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
