(function(){
  'use strict';
  var jsonSchema = rest.jsonSchema;
  function RestJsonSchema(data){
    var vm = this;
    rest.extend(vm, data);
    jsonSchema.createHash(vm, '#');
    jsonSchema.setup(vm);
  }

  rest.register('rest-json-schema', RestJsonSchema);
})();
