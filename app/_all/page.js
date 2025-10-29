import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export const metadata = {
  title: 'All Pages | pages.sikalabs.com',
};

async function getAllPages() {
  const contentDir = path.join(process.cwd(), 'content');

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);
  const pages = [];

  for (const file of files) {
    if (!file.endsWith('.mdx')) {
      continue;
    }

    const slug = file.replace('.mdx', '');
    const filePath = path.join(contentDir, file);
    const source = fs.readFileSync(filePath, 'utf-8');

    // Extract the first H1 heading from the content
    const h1Match = source.match(/^#\s+(.+)$/m);
    const title = h1Match ? h1Match[1] : slug.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    pages.push({
      slug,
      title,
    });
  }

  // Sort pages by title
  pages.sort((a, b) => a.title.localeCompare(b.title));

  return pages;
}

export default async function AllPagesPage() {
  const pages = await getAllPages();

  return (
    <main>
      <h1>All Pages</h1>
      <p>This page lists all available pages in the content directory.</p>

      <h2>Pages</h2>
      <ul>
        {pages.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={`/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
