import React, { useEffect, useRef, useState } from "react";
import userImage from "../assets/IMG_2040.JPG";

const AnimatedHero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(100, 108, 255, 0.15) 0%, transparent 50%)`,
        padding: isMobile ? "40px 16px 60px" : "20px 24px 80px"
      }}
    >
      {/* Animated background particles */}
      <div style={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.particle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Animated glow effect behind social buttons */}
      <style>{`
        .social-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(100, 108, 255, 0.4) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          transition: width 0.3s ease, height 0.3s ease;
        }
        .social-button:hover::before {
          width: 100px;
          height: 100px;
        }
      `}</style>

      <div style={styles.container}>
        <div
          style={{
            ...styles.content,
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "40px" : "80px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease"
          }}
        >
          <div style={styles.textSection}>
            <div style={styles.greeting}>Hey there, I'm</div>
            <h1 style={styles.name}>
              <span style={styles.nameGradient}>Mann</span>
              <span style={styles.cursor}>_</span>
            </h1>
            <div style={styles.title}>
              <span>Aspiring Visionary</span>
              
            </div>
            <p style={styles.description}>
              Computer Science student at Texas A&M University.
              Passionate about using ML to build impactful solutions.
              <span style={styles.blink}>|</span>
            </p>
            
            <div style={styles.socialButtons}>
              <a
                href="https://www.linkedin.com/in/mannbellani/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                style={styles.socialButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.15) rotate(5deg)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(100, 108, 255, 0.6)";
                  e.currentTarget.style.borderColor = "rgba(100, 108, 255, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(100, 108, 255, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(100, 108, 255, 0.3)";
                }}
              >
                <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://github.com/Blueturboguy07"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                style={styles.socialButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.15) rotate(-5deg)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(100, 108, 255, 0.6)";
                  e.currentTarget.style.borderColor = "rgba(100, 108, 255, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(100, 108, 255, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(100, 108, 255, 0.3)";
                }}
              >
                <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/mann.ascends/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                style={styles.socialButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.15) rotate(5deg)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(100, 108, 255, 0.6)";
                  e.currentTarget.style.borderColor = "rgba(100, 108, 255, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(100, 108, 255, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(100, 108, 255, 0.3)";
                }}
              >
                <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="/resume.pdf"
                download="Mann_Bellani_Resume.pdf"
                className="social-button"
                style={styles.socialButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.15) rotate(-5deg)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(100, 108, 255, 0.6)";
                  e.currentTarget.style.borderColor = "rgba(100, 108, 255, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(100, 108, 255, 0.3)";
                  e.currentTarget.style.borderColor = "rgba(100, 108, 255, 0.3)";
                }}
              >
                <svg style={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </a>
            </div>
          </div>
          <div style={styles.imageSection}>
            <div style={styles.imageWrapper}>
              <img src={userImage} alt="Mann" style={styles.image} />
              <div style={styles.imageGlow} />
              <div style={styles.imageBorder} />
            </div>
          </div>
        </div>
      </div>

      <div style={styles.scrollIndicator}>
        <div style={styles.scrollLine} />
        <span style={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
};

const styles = {
  particles: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "none" as const
  },
  particle: {
    position: "absolute" as const,
    width: "4px",
    height: "4px",
    background: "rgba(100, 108, 255, 0.5)",
    borderRadius: "50%",
    animation: "float 6s ease-in-out infinite"
  },
  container: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    zIndex: 2
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    alignItems: "center"
  },
  textSection: {
    zIndex: 2
  },
  greeting: {
    fontSize: "20px",
    color: "#646cff",
    marginBottom: "20px",
    fontWeight: 500,
    opacity: 0,
    animation: "fadeInUp 0.8s ease 0.2s forwards"
  },
  name: {
    fontSize: "clamp(48px, 8vw, 96px)",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "20px",
    lineHeight: "1.1",
    opacity: 0,
    animation: "fadeInUp 0.8s ease 0.4s forwards"
  },
  nameGradient: {
    background: "linear-gradient(135deg, #646cff 0%, #535bf2 50%, #7c7cff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },
  cursor: {
    color: "#646cff",
    animation: "blink 1s infinite"
  },
  title: {
    fontSize: "clamp(20px, 3vw, 32px)",
    color: "#b4b4b8",
    marginBottom: "32px",
    fontWeight: 400,
    opacity: 0,
    animation: "fadeInUp 0.8s ease 0.6s forwards"
  },
  blink: {
    color: "#646cff",
    animation: "blink 1s infinite",
    marginLeft: "8px"
  },
  description: {
    fontSize: "clamp(16px, 2vw, 20px)",
    color: "#d4d4d4",
    lineHeight: "1.8",
    marginBottom: "48px",
    maxWidth: "500px",
    opacity: 0,
    animation: "fadeInUp 0.8s ease 0.8s forwards"
  },
  socialButtons: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap" as const,
    opacity: 0,
    animation: "fadeInUp 0.8s ease 1s forwards"
  },
  socialButton: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "rgba(100, 108, 255, 0.1)",
    border: "2px solid rgba(100, 108, 255, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 0 20px rgba(100, 108, 255, 0.3)",
    position: "relative" as const,
    overflow: "hidden" as const
  },
  socialIcon: {
    width: "24px",
    height: "24px",
    color: "#646cff",
    zIndex: 2,
    position: "relative" as const
  },
  imageSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative" as const,
    zIndex: 1
  },
  imageWrapper: {
    position: "relative" as const,
    borderRadius: "24px",
    overflow: "hidden"
  },
  image: {
    width: "clamp(280px, 40vw, 480px)",
    height: "auto",
    display: "block",
    borderRadius: "24px",
    position: "relative" as const,
    zIndex: 2,
    filter: "brightness(1.05)"
  },
  imageGlow: {
    position: "absolute" as const,
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: "radial-gradient(circle, rgba(100, 108, 255, 0.4) 0%, transparent 70%)",
    animation: "rotate 20s linear infinite",
    zIndex: 1
  },
  imageBorder: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: "2px solid rgba(100, 108, 255, 0.3)",
    borderRadius: "24px",
    zIndex: 3,
    pointerEvents: "none" as const
  },
  scrollIndicator: {
    position: "absolute" as const,
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "12px",
    color: "#646cff",
    fontSize: "14px",
    zIndex: 2
  },
  scrollLine: {
    width: "2px",
    height: "40px",
    background: "linear-gradient(180deg, #646cff 0%, transparent 100%)",
    borderRadius: "2px",
    animation: "scrollBounce 2s ease-in-out infinite"
  },
  scrollText: {
    fontSize: "12px",
    letterSpacing: "3px",
    textTransform: "uppercase" as const
  }
};

export default AnimatedHero;

