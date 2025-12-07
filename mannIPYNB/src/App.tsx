import React from "react";
import AnimatedHero from "./components/AnimatedHero";
import ExperienceCell from "./components/ExperienceCell";
import AnimatedSection from "./components/AnimatedSection";
import FloatingCard from "./components/FloatingCard";
import ExpandableSkillDots from "./components/ExpandableSkillDots";
import MagneticButton from "./components/MagneticButton";
import "./App.css";

function App() {
  const experiences = [
    {
      title: "Student Data Scientist",
      company: "Southwest Airlines, Aggie Data Science Club",
      period: "October 2025 - December 2025",
      description: [
        "Built weather risk models using ML to predict flight delays and cancellations.",
        "Created interactive dashboards that helped stakeholders make data-driven decisions."
      ]
    },
    {
      title: "Undergraduate Researcher",
      company: "Brain Networks Lab, Texas A&M Engineering",
      period: "September 2025 - Present",
      description: [
        "Working on deep reinforcement learning frameworks for adaptive tool manipulation.",
        "Building simulations to understand how neural circuits drive learning and behavior."
      ]
    },
    {
      title: "ISM II Student",
      company: "Wakeland HS",
      period: "August 2023 - April 2025",
      description: [
        "Built ML models for image classification and language translation from scratch.",
        "Led workshops teaching 60+ students about AI and machine learning."
      ]
    },
    {
      title: "Mechanical Lead & Computer Vision Developer",
      company: "FRC Robotics",
      period: "August 2022 - June 2025",
      description: [
        "Led a team of 15 building competitive robots for state-level competitions.",
        "Developed computer vision systems for autonomous robot navigation and pathfinding."
      ]
    }
  ];

  const skillCategories = [
    {
      name: "Languages",
      skills: ["SwiftUI", "Java", "C++", "Python", "JavaScript", "R", "HTML", "CSS"],
      color: "#646cff"
    },
    {
      name: "ML & Data",
      skills: ["TensorFlow", "PyTorch", "Jupyter", "LightGBM", "Neural Networks", "CNNs", "RNNs", "DRL"],
      color: "#7c7cff"
    },
    {
      name: "Tools & Frameworks",
      skills: ["Git", "Node.js", "Flask", "Streamlit", "SQL", "Firebase", "Twilio API", "Wolfram"],
      color: "#535bf2"
    }
  ];

  return (
    <div style={{ background: "#0a0a0f", color: "#ffffff", minHeight: "100vh" }}>
      <AnimatedHero />
      
      <AnimatedSection id="experience" style={{ padding: "120px 24px", background: "#0f0f1e" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ 
            fontSize: "clamp(32px, 5vw, 64px)", 
            fontWeight: 700, 
            color: "#ffffff", 
            marginBottom: "60px",
            textAlign: "center" as const
          }}>
            Experience
          </h2>
          <ExperienceCell experiences={experiences} />
        </div>
      </AnimatedSection>

      <AnimatedSection id="projects" style={{ padding: "120px 24px", background: "#0a0a0f" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ 
            fontSize: "clamp(32px, 5vw, 64px)", 
            fontWeight: 700, 
            color: "#ffffff", 
            marginBottom: "60px",
            textAlign: "center" as const
          }}>
            Projects
          </h2>
          
          {/* FallGuy Project */}
          <FloatingCard>
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "32px", alignItems: "start" }}>
              <div style={{ 
                width: "200px", 
                height: "150px", 
                background: "rgba(100, 108, 255, 0.1)", 
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(100, 108, 255, 0.2)"
              }}>
                <span style={{ color: "#646cff", fontSize: "14px" }}>Image Placeholder</span>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                  <div>
                    <h3 style={{ color: "#ffffff", fontSize: "24px", fontWeight: 700, marginBottom: "4px" }}>
                      FallGuy
                    </h3>
                    <p style={{ color: "#646cff", fontSize: "16px", marginBottom: "8px" }}>1st Place @ tidalHack 2025</p>
                  </div>
                </div>
                <p style={{ color: "#d4d4d4", lineHeight: "1.8" }}>
                  Built a privacy-preserving BLE mesh fall-detection system using real-time RSSI analytics and a TensorFlow LSTM (93% accuracy). 
                  Drove data engineering (multi-device acquisition, normalization, labeling) and made edge-to-cloud architecture with automated 
                  discovery and resilient peer-to-peer streaming for IoT healthcare deployment.
                </p>
              </div>
            </div>
          </FloatingCard>

          {/* Alertify Project */}
          <FloatingCard>
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "32px", alignItems: "start", marginTop: "32px" }}>
              <div style={{ 
                width: "200px", 
                height: "150px", 
                background: "rgba(100, 108, 255, 0.1)", 
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(100, 108, 255, 0.2)"
              }}>
                <span style={{ color: "#646cff", fontSize: "14px" }}>Image Placeholder</span>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                  <div>
                    <h3 style={{ color: "#ffffff", fontSize: "24px", fontWeight: 700, marginBottom: "4px" }}>
                      Alertify
                    </h3>
                    <p style={{ color: "#646cff", fontSize: "16px", marginBottom: "8px" }}>iOS School Safety App</p>
                  </div>
                </div>
                <p style={{ color: "#d4d4d4", lineHeight: "1.8" }}>
                  iOS school safety app in UIKit integrating Core Location, Push Notifications, Firebase Authentication/Firestore 
                  for secure user data storage, and Twilio API to send real-time distress alerts with live GPS coordinates to 
                  emergency contacts; implemented background location tracking and low-latency message dispatch.
                </p>
              </div>
            </div>
          </FloatingCard>

        </div>
      </AnimatedSection>

      <AnimatedSection id="skills" style={{ padding: "120px 24px", background: "#0f0f1e" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ 
            fontSize: "clamp(32px, 5vw, 64px)", 
            fontWeight: 700, 
            color: "#ffffff", 
            marginBottom: "60px",
            textAlign: "center" as const
          }}>
            Technical Skills
          </h2>
          <p style={{
            color: "#b4b4b8",
            fontSize: "16px",
            textAlign: "center" as const,
            marginBottom: "40px"
          }}>
            Click on a category to explore skills
          </p>
          <ExpandableSkillDots categories={skillCategories} />
        </div>
      </AnimatedSection>


      <AnimatedSection id="contact" style={{ padding: "120px 24px", background: "#0f0f1e", textAlign: "center" as const }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ 
            fontSize: "clamp(32px, 5vw, 64px)", 
            fontWeight: 700, 
            color: "#ffffff", 
            marginBottom: "24px"
          }}>
            Let's Connect
          </h2>
          <p style={{ 
            fontSize: "18px", 
            color: "#b4b4b8", 
            lineHeight: "1.8", 
            marginBottom: "32px" 
          }}>
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <div style={{ 
            marginBottom: "48px",
            display: "flex",
            flexDirection: "column" as const,
            gap: "12px",
            alignItems: "center"
          }}>
            <p style={{ color: "#d4d4d4", fontSize: "16px" }}>
              📧 <a href="mailto:mannbellani1@gmail.com" style={{ color: "#646cff", textDecoration: "none" }}>mannbellani1@gmail.com</a>
            </p>
            <p style={{ color: "#d4d4d4", fontSize: "16px" }}>
              📱 <a href="tel:469-428-0616" style={{ color: "#646cff", textDecoration: "none" }}>469-428-0616</a>
            </p>
            <p style={{ color: "#d4d4d4", fontSize: "16px" }}>
              📍 Frisco, TX
            </p>
            <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
              <a href="https://github.com/Blueturboguy07" target="_blank" rel="noopener noreferrer" style={{ color: "#646cff", textDecoration: "none" }}>
                GitHub ↗
              </a>
              <a href="https://linkedin.com/in/mannbellani" target="_blank" rel="noopener noreferrer" style={{ color: "#646cff", textDecoration: "none" }}>
                LinkedIn ↗
              </a>
            </div>
          </div>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <MagneticButton href="#work" variant="primary">
              View My Work
            </MagneticButton>
            <MagneticButton href="mailto:mannbellani1@gmail.com" variant="secondary">
              Get in Touch
            </MagneticButton>
          </div>
        </div>
      </AnimatedSection>

      <footer style={{ 
        padding: "40px 24px", 
        textAlign: "center" as const, 
        background: "#0a0a0f", 
        borderTop: "1px solid rgba(100, 108, 255, 0.1)" 
      }}>
        <p style={{ color: "#646cff", fontSize: "14px" }}>
          Built with React & TypeScript • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;