import React from 'react';

// 型別定義
type AlertLevel = {
  label: string;
  color?: string; // Bulma 色碼或 hex
  value: number;
};

type AlertChartProps = {
  title: string;
  levels: AlertLevel[];
  chartData?: number[]; // 進度條數值
  fixedHeight?: number; // 外層高度
};

const AlertChart: React.FC<AlertChartProps> = ({
  title,
  levels,
  chartData = [],
  fixedHeight = 130,
}) => (
  <div
    className="box p-3 glass-card alertchart-modern"
    style={{
      height: fixedHeight,
      minHeight: 100,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}
  >
    {/* 標題 */}
    <div className="chart-title-glow mb-2"
      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
    >
      {title}
    </div>

    {/* 標籤列 */}
    <div
      
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5,
        margin: '5px 0 5px 0',
      fontWeight: 500,
      }}
    >
      {levels.map((level, idx) => (
        <div key={idx} style={{
          minWidth: 60,
          fontSize: 14,
          color: 'rgba(255, 255, 255, 0.95)',
          letterSpacing: 1,
          textShadow: '0 1px 4px #b6e7ff99',
          fontWeight: 500,
        }}>
          {level.label}:&nbsp;
          <span style={{
            fontWeight: 700,
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.93)',
            textShadow: '0 0 8pxrgba(160, 205, 219, 0.53), 0 2px 12pxrgba(95, 146, 209, 0.33)'
          }}>{level.value}</span>
        </div>
      ))}
    </div>

    {/* 進度條 */}
    <div className="chart-bar-group">
      {chartData.slice(0, levels.length).map((val, i) => (
        <div
          key={i}
          className="chart-bar-bg"
          style={{
            width: '100%',
            height: 13,
            marginBottom: 7,
            borderRadius: 8,
            background: 'rgba(101, 130, 160, 0.29)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            className="chart-bar"
            style={{
              width: `${val ?? 0}%`,
              height: '100%',
              background: `linear-gradient(90deg, #a9e6ff 0%, #318cff 100%)`,
              opacity: 0.7 - i * 0.12,
              boxShadow: '0 0 16px 0 #9fe5ff44, 0 2px 8px 0 #318cff22',
              borderRadius: 8,
              transition: 'width 0.45s cubic-bezier(.85,0,.28,1)'
            }}
          />
        </div>
      ))}
    </div>
  </div>
);

export default AlertChart;
