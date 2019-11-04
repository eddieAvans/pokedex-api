const parseAction = require('../helpers/parse-action');

module.exports = (action) => {
  const { controller, actionMethod } = parseAction(action);

  const callback = controller[actionMethod].bind(controller);

  return (req, res, next) => callback(req, res)
    .then((data) => {
      res.status(200);
      res.locals.data = data;
    })
    .catch(err => next(err))
    .finally(() => next());
};