import React from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, className }) => {
  return (
    <div
      className={className}
      style={styles.card}
    >
      {children}
    </div>
  );
};

const styles = {
  card: {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(100, 108, 255, 0.2)",
    borderRadius: "6px",
    padding: "32px",
    position: "relative" as const,
    overflow: "hidden" as const
  }
};

export default FloatingCard;
