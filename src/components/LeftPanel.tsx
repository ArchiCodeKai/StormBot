import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import ChatWindow from './ChatWindow/ChatWindow';

// 這個容器用 flex column，Sidebar 固定高，ChatWindow 填滿剩下
const LeftPanel: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      padding:15,
      minHeight: 0, // flex: 1 需要
    }}
  >
    <div style={{ flex: '0 0 auto' }}>
      <Sidebar />
    </div>
    <div style={{ flex: 1, minHeight: 0 }}>
      <ChatWindow />
    </div>
  </div>
);

export default LeftPanel;
