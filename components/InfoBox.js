export default function InfoBox({ title, children, type = 'info' }) {
  const colors = {
    info: { bg: '#e3f2fd', border: '#2196f3', color: '#0d47a1' },
    success: { bg: '#e8f5e9', border: '#4caf50', color: '#1b5e20' },
    warning: { bg: '#fff3e0', border: '#ff9800', color: '#e65100' },
    error: { bg: '#ffebee', border: '#f44336', color: '#b71c1c' },
  };

  const style = colors[type];

  return (
    <div
      style={{
        background: style.bg,
        border: `2px solid ${style.border}`,
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
      {title && (
        <h4
          style={{
            margin: '0 0 10px 0',
            color: style.color,
            fontWeight: '600',
          }}
        >
          {title}
        </h4>
      )}
      <div style={{ color: style.color }}>{children}</div>
    </div>
  );
}
