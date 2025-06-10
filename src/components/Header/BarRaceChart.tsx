// src/components/BarRaceChart.tsx
import React, { useRef, useEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

// 預設顏色（0:安全 ~ 3:最高）
const defaultColors = ['#43a047', '#ffd600', '#fb8c00', '#e53935'];

// 單筆資料型別
export type BarRaceData = {
  name: string;   // 城市名
  value: number;  // 數值
  level: number;  // 警戒級別 0~3
};

type BarRaceChartProps = {
  title: string;
  data: BarRaceData[][];
  allData?: BarRaceData[][];
  timeLabels: string[];
  colorMap?: string[];
  stepDuration?: number;
  fixedHeight?: number;
  expandHeight?: number;
  unit?: string;
  ticks?: number[];
};

const DEFAULT_HEIGHT = 160;
const EXPAND_HEIGHT = 420;

const BarRaceChart: React.FC<BarRaceChartProps> = ({
  title,
  data,
  allData,
  timeLabels,
  colorMap = defaultColors,
  stepDuration = 1000,
  fixedHeight = DEFAULT_HEIGHT,
  expandHeight = EXPAND_HEIGHT,
  unit = '',
  ticks = [0, 50, 100, 150], // 可由外部覆蓋
}) => {
  const [expanded, setExpanded] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  // 定時切換顯示時間
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % data.length);
    }, stepDuration);
    return () => clearInterval(timer);
  }, [data.length, stepDuration]);

  // 圖表渲染主體
  useEffect(() => {
    if (!chartRef.current) return;
    const root = am5.Root.new(chartRef.current);
    root._logo?.dispose();
    root.setThemes([am5themes_Animated.new(root)]);

    // Main Chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        paddingLeft: 24,
        paddingRight: 32,
        paddingTop: 8,
        paddingBottom: 8,
        layout: root.verticalLayout,
      })
    );

    // Y軸（分類/城市名，label 會自動根據 setAll 資料同步 bar 對齊）
    const yRenderer = am5xy.AxisRendererY.new(root, { inversed: true, minGridDistance: 28 });
    yRenderer.grid.template.set('visible', false);
    yRenderer.labels.template.setAll({
      fontSize: 15,
      fill: am5.color('#f9f9fa'),
      paddingLeft: 4,
    });
    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'name',
        renderer: yRenderer,
      })
    );

    // X軸（可自訂最大值、刻度、單位顯示）
    const xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.labels.template.setAll({
      fontSize: 13,
      fill: am5.color('#ddd'),
      dy: 6,
      text: '{value}', // 僅顯示數字，不顯示單位
    });
    xRenderer.grid.template.setAll({ strokeOpacity: 0.18 });
    xRenderer.ticks.template.setAll({ strokeOpacity: 0.2 });

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: ticks[0],
        max: ticks[ticks.length - 1],
        strictMinMax: true,
        renderer: xRenderer,
        numberFormat: "#",
      })
    );

    // 主刻度自訂 (不帶單位)
    ticks.forEach(val => {
      const range = xAxis.createAxisRange(xAxis.makeDataItem({ value: val }));
      range.get('label')?.setAll({
        text: `${val}`,
        fontSize: 13,
        fill: am5.color('#fff'),
        fontWeight: '700',
        dy: 10,
      });
    });

    // 條形圖本體（bar 會自動與 yAxis label 對齊）
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        valueXField: 'value',
        categoryYField: 'name',
        sequencedInterpolation: true,
      })
    );
    series.columns.template.adapters.add('fill', (fill, target) => {
      const level = (target.dataItem?.dataContext as BarRaceData)?.level ?? 0;
      return am5.color(colorMap[level]);
    });
    series.bullets.push(() =>
      am5.Bullet.new(root, {
        locationX: 1,
        sprite: am5.Label.new(root, {
          text: '{valueX}',
          fill: am5.color('#fff'),
          fontSize: 13,
          centerY: am5.p50,
          centerX: am5.p100,
        }),
      })
    );

    // ==== 顯示資料 ====
    const src = expanded && allData ? allData : data;
    // slice(0,2)收合顯示兩個城市；slice(0,8)展開顯示八個
    const displayData = (src[currentIdx] ?? []).slice(0, expanded ? 8 : 2);

    // ★★確保 Y軸與 bar 對齊（只設 setAll 一次）
    yAxis.data.setAll(displayData);
    series.data.setAll(displayData);

    // 銷毀
    return () => {
      root.dispose();
    };
  }, [data, allData, colorMap, expanded, currentIdx, ticks]);

  // UI
  return (
    <div
      className={`glass-card ${expanded ? 'bar-race-expanded' : ''}`}
      style={{
        height: expanded ? expandHeight : fixedHeight,
        transition: 'height 0.4s cubic-bezier(.65,0,.23,1.02)',
        overflow: 'hidden',
        position: expanded ? 'absolute' : 'relative',
        zIndex: expanded ? 40 : 'auto',
        width: '100%',
        boxShadow: expanded ? '0 8px 38px 0 rgba(20,40,140,0.19)' : undefined,
        padding: '0.8rem 0.4rem 0.2rem 0.7rem',
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* 標題和時間（右上角） */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          className="has-text-weight-bold has-text-white mb-2"
          style={{
            fontSize: 17,
            letterSpacing: 1,
            paddingLeft: 12,
            paddingTop: 2,
            marginBottom: 7,
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {title}
          <span style={{ fontSize: 13, opacity: 0.75, marginLeft: 8 }}>
            {unit && `(${unit})`}
          </span>
        </div>
        {/* 時間顯示（右上角） */}
        <span
          style={{
            fontSize: 15,
            color: "#fff",
            background: "rgba(16,21,47,0.18)",
            borderRadius: 8,
            padding: "3px 12px 3px 10px",
            marginRight: 8,
            marginTop: 2,
            fontWeight: 700,
            letterSpacing: 1.1,
            minWidth: 87,
            textAlign: 'right'
          }}
        >
          {timeLabels[currentIdx]}
        </span>
      </div>

      {/* 條形圖容器 */}
      <div
        ref={chartRef}
        style={{
          width: '100%',
          height: expanded ? expandHeight - 72 : fixedHeight - 72,
        }}
      />

      {/* 警戒級別圖例 */}
      <div
        className="is-flex is-align-items-center mt-1"
        style={{
          gap: 12,
          fontSize: 13,
          marginTop: -3,
          marginBottom: 2,
          paddingLeft: 10,
        }}
      >
        <span style={{ background: colorMap[3], width: 16, height: 16, display: 'inline-block', borderRadius: 4 }} /> 最高警戒
        <span style={{ background: colorMap[2], width: 16, height: 16, display: 'inline-block', borderRadius: 4 }} /> 次高
        <span style={{ background: colorMap[1], width: 16, height: 16, display: 'inline-block', borderRadius: 4 }} /> 較低
        <span style={{ background: colorMap[0], width: 16, height: 16, display: 'inline-block', borderRadius: 4 }} /> 安全
      </div>
    </div>
  );
};

export default BarRaceChart;
