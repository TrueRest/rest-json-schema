(function(){
  'use strict';

  function restJsonSchema(data){
    var vm = this;
    rest.extend(vm, data);
    rest.jsonSchema.validator.call(this);
    

  }

  rest.factory.register('rest-json-schema', restJsonSchema);
})();
