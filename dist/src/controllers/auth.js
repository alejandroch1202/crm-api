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
exports.login = void 0;
const User_1 = __importDefault(require("./../models/User"));
const token_1 = require("../utils/token");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if exists authorization header
        if (req.headers.authorization === undefined) {
            return res.status(400).json({ ok: false, message: 'Invalid credentials' });
        }
        // Extract credentials from headers
        const [email, password] = (0, token_1.extractCredentials)(req.headers);
        // Check if the user exists
        const user = yield User_1.default.findOne({ email });
        if (user === null) {
            return res.status(401).json({ ok: false, message: 'User not found' });
        }
        // Check if the password is correct
        const auth = (0, token_1.comparePassword)(password, user.password);
        if (!auth) {
            return res.status(401).json({ ok: false, message: 'Invalid credentials' });
        }
        // Generate JWT
        const token = (0, token_1.generateJwt)({
            id: user.id,
            name: user.name,
            email: user.email
        });
        res.status(200).json({ ok: true, token });
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
exports.login = login;
