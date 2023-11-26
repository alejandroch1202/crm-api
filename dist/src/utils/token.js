"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.extractCredentials = exports.generateId = exports.verifyJwt = exports.generateJwt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJwt = ({ id, name, email }) => {
    const secret = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({
        sub: id,
        email,
        name
    }, secret, {
        expiresIn: '1h'
    });
};
exports.generateJwt = generateJwt;
const verifyJwt = (token) => {
    const secret = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyJwt = verifyJwt;
const generateId = () => {
    return Math.random().toString(32).substring(2) + Date.now().toString(32);
};
exports.generateId = generateId;
const extractCredentials = (headers) => {
    var _a;
    const credentials = (_a = headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const decode = Buffer.from(credentials, 'base64').toString();
    return decode.split(':');
};
exports.extractCredentials = extractCredentials;
const comparePassword = (password, hash) => {
    return bcryptjs_1.default.compareSync(password, hash);
};
exports.comparePassword = comparePassword;
