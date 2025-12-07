import React, { useEffect, useRef, useState, CSSProperties } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  style?: CSSProperties;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, id, className, style }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;

