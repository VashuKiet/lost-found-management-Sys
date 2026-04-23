import React, { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themes = [
    { id: 'dark', label: 'DARK', color: '#00ffff' },
    { id: 'light', label: 'LIGHT', color: '#ffffff' },
    { id: 'neon', label: 'NEON', color: '#00ff00' }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '1rem',
      right: '1rem',
      display: 'flex',
      gap: '0.5rem',
      zIndex: 1000,
      background: 'rgba(0,0,0,0.5)',
      padding: '0.5rem',
      borderRadius: '8px',
      border: '1px solid var(--theme-accent)',
      fontFamily: "'Space Mono', monospace"
    }}>
      {themes.map(t => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          style={{
            background: theme === t.id ? t.color : 'transparent',
            color: theme === t.id ? '#000' : t.color,
            border: `1px solid ${t.color}`,
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'all 0.2s ease'
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
