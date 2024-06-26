"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const env = process.env.NODE_ENV || 'development';
const envFilePath = path_1.default.resolve(__dirname, `../envConfig/.env.${env}`);
dotenv_1.default.config({ path: envFilePath, debug: false });
//# sourceMappingURL=index.env.config.js.map