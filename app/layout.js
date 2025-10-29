'use client';

import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <html lang="en">
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
          }

          h1, h2, h3, h4, h5, h6 {
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            font-weight: 600;
            line-height: 1.3;
            color: #1a1a1a;
          }

          h1 { font-size: 2.5em; margin-top: 0; }
          h2 { font-size: 2em; border-bottom: 2px solid #e0e0e0; padding-bottom: 0.3em; }
          h3 { font-size: 1.5em; }

          p {
            margin-bottom: 1em;
          }

          a {
            color: #0066cc;
            text-decoration: none;
            transition: color 0.2s;
          }

          a:hover {
            color: #004499;
            text-decoration: underline;
          }

          code {
            background: #f0f0f0;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
          }

          pre {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 1em;
            border-radius: 6px;
            overflow-x: auto;
            margin: 1em 0;
          }

          pre code {
            background: none;
            padding: 0;
            color: inherit;
          }

          ul, ol {
            margin-left: 1.5em;
            margin-bottom: 1em;
          }

          li {
            margin-bottom: 0.5em;
          }

          table {
            border-collapse: collapse;
            width: 100%;
            margin: 1.5em 0;
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border-radius: 6px;
            overflow: hidden;
          }

          th, td {
            padding: 12px 16px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
          }

          th {
            background: #f8f9fa;
            font-weight: 600;
            color: #1a1a1a;
          }

          tr:last-child td {
            border-bottom: none;
          }

          tr:hover {
            background: #f8f9fa;
          }

          hr {
            border: none;
            border-top: 2px solid #e0e0e0;
            margin: 2em 0;
          }

          .content-wrapper {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px 20px 40px 20px;
            background: white;
            min-height: calc(100vh - 200px);
            box-shadow: 0 0 20px rgba(0,0,0,0.05);
            border-radius: 8px;
          }

          footer {
            text-align: center;
            padding: 30px 20px 60px 20px;
            color: #666;
            font-size: 0.9em;
          }

          footer a {
            color: #666;
            margin: 0 10px;
          }

          footer a:hover {
            color: #333;
          }
        `}</style>
      </head>
      <body>
        {!isHomepage ? (
          <>
            <div className="content-wrapper">
              {children}
            </div>
            <footer>
              <a href="https://sikalabs.com" target="_blank" rel="noopener noreferrer">sikalabs.com</a>
              {' | '}
              <a href="https://github.com/sikalabs" target="_blank" rel="noopener noreferrer">github.com/sikalabs</a>
            </footer>
          </>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
