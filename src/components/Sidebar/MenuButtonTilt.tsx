import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type MenuButtonTiltProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  children?: React.ReactNode;
};

const MenuButtonTilt: React.FC<MenuButtonTiltProps> = ({
  icon,
  label,
  active,
  badge,
  onClick,
  children,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  // Motion values
  const rotateX = useSpring(useMotionValue(0), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    // 控制旋轉角度範圍
    const maxRotate = 45; 
    const rotY = ((x - midX) / midX) * maxRotate;
    const rotX = ((midY - y) / midY) * maxRotate;
    rotateX.set(rotX);
    rotateY.set(rotY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={`glass-menu-btn${active ? " active" : ""}`}
      style={{
        willChange: "transform",
        transformStyle: "preserve-3d",
        // 這裡會自動 merge 你的 Bulma 與自訂 CSS
        rotateX,
        rotateY,
      }}
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span className="menu-icon">{icon}</span>
      <span className="menu-label">{label}</span>
      {badge && badge > 0 && (
        <span className="menu-badge">{badge}</span>
      )}
      {children}
    </motion.button>
  );
};

export default MenuButtonTilt;
