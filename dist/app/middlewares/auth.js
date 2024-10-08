"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const User_model_1 = require("../modules/User/User.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const fullToken = req.headers.authorization;
        // check if the token sent or not
        if (!fullToken) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                statusCode: http_status_1.default.UNAUTHORIZED,
                message: 'You have no access to this route',
            });
        }
        //removing the Bearer from the full token
        const token = fullToken.split(' ')[1];
        // checking if the given token is valid
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.access_token_secret);
        }
        catch (err) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized22');
        }
        ;
        const { email, role } = decoded;
        const user = yield User_model_1.User.isUserExistByEmail(email);
        //checking if the use exists
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                statusCode: http_status_1.default.UNAUTHORIZED,
                message: 'You have no access to this route',
            });
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
