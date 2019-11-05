const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const handle = require('../helpers/handle');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the pokedex API'
    });
});

router.get('/pokemon/:id', handle('PokemonController@getPokemon'));
router.get('/pokemon-species/:id', handle('PokemonController@getPokemonSpecies'));
router.get('/evolution-chain/:id', handle('PokemonController@getEvolutionChain'));

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