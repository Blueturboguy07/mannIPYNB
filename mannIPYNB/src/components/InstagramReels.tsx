import React, { useEffect, useState, useRef } from "react";

interface Reel {
  id: string;
  thumbnail: string;
  url: string;
  embedHtml?: string;
}

interface InstagramReelsProps {
  username: string;
  apiEndpoint?: string; // Optional: your backend endpoint to fetch reels
}

const InstagramReels: React.FC<InstagramReelsProps> = ({ username, apiEndpoint }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchReels = async () => {
      if (apiEndpoint) {
        try {
          const response = await fetch(apiEndpoint);
          const data = await response.json();
          setReels(data.reels || []);
        } catch (error) {
          console.error("Error fetching reels:", error);
          // Fallback to placeholder reels
          setReels(getPlaceholderReels());
        }
      } else {
        // Use placeholder reels if no API endpoint
        setReels(getPlaceholderReels());
      }
      setLoading(false);
    };

    fetchReels();
  }, [apiEndpoint, username]);

  const getPlaceholderReels = (): Reel[] => {
    return [
      {
        id: "1",
        thumbnail: "",
        url: `https://www.instagram.com/${username}/reel/`
      },
      {
        id: "2",
        thumbnail: "",
        url: `https://www.instagram.com/${username}/reel/`
      },
      {
        id: "3",
        thumbnail: "",
        url: `https://www.instagram.com/${username}/reel/`
      },
      {
        id: "4",
        thumbnail: "",
        url: `https://www.instagram.com/${username}/reel/`
      }
    ];
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reels.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index]);
            }, index * 100);
          });
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

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading reels...</div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} style={styles.container}>
      <div style={styles.grid}>
        {reels.map((reel, index) => (
          <a
            key={reel.id}
            href={reel.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...styles.reelCard,
              opacity: visibleItems.includes(index) ? 1 : 0,
              transform: visibleItems.includes(index)
                ? "translateY(0) scale(1)"
                : "translateY(30px) scale(0.9)",
              transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(100, 108, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
            }}
          >
            <div style={styles.thumbnail}>
              <div style={styles.placeholder}>
                <svg style={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span style={styles.placeholderText}>Reel</span>
              </div>
            </div>
            <div style={styles.overlay}>
              <div style={styles.instagramBadge}>
                <svg style={styles.instagramIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div style={styles.footer}>
        <a
          href={`https://www.instagram.com/${username}/`}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.viewMoreLink}
        >
          View more on Instagram →
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    padding: "40px 0"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginBottom: "32px"
  },
  reelCard: {
    position: "relative" as const,
    aspectRatio: "9/16",
    borderRadius: "16px",
    overflow: "hidden" as const,
    background: "rgba(100, 108, 255, 0.1)",
    border: "1px solid rgba(100, 108, 255, 0.2)",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    position: "relative" as const,
    background: "linear-gradient(135deg, rgba(100, 108, 255, 0.2) 0%, rgba(100, 108, 255, 0.05) 100%)"
  },
  placeholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "12px"
  },
  playIcon: {
    width: "48px",
    height: "48px",
    color: "#646cff",
    opacity: 0.8
  },
  placeholderText: {
    color: "#646cff",
    fontSize: "14px",
    fontWeight: 600
  },
  overlay: {
    position: "absolute" as const,
    top: "12px",
    right: "12px",
    zIndex: 2
  },
  instagramBadge: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(255, 255, 255, 0.2)"
  },
  instagramIcon: {
    width: "18px",
    height: "18px",
    color: "#ffffff"
  },
  footer: {
    textAlign: "center" as const,
    marginTop: "32px"
  },
  viewMoreLink: {
    color: "#646cff",
    fontSize: "16px",
    fontWeight: 600,
    textDecoration: "none",
    transition: "all 0.3s ease",
    display: "inline-block"
  },
  loading: {
    textAlign: "center" as const,
    color: "#646cff",
    fontSize: "18px",
    padding: "60px 0"
  }
};

export default InstagramReels;

