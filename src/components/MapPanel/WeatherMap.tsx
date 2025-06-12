import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
// 引入自己的雲圖覆蓋層
import CloudOverlay from './CloudOverlay';

const WeatherMap: React.FC = () => (
  <div style={{
    flex: 1,
    width: '100%',
    height: '100%',
    minHeight: 0,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 14,
    background: '#0001',
    display: 'flex',
  }}>
    <MapContainer
      center={[23.5, 121]}
      zoom={6}
      style={{ width: '100%', height: '100%', borderRadius: 20 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />
      {/* 疊加你的雲圖圖層 */}
      <CloudOverlay
        url=""
        bounds={[[20, 118], [26, 124]]}
      />
    </MapContainer>
  </div>
);

export default WeatherMap;
