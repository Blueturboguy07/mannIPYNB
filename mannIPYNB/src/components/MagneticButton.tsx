import React, { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  href,
  onClick,
  variant = "primary"
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: x * 0.3, y: y * 0.3 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyle = {
    ...styles.button,
    ...(variant === "primary" ? styles.primary : styles.secondary),
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: "transform 0.3s ease-out"
  };

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={baseStyle}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={baseStyle}
    >
      {children}
    </button>
  );
};

const styles = {
  button: {
    padding: "16px 36px",
    borderRadius: "8px",
    fontWeight: 600,
    fontSize: "16px",
    textDecoration: "none",
    display: "inline-block",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease"
  },
  primary: {
    background: "linear-gradient(135deg, #646cff 0%, #535bf2 100%)",
    color: "#ffffff",
    boxShadow: "0 4px 20px rgba(100, 108, 255, 0.3)"
  },
  secondary: {
    background: "transparent",
    color: "#646cff",
    border: "2px solid #646cff"
  }
};

export default MagneticButton;

