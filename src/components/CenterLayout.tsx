import React from 'react';

const MAX_WIDTH = 2000; // 根據設計需求，可調整為 1200~1500
const MAX_HEIGHT = 1000; // 根據設計需求，通常為 90~95vh

const CenterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="center-layout"
    style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(97, 97, 97, 0.85)',
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
        background: 'url(/weather2.jpg) center/cover no-repeat fixed',
        borderRadius: 40,
        boxShadow: '0 0 56px 0 #0004, 0 4px 32px 0 #8cecf455',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        margin: '48px 0', // 上下預留空間
        overflow: 'hidden',
        backdropFilter: 'blur(32px) saturate(175%)',
        border: '0.8px solid rgba(220,235,255,0.22)',
      }}
    >
      {children}
    </div>
  </div>
);

export default CenterLayout;
