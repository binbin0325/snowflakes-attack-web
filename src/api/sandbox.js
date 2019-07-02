export function buildRequestBody(body,heard,env) {
  const vm = require('vm');
  let requestBody = body;
  var result = vm.runInNewContext(
    ' function createPM() {\n' +
  '      var pm = new Object()\n' +
  '      pm.globals = new newGlobals()\n' +
  '      pm.variables = new newVariables()\n' +
  '      return pm\n' +
  '    }' +
  'function newGlobals(){\n' +
  '      var globals = new Object()\n' +
  '      globals.set = function(key,value){\n' +
  '        requestBody =requestBody.replace("{{"+key+"}}",value)\n' +
  '      }\n' +
  '      return globals\n' +
  '    }'+
  'function newVariables(){\n' +
  '      var variables = new Object()\n' +
  '      variables.set = function(key,value){\n' +
  '        requestBody=requestBody.replace("{{"+key+"}}",value)\n' +
  '      }\n' +
  '      return variables\n' +
  '    }'+
  'var pm=createPM();' +
    'pm.variables.set("loginType"  ,   "USERNAME");pm.variables.set("password", "123456");pm.variables.set("user", "dubolinguest9");' +
    'requestBody;',{requestBody})

  console.log(result);



 /* ' function createPM() {\n' +
  '      var pm = new Object()\n' +
  '      pm.globals = new newGlobals()\n' +
  '      pm.variables = new newVariables()\n' +
  '      return pm\n' +
  '    }' +
  'function newGlobals(){\n' +
  '      var globals = new Object()\n' +
  '      globals.set = function(key,value){\n' +
  '        requestBody.replace("{{"+key+"}}",value)\n' +
  '      }\n' +
  '      return globals\n' +
  '    }'+
  'function newVariables(){\n' +
  '      var variables = new Object()\n' +
  '      variables.set = function(key,value){\n' +
  '       requestBody.replace("{{"+key+"}}",value)\n' +
  '      }\n' +
  '      return variables\n' +
  '    }'+
  'var pm=createPM();pm.variables.set("loginType"  ,   "USERNAME");, {a});*/
}
