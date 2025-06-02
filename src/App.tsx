import React from 'react';
import Header from './components/Header/Header';
import LeftPanel from './components/LeftPanel';
import MapPanel from './components/MapPanel/MapPanel';
import CenterLayout from './components/CenterLayout';  // ← 一定要有
import './App.css';

const HEADER_HEIGHT = 120; // 根據 header 實際高度微調

const App: React.FC = () => (
  <div className="app-bg">
    <CenterLayout>
      {/* Header 放在卡片上面區域 */}
      <Header />
      <div
        className="columns is-gapless"
        style={{
          height: `calc(75vh - ${HEADER_HEIGHT}px)`, // 減掉 header 高度
          alignItems: 'stretch',
          minHeight: 0,
        }}
      >
        {/* 左側 Chat+Sidebar */}
        <div
          className="column is-4"
          style={{
            padding: 0,
            height: '100%',
            minHeight: 0,
          }}
        >
          <LeftPanel />
        </div>
        {/* 右側 MapPanel */}
        <div
          className="column"
          style={{
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
