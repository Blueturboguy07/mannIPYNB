import React, { useEffect, useState, useRef } from "react";
import profileImage from "../assets/pfp.png";

interface InstagramProfileProps {
  username: string;
  apiEndpoint?: string; // Optional: backend endpoint to fetch follower count
}

const InstagramProfile: React.FC<InstagramProfileProps> = ({ username, apiEndpoint }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [followerCount] = useState<number>(167);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);


  return (
    <div
      ref={sectionRef}
      style={{
        ...styles.container,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <div style={styles.profileSection}>
        <div
          style={{
            ...styles.profileImageWrapper,
            transform: isVisible ? "scale(1)" : "scale(0.8)",
            transition: "transform 0.8s ease 0.2s"
          }}
        >
          <img
            src={profileImage}
            alt="Profile"
            style={styles.profileImage}
          />
          <div style={styles.profileImageGlow} />
        </div>

        <div style={styles.profileInfo}>
          <div style={styles.usernameRow}>
            <h2 style={styles.username}>{username}</h2>
            <a
              href={`https://www.instagram.com/${username}/`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.followButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(100, 108, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(100, 108, 255, 0.2)";
              }}
            >
              Follow
            </a>
            <a
              href={`https://www.instagram.com/${username}/`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.messageButton}
            >
              Message
            </a>
          </div>

          <div style={styles.stats}>
            <div style={styles.stat}>
              <span style={styles.statNumber}>6</span>
              <span style={styles.statLabel}>posts</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNumber}>{followerCount}</span>
              <span style={styles.statLabel}>followers</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNumber}>5</span>
              <span style={styles.statLabel}>following</span>
            </div>
          </div>

          <div style={styles.bio}>
            <p style={styles.bioText}>
              <strong>18 | CS @ TAMU '28</strong>
            </p>
            <p style={styles.bioText}>
              hmu ✉️: mannbellani1@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
};

const styles = {
  container: {
    width: "100%",
    padding: "40px 0"
  },
  profileSection: {
    display: "flex",
    gap: "40px",
    marginBottom: "48px",
    padding: "32px",
    background: "rgba(100, 108, 255, 0.05)",
    border: "1px solid rgba(100, 108, 255, 0.2)",
    borderRadius: "20px",
    flexWrap: "wrap" as const
  },
  profileImageWrapper: {
    position: "relative" as const,
    width: "150px",
    height: "150px",
    flexShrink: 0
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover" as const,
    border: "3px solid rgba(100, 108, 255, 0.3)",
    position: "relative" as const,
    zIndex: 2
  },
  profileImageGlow: {
    position: "absolute" as const,
    top: "-10px",
    left: "-10px",
    right: "-10px",
    bottom: "-10px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(100, 108, 255, 0.4) 0%, transparent 70%)",
    animation: "pulse 3s ease-in-out infinite",
    zIndex: 1
  },
  profileInfo: {
    flex: 1,
    minWidth: "300px"
  },
  usernameRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
    flexWrap: "wrap" as const
  },
  username: {
    fontSize: "28px",
    fontWeight: 300,
    color: "#ffffff",
    margin: 0
  },
  followButton: {
    padding: "8px 24px",
    background: "linear-gradient(135deg, #646cff 0%, #535bf2 100%)",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    transition: "all 0.3s ease",
    boxShadow: "0 2px 10px rgba(100, 108, 255, 0.2)"
  },
  messageButton: {
    padding: "8px 24px",
    background: "rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    transition: "all 0.3s ease"
  },
  stats: {
    display: "flex",
    gap: "32px",
    marginBottom: "20px"
  },
  stat: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px"
  },
  statNumber: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#ffffff"
  },
  statLabel: {
    fontSize: "14px",
    color: "#b4b4b8"
  },
  bio: {
    marginTop: "16px"
  },
  bioText: {
    fontSize: "16px",
    color: "#ffffff",
    lineHeight: "1.6",
    margin: "4px 0"
  }
};

export default InstagramProfile;

