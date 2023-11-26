"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    client: {
        type: mongoose_1.Schema.ObjectId,
        ref: 'Clients',
        required: true
    },
    products: [
        {
            product: {
                type: mongoose_1.Schema.ObjectId,
                ref: 'Products'
            },
            quantity: { type: Number }
        }
    ],
    total: { type: Number }
});
exports.default = (0, mongoose_1.model)('Orders', orderSchema);
