import React, { useState } from "react";
import ExperienceTimeline from "./ExperienceTimeline";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface ExperienceCellProps {
  experiences: Experience[];
}

const ExperienceCell: React.FC<ExperienceCellProps> = ({ experiences }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setHasRun(false);

    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 600);
  };

  const codeContent = `experiences = load_experiences()
render_timeline(experiences)`;

  return (
    <div style={styles.container}>
      <button
        onClick={handleRun}
        className="notebook-play-button"
        style={styles.playButton}
        disabled={isRunning}
      >
        {isRunning ? "⏳" : "▶"}
      </button>

      <div style={styles.cell}>
        <div style={styles.inputArea}>
          <pre style={styles.code}>
            <code>{codeContent}</code>
          </pre>
        </div>

        {isRunning && (
          <div style={styles.status}>
            <span style={styles.loadingDot}>●</span> Running...
          </div>
        )}

        {hasRun && (
          <div style={styles.outputArea}>
            <ExperienceTimeline experiences={experiences} />
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "flex-start",
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    marginBottom: "24px"
  },
  playButton: {
    marginRight: 12,
    marginTop: 8,
    width: 32,
    height: 32,
    borderRadius: 6,
    border: "1px solid rgba(100, 108, 255, 0.3)",
    background: "linear-gradient(135deg, #1e1e2e 0%, #252538 100%)",
    cursor: "pointer",
    color: "#646cff",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
  },
  cell: {
    flex: 1,
    border: "1px solid rgba(100, 108, 255, 0.2)",
    borderRadius: 8,
    background: "#1a1a2e",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
    overflow: "hidden"
  },
  inputArea: {
    padding: "16px",
    borderBottom: "1px solid rgba(100, 108, 255, 0.1)",
    background: "#0f0f1e"
  },
  code: {
    margin: 0,
    fontFamily: "'Fira Code', 'Menlo', 'Monaco', 'Consolas', monospace",
    fontSize: 13,
    color: "#d4d4d4",
    lineHeight: "1.6",
    overflow: "hidden"
  },
  status: {
    padding: "12px 16px",
    fontSize: 13,
    color: "#646cff",
    fontStyle: "italic",
    background: "rgba(100, 108, 255, 0.1)",
    borderLeft: "3px solid #646cff",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  loadingDot: {
    animation: "pulse 1.5s ease-in-out infinite",
    color: "#646cff"
  },
  outputArea: {
    padding: "24px",
    background: "transparent"
  }
};

export default ExperienceCell;

