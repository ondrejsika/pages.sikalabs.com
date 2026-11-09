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
    `Every page is available as clean Markdown by adding \`.md\` to its URL, for example ${BASE_URL}/install_kubectl.md. The HTML version is at the same URL without \`.md\`. The links below point to the Markdown versions.`,
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
