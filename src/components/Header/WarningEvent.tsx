import React from 'react';

// 資料型別定義
type EmicEvent = {
  time: string;      // 時間
  location: string;  // 地點
  content: string;   // 事件描述
};

// 假資料，可未來用 props 或 fetch API 取代
const emicEvents: EmicEvent[] = [
  {
    time: '09:45',
    location: '高雄市左營區高鐵南路協助清理',
    content: '處理中',
  },
  {
    time: '09:33',
    location: '台南市奇美',
    content: '待確認退水',
  },
];

const WarningEvent: React.FC<{ fixedHeight?: number }> = ({ fixedHeight }) => (
  <div
    className="glass-card box p-3"
    style={{
      minWidth: 210,
      height: fixedHeight || 150,      
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      overflow: 'hidden'
    }}
  >
    <div className="chart-title-glow mb-2">EMIC事件</div>
    <ul>
      {emicEvents.map((event, idx) => (
        <li key={idx} className="mb-2">
          <span className="has-text-weight-semibold has-text-light mr-2">{event.content}</span>
          <span className="tag is-light is-info mr-2">{event.time}</span>
          <span className="has-text-white is-size-7">{event.location}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default WarningEvent;
