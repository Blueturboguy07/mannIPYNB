import React, { useEffect, useState } from "react";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  image?: string;
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    experiences.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index]);
      }, index * 200);
    });
  }, [experiences.length]);

  return (
    <div style={styles.container}>
      <div style={styles.timelineLine} />
      {experiences.map((exp, index) => (
        <div
          key={index}
          style={{
            ...styles.timelineItem,
            opacity: visibleItems.includes(index) ? 1 : 0,
            transform: visibleItems.includes(index) ? "translateX(0)" : "translateX(-30px)",
            transition: `all 0.6s ease ${index * 0.1}s`
          }}
        >
          <div style={styles.timelineDot} />
          <div style={styles.content}>
            {exp.image ? (
              <img
                src={exp.image}
                alt={exp.company}
                style={styles.image}
              />
            ) : (
              <div style={styles.imagePlaceholder}>
                <span style={{ color: "#646cff", fontSize: "12px" }}>Image</span>
              </div>
            )}
            <div style={styles.textContent}>
              <h3 style={styles.title}>{exp.title}</h3>
              <p style={styles.company}>{exp.company}</p>
              <p style={styles.period}>{exp.period}</p>
              {exp.description.map((desc, i) => (
                <p key={i} style={styles.description}>{desc}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    position: "relative" as const,
    paddingLeft: "32px",
    marginTop: "20px"
  },
  timelineLine: {
    position: "absolute" as const,
    left: "8px",
    top: 0,
    bottom: 0,
    width: "2px",
    background: "linear-gradient(180deg, #646cff 0%, rgba(100, 108, 255, 0.3) 100%)",
    borderRadius: "1px"
  },
  timelineItem: {
    position: "relative" as const,
    marginBottom: "40px",
    paddingLeft: "32px"
  },
  timelineDot: {
    position: "absolute" as const,
    left: "-6px",
    top: "12px",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "#646cff",
    border: "3px solid #0f0f1e",
    boxShadow: "0 0 0 4px rgba(100, 108, 255, 0.3), 0 0 20px rgba(100, 108, 255, 0.5)",
    zIndex: 2
  },
  content: {
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    gap: "24px",
    background: "rgba(100, 108, 255, 0.05)",
    border: "1px solid rgba(100, 108, 255, 0.2)",
    borderRadius: "12px",
    padding: "24px"
  },
  imagePlaceholder: {
    width: "120px",
    height: "120px",
    background: "rgba(100, 108, 255, 0.1)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(100, 108, 255, 0.2)"
  },
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "8px",
    objectFit: "cover" as const,
    border: "1px solid rgba(100, 108, 255, 0.2)"
  },
  textContent: {
    flex: 1
  },
  title: {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: 700,
    marginBottom: "8px"
  },
  company: {
    color: "#646cff",
    fontSize: "16px",
    marginBottom: "4px"
  },
  period: {
    color: "#b4b4b8",
    fontSize: "14px",
    marginBottom: "12px"
  },
  description: {
    color: "#d4d4d4",
    fontSize: "15px",
    lineHeight: "1.6",
    marginBottom: "8px"
  }
};

export default ExperienceTimeline;

