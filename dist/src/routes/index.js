"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const users_1 = __importDefault(require("./users"));
const clients_1 = __importDefault(require("./clients"));
const products_1 = __importDefault(require("./products"));
const orders_1 = __importDefault(require("./orders"));
const auth_2 = __importDefault(require("./../middlewares/auth"));
const router = (app) => {
    const router = (0, express_1.Router)();
    app.use('/api/v1', router);
    router.use('/auth', auth_1.default);
    router.use('/users', auth_2.default, users_1.default);
    router.use('/clients', auth_2.default, clients_1.default);
    router.use('/products', auth_2.default, products_1.default);
    router.use('/orders', auth_2.default, orders_1.default);
};
exports.default = router;
