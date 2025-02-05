"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("./db");
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, config_1.default)(app);
(0, routes_1.default)(app);
exports.default = app;
