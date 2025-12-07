import React, { useState } from "react";
import userImage from "./assets/IMG_2040.JPG";

const NotebookCell = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setHasRun(false);

    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 500);
  };

  const codeContent = `from IPython.display import display, HTML
from profile_generator import generate_profile

profile_html = generate_profile(
    name="Mann",
    image_path="/content/IMG_2040.JPG",
    bio="I'm a passionate individual with a keen interest in technology...",
    tech_stack={
        "Programming Languages": ["Python", "JavaScript", "Java"],
        "Web Development": ["React", "Node.js", "HTML", "CSS"],
        "Databases": ["PostgreSQL", "MySQL", "MongoDB"],
        "Cloud Platforms": ["GCP", "AWS"],
        "Tools & Technologies": ["Git", "Docker", "Kubernetes", "FastAPI"]
    }
)

display(HTML(profile_html))`;

  const htmlContent = `
<div style="font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif; padding: 32px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1); border: 1px solid rgba(100, 108, 255, 0.2);">

  <h1 style="color: #ffffff; text-align: center; margin-bottom: 32px; font-size: 2.8em; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 20px rgba(100, 108, 255, 0.3);">Hey there, I'm <span style="color: #646cff; background: linear-gradient(135deg, #646cff 0%, #535bf2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Mann</span>!</h1>

  <div style="text-align: center; margin-bottom: 40px;">
    <img src="${userImage}" alt="User Image" style="width: 320px; max-width: 100%; height: auto; border-radius: 20px; border: 2px solid rgba(100, 108, 255, 0.4); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 40px rgba(100, 108, 255, 0.2); transition: transform 0.3s ease;">
  </div>

  <div style="margin-bottom: 40px; background: rgba(0, 0, 0, 0.2); padding: 24px; border-radius: 12px; border: 1px solid rgba(100, 108, 255, 0.1);">
    <h2 style="color: #ffffff; border-bottom: 2px solid rgba(100, 108, 255, 0.5); padding-bottom: 12px; margin-bottom: 20px; font-size: 1.9em; font-weight: 600;">A Little About Me</h2>
    <p style="color: #b4b4b8; line-height: 1.8; font-size: 1.1em; margin: 0;">
      I'm a passionate individual with a keen interest in technology and problem-solving.
      I love exploring new ideas and bringing creative solutions to life.
      My journey involves continuous learning and applying new skills to diverse challenges.
      I thrive in environments where innovation and collaboration are valued.
      I'm excited to share my work and connect with fellow enthusiasts!
    </p>
  </div>

  <div style="background: rgba(0, 0, 0, 0.2); padding: 24px; border-radius: 12px; border: 1px solid rgba(100, 108, 255, 0.1);">
    <h2 style="color: #ffffff; border-bottom: 2px solid rgba(100, 108, 255, 0.5); padding-bottom: 12px; margin-bottom: 20px; font-size: 1.9em; font-weight: 600;">My Tech Stack</h2>
    <ul style="list-style-type: none; padding: 0; margin: 0;">
      <li style="margin-bottom: 14px; color: #b4b4b8; font-size: 1.1em; line-height: 1.6;"><span style="color: #646cff; font-weight: 600; margin-right: 8px;">▸</span><span style="color: #646cff; font-weight: 600;">Programming Languages:</span> <span style="color: #e0e0e0;">Python, JavaScript, Java</span></li>
      <li style="margin-bottom: 14px; color: #b4b4b8; font-size: 1.1em; line-height: 1.6;"><span style="color: #646cff; font-weight: 600; margin-right: 8px;">▸</span><span style="color: #646cff; font-weight: 600;">Web Development:</span> <span style="color: #e0e0e0;">React, Node.js, HTML, CSS</span></li>
      <li style="margin-bottom: 14px; color: #b4b4b8; font-size: 1.1em; line-height: 1.6;"><span style="color: #646cff; font-weight: 600; margin-right: 8px;">▸</span><span style="color: #646cff; font-weight: 600;">Databases:</span> <span style="color: #e0e0e0;">SQL (PostgreSQL, MySQL), MongoDB</span></li>
      <li style="margin-bottom: 14px; color: #b4b4b8; font-size: 1.1em; line-height: 1.6;"><span style="color: #646cff; font-weight: 600; margin-right: 8px;">▸</span><span style="color: #646cff; font-weight: 600;">Cloud Platforms:</span> <span style="color: #e0e0e0;">Google Cloud Platform (GCP), AWS</span></li>
      <li style="margin-bottom: 14px; color: #b4b4b8; font-size: 1.1em; line-height: 1.6;"><span style="color: #646cff; font-weight: 600; margin-right: 8px;">▸</span><span style="color: #646cff; font-weight: 600;">Tools & Technologies:</span> <span style="color: #e0e0e0;">Git, Docker, Kubernetes, FastAPI</span></li>
    </ul>
  </div>

</div>
`;

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
          <div style={styles.status}>Running...</div>
        )}

        {hasRun && (
          <div 
            style={styles.outputArea}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "flex-start",
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
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
    lineHeight: "1.6"
  },
  status: {
    padding: "12px 16px",
    fontSize: 13,
    color: "#646cff",
    fontStyle: "italic",
    background: "rgba(100, 108, 255, 0.1)",
    borderLeft: "3px solid #646cff"
  },
  outputArea: {
    padding: 0,
    background: "transparent"
  }
};

export default NotebookCell;

