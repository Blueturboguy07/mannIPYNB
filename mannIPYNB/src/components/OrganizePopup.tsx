import React, { useState, useEffect } from "react";
import "../App.css";

const OrganizePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => setIsDismissed(true), 300);
  };

  if (isDismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: isVisible ? "0" : "-250px",
        left: "0",
        right: "0",
        zIndex: 10000,
        transition: "bottom 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          borderTop: "3px solid #646cff",
          boxShadow: "0 -8px 32px rgba(100, 108, 255, 0.4), 0 -4px 16px rgba(0, 0, 0, 0.5)",
          padding: isMobile ? "18px 20px" : "24px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? "12px" : "20px",
          maxWidth: "100%",
          margin: "0 auto",
          animation: "fadeInUp 0.5s ease-out",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, #646cff, transparent)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        <a
          href="https://organizecampus.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            textDecoration: "none",
            color: "inherit",
            flex: 1,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
          }}
          onClick={(e) => {
            // Track click if needed
            window.open("https://organizecampus.com", "_blank");
          }}
        >
          <img
            src="/logo.png"
            alt="ORGANIZE Logo"
            style={{
              width: isMobile ? "50px" : "60px",
              height: isMobile ? "50px" : "60px",
              objectFit: "contain",
              borderRadius: "8px",
              border: "2px solid rgba(100, 108, 255, 0.5)",
              background: "rgba(255, 255, 255, 0.05)",
              padding: "4px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.borderColor = "#646cff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.borderColor = "rgba(100, 108, 255, 0.5)";
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: 600,
                color: "#646cff",
                marginBottom: "6px",
                display: "inline-block",
                padding: "4px 12px",
                background: "rgba(100, 108, 255, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(100, 108, 255, 0.3)",
              }}
            >
              Join 200+ other students
            </div>
            <div
              style={{
                fontSize: isMobile ? "16px" : "20px",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "4px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              Check out ORGANIZE
              <span
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  color: "#646cff",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              >
                ↗
              </span>
            </div>
            <div
              style={{
                fontSize: isMobile ? "12px" : "14px",
                color: "#b4b4b8",
                lineHeight: 1.4,
              }}
            >
              Finding student orgs at TAMU just got a whole lot easier.
            </div>
          </div>
        </a>
        <button
          onClick={handleDismiss}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            color: "#ffffff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            lineHeight: 1,
            transition: "all 0.3s ease",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.transform = "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.transform = "rotate(0deg)";
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default OrganizePopup;

