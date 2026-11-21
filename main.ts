import { cpSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, resolve } from 'node:path';
import { buildDossier } from './vendor/makefun-game.ts';
const root = fileURLToPath(new URL('.', import.meta.url));
const out = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
if (out === resolve(root)) throw new Error('Output directory must differ from the source directory');

const shotsPath = join(root, 'shots.json');
let shots: Array<{ filename?: string }>;
try {
  const parsed: unknown = JSON.parse(readFileSync(shotsPath, 'utf8'));
  if (!Array.isArray(parsed)) throw new Error('expected an array');
  shots = parsed;
} catch (error) {
  console.error(`Invalid hand-in input shots.json: ${(error as Error).message}`);
  process.exit(1);
}
if (shots.length !== 4) {
  console.error(`Invalid hand-in input shots.json: expected four screenshot entries, found ${shots.length}`);
  process.exit(1);
}
for (const [index, entry] of shots.entries()) {
  const filename = entry && typeof entry.filename === 'string' ? entry.filename : '';
  if (!filename) {
    console.error(`Invalid hand-in input shots.json: entry ${index + 1} has no filename`);
    process.exit(1);
  }
  const screenshot = join(root, 'screenshots', filename);
  if (!existsSync(screenshot)) {
    console.error(`Missing hand-in input screenshots/${filename}`);
    process.exit(1);
  }
  const screenshotStat = statSync(screenshot);
  if (!screenshotStat.isFile()) {
    console.error(`Invalid hand-in input screenshots/${filename}: expected a file`);
    process.exit(1);
  }
  const size = screenshotStat.size;
  if (size > 262144) {
    console.error(`Oversized hand-in input screenshots/${filename}: ${size} bytes exceeds 262144 bytes`);
    process.exit(1);
  }
}
const indexHtml = join(root, 'game', 'index.html');
if (!existsSync(indexHtml)) {
  console.error('Missing hand-in input game/index.html');
  process.exit(1);
}

mkdirSync(out, { recursive: true });
for (const directory of ['game', 'screenshots']) cpSync(join(root, directory), join(out, directory), { recursive: true });
writeFileSync(join(out, 'dossier.json'), buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
}));
console.log('Hand-in written to ' + out);
