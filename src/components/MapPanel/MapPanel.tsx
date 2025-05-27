import React from 'react';
import WeatherMap from './WeatherMap';
import MapToolbar from './MapToolbar';

const MapPanel: React.FC = () => (
  <div
    className="section glass-card"
    style={{
      position: 'relative',
      height: '100%', // 改成百分比，才能和左側同步
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <WeatherMap />
    <MapToolbar />
  </div>
);

export default MapPanel;
