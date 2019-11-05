const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const handle = require('../helpers/handle');

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the pokedex API'
    });
});

router.get('/pokemon/:id', handle('PokemonController@getPokemon'));
router.get('/pokemon-species/:id', handle('PokemonController@getPokemonSpecies'));
router.get('/evolution-chain/:id', handle('PokemonController@getEvolutionChain'));
router.get('/move/:id', handle('MoveController@getMove'));

router.post('/update', verifyToken, handle('PokemonController@updatePokemon'));

router.post('/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'eddie'
    }

    jwt.sign({user}, 'secretKey', (err, token) => {
        res.json({
            token
        });
    });
});

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const accessHeader = req.headers['authorization'];
    if (typeof accessHeader !== 'undefined') {
        const access = accessHeader.split(' ');
        const accessToken = access[1];

        jwt.verify(accessToken, 'secretKey', (err, auth) => {
            if (err) {
                res.sendStatus(403);
            }
        });
        next();
    } else {
        res.sendStatus(403);
    }
};

module.exports = router;