import React from 'react';

// 假資料型別
type Region = {
  name: string;
  icon: string; // 可以改為 svg/component
  contacts: {
    type: 'phone' | 'line' | 'fb' | 'msg';
    label: string;
    url: string;
    icon: string; // emoji 或 icon component
  }[];
};

// 假資料（之後串 API）
const regions: Region[] = [
  {
    name: '台南市',
    icon: '🚒',
    contacts: [
      { type: 'phone', label: '電話', url: 'tel:0933123123', icon: '📞' },
      { type: 'line', label: 'LINE', url: '#', icon: '💬' },
      { type: 'fb', label: 'FB', url: '#', icon: '📘' },
      { type: 'msg', label: '訊息', url: '#', icon: '✉️' },
    ],
  },
  {
    name: '高雄市',
    icon: '🚚',
    contacts: [
      { type: 'phone', label: '電話', url: 'tel:0933987654', icon: '📞' },
      { type: 'line', label: 'LINE', url: '#', icon: '💬' },
      { type: 'fb', label: 'FB', url: '#', icon: '📘' },
      { type: 'msg', label: '訊息', url: '#', icon: '✉️' },
    ],
  },
];

const WarningArea: React.FC<{ fixedHeight?: number }> = ({ fixedHeight }) => (
  <div
  className="box p-3 glass-card"
  style={{
    height: fixedHeight || 150,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }}
>
    <div className="chart-title-glow mb-3">警戒區域</div>
    <ul>
      {regions.map((region, idx) => (
        <li key={region.name} className="is-flex is-align-items-center mb-3" style={{ gap: 8 }}>
          {/* 地區icon與名稱 */}
          <span className="mr-2" style={{ fontSize: 20 }}>{region.icon}</span>
          <span className="tag is-info mr-2">{region.name}</span>
          {/* 聯絡按鈕 */}
          <div>
            {region.contacts.map((c, cidx) => (
              <a
                key={cidx}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="button is-small is-light mx-1"
                title={c.label}
                style={{ fontSize: 16, padding: '0 7px' }}
              >
                <span>{c.icon}</span>
              </a>
            ))}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default WarningArea;
