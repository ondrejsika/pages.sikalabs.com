'use client';

export default function Button({ children, variant = 'primary' }) {
  const styles = {
    primary: {
      background: '#0066cc',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    secondary: {
      background: '#f0f0f0',
      color: '#333',
      border: '1px solid #ccc',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
  };

  const handleClick = () => {
    alert(`You clicked: ${children}`);
  };

  return (
    <button
      onClick={handleClick}
      style={styles[variant]}
      onMouseOver={(e) => {
        e.target.style.opacity = '0.8';
      }}
      onMouseOut={(e) => {
        e.target.style.opacity = '1';
      }}
    >
      {children}
    </button>
  );
}
