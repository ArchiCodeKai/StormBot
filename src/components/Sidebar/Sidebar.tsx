import React, { useState } from 'react';
import MenuButton from './MenuButton';

const menuList = [
  { icon: <span className="icon"><i className="fas fa-home" /></span>, label: '首頁' },
  { icon: <span className="icon"><i className="fas fa-chart-bar" /></span>, label: '統計' },
  { icon: <span className="icon"><i className="fas fa-tasks" /></span>, label: '待辦事項', badge: 7 },
  { icon: <span className="icon"><i className="fas fa-cog" /></span>, label: '設定' }
];

const Sidebar: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <aside
      className="menu is-flex is-justify-content-center is-align-items-center"
      style={{
        width: '100%',
        position: 'relative',
        zIndex: 5,
        marginBottom: '18px', // 這個 OK, 但不用 minHeight
      }}
    >
      {menuList.map((item, idx) => (
        <MenuButton
          key={item.label}
          icon={item.icon}
          label={item.label}
          active={activeIdx === idx}
          onClick={() => setActiveIdx(idx)}
          badge={item.badge}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
