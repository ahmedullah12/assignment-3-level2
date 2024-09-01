"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const createUserSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        email: zod_1.z.string({ required_error: "Email is required" }),
        password: zod_1.z.string({ required_error: "Password is required" }),
        phone: zod_1.z.string({ required_error: "Phone is required" }),
        role: zod_1.z.enum(['admin', 'user']),
        address: zod_1.z.string({ required_error: "Address is required", }),
    }),
});
const loginSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }),
        password: zod_1.z.string({ required_error: "Password is required" })
    })
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
exports.AuthValidations = {
    createUserSchemaValidation,
    loginSchemaValidation,
    refreshTokenValidationSchema
};
