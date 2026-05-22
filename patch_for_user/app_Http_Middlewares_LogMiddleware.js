import fs from 'fs';
import path from 'path';

export default function LogMiddleware(request, response, next) {
    try {
        const now = new Date().toISOString();
        const method = request.method;
        const route = request.originalUrl || request.url || request.path;

        const line = `[${now}] ${method} :: ${route}`;

        console.log(line);

        const logsDir = path.resolve(process.cwd(), 'storage', 'logs');
        const logFile = path.join(logsDir, 'log.txt');

        try {
            if (!fs.existsSync(logsDir)) {
                fs.mkdirSync(logsDir, { recursive: true });
            }

            fs.appendFileSync(logFile, line + '\n', { encoding: 'utf8' });
        } catch (err) {
            console.error('Failed to write log:', err);
        }
    } catch (err) {
        console.error('Error in LogMiddleware:', err);
    }

    return next();
}
