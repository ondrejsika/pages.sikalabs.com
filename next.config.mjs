import createMDX from '@next/mdx';
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default function nextConfig(phase) {
  /** @type {import('next').NextConfig} */
  const config = {
    pageExtensions: [
      // dev-only routes (e.g. app/dev-reload/route.dev.js for content hot reload)
      ...(phase === PHASE_DEVELOPMENT_SERVER ? ['dev.js'] : []),
      'js', 'jsx', 'md', 'mdx', 'ts', 'tsx',
    ],
    // Static export only for builds; in `next dev` it turns unknown slugs
    // into a runtime error instead of the 404 page.
    ...(phase === PHASE_PRODUCTION_BUILD && { output: 'export' }),
  };

  return withMDX(config);
}
