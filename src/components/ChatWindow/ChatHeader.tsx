import React from 'react';

const ChatHeader: React.FC = () => {
  return (
    <div
      className="glass-card p-3 is-flex is-align-items-center is-justify-content-between"
      style={{
        borderBottom: '1px solid #eee',
        minHeight: 56,
        background: 'rgba(255,255,255,0.18)',
        borderRadius: '20px 20px 0 0',

      }}
    >
      <div className="is-flex is-align-items-center">
        <span className="icon has-text-link mr-2">
          <i className="fas fa-robot" />
        </span>
        <span className="has-text-weight-semibold">Chatbot</span>
      </div>
      {/* 右側可加一個收合icon（目前不實作收合功能） */}
      {/* <button className="button is-small is-white" style={{ boxShadow: 'none' }}>
        <span className="icon">
          <i className="fas fa-chevron-down" />
        </span>
      </button> */}
    </div>
  );
};

export default ChatHeader;
