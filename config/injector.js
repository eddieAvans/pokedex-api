const Injector = require('../helpers/injector');
const PokemonService = require('../services/pokemonService');
const PokemonController = require('../routes/controllers/pokemonController');

module.exports = (() => {
  const injector = Injector.getInstance();

  /**
   * Controllers
   */
  injector.register('PokemonController', PokemonController);

  /**
   * Services
   */
  injector.register('PokemonService', PokemonService);
})();
