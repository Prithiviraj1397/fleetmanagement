"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logging = void 0;
// import {injectable} from 'inversify'; // For dependency injection
const winston_1 = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "debug";
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
})(LogLevel || (LogLevel = {}));
// @injectable() // Coming from inversify
class Logging {
    constructor() {
        this._logger = this._initializeWinston();
    }
    logInfo(msg, context) {
        this._log(msg, LogLevel.INFO, context);
    }
    logWarn(msg, context) {
        this._log(msg, LogLevel.WARN, context);
    }
    logError(msg, context) {
        this._log(msg, LogLevel.ERROR, context);
    }
    logDebug(msg, context) {
        if (process.env.NODE_ENV !== 'production') {
            this._log(msg, LogLevel.DEBUG, context); // Don't log debug in production
        }
    }
    _log(msg, level, context) {
        this._logger.log(level, msg, { context });
    }
    _initializeWinston() {
        const logger = winston_1.default.createLogger({
            transports: Logging._getTransports(),
        });
        return logger;
    }
    static _getTransports() {
        var _a;
        const transports = [
            new winston_1.default.transports.Console({
                format: (_a = this._getFormatForConsole()) !== null && _a !== void 0 ? _a : this._getFormatForConsole(),
            }),
        ];
        if (process.env.NODE_ENV === 'production') {
            transports.push(this._getFileTransport()); // Also log file in production
        }
        return transports;
    }
    static _getFormatForConsole() {
        return winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message} [CONTEXT] -> ${info.context ? '\n' + JSON.stringify(info.context, null, 2) : '{}' // Including the context
        }`), winston_1.format.colorize({ all: true }));
    }
    static _getFileTransport() {
        return new winston_daily_rotate_file_1.default({
            filename: `${Logging._appName}-%DATE%.log`,
            zippedArchive: true, // Compress gzip
            maxSize: '10m', // Rotate after 10MB
            maxFiles: '14d', // Only keep last 14 days
            format: winston_1.format.combine(winston_1.format.timestamp(), (0, winston_1.format)(info => {
                console.warn(info);
                const { app } = info;
                this._appName = app;
                return info;
            })(), winston_1.format.json()),
        });
    }
}
exports.Logging = Logging;
Logging._appName = process.env.SITE_NAME;
//# sourceMappingURL=log.js.map