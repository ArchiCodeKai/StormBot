// src/components/Header/Header.tsx
import React from 'react';
import BarRaceChart from './BarRaceChart';
import type { BarRaceData } from './BarRaceChart'; 
import Logo from './Logo';
import Title from './Title';
import WarningArea from './WarningArea';
import WarningEvent from './WarningEvent';


// 22 縣市（含離島、金馬澎，2025年標準行政區）
const ALL_CITIES = [
  '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市',
  '基隆市', '新竹市', '嘉義市',
  '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣',
  '宜蘭縣', '花蓮縣', '台東縣',
  '金門縣', '連江縣', '澎湖縣'
];

// 時間資料產生（32格，每一格為 1 小時，跨日自動進位）
const BASE_TIME = new Date(2024, 5, 10, 16, 30); // 假設資料起點 2024/06/10 16:30
const RAIN_TIME_LABELS = Array.from({ length: 32 }, (_, i) => {
  const dt = new Date(BASE_TIME.getTime() + i * 60 * 60 * 1000);
  const MM = (dt.getMonth() + 1).toString().padStart(2, '0');
  const DD = dt.getDate().toString().padStart(2, '0');
  const hh = dt.getHours().toString().padStart(2, '0');
  const mm = dt.getMinutes().toString().padStart(2, '0');
  return `${MM}/${DD} ${hh}:${mm}`; // 例如 06/10 16:30
});

// ==== 假資料動態產生（動態排序） ====
// 可依實務需求修改 value/level 生成規則
function generateTrendData(cityArr: string[], timeCount: number): BarRaceData[][] {
  return Array.from({ length: timeCount }, (_, t) =>
    cityArr
      .map((name, i) => {
        // 假資料：警戒等級和數值會隨城市與時間變化
        const level = Math.floor(((i * 2 + t) % 8) / 2); // 0~3
        const value = Math.round(
          Math.abs(Math.sin(t / 7 + i / 4)) * 75 + Math.cos((t + i) / 6) * 12 + 20
        );
        return { name, value, level };
      })
      .sort((a, b) => b.value - a.value)
  );
}

// 雨量與淹水假資料
const RAIN_DATA: BarRaceData[][] = generateTrendData(ALL_CITIES, 32);
const FLOOD_DATA: BarRaceData[][] = generateTrendData(ALL_CITIES, 32);

// 顏色表：0~3級對應 安全、較低、次高、最高
const RAIN_LEVEL_COLORS = ['#43a047', '#ffd600', '#fb8c00', '#e53935'];
const FLOOD_LEVEL_COLORS = ['#3e90e0', '#4bd09f', '#fbc02d', '#ea4335']; // 淹水建議可用藍-綠-黃-紅

// 雨量刻度（mm/hr，參照中央氣象局大雨、豪雨、超大豪雨等級）
const RAIN_TICKS = [0, 40, 80, 130, 180];

// 淹水刻度（cm，積水深度）
const FLOOD_TICKS = [0, 10, 30, 50, 80];

// ==========================
//           Header
// ==========================
/**
 * Header
 * - 上方 LOGO/標題區
 * - 四格卡片（雨量、淹水、警戒區域、即時事件）
 * - 雨量/淹水警戒卡片：BarRaceChart 支援展開最多 8 個縣市，收合只秀前 2 名
 */
const Header: React.FC = () => (
  <header
    className="px-4 py-3"
    style={{
      minHeight: 270,
      background: 'transparent',
      width: '100%',
    }}
  >
    {/* 上方 LOGO 與標題（Bulma + 內距優化） */}
    <div className="is-flex is-align-items-center mb-4" style={{ gap: 12 }}>
      <div className="mr-2" style={{ minWidth: 50 }}>
        <Logo />
      </div>
      <Title />
    </div>

    {/* 主要四卡片區（RWD 彈性排列） */}
    <div
      className="header-flex-row is-flex"
      style={{
        marginTop: 8,
        gap: 20,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      {/* 雨量警戒條形圖 */}
      <div style={{ minWidth: 310, maxWidth: 390, height: 170, flex: '1 1 340px' }}>
        <BarRaceChart
          title="雨量警戒"
          data={RAIN_DATA}
          timeLabels={RAIN_TIME_LABELS}
          colorMap={RAIN_LEVEL_COLORS}
          stepDuration={1000}
          fixedHeight={170}
          expandHeight={410}
          unit="mm/hr"
          ticks={RAIN_TICKS}
        />
      </div>
      {/* 淹水警戒條形圖 */}
      <div style={{ minWidth: 310, maxWidth: 390, height: 170, flex: '1 1 340px' }}>
        <BarRaceChart
          title="淹水警戒"
          data={FLOOD_DATA}
          timeLabels={RAIN_TIME_LABELS}
          colorMap={FLOOD_LEVEL_COLORS}
          stepDuration={1000}
          fixedHeight={170}
          expandHeight={410}
          unit="cm"
          ticks={FLOOD_TICKS}
        />
      </div>
      {/* 警戒區域清單 */}
      <div style={{ minWidth: 260, maxWidth: 320, height: 170, flex: '1 1 260px' }}>
        <WarningArea fixedHeight={170} />
      </div>
      {/* 即時事件列表 */}
      <div style={{ minWidth: 260, maxWidth: 320, height: 170, flex: '1 1 260px' }}>
        <WarningEvent fixedHeight={170} />
      </div>
    </div>
  </header>
);

export default Header;
