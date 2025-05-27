import React from 'react';

const WeatherMap: React.FC = () => (
  <div
    className="glass-card box has-background-light is-flex is-justify-content-center is-align-items-center"
    style={{
      width: '100%',
      height: '100%',
      borderRadius: 8,
      position: 'relative',
      boxShadow: '0 2px 8px #b2ebf2',
      margin: 0,           // <== 取消外層 margin
      minHeight: 0,        // <== 取消 minHeight，改靠 MapPanel 高度
      padding: 0           // <== 取消 padding
    }}
  >
    <img
      src="../public/cloud.jpg"
      alt="天氣雷達圖(示意)"
      className="image"
      style={{
        width: '100%',    // <== 滿版
        height: '100%',   // <== 滿版
        objectFit: 'cover', // <== 滿版裁切（保留比例可用contain）
        border: '2px solid #b2ebf2',
        borderRadius: 8
      }}
    />
  </div>
);

export default WeatherMap;
