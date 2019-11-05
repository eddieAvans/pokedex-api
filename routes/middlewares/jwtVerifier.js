const jwt = require('jsonwebtoken');

module.exports = {
    // Verify Token
    verifyToken: function(req, res, next) {
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
    }
};