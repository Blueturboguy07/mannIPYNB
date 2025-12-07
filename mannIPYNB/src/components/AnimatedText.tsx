import React, { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  delay?: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, delay = 0, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
        display: "inline-block"
      }}
    >
      {text}
    </span>
  );
};

export default AnimatedText;

