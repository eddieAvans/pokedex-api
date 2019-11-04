const injector = require('./injector').getInstance();

module.exports = (action) => {
  const parsed = action.split('@');
  const controllerName = parsed[0];
  const actionName = parsed[1];

  const controller = injector.get(controllerName);

  return {
    controller,
    actionMethod: actionName,
  };
};