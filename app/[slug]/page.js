import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import Button from '../../components/Button';
import InfoBox from '../../components/InfoBox';
import CodeBlock from '../../components/CodeBlock';
import MdxLink from '../../components/MdxLink';
import TrainingAd from '../../components/TrainingAd';
import TerraformTrainingAd from '../../components/TerraformTrainingAd';
import KubernetesTrainingAd from '../../components/KubernetesTrainingAd';
import VaultTrainingAd from '../../components/VaultTrainingAd';

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return {
      title: 'Page Not Found | pages.sikalabs.com',
    };
  }

  const source = fs.readFileSync(filePath, 'utf-8');

  // Try to get title from frontmatter or extract from H1
  const { frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
    },
  });

  let title = '';

  // If frontmatter has a title, use it
  if (frontmatter?.title) {
    title = frontmatter.title;
  } else {
    // Otherwise, extract the first H1 heading from the content
    const h1Match = source.match(/^#\s+(.+)$/m);
    if (h1Match) {
      title = h1Match[1];
    } else {
      // Fallback to slug
      title = slug.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    }
  }

  return {
    title: `${title} | pages.sikalabs.com`,
    alternates: {
      types: {
        'text/markdown': `https://pages.sikalabs.com/${slug}.md`,
      },
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content', `${slug}.mdx`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = fs.readFileSync(filePath, 'utf-8');

  const { content } = await compileMDX({
    source,
    components: {
      Button,
      InfoBox,
      TrainingAd,
      TerraformTrainingAd,
      KubernetesTrainingAd,
      VaultTrainingAd,
      pre: CodeBlock,
      a: MdxLink,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return <>{content}</>;
}

// Only slugs from generateStaticParams are valid; anything else (e.g. /favicon.ico) is a 404
export const dynamicParams = false;

// Generate static params for all MDX files
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content');

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir);

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace('.mdx', ''),
    }));
}
