module.exports = class PokemonController {
    constructor(PokemonService) {
        this.pokemonService = PokemonService;
    }

    async getPokemon(req, res) {
        const id = req['params']['id'];
        const pokemon = await this.pokemonService.getPokemon(id);

        return res.json(pokemon);
    }

    async getPokemonSpecies(req, res) {
        const id = req['params']['id'];
        const species = await this.pokemonService.getPokemonSpecies(id);

        return res.json(species);
    }

    async getEvolutionChain(req, res) {
        const id = req['params']['id'];
        const evolutionChain = await this.pokemonService.getEvolutionChain(id);

        return res.json(evolutionChain);
    }

    async addPokemon(req, res) {
        await this.pokemonService.addPokemon();
        console.log('done');
        return res.json('editing...');
    }
}