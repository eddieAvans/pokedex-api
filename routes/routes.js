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
router.get('/move/:id', handle('MoveController@getMove'));

router.post('/hack', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, auth) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                auth: auth
            });
        }
    });
});

router.post('/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'eddie',
        email: 'eddie@gmail.com'
    }

    jwt.sign({user}, 'secretKey', { expiresIn: '500s' }, (err, token) => {
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
        req.token = accessToken;
        next();
    } else {
        res.sendStatus(403);
    }
};

module.exports = router;