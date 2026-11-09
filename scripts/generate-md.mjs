// Generates clean Markdown versions of all pages for LLMs (llms.txt convention).
//
// content/<slug>.mdx -> public/<slug>.md, served at https://pages.sikalabs.com/<slug>.md
//
// - removes training ads and layout-only JSX (<div>, ...)
// - turns <InfoBox> into a blockquote and <Button> into plain text
// - makes internal links absolute and points them to the .md versions
// - leaves code blocks untouched

import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://pages.sikalabs.com';
const contentDir = path.join(process.cwd(), 'content');
const publicDir = path.join(process.cwd(), 'public');

const slugs = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith('.mdx'))
  .map((file) => file.replace(/\.mdx$/, ''));

function convertLink(href) {
  if (href === '/') {
    return `${BASE_URL}/`;
  }
  const slug = href.replace(/^\//, '');
  if (slugs.includes(slug)) {
    return `${BASE_URL}/${slug}.md`;
  }
  return `${BASE_URL}${href}`;
}

function convertLine(line) {
  return line
    .replace(/<Button\b[^>]*>(.*?)<\/Button>/g, '$1')
    .replace(/\]\((\/[^)\s]*)\)/g, (_, href) => `](${convertLink(href)})`);
}

function toMarkdown(source) {
  // Strip frontmatter
  source = source.replace(/^---\n[\s\S]*?\n---\n/, '');

  const out = [];
  let inFence = false;
  let inInfoBox = false;

  for (const line of source.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      out.push(inInfoBox ? `> ${line}` : line);
      continue;
    }
    if (inFence) {
      out.push(inInfoBox ? `> ${line}` : line);
      continue;
    }

    // Training ads
    if (/^\s*<\w*TrainingAd\b[^>]*\/>\s*$/.test(line)) {
      continue;
    }

    // <InfoBox title="..."> ... </InfoBox> -> blockquote
    const infoBoxOpen = line.match(/^\s*<InfoBox\b([^>]*)>\s*$/);
    if (infoBoxOpen) {
      const title = infoBoxOpen[1].match(/title="([^"]*)"/);
      inInfoBox = true;
      if (title) {
        out.push(`> **${title[1]}**`, '>');
      }
      continue;
    }
    if (/^\s*<\/InfoBox>\s*$/.test(line)) {
      inInfoBox = false;
      continue;
    }

    // Layout-only JSX lines (<div ...>, </div>)
    if (/^\s*<\/?(div|span)\b[^>]*>\s*$/.test(line)) {
      continue;
    }

    const converted = convertLine(line).replace(/^\s+(?=\S)/, (indent) => (inInfoBox ? '' : indent));
    out.push(inInfoBox ? (converted ? `> ${converted}` : '>') : converted);
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

fs.mkdirSync(publicDir, { recursive: true });

// Remove previously generated files, so deleted pages don't stay published
for (const file of fs.readdirSync(publicDir)) {
  if (file.endsWith('.md')) {
    fs.unlinkSync(path.join(publicDir, file));
  }
}

for (const slug of slugs) {
  const source = fs.readFileSync(path.join(contentDir, `${slug}.mdx`), 'utf-8');
  fs.writeFileSync(path.join(publicDir, `${slug}.md`), toMarkdown(source));
}

console.log(`Generated ${slugs.length} Markdown pages in public/`);
