import React from 'react';
import Header from './components/Header/Header';
import LeftPanel from './components/LeftPanel';
import MapPanel from './components/MapPanel/MapPanel';
import CenterLayout from './components/CenterLayout';
import './App.css';
import './Sidebar.css';


const HEADER_HEIGHT = 110; // 依你設計微調

const App: React.FC = () => (
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
          height: `calc(100vh - ${HEADER_HEIGHT + 60}px)`, // +60 是上/下預留空間
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

export default App;
