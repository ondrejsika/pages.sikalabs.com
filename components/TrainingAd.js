'use client';

export default function TrainingAd({
  title,
  description,
  link,
  linkText = "Vice informaci",
  background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  accentColor = '#667eea',
  shadowColor = 'rgba(102, 126, 234, 0.3)',
  textColor = 'white',
}) {
  return (
    <div style={{
      background,
      borderRadius: '12px',
      padding: '24px',
      marginTop: '128px',
      marginBottom: '32px',
      color: textColor,
      boxShadow: `0 10px 25px ${shadowColor}`,
    }}>
      <div style={{
        fontSize: '1.3em',
        fontWeight: '600',
        marginBottom: '12px',
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '1em',
        marginBottom: '16px',
        lineHeight: '1.6',
        opacity: '0.95',
      }}>
        {description}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: 'white',
          color: accentColor,
          padding: '10px 24px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '0.95em',
          transition: 'transform 0.2s, box-shadow 0.2s',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
      >
        {linkText} →
      </a>
    </div>
  );
}
