/**
 * @source https://stackoverflow.com/a/31194949
 */
function args(func) {
    /* eslint-disable */
    return (func + '')
      .replace(/[/][/].*$/mg,'') // strip single-line comments
      .replace(/\s+/g, '') // strip white space
      .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments
      .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters
      .replace(/=[^,]+/g, '') // strip any ES6 defaults
      .split(',').filter(Boolean); // split & filter [""]
  }
  
  module.exports = (() => {
    function Injector() {
      this.stack = {};
      this.singletons = {};
    }
  
    Injector.getInstance = function getInstance() {
      if (!this.instance) {
        this.instance = new Injector();
      }
  
      return this.instance;
    };
  
    Injector.prototype.get = function get(className) {
      const registration = this.stack[className];
  
      if (!registration) {
        throw Error(`${className} not registered`);
      }
  
      if (registration.singleton) {
        return this.singleton(registration);
      }
  
      return this.resolve(registration);
    };
  
    Injector.prototype.register = function register(name, type, singleton=false) {
      this.stack[name] = {
        name,
        singleton,
        type,
      };
    };
  
    Injector.prototype.resolve = function resolve(registration) {
      const { type } = registration;
      const argNames = args(type);
  
      if (argNames.length === 0) {
        return eval(`new type()`);
      }
  
      const resolvedArgs = argNames.map(name => this.get(name));
  
      let input = '';
      resolvedArgs.forEach((arg, index) => {
        input += `resolvedArgs[${index}]`;
  
        if (index !== resolvedArgs.length - 1) {
          input += ', ';
        }
      });
  
      return eval(`new type(${input})`);
    };
  
    Injector.prototype.singleton = function singleton(registration) {
      const { name } = registration;
  
      let instance = this.singletons[name];
  
      if (!instance) {
        instance = this.singletons[name] = this.resolve(registration);
      }
  
      return instance;
    };
  
    return Injector;
  })();