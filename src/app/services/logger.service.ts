class LoggerService {
    private static instance: LoggerService;
    private isDebug: boolean;

    private constructor(isDebug: boolean = false) {
        this.isDebug = isDebug;
    }

    public static getInstance(isDebug: boolean = false): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService(isDebug);
        }
        return LoggerService.instance;
    }

    private formatMessage(level: string, message: string): string {
        return `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;
    }

    public info(message: string): void {
        console.info(this.formatMessage("info", message));
    }

    public warn(message: string): void {
        console.warn(this.formatMessage("warn", message));
    }

    public error(message: string, error?: unknown): void {
        console.error(this.formatMessage("error", message), error || "");
    }

    public debug(message: string): void {
        if (this.isDebug) {
            console.debug(this.formatMessage("debug", message));
        }
    }
}

export default LoggerService.getInstance(process.env.DEBUG);