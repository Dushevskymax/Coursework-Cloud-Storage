const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const tokenService = require("./token-service");
const dirService = require("./dir-service");
const pathService = require("./path-service");

class UserService {
    async registration(email, nickname, password) {
        const isMailExist = await userModel.findOne({ email });
        if (isMailExist) {
            throw ApiError.BadRequest(`User with this email <${email}> already exists`);
        }
        const isNicknameExist = await userModel.findOne({ nickname });
        if (isNicknameExist) {
            throw ApiError.BadRequest(`User with this nickname <${nickname}> already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await userModel.create({ email, nickname, password: hashPassword });
        const userDto = new UserDto(user); 
        const rootUserDirPath = pathService.getSourcePath(userDto.id);
        await dirService.newDirectory(rootUserDirPath);
    }

    async login(email, password) {
        const user = await userModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest(`User with email <${email}> not found`);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Invalid password');
        }
        const userDto = new UserDto(user);
        const token = tokenService.generateToken({...userDto});
        return {
            accessToken: token,
            user: userDto
        }
    }

}

module.exports = new UserService();