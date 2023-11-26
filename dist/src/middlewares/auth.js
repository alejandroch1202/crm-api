"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./../utils/token");
exports.default = (req, res, next) => {
    const authHeaders = req.get('Authorization');
    if (authHeaders === undefined) {
        return res.status(401).json({ ok: false, message: 'Unauthenticated' });
    }
    try {
        const token = authHeaders.split(' ')[1];
        (0, token_1.verifyJwt)(token);
        next();
    }
    catch (error) {
        return res.status(401).json({ ok: false, message: 'Invalid token' });
    }
};
