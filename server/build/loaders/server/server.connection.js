"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConnection = void 0;
const express_1 = __importDefault(require("express"));
const log_1 = require("../../logging/log");
class ServerConnection {
    constructor() {
        this.port = process.env.SERVER_PORT ? process.env.SERVER_PORT : "4000";
        this.app = (0, express_1.default)();
    }
    connect() {
        try {
            this.app.get("/", (req, res) => {
                res.send("Server is working.....");
                res.end();
            });
            this.app.listen(this.port, () => {
                new log_1.Logging().logInfo(`Server is listening at ${process.env.SERVER_URL}:${this.port}`);
                // console.warn(`Server is listening at ${process.env.SERVER_URL}:${this.port}`);
            });
            return true;
        }
        catch (error) {
            console.error("Server connection failed", error);
            new log_1.Logging().logError(`Server connection failed ${error}`);
            return false;
        }
    }
}
exports.ServerConnection = ServerConnection;
//# sourceMappingURL=server.connection.js.map