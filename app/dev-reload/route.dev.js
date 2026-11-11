// Dev-only: streams an event whenever a file in content/ changes, so the
// browser can refresh (see components/DevReload.js). The .dev.js extension
// is only enabled in `next dev` (see next.config.mjs), so this route is not
// part of the static production build.

import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';

export const dynamic = 'force-dynamic';

const contentDir = path.join(process.cwd(), 'content');

// Regenerate the .md versions of pages, see scripts/generate-md.mjs
function generateMd() {
  execFile(process.execPath, ['scripts/generate-md.mjs'], (err, _stdout, stderr) => {
    if (err) console.error('generate-md failed:', stderr || err);
  });
}

export function GET(request) {
  const encoder = new TextEncoder();
  let watcher;
  let timeout;

  const stream = new ReadableStream({
    start(controller) {
      watcher = fs.watch(contentDir, { recursive: true }, () => {
        // editors often emit several events per save
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          generateMd();
          controller.enqueue(encoder.encode('data: change\n\n'));
        }, 100);
      });

      request.signal.addEventListener('abort', () => {
        clearTimeout(timeout);
        watcher.close();
        try {
          controller.close();
        } catch {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
