import React from 'react';

// 使用 Emoji 作為圖示，可換成 icon library
const icons = [
  { icon: '🗺️', label: '地圖' },
  { icon: '☁️', label: '雲圖' },
  { icon: '🌧️', label: '降雨' },
  { icon: '📷', label: '擷取' },
  { icon: '🔍', label: '放大' },
  { icon: '➖', label: '縮小' }
];

const MapToolbar: React.FC = () => (
  <div
    className="is-flex is-flex-direction-column is-align-items-center"
    style={{
      position: 'absolute',
      top: 32,
      right: 32,
      zIndex: 20
    }}
  >
    {icons.map(item => (
      <button
        key={item.label}
        className="button is-white is-rounded is-light mb-3"
        title={item.label}
        style={{
          width: 44,
          height: 44,
          fontSize: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px #0002'
        }}
      >
        {item.icon}
      </button>
    ))}
  </div>
);

export default MapToolbar;
