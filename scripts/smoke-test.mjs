#!/usr/bin/env node
/**
 * Boots server.js on a throwaway port and checks that representative
 * routes actually serve, with the right status and content type.
 * No external dependencies.
 */

import { spawn } from 'node:child_process';
import { once } from 'node:events';

const PORT = process.env.SMOKE_PORT || '8099';
const BASE = `http://127.0.0.1:${PORT}`;

/** Route, expected status, expected content-type fragment. */
const ROUTES = [
  ['/',                        200, 'text/html'],
  ['/index.html',              200, 'text/html'],
  ['/about.html',              200, 'text/html'],
  ['/services.html',           200, 'text/html'],
  ['/projects.html',           200, 'text/html'],
  ['/team.html',               200, 'text/html'],
  ['/contact.html',            200, 'text/html'],
  ['/blog.html',               200, 'text/html'],
  ['/careers.html',            200, 'text/html'],
  ['/css/style.css',           200, 'text/css'],
  ['/css/animations.css',      200, 'text/css'],
  ['/js/script.js',            200, 'javascript'],
  ['/js/theme-sync.js',        200, 'javascript'],
  ['/images/bp.png',           200, 'image/png'],
  ['/team/ali.html',           200, 'text/html'],
  ['/assets/footer.html',      200, 'text/html'],
  ['/this-does-not-exist.html', 404, null],
];

async function waitForServer(timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      await fetch(BASE + '/', { signal: AbortSignal.timeout(2000) });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 250));
    }
  }
  return false;
}

const server = spawn('node', ['server.js'], {
  env: { ...process.env, PORT },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let serverLog = '';
server.stdout.on('data', (d) => { serverLog += d; });
server.stderr.on('data', (d) => { serverLog += d; });

let exitCode = 0;

try {
  if (!(await waitForServer())) {
    console.error('Server failed to start within 20s. Output:\n' + serverLog);
    process.exit(1);
  }
  console.log(`Server up on ${BASE}\n`);

  for (const [route, wantStatus, wantType] of ROUTES) {
    let line;
    try {
      const res = await fetch(BASE + route, { signal: AbortSignal.timeout(5000) });
      const type = res.headers.get('content-type') || '';
      const statusOk = res.status === wantStatus;
      const typeOk = !wantType || type.includes(wantType);

      if (statusOk && typeOk) {
        line = `ok      ${route}  ->  ${res.status} ${type.split(';')[0]}`;
      } else {
        exitCode = 1;
        const why = !statusOk
          ? `expected status ${wantStatus}, got ${res.status}`
          : `expected content-type containing "${wantType}", got "${type}"`;
        line = `FAILED  ${route}  ->  ${why}`;
      }
    } catch (err) {
      exitCode = 1;
      line = `FAILED  ${route}  ->  request error: ${err.message}`;
    }
    console.log(line);
  }
} finally {
  server.kill('SIGTERM');
  await once(server, 'exit').catch(() => {});
}

console.log(exitCode === 0 ? '\nAll routes OK.' : '\nSmoke test failed.');
process.exit(exitCode);
