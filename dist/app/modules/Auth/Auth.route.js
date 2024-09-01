"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middlewares/validateRequest");
const Auth_validation_1 = require("./Auth.validation");
const Auth_controller_1 = require("./Auth.controller");
const router = (0, express_1.Router)();
router.post("/signup", (0, validateRequest_1.validateRequest)(Auth_validation_1.AuthValidations.createUserSchemaValidation), Auth_controller_1.AuthController.signUp);
router.post("/login", (0, validateRequest_1.validateRequest)(Auth_validation_1.AuthValidations.loginSchemaValidation), Auth_controller_1.AuthController.login);
router.post('/refresh-token', (0, validateRequest_1.validateRequest)(Auth_validation_1.AuthValidations.refreshTokenValidationSchema), Auth_controller_1.AuthController.refreshToken);
exports.AuthRoutes = router;
