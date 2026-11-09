import fs from 'fs';
import path from 'path';

// Returns all pages from the content directory as { slug, title }, sorted by title
export function getAllPages() {
  const contentDir = path.join(process.cwd(), 'content');

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const pages = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const source = fs.readFileSync(path.join(contentDir, file), 'utf-8');

      // Extract the first H1 heading from the content
      const h1Match = source.match(/^#\s+(.+)$/m);
      const title = h1Match ? h1Match[1] : slug.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

      return { slug, title };
    });

  pages.sort((a, b) => a.title.localeCompare(b.title));

  return pages;
}
