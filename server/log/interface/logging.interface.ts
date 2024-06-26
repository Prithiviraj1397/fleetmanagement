export type LogMessage = string;
export type LogContext = object;

export interface Ilogging{
    logInfo(msg: LogMessage, context?: LogContext):void
    logWarn(msg: LogMessage, context?: LogContext):void
    logError(msg: LogMessage, context?: LogContext):void
    logDebug(msg: LogMessage, context?: LogContext):void
}
