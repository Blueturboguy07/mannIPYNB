import React, { useEffect, useRef, useState } from "react";
import userImage from "../assets/IMG_2040.JPG";

const AnimatedHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageOffset = Math.min(scrollY * 1.2, 600);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        background: "#000000",
        fontFamily: "'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
      }}
    >
      <style>{`
        @keyframes blockBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Terminal title bar */}
      <div style={{
        background: "#1c1c1c",
        borderBottom: "1px solid #333",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        </div>
        <span style={{ flex: 1, textAlign: "center", fontSize: "13px", color: "#777" }}>
          {isMobile ? "mann@iphone" : "mann@macbook"} — zsh — 80x24
        </span>
      </div>

      {/* Terminal content area */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        padding: isMobile ? "32px 20px" : "40px 60px",
        gap: isMobile ? "32px" : "60px",
        overflow: "hidden",
      }}>
        {/* Left side: terminal text + icons */}
        <div style={{
          flex: 1,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.3s",
          zIndex: 2,
        }}>
          {/* Prompt lines */}
          <div style={{ marginBottom: "8px", color: "#555", fontSize: "14px" }}>
            Last login: {new Date().toDateString()} on ttys000
          </div>

          <div style={{ marginBottom: "6px" }}>
            <span style={{ color: "#28c840" }}>{isMobile ? "mann@iphone" : "mann@macbook"}</span>
            <span style={{ color: "#777" }}>:</span>
            <span style={{ color: "#6699ff" }}>~</span>
            <span style={{ color: "#777" }}>$ </span>
            <span style={{ color: "#d4d4d4" }}>whoami</span>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <span style={{ color: "#d4d4d4", fontSize: "14px" }}>Hey there, I'm</span>
          </div>

          <h1 style={{
            fontSize: "clamp(40px, 7vw, 80px)",
            fontWeight: 800,
            margin: "0 0 24px 0",
            lineHeight: 1.1,
            fontFamily: "'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
          }}>
            <span style={{
              background: "linear-gradient(135deg, #646cff 0%, #535bf2 50%, #7c7cff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Mann</span>
          </h1>

          <div style={{ marginBottom: "6px" }}>
            <span style={{ color: "#28c840" }}>{isMobile ? "mann@iphone" : "mann@macbook"}</span>
            <span style={{ color: "#777" }}>:</span>
            <span style={{ color: "#6699ff" }}>~</span>
            <span style={{ color: "#777" }}>$ </span>
            <span style={{ color: "#d4d4d4" }}>cat about.txt</span>
          </div>

          <div style={{ color: "#b4b4b8", fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.8, marginBottom: "6px" }}>
            Aspiring Visionary
          </div>
          <div style={{ color: "#b4b4b8", fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.8, marginBottom: "6px" }}>
            Computer Science @ Texas A&M University
          </div>
          <div style={{ color: "#b4b4b8", fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.8, marginBottom: "24px" }}>
            Passionate about using ML to build impactful solutions.
          </div>

          <div style={{ marginBottom: "6px" }}>
            <span style={{ color: "#28c840" }}>{isMobile ? "mann@iphone" : "mann@macbook"}</span>
            <span style={{ color: "#777" }}>:</span>
            <span style={{ color: "#6699ff" }}>~</span>
            <span style={{ color: "#777" }}>$ </span>
            <span style={{ color: "#d4d4d4" }}>ls ./links/</span>
          </div>

          {/* Icons as terminal output */}
          <div style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}>
            {[
              { href: "https://www.linkedin.com/in/mannbellani/", label: "linkedin", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              { href: "https://github.com/Blueturboguy07", label: "github", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
              { href: "https://www.instagram.com/mann.ascends/", label: "instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  background: "#111",
                  border: "1px solid #333",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "#646cff",
                  fontSize: "13px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={link.icon} />
                </svg>
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download="Mann_Bellani_Resume.pdf"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                background: "#111",
                border: "1px solid #333",
                borderRadius: "4px",
                textDecoration: "none",
                color: "#646cff",
                fontSize: "13px",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              resume.pdf
            </a>
          </div>

          {/* Final prompt with blinking cursor */}
          <div>
            <span style={{ color: "#28c840" }}>{isMobile ? "mann@iphone" : "mann@macbook"}</span>
            <span style={{ color: "#777" }}>:</span>
            <span style={{ color: "#6699ff" }}>~</span>
            <span style={{ color: "#777" }}>$ </span>
            <span
              style={{
                display: "inline-block",
                width: "9px",
                height: "18px",
                background: "#d4d4d4",
                verticalAlign: "text-bottom",
                animation: "blockBlink 1s step-end infinite",
              }}
            />
          </div>
        </div>

        {/* Right side: image that slides in then out on scroll */}
        {!isMobile && (
          <div style={{
            flex: "0 0 auto",
            position: "relative",
            zIndex: 1,
            transform: `translateX(${isVisible ? imageOffset : 600}px)`,
            opacity: isVisible ? Math.max(1 - scrollY / 400, 0) : 0,
            transition: isVisible ? "none" : "all 1s ease 0.5s",
            animation: isVisible && scrollY === 0 ? "slideInFromRight 1s ease 0.5s both" : "none",
          }}>
            <img
              src={userImage}
              alt="Mann"
              style={{
                width: "clamp(250px, 30vw, 400px)",
                height: "auto",
                display: "block",
                borderRadius: "6px",
                border: "1px solid #333",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default AnimatedHero;
