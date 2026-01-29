import React, { useState, useEffect } from "react";
import AnimatedHero from "./components/AnimatedHero";
import ExperienceCell from "./components/ExperienceCell";
import AnimatedSection from "./components/AnimatedSection";
import FloatingCard from "./components/FloatingCard";
import ExpandableSkillDots from "./components/ExpandableSkillDots";
import InstagramProfile from "./components/InstagramProfile";
import OrganizePopup from "./components/OrganizePopup";
import southwestImage from "./assets/southwest.png";
import brainNetworksImage from "./assets/brainnetworkslab.png";
import ismImage from "./assets/ISM.png";
import fallguyImage from "./assets/falllguy.png";
import alertifyImage from "./assets/alertify.png";
import "./App.css";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      
      <AnimatedSection id="experience" style={{ padding: isMobile ? "60px 16px" : "120px 24px", background: "#0f0f1e" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ 
            fontSize: "clamp(28px, 6vw, 64px)", 
            fontWeight: 700, 
            color: "#ffffff", 
            marginBottom: isMobile ? "32px" : "60px",
            textAlign: "center" as const
          }}>
            Experience
          </h2>
          <ExperienceCell experiences={experiences} />
        </div>
      </AnimatedSection>

      <AnimatedSection id="projects" style={{ padding: isMobile ? "60px 16px" : "120px 24px", background: "#0a0a0f" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ 
            fontSize: "clamp(28px, 6vw, 64px)", 
            fontWeight: 700, 
            color: "#ffffff", 
            marginBottom: isMobile ? "32px" : "60px",
            textAlign: "center" as const
          }}>
            Projects
          </h2>
          
          {/* ORGANIZE Project */}
          <FloatingCard>
            <a
              href="https://organizecampus.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "200px 1fr", gap: isMobile ? "16px" : "32px", alignItems: "start" }}>
                <div style={{
                  width: isMobile ? "100%" : "200px",
                  height: isMobile ? "200px" : "150px",
                  borderRadius: "12px",
                  border: "1px solid rgba(100, 108, 255, 0.2)",
                  background: "#ffffff",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <img
                    src="/logo.png"
                    alt="ORGANIZE"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain" as const,
                      filter: "brightness(1.1)"
                    }}
                  />
                </div>
                <div>
                  <div style={{ marginBottom: "16px" }}>
                    <h3 style={{ color: "#ffffff", fontSize: "24px", fontWeight: 700, marginBottom: "4px", marginTop: 0 }}>
                      ORGANIZE ↗
                    </h3>
                    <p style={{ color: "#646cff", fontSize: "16px", marginBottom: "12px", marginTop: 0 }}>Student Organization Matching Platform</p>
                    <div style={{ 
                      display: "inline-block",
                      padding: "4px 12px",
                      background: "rgba(100, 108, 255, 0.15)",
                      borderRadius: "12px",
                      border: "1px solid rgba(100, 108, 255, 0.4)",
                      fontSize: "13px",
                      color: "#646cff",
                      fontWeight: 600
                    }}>
                      Join 200+ students
                    </div>
                  </div>
                  <p style={{ color: "#d4d4d4", lineHeight: "1.8", marginBottom: "16px" }}>
                    Finding student orgs at TAMU just got a whole lot easier. A matching survey that actually matches you to student 
                    organizations based on your interests. With 1,300+ organizations on campus, ORGANIZE helps students discover 
                    orgs far more effectively than what currently exists.
                  </p>
                  <div style={{
                    padding: "12px 16px",
                    background: "rgba(100, 108, 255, 0.08)",
                    borderRadius: "8px",
                    border: "1px solid rgba(100, 108, 255, 0.2)",
                    marginTop: "12px"
                  }}>
                    <div style={{ 
                      fontSize: "13px", 
                      color: "#646cff", 
                      fontWeight: 600, 
                      marginBottom: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}>
                      <span>🚀</span> Coming Soon: Phase 2
                    </div>
                    <p style={{ 
                      fontSize: "13px", 
                      color: "#b4b4b8", 
                      lineHeight: "1.6",
                      margin: 0
                    }}>
                      Organizations will be able to join the platform to host applications, onboarding, and communication directly through ORGANIZE.
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </FloatingCard>

          {/* FallGuy Project */}
          <FloatingCard>
            <a
              href="https://devpost.com/software/fallguy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "200px 1fr", gap: isMobile ? "16px" : "32px", alignItems: "start", marginTop: isMobile ? "24px" : "32px" }}>
                <img
                  src={fallguyImage}
                  alt="FallGuy"
                  style={{
                    width: isMobile ? "100%" : "200px",
                    height: isMobile ? "200px" : "150px",
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
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "200px 1fr", gap: isMobile ? "16px" : "32px", alignItems: "start", marginTop: isMobile ? "24px" : "32px" }}>
                <img
                  src={alertifyImage}
                  alt="Alertify"
                  style={{
                    width: isMobile ? "100%" : "200px",
                    height: isMobile ? "200px" : "150px",
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

      <AnimatedSection id="skills" style={{ padding: isMobile ? "60px 16px" : "80px 24px", background: "#0f0f1e" }}>
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

      <AnimatedSection id="content" style={{ padding: isMobile ? "60px 16px" : "80px 24px", background: "#0a0a0f" }}>
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
          <InstagramProfile username="mann.ascends" />
        </div>
      </AnimatedSection>
      
      <OrganizePopup />
    </div>
  );
}

export default App;