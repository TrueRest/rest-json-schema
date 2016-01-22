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
