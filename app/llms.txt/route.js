import { getAllPages } from '../../lib/pages';

export const dynamic = 'force-static';

const BASE_URL = 'https://pages.sikalabs.com';

export function GET() {
  const pages = getAllPages();

  const body = [
    '# pages.sikalabs.com',
    '',
    '> Public website by SikaLabs with shared how-to pages, such as how to install Terraform, Vault, or kubectl. SikaLabs links to these pages from its client documentation.',
    '',
    '## Pages',
    '',
    ...pages.map(({ slug, title }) => `- [${title}](${BASE_URL}/${slug}.md)`),
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
