'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Dev-only: refreshes the page when a file in content/ changes.
// Next does not watch content/*.mdx because pages read them with fs instead
// of importing them. See app/dev-reload/route.dev.js.
export default function DevReload() {
  const router = useRouter();

  useEffect(() => {
    const events = new EventSource('/dev-reload');
    events.onmessage = () => router.refresh();
    return () => events.close();
  }, [router]);

  return null;
}
