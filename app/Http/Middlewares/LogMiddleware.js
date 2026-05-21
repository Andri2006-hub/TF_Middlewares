import fs from 'fs';
import path from 'path';

export default function LogMiddleware(request, response, next) {
    try {
        const now = new Date().toISOString();
        const method = request.method;
        const route = request.path;

        const line = `[${now}] ${method} :: ${route}`;

        console.log(line);

        const logsDir = path.resolve(process.cwd(), 'storage', 'logs');
        const logFile = path.join(logsDir, 'log.txt');

        // Garantir que o diretório exista
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }

        fs.appendFileSync(logFile, line + '\n', { encoding: 'utf8' });
    } catch (error) {
        console.error('Error in LogMiddleware:', error);
    }

    return next();
}
import fs from "fs";
import path from "path";

export default function LogMiddleware(request, response, next) {
    try {
        const now = new Date().toISOString();
        const method = request.method;
        const route = request.originalUrl || request.url;
        const line = `[${now}] ${method} :: ${route}`;

        console.log(line);

        const logsDir = path.resolve("storage", "logs");
        const logFile = path.join(logsDir, "log.txt");

        try {
            if (!fs.existsSync(logsDir)) {
                fs.mkdirSync(logsDir, { recursive: true });
            }

            fs.appendFileSync(logFile, line + "\n", { encoding: "utf8" });
        } catch (err) {
            console.error("Failed to write log:", err);
        }

        return next();
    } catch (err) {
        console.error(err);
        return next();
    }
}
