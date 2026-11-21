import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('./game/', import.meta.url));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png' };
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
    const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(resolve(root) + sep) || !(await stat(file)).isFile()) throw new Error('Not found');
    res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(Number(process.env.PORT ?? 8080), '127.0.0.1', () => console.log('Velmaris: http://localhost:' + (process.env.PORT ?? 8080)));
