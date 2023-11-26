"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const connect_1 = __importDefault(require("./db/connect"));
const routes_1 = __importDefault(require("./routes"));
const whitelist = [process.env.FRONTEND_URL];
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
const app = (0, express_1.default)();
(0, connect_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static('uploads'));
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        const allowed = whitelist.some((domain) => domain === origin);
        if (allowed) {
            callback(null, true);
        }
        else {
            callback(new Error(`Origin "${origin}" Blocked by CORS`), false);
        }
    }
}));
(0, routes_1.default)(app);
app.listen(PORT, () => {
    console.log(`[server] Running on http://localhost:${PORT}`);
});
