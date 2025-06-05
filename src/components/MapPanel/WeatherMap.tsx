import React from 'react';

const WeatherMap: React.FC = () => (
  <div
    style={{
      flex: 1,
      width: '100%',
      height: '100%',
      minHeight: 0,
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 14,
      background: '#0001',
      display: 'flex',
    }}
  >
    <img
      src="/cloud.jpg"
      alt="天氣雷達圖"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 20,
      }}
    />
  </div>
);

export default WeatherMap;
