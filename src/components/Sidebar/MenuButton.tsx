import React from 'react';


type MenuButtonProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: number; // 未讀數
};

const MenuButton: React.FC<MenuButtonProps> = ({ icon, label, active, onClick, badge }) => (
  <button
    className="button is-white is-flex is-flex-direction-column is-align-items-center mx-2"
    style={{ minWidth: 80, flex: 1, position: 'relative', padding: '8px 0', boxShadow: active ? '0 2px 8px #0002' : 'none' }}
    onClick={onClick}
  >
    <span style={{ fontSize: 22 }}>{icon}</span>
    <span className="is-size-7 mt-1">{label}</span>
    {badge && badge > 0 && (
      <span
        className="tag is-danger is-rounded"
        style={{
          position: 'absolute',
          top: 2,
          right: 8,
          fontSize: 10,
          padding: '2px 6px',
          lineHeight: 1,
        }}
      >
        {badge}
      </span>
    )}
  </button>
);

export default MenuButton;
