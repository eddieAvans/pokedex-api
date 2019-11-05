module.exports = class PokemonController {
    constructor(PokemonService) {
        this.pokemonService = PokemonService;
    }

    async getPokemon(req, res) {
        const id = this.pokemonService.getPokemonId(req['params']['id']);
        const pokemon = await this.pokemonService.getPokemon(id);

        return res.json(pokemon);
    }

    async getPokemonSpecies(req, res) {
        const id = this.pokemonService.getPokemonId(req['params']['id']);
        const species = await this.pokemonService.getPokemonSpecies(id);

        return res.json(species);
    }

    async getEvolutionChain(req, res) {
        const id = this.pokemonService.getPokemonId(req['params']['id']);
        const evolutionChain = await this.pokemonService.getEvolutionChain(id);

        return res.json(evolutionChain);
    }

    async updatePokemon(req, res) {
        const { id,
                name,
                type,
                secondary_type,
                ability,
                secondary_ability,
                height,
                weight } = req.body;
        
        const pokemonId = this.pokemonService.getPokemonId(req['params']['id']);
        await this.pokemonService.updatePokemon(pokemonId, name, type, secondary_type, ability, secondary_ability, height, weight);
        return res.json('editing...');
    }
}