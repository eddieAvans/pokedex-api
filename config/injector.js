const Injector = require('../helpers/injector');
const PokemonService = require('../services/pokemonService');
const PokemonController = require('../routes/controllers/pokemonController');
const MoveService = require('../services/moveService');
const MoveController = require('../routes/controllers/moveController');

module.exports = (() => {
  const injector = Injector.getInstance();

  /**
   * Controllers
   */
  injector.register('PokemonController', PokemonController);
  injector.register('MoveController', MoveController);

  /**
   * Services
   */
  injector.register('PokemonService', PokemonService);
  injector.register('MoveService', MoveService);
})();
