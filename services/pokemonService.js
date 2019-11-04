const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);

module.exports = class PokemonService {
    constructor() {}

    async getPokemon(id) {
        let rawdata = fs.readFileSync(path.join(__dirname, '../db/pokemons/' + id + '.json'), 'utf8');
        let pokemonData = JSON.parse(rawdata);
        return pokemonData;
    }

    async getPokemonSpecies(id) {
        let rawdata = fs.readFileSync(path.join(__dirname, '../db/pokemonSpecies/' + id + '.json'), 'utf8');
        let pokemonData = JSON.parse(rawdata);
        return pokemonData;
    }

    async getEvolutionChain(id) {
        let rawdata = fs.readFileSync(path.join(__dirname, '../db/evolutionChain/' + id + '.json'), 'utf8');
        let pokemonData = JSON.parse(rawdata);
        return pokemonData;
    }

    async addPokemon() {
        let dir = await readdir(path.join(__dirname, '../db/pokemons'));
        
        if(dir !== 'undefined') {
            console.log('Creating pokemon number ' + (dir.length + 1));
        }

        return true;
    }
}