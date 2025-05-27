import React from 'react';
import Logo from './Logo';
import Title from './Title';
import AlertChart from './AlertChart';
import WarningArea from './WarningArea';
import WarningEvent from './WarningEvent';

const chartHeight = 160;

// ...假資料
const rainLevels = [
  { label: '超大豪雨', color: '#e53935', value: 0 },
  { label: '大豪雨', color: '#fb8c00', value: 0 },
  { label: '豪雨', color: '#ffd600', value: 0 }
];

const floodLevels = [
  { label: '>50公分', color: '#e53935', value: 0 },
  { label: '>30公分', color: '#fb8c00', value: 0 },
  { label: '>10公分', color: '#ffd600', value: 0 },
  { label: '>0公分', color: '#43a047', value: 0 }
];

const Header: React.FC = () => (
  <header className="px-4 py-3" style={{
  background: 'rgba(38,197,218,0.07)',
  minHeight: 260,
}}>
    <div className="is-flex is-align-items-center mb-4">
    <div className="mr-2"><Logo /></div>
    <Title />
  </div>
    {/* 四個組件橫排、RWD自動換行 */}
  <div className="header-flex-row" style={{marginTop: 8}}>
    <div style={{height: chartHeight}}>
      <AlertChart
        title="雨量警戒"
        levels={rainLevels}
        chartData={[70, 30, 10]}
        fixedHeight={chartHeight}
      />
    </div>
    <div style={{height: chartHeight}}>
      <AlertChart
        title="淹水警戒"
        levels={floodLevels}
        chartData={[60, 30, 10, 0]}
        fixedHeight={chartHeight}
      />
    </div>
    <div style={{height: chartHeight}}>
      <WarningArea fixedHeight={chartHeight}/>
    </div>
    <div style={{height: chartHeight}}>
      <WarningEvent fixedHeight={chartHeight}/>
    </div>
  </div>
</header>
);

export default Header;
