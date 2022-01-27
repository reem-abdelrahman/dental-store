"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorized = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorized = (req, res, next) => {
    try {
        const auth_header = req.headers.authorization;
        const token = auth_header?.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        throw new Error('Error with authentication middleware' + err);
    }
};
exports.authorized = authorized;
