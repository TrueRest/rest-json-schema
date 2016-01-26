(function(){
  'use strict';
  var jsonSchema = rest.jsonSchema;
  var hash = jsonSchema.hash;

  // TODO put in util file.
  function isEmpty(obj) {

      // null and undefined are "empty"
      if (obj === null || obj === undefined){
        return true;
      }

      // Assume if it has a length property with a non-zero value
      // that that property is correct.
      if (obj.length > 0) {
        return false;
      }
      if (obj.length === 0){
        return true;
      }

      // Otherwise, does it have any properties of its own?
      // Note that this doesn't handle
      // toString and valueOf enumeration bugs in IE < 9
      for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)){
            return false;
          }
      }

      return true;
  }

  function createSetup(object) {
    if(object instanceof Array){
        for (var x = 0; x < object.length; x++) {
          createSetup(object[x]);
        }
        return;
    }

    // TODO make a better translate of the elements
    var attributesToChange = [
      { 'from'  : 'links',
        'to'    : 'actions' }
    ];

    for (var y = 0; y < attributesToChange.length; y++) {
      var att = attributesToChange[y];
      if(object[att.from]){
        object[att.to] = object[att.from];
        delete object[att.from];
      }
    }

    jsonSchema.updateLink(object);

    for (var key in object) {
      var definition = object[key];

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
          rest.extend(definition.anyOf[i], hash[definition.anyOf[i].$ref]);
        }
      }

      if(isEmpty(definition) || typeof definition === 'object'){
          createSetup(definition);
      }

      rest.extend(definition, hash[definition.$ref], jsonSchema.validate(definition));
      delete definition.$ref;
    }
  }

  jsonSchema.setup = createSetup;

})();
