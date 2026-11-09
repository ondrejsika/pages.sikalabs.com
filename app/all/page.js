import Link from 'next/link';
import { getAllPages } from '../../lib/pages';

export const metadata = {
  title: 'All Pages | pages.sikalabs.com',
};

export default async function AllPagesPage() {
  const pages = getAllPages();

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
