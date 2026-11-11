'use client';

import { useRef, useState } from 'react';

export default function CodeBlock({ children, ...props }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  const handleCopy = async () => {
    // Read the rendered text, children are highlighted <span>s
    const code = preRef.current?.querySelector('code')?.textContent ?? '';
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
    <pre ref={preRef} {...props} style={{ position: 'relative', ...props.style }}>
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
      {children}
    </pre>
  );
}
