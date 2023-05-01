const jwt = require('jsonwebtoken');

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_TOKEN_KEY, {expiresIn: '30d'});
        return accessToken
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_TOKEN_KEY);
            return userData;
        } catch (e) {
            return null
        }
    }
}

module.exports = new TokenService();