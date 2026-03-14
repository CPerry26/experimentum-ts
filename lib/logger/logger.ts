import { LogLevel } from "./level.js";
import type { LogMetadata } from "./metadata.js";
import type { LoggerOptions } from "./options.js";

export class Logger {
    private _logLevel: LogLevel;
    
    constructor(options?: LoggerOptions) {
        this._logLevel = options?.logLevel ?? LogLevel.INFO;
    }

    #log(level: LogLevel, message: string, metadata: LogMetadata): void {
        if (level > this._logLevel) {
            return;
        }

        const levelString = LogLevel[level];
        const timestamp = new Date().toISOString();

        const log = {
            level: levelString,
            timestamp,
            message,
            ...metadata
        };

        console.log(JSON.stringify(log));
    }

    debug(message: string, metadata: LogMetadata = {}): void {
        this.#log(LogLevel.DEBUG, message, metadata);
    }

    info(message: string, metadata: LogMetadata = {}): void {
        this.#log(LogLevel.INFO, message, metadata);
    }

    warn(message: string, metadata: LogMetadata = {}): void {
        this.#log(LogLevel.WARN, message, metadata);
    }

    error(message: string, metadata: LogMetadata = {}): void {
        this.#log(LogLevel.ERROR, message, metadata);
    }

    critical(message: string, metadata: LogMetadata = {}): void {
        this.#log(LogLevel.CRITICAL, message, metadata);
    }
};