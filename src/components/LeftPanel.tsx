import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import ChatWindow from './ChatWindow/ChatWindow';

const LeftPanel: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      width: '100%',
      padding: 8,
      boxSizing: 'border-box',
    }}
  >
    <div style={{ flex: '0 0 auto' }}>
      <Sidebar />
    </div>
    <div style={{ flex: 1, minHeight: 0, marginTop: 10 }}>
      <ChatWindow />
    </div>
  </div>
);

export default LeftPanel;
