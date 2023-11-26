"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const produtcSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: true
    }
});
exports.default = (0, mongoose_1.model)('Products', produtcSchema);
