"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const token_1 = require("../utils/token");
const fileStorage = multer_1.default.diskStorage({
    destination: (request, file, callback) => {
        callback(null, __dirname + './../../uploads/');
    },
    filename: (req, file, callback) => {
        const extension = file.mimetype.split('/')[1];
        callback(null, `${(0, token_1.generateId)()}.${extension}`);
    }
});
const fileFilter = (request, file, callback) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
const upload = (0, multer_1.default)({ storage: fileStorage, fileFilter }).single('image');
exports.upload = upload;
