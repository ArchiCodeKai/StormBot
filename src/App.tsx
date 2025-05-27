import React from 'react';
import Header from './components/Header/Header';
import LeftPanel from './components/LeftPanel';
import MapPanel from './components/MapPanel/MapPanel';
import './App.css';

const HEADER_HEIGHT = 120; // 依 header 真實高度可再微調

const App: React.FC = () => (
  <div className="app-bg">
    <Header />
    <div
      className="columns is-gapless"
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        alignItems: 'stretch',
        minHeight: 0,
      }}
    >
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
  </div>
);

export default App;
