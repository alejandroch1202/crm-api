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
exports.create = void 0;
const User_1 = __importDefault(require("./../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User_1.default(req.body);
        user.password = bcryptjs_1.default.hashSync(user.password, 10);
        yield user.save();
        res.status(201).json({ ok: true, message: 'User created' });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ ok: false, message: 'Email already used' });
        }
        else {
            console.log(error);
            res.status(500).json({ ok: false, message: 'Server error' });
        }
        next();
    }
});
exports.create = create;
