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
exports.remove = exports.update = exports.find = exports.list = exports.uploadImage = exports.create = void 0;
const fs_1 = require("fs");
const multer_1 = require("../config/multer");
const Product_1 = __importDefault(require("./../models/Product"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const product = new Product_1.default(req.body);
        if (((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) !== undefined) {
            product.image = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
        }
        yield product.save();
        res.status(201).json({ ok: true, message: 'Product created' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Server error' });
        next();
    }
});
exports.create = create;
const uploadImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, multer_1.upload)(req, res, (error) => {
        if (error !== undefined && error !== null) {
            res.json({ message: error });
        }
        next();
    });
});
exports.uploadImage = uploadImage;
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products;
        if (req.query.search !== undefined) {
            products = yield Product_1.default.find({
                name: new RegExp(req.query.search, 'i')
            });
        }
        else {
            products = yield Product_1.default.find();
        }
        res.status(200).json({ ok: true, products });
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
        const product = yield Product_1.default.findById(req.params.id);
        if (product === null) {
            return res.status(404).json({ ok: false, message: 'Product not found' });
        }
        res.status(200).json({ ok: true, product });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Server error' });
        next();
    }
});
exports.find = find;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const changes = req.body;
        // If user didn't upload an image, keep the previous one
        if (((_c = req.file) === null || _c === void 0 ? void 0 : _c.filename) !== '') {
            changes.image = (_d = req.file) === null || _d === void 0 ? void 0 : _d.filename;
        }
        else {
            const product = yield Product_1.default.findById(req.params.id);
            if (product === null) {
                return res.status(404).json({ ok: false, message: 'Product not found' });
            }
            changes.image = product.image;
        }
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(req.params.id, changes);
        if (updatedProduct === null) {
            return res.status(404).json({ ok: false, message: 'Product not found' });
        }
        res.status(200).json({ ok: true, message: 'Product updated' });
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
        const product = yield Product_1.default.findById(req.params.id);
        if (product === null) {
            return res.status(404).json({ ok: false, message: 'Product not found' });
        }
        (0, fs_1.unlink)(`uploads/${product.image}`, (error) => {
            if (error !== undefined && error !== null) {
                console.log('HERE', error);
            }
        });
        yield Product_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ ok: true, message: 'Product deleted' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Server error' });
        next();
    }
});
exports.remove = remove;
