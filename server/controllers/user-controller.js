const userService = require("../services/user-service");
const ApiError = require("../exceptions/api-error");
const { validationResult } = require("express-validator");

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error'))
            } 
            const {email, nickname, password} = req.body;
            await userService.registration(email, nickname, password);
            return res.json({message: 'Done!'})
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new UserController();