import React, { useEffect, useRef, useState } from "react";

interface AnimatedGridProps {
  items: React.ReactNode[];
  columns?: number;
}

const AnimatedGrid: React.FC<AnimatedGridProps> = ({ items, columns = 3 }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index]);
            }, index * 100);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, [items.length]);

  return (
    <div
      ref={gridRef}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
        gap: "24px"
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            opacity: visibleItems.includes(index) ? 1 : 0,
            transform: visibleItems.includes(index)
              ? "translateY(0) scale(1)"
              : "translateY(30px) scale(0.9)",
            transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default AnimatedGrid;

