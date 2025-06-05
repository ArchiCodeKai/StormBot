import React from 'react';

const MAX_WIDTH = 2000;
const MAX_HEIGHT = 1000;

const CenterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="center-layout"
    style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgb(32, 32, 32)',
      overflow: 'hidden',
    }}
  >
    <div
      className="center-content glass-card"
      style={{
        width: '100%',
        maxWidth: MAX_WIDTH,
        maxHeight: MAX_HEIGHT,
        minHeight: 560,
        minWidth: 860,
        borderRadius: 40,
        boxShadow: '0 0 56px 0 #0004, 0 4px 32px 0 #8cecf455',
        display: 'flex',
        flexDirection: 'column',
        padding: 32,     // 四周留空隙
        margin: '48px 0',
        overflow: 'hidden',
        backdropFilter: 'blur(32px) saturate(175%)',
        border: '0.8px solid rgba(220,235,255,0.22)',
        background: 'url(/weather2.jpg) center/cover no-repeat fixed',
      }}
    >
      {children}
    </div>
  </div>
);

export default CenterLayout;
