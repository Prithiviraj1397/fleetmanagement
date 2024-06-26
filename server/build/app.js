"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./envConfig/index.env.config");
const server_connection_1 = require("./loaders/server/server.connection");
const server = new server_connection_1.ServerConnection();
server.connect();
//# sourceMappingURL=app.js.map