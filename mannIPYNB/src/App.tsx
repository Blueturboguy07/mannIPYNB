import React from "react";
import AnimatedHero from "./components/AnimatedHero";
import ExperienceCell from "./components/ExperienceCell";
import AnimatedSection from "./components/AnimatedSection";
import FloatingCard from "./components/FloatingCard";
import ExpandableSkillDots from "./components/ExpandableSkillDots";
import InstagramProfile from "./components/InstagramProfile";
import southwestImage from "./assets/southwest.png";
import brainNetworksImage from "./assets/brainnetworkslab.png";
import ismImage from "./assets/ISM.png";
import fallguyImage from "./assets/falllguy.png";
import alertifyImage from "./assets/alertify.png";
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
      ],
      image: southwestImage
    },
    {
      title: "Undergraduate Researcher",
      company: "Brain Networks Lab, Texas A&M Engineering",
      period: "September 2025 - Present",
      description: [
        "Working on deep reinforcement learning frameworks for adaptive tool manipulation.",
        "Building simulations to understand how neural circuits drive learning and behavior."
      ],
      image: brainNetworksImage
    },
    {
      title: "ISM II Student",
      company: "Wakeland HS",
      period: "August 2023 - April 2025",
      description: [
        "Built ML models for image classification and language translation from scratch.",
        "Led workshops teaching 60+ students about AI and machine learning."
      ],
      image: ismImage
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
            <a
              href="https://devpost.com/software/fallguy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "32px", alignItems: "start" }}>
                <img
                  src={fallguyImage}
                  alt="FallGuy"
                  style={{
                    width: "200px",
                    height: "150px",
                    borderRadius: "12px",
                    objectFit: "cover" as const,
                    border: "1px solid rgba(100, 108, 255, 0.2)"
                  }}
                />
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                    <div>
                      <h3 style={{ color: "#ffffff", fontSize: "24px", fontWeight: 700, marginBottom: "4px" }}>
                        FallGuy ↗
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
            </a>
          </FloatingCard>

          {/* Alertify Project */}
          <FloatingCard>
            <a
              href="https://github.com/Blueturboguy07/ALERTIFY"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "32px", alignItems: "start", marginTop: "32px" }}>
                <img
                  src={alertifyImage}
                  alt="Alertify"
                  style={{
                    width: "200px",
                    height: "150px",
                    borderRadius: "12px",
                    objectFit: "cover" as const,
                    border: "1px solid rgba(100, 108, 255, 0.2)"
                  }}
                />
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                    <div>
                      <h3 style={{ color: "#ffffff", fontSize: "24px", fontWeight: 700, marginBottom: "4px" }}>
                        Alertify ↗
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
            </a>
          </FloatingCard>

        </div>
      </AnimatedSection>

      <AnimatedSection id="skills" style={{ padding: "80px 24px", background: "#0f0f1e" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ 
            fontSize: "clamp(32px, 5vw, 64px)", 
            fontWeight: 700, 
            color: "#ffffff", 
            marginBottom: "24px",
            textAlign: "center" as const
          }}>
            Technical Skills
          </h2>
          <p style={{
            color: "#b4b4b8",
            fontSize: "16px",
            textAlign: "center" as const,
            marginBottom: "32px"
          }}>
            try clicking them!
          </p>
          <ExpandableSkillDots categories={skillCategories} />
        </div>
      </AnimatedSection>

      <AnimatedSection id="content" style={{ padding: "80px 24px", background: "#0a0a0f" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ 
            fontSize: "clamp(32px, 5vw, 64px)", 
            fontWeight: 700, 
            color: "#ffffff", 
            marginBottom: "24px",
            textAlign: "center" as const
          }}>
            Latest Content
          </h2>
          <p style={{
            color: "#b4b4b8",
            fontSize: "16px",
            textAlign: "center" as const,
            marginBottom: "48px"
          }}>
            Check out my Instagram
          </p>
          <InstagramProfile username="mann.improves" />
        </div>
      </AnimatedSection>
    </div>
  );
}

export default App;