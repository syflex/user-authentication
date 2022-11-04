"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./route"));
const app = (0, express_1.default)();
/** Routes */
app.use('/api/', route_1.default);
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://koyo-product-upload.netlify.app/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
exports.default = app;
