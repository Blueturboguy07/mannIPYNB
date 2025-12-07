import React, { useState, useEffect } from "react";

interface SkillCategory {
  name: string;
  skills: string[];
  color: string;
}

interface ExpandableSkillDotsProps {
  categories: SkillCategory[];
}

const ExpandableSkillDots: React.FC<ExpandableSkillDotsProps> = ({ categories }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDotClick = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div style={{
      ...styles.container,
      gap: isMobile ? "16px" : "24px",
      minHeight: isMobile ? "300px" : "400px",
      padding: isMobile ? "20px 16px" : "20px 24px"
    }}>
      {categories.map((category, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              ...styles.dot,
              width: isExpanded ? (isMobile ? "100%" : "400px") : "120px",
              height: isExpanded ? (isMobile ? "auto" : "400px") : "120px",
              borderRadius: isExpanded ? "16px" : "50%",
              background: isExpanded
                ? `linear-gradient(135deg, ${category.color}15 0%, ${category.color}08 100%)`
                : `radial-gradient(circle, ${category.color}66 0%, ${category.color}33 100%)`,
              border: isExpanded ? `2px solid ${category.color}40` : "none",
              padding: isExpanded ? "24px" : "0",
              cursor: "pointer",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: isExpanded
                ? `0 8px 32px ${category.color}30, 0 0 60px ${category.color}20`
                : `0 0 20px ${category.color}44`,
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: isExpanded ? "flex-start" : "center",
              overflow: "hidden",
              position: "relative" as const
            }}
          >
            {!isExpanded ? (
              <span style={styles.dotLabel}>{category.name}</span>
            ) : (
              <>
                <h3 style={{ ...styles.categoryTitle, color: category.color, marginBottom: "20px" }}>
                  {category.name}
                </h3>
                <div style={styles.skillsGrid}>
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      style={{
                        ...styles.skillTag,
                        borderColor: category.color + "40",
                        background: category.color + "15",
                        color: category.color,
                        opacity: 0,
                        animation: `fadeInUp 0.4s ease ${skillIndex * 0.05}s forwards`
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap" as const,
    minHeight: "400px",
    position: "relative" as const,
    padding: "20px 24px"
  },
  dot: {
    position: "relative" as const,
    zIndex: 1
  },
  dotLabel: {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 600,
    textAlign: "center" as const,
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
  },
  categoryTitle: {
    fontSize: "24px",
    fontWeight: 700,
    textAlign: "center" as const
  },
  skillsGrid: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "12px",
    justifyContent: "center",
    width: "100%"
  },
  skillTag: {
    padding: "10px 18px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
    border: "1px solid"
  }
};

export default ExpandableSkillDots;

