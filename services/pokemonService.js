const fs = require('fs');
const path = require('path');

module.exports = class PokemonService {
    constructor() {
        this.pokedex = {
            'bulbasaur': 1,
            'ivysaur': 2,
            'venusaur': 3,
            'charmander': 4,
            'charmeleon': 5,
            'charizard': 6,
            'squirtle': 7,
            'wartortle': 8,
            'blastoise': 9
        }
    }

    getPokemonId(id) {
        if (isNaN(id)) {
            return this.pokedex[id.toLowerCase()];
        } else {
            return id;
        }
    }

    readDataFile(filePath) {
        try {
            let rawData = fs.readFileSync(filePath, 'utf8');
            let pokemonData = JSON.parse(rawData);
            return pokemonData;
        } catch {
            return undefined;
        }
    }

    async getPokemon(id) { return this.readDataFile(path.join(__dirname, '../db/pokemons/' + id + '.json')); }
    async getPokemonSpecies(id) { return this.readDataFile(path.join(__dirname, '../db/pokemonSpecies/' + id + '.json')); }
    async getEvolutionChain(id) { return this.readDataFile(path.join(__dirname, '../db/evolutionChain/' + id + '.json')); }

    async updatePokemon(id,
                        name,
                        type,
                        secondary_type,
                        ability,
                        secondary_ability,
                        height,
                        weight) {
        try {
            let pokemon = fs.readFileSync(path.join(__dirname, '../db/pokemons/' + id + '.json'), 'utf8');
            let data = JSON.parse(pokemon);
            data.name = name !== undefined ? name : data.name;
            data.types[0] = type !== undefined ? { "type": { "name": type } } : data.types[0];
            data.abilities[0] = ability !== undefined ? {"ability": { "name": ability }} : data.abilities[0];

            data.height = height !== undefined ? height : data.height;
            data.weight = weight !== undefined ? weight : data.weight;

            if(data.abilities[1] !== undefined && secondary_ability !== undefined) {
                data.abilities[1] = {"ability": { "name": secondary_ability }};
            }
            if(data.types[1] !== undefined && secondary_ability !== undefined) {
                data.types[1] = { "type": { "name": secondary_type } };
            }
            
            fs.writeFileSync(path.join(__dirname, '../db/pokemons/' + id + '.json'), JSON.stringify(data));
            return 'Successfully edited pokemon with id ' + id;
        } catch {
            return undefined;
        }
    }
}