import winston, { Logger, format } from 'winston';
import { Format } from 'logform';
import DailyRotateFile from 'winston-daily-rotate-file';
import TransportStream = require('winston-transport');
import { LOG_DEBUG, LOG_ERROR, LOG_INFO, LOG_WARN } from './helper/logging.const';
import { Ilogging } from './interface/logging.interface';
import { injectable } from 'inversify';

type LogMessage = string;
type LogContext = object;

enum LogLevel {
  DEBUG = LOG_DEBUG,
  INFO  = LOG_INFO,
  WARN  = LOG_WARN,
  ERROR = LOG_ERROR,
}

@injectable() 
export class Logging implements Ilogging {
  private _logger: winston.Logger;
  private static _appName:string | undefined = process.env.SITE_NAME;

  constructor() {
    this._logger = this._initializeWinston();
  }

  public logInfo(msg: LogMessage, context?: LogContext):void {
    this._log(msg, LogLevel.INFO, context);
  }
  public logWarn(msg: LogMessage, context?: LogContext):void {
    this._log(msg, LogLevel.WARN, context);
  }
  public logError(msg: LogMessage, context?: LogContext):void {
    this._log(msg, LogLevel.ERROR, context);
  }
  public logDebug(msg: LogMessage, context?: LogContext):void {
    if (process.env.NODE_ENV !== 'production') {
      this._log(msg, LogLevel.DEBUG, context); // Don't log debug in production
    }
  }

  private _log(msg: LogMessage, level: LogLevel, context?: LogContext):void {
    this._logger.log(level, msg, { context });
  }

  private _initializeWinston() :Logger   {
    const logger:Logger  = winston.createLogger({
      transports: Logging._getTransports(),
    });

    return logger;
  }

  private static _getTransports():Array<TransportStream>  {
    const transports: Array<TransportStream> = [
      new winston.transports.Console({
        format: this._getFormatForConsole() ?? this._getFormatForConsole(),
      }),
    ];
    // Production env
    // if (process.env.NODE_ENV === 'production') {
    //   transports.push(this._getFileTransport()); // Also log file in production
    // }

    return transports;
  }

  private static _getFormatForConsole():Format | undefined  {
    return format.combine(
      format.timestamp(),
      format.printf(
        info =>
          `[${info.timestamp}] [${info.level.toUpperCase()}]: ${
            info.message
          } [CONTEXT] -> ${
            info.context ? '\n' + JSON.stringify(info.context, null, 2) : '{}' // Including the context
          }`
      ),
      format.colorize({ all: true })
    );
  }

  private static _getFileTransport():DailyRotateFile  {
    return new DailyRotateFile({
      filename: `${Logging._appName}-%DATE%.log`,
      zippedArchive: true, // Compress gzip
      maxSize: '10m', // Rotate after 10MB
      maxFiles: '14d', // Only keep last 14 days
      format: format.combine(
        format.timestamp(),
        format(info => {
            console.warn(info);        
            const { app } = info;

            this._appName = app;
          return info;
        })(),
        format.json()
      ),
    });
  }
}
