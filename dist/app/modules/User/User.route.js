"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const User_controller_1 = require("./User.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)("admin"), User_controller_1.UserController.getAllUser);
router.get("/user", User_controller_1.UserController.getUser);
router.put("/make-admin/:id", User_controller_1.UserController.makeAdmin);
exports.UserRoutes = router;
