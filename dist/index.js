"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = require("./config/config");
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./utile/database"));
/** Connect to Mongo */
const mongoConnection = new database_1.default(config_1.config.mongo.url);
if (config_1.config.mongo.url == null) {
    console.info('Mongo URL is not set. Server will not start.');
    process.exit(1);
}
// Start Server
mongoConnection.connect(() => {
    StartServer();
});
/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    http_1.default.createServer(app_1.default).listen(config_1.config.server.port, () => console.info(`Server is running on port ${config_1.config.server.port}`));
};
