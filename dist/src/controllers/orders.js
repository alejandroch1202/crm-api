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
exports.remove = exports.update = exports.find = exports.list = exports.create = void 0;
const Order_1 = __importDefault(require("./../models/Order"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = new Order_1.default(req.body);
        yield order.save();
        res.status(201).json({ ok: true, message: 'Order created' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Server error' });
        next();
    }
});
exports.create = create;
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find()
            .populate('client')
            .populate({ path: 'products.product', model: 'Products' });
        res.status(200).json({ ok: true, orders });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Server error' });
        next();
    }
});
exports.list = list;
const find = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.findById(req.params.id)
            .populate('client')
            .populate({ path: 'products.product', model: 'Products' });
        if (order === null) {
            return res.status(404).json({ ok: false, message: 'Order not found' });
        }
        res.status(200).json({ ok: true, order });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Server error' });
        next();
    }
});
exports.find = find;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.findByIdAndUpdate(req.params.id, req.body);
        if (order === null) {
            return res.status(404).json({ ok: false, message: 'Order not found' });
        }
        res.status(200).json({ ok: true, message: 'Order updated' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Server error' });
        next();
    }
});
exports.update = update;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.findByIdAndDelete(req.params.id);
        if (order === null) {
            return res.status(404).json({ ok: false, message: 'Order not found' });
        }
        res.status(200).json({ ok: true, message: 'Order deleted' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Server error' });
        next();
    }
});
exports.remove = remove;
