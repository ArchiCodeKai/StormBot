import React from 'react';
import WeatherMap from './WeatherMap';
import MapToolbar from './MapToolbar';

const MapPanel: React.FC = () => (
  <div
    className="section glass-card"
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      padding: 0,
      boxSizing: 'border-box',
      borderRadius: 20,
      background: 'rgba(255,255,255,0.09)',
      boxShadow: '0 2px 8px rgb(207, 207, 207)',
      position: 'relative'
    }}
  >
    <WeatherMap />
    <MapToolbar />
  </div>
);

export default MapPanel;
