// src/App.tsx
import React, { useState } from 'react';
import Login from './components/Login';
import Header from './components/Header/Header';
import LeftPanel from './components/LeftPanel';
import MapPanel from './components/MapPanel/MapPanel';
import CenterLayout from './components/CenterLayout';
import 'leaflet/dist/leaflet.css';
import './App.css';
import './Sidebar.css';

const HEADER_HEIGHT = 110;

const App: React.FC = () => {
  // 建議用 localStorage 記錄登入狀態，第一次可寫 false
  const [loggedIn, setLoggedIn] = useState(() => {
    // 若你未來有 token 可這樣判斷
    // return !!localStorage.getItem('token');
    return false; // 初次載入出現登入畫面
  });

  if (!loggedIn) {
    return <Login onLoginSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <div className="app-bg">
      <CenterLayout>
        {/* 頁首 Header */}
        <div style={{ marginBottom: 18 }}>
          <Header />
        </div>
        {/* 主內容（左右 panel） */}
        <div
          className="columns is-gapless"
          style={{
            height: `calc(100vh - ${HEADER_HEIGHT + 60}px)`, // +60 為上下預留空間
            minHeight: 0,
            alignItems: 'stretch',
          }}
        >
          {/* 左側聊天/側欄 */}
          <div
            className="column is-4"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              height: '100%',
              minHeight: 0,
            }}
          >
            <LeftPanel />
          </div>
          {/* 右側地圖 */}
          <div
            className="column"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              height: '100%',
              minHeight: 0,
            }}
          >
            <MapPanel />
          </div>
        </div>
      </CenterLayout>
    </div>
  );
};

export default App;
