import { readdirSync, existsSync, mkdirSync, readFileSync, statSync, mkdtempSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir, tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
const root = fileURLToPath(new URL('../', import.meta.url));
const cache = join(homedir(), '.cache/ms-playwright');
const dirs = readdirSync(cache).filter(x => /^chromium-/.test(x)).sort().reverse();
let chrome;
for (const d of dirs) for (const sub of ['chrome-linux64/chrome','chrome-linux/chrome','chrome-mac/Chromium.app/Contents/MacOS/Chromium']) {
  const candidate = join(cache,d,sub); if (existsSync(candidate)) { chrome = candidate; break; }
}
if (!chrome) throw new Error('No Playwright Chromium executable found');
const shots = JSON.parse(readFileSync(join(root,'shots.json'),'utf8'));
const scratch = mkdtempSync(join(tmpdir(),'velmaris-shots-'));
mkdirSync(join(root,'screenshots'),{recursive:true});
let usePIL = false;
try { execFileSync('python3',['-c','from PIL import Image']); usePIL = true; } catch {}
try {
for (const {shot,filename} of shots) {
 const png=join(scratch,shot+'.png');
 const url=pathToFileURL(join(root,'game/index.html'));url.searchParams.set('shot',shot);
 try { execFileSync(chrome,['--user-data-dir='+join(scratch,'profile-'+shot),'--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--hide-scrollbars','--window-size=1280,800','--force-device-scale-factor=1','--virtual-time-budget=5000','--screenshot='+png,url.href],{stdio:'pipe',timeout:45000}); } catch (error) {
   throw new Error('Chromium failed to capture '+shot+': '+(error.stderr?.toString().trim() || error.message));
 }
 const dimensions=readFileSync(png);
 if(dimensions.readUInt32BE(16)!==1280 || dimensions.readUInt32BE(20)!==800) throw new Error(shot+' is not 1280×800');
 const out=resolve(root,'screenshots',filename);
 let quality=82;
 while(true){
  if(usePIL)execFileSync('python3',['-c',"from PIL import Image; import sys; im=Image.open(sys.argv[1]); assert im.size==(1280,800), im.size; im.convert('RGB').save(sys.argv[2],quality=int(sys.argv[3]),optimize=True)",png,out,String(quality)]);
  else execFileSync('ffmpeg',['-y','-loglevel','error','-i',png,'-frames:v','1','-q:v',String(Math.max(2,Math.round((100-quality)/4))),out]);
  const size=statSync(out).size;
  if(size<=262144){console.log(filename+': '+size+' bytes (1280×800, quality '+quality+')');break;}
  quality-=8;if(quality<18)throw new Error(filename+' exceeds 256 KiB');
 }
}
} finally {rmSync(scratch,{recursive:true,force:true});}
