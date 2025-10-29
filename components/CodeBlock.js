'use client';

import { useState } from 'react';

export default function CodeBlock({ children, className, ...props }) {
  const [copied, setCopied] = useState(false);

  // Extract the code content from children
  const getCodeContent = () => {
    if (typeof children === 'string') {
      return children;
    }
    if (children?.props?.children) {
      return children.props.children;
    }
    return '';
  };

  const handleCopy = async () => {
    const code = getCodeContent();
    // Remove trailing newlines
    const trimmedCode = code.replace(/\n+$/, '');
    try {
      await navigator.clipboard.writeText(trimmedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <pre {...props} style={{ position: 'relative', ...props.style }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: copied ? '#10b981' : '#4b5563',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '6px 12px',
          fontSize: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
          fontWeight: '500',
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          if (!copied) {
            e.currentTarget.style.background = '#374151';
          }
        }}
        onMouseLeave={(e) => {
          if (!copied) {
            e.currentTarget.style.background = '#4b5563';
          }
        }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <code className={className}>{children}</code>
    </pre>
  );
}
