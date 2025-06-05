import React, { useState } from "react";
import { FaHome, FaChartBar, FaTasks, FaCog } from "react-icons/fa";
import MenuButtonTilt from "./MenuButtonTilt";

const menuList = [
  { icon: <FaHome />, label: "首頁" },
  { icon: <FaChartBar />, label: "統計" },
  { icon: <FaTasks />, label: "待辦事項", badge: 7 },
  { icon: <FaCog />, label: "設定" },
];

const Sidebar: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <aside className="glass-menu-card">
      {menuList.map((item, idx) => (
        <MenuButtonTilt
          key={item.label}
          icon={item.icon}
          label={item.label}
          badge={item.badge}
          active={activeIdx === idx}
          onClick={() => setActiveIdx(idx)}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
