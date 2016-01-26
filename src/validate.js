(function(){
  'use strict';
  var jsonSchema = rest.jsonSchema;
  jsonSchema.validate = function(objectToValidate){
    var vm = this;

    function isDefined(value) {
      return value;
    }

    vm.validator = {};

    vm.validator.validateMinItems = function(){
      return (isDefined(objectToValidate) && objectToValidate.value.length >= objectToValidate.minItems) || !objectToValidate.minItems;
    };

    vm.validator.validateMaxItems = function(){
      return (isDefined(objectToValidate) && objectToValidate.value.length <= objectToValidate.maxItems) || !objectToValidate.maxItems;
    };

    vm.validator.validateMinimum = function(){
      return (isDefined(objectToValidate) && objectToValidate.value.length <= objectToValidate.maxItems) || !objectToValidate.maxItems;
    };

    vm.validator.validateMaximum = function(){
      return (isDefined(objectToValidate) && objectToValidate.value.length <= objectToValidate.maximum) || !objectToValidate.maximum;
    };

    vm.validator.setDefault = function(){
      if(!objectToValidate.value){
        objectToValidate.value = objectToValidate.default;
        return vm.default;
      }
    };

    return vm.validator;
  };

})();
