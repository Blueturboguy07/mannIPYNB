import React, { useState } from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.card,
        transform: isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: isHovered
          ? "0 20px 60px rgba(100, 108, 255, 0.3)"
          : "0 8px 32px rgba(0, 0, 0, 0.3)"
      }}
    >
      {children}
    </div>
  );
};

const styles = {
  card: {
    background: "rgba(100, 108, 255, 0.05)",
    border: "1px solid rgba(100, 108, 255, 0.2)",
    borderRadius: "16px",
    padding: "32px",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative" as const,
    overflow: "hidden" as const
  }
};

export default FloatingCard;

