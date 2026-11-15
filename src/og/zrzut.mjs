// Użycie: node shot.mjs <url> <szer> <wys> <plik.png> [--full] [--eval "js"]
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
const [url, w, h, out, ...rest] = process.argv.slice(2);
const full = rest.includes('--full');
const ev = rest.includes('--eval') ? rest[rest.indexOf('--eval') + 1] : null;
const port = 9333 + Math.floor(Math.random() * 500);
const chrome = spawn('google-chrome', ['--headless=new', '--no-sandbox', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--window-size=${w},${h}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch {} await sleep(250); }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
const send = (method, params = {}) => new Promise((r) => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 700 });
await send('Page.enable');
await send('Page.navigate', { url });
await sleep(1800);
await send('Runtime.evaluate', { expression: `try{localStorage.setItem('cookies','odrzucone')}catch{};document.querySelector('#baner-cookies')?.remove();document.fonts.ready` , awaitPromise: true });
if (ev) { const r = await send('Runtime.evaluate', { expression: ev, returnByValue: true, awaitPromise: true }); console.log(JSON.stringify(r.result?.result?.value ?? r.result, null, 1)); }
if (full) {
  const { result } = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollHeight', returnByValue: true });
  await send('Emulation.setDeviceMetricsOverride', { width: +w, height: result.result.value, deviceScaleFactor: 1, mobile: +w < 700 });
  await sleep(400);
}
const shot = await send('Page.captureScreenshot', { format: 'png' });
writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
console.log('zapisano', out);
chrome.kill(); process.exit(0);
