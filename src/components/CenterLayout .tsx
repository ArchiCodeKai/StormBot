// src/components/CenterLayout.tsx
import React from 'react';

// 建議這些值可以根據你的主內容寬度自行調整
const MAX_WIDTH = 1350;   // 最大寬度，建議1200~1500
const MAX_HEIGHT = 820;   // 最大高度（不含 header），讓內容不會太扁

const CenterLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="center-layout"
    style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'url(/weather.jpg) center/cover no-repeat fixed',
      overflow: 'hidden',
    }}
  >
    <div
      className="center-content"
      style={{
        width: '100%',
        maxWidth: MAX_WIDTH,
        maxHeight: MAX_HEIGHT,
        minHeight: 640,
        minWidth: 1020,
        background: 'rgba(255,255,255,0.91)',
        borderRadius: 32,
        boxShadow: '0 0 56px 0 #b3d4ec2a',
        display: 'flex',
        flexDirection: 'column',
        margin: '32px 0',
        padding: 0,
        overflow: 'hidden', // 保證內容超出時會被裁切
      }}
    >
      {children}
    </div>
  </div>
);

export default CenterLayout;
