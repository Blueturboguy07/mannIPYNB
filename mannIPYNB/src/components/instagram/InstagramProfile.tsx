import React from "react";
import avatar from "../../assets/pfp.png";
import { IG_USERNAME, LINKS } from "../../data";
import { useInstagram } from "./useInstagram";

const PlayGlyph = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M5.5 3.2v17.6a.8.8 0 0 0 1.22.68l14.1-8.8a.8.8 0 0 0 0-1.36L6.72 2.52A.8.8 0 0 0 5.5 3.2Z" />
  </svg>
);

const GridGlyph = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" />
    <path d="M8.5 2v20M15.5 2v20M2 8.5h20M2 15.5h20" />
  </svg>
);

const ReelsGlyph = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M2.5 7.7h19M7.6 2.3l3.3 5.4M14 2.3l3.3 5.4" />
    <path d="M10.2 11.3v5.6l4.8-2.8z" fill="currentColor" stroke="none" />
  </svg>
);

const TaggedGlyph = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 3H3v18h18z" />
    <path d="M8 20c0-2.5 1.8-4 4-4s4 1.5 4 4" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const LockGlyph = () => (
  <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor" aria-hidden="true">
    <path d="M8 1a3.2 3.2 0 0 0-3.2 3.2V6H4.3A1.3 1.3 0 0 0 3 7.3v5.4A1.3 1.3 0 0 0 4.3 14h7.4a1.3 1.3 0 0 0 1.3-1.3V7.3A1.3 1.3 0 0 0 11.7 6h-.5V4.2A3.2 3.2 0 0 0 8 1Zm1.9 5H6.1V4.2a1.9 1.9 0 1 1 3.8 0Z" />
  </svg>
);

const Chevron: React.FC<{ dir: "left" | "right" }> = ({ dir }) => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === "left" ? "M10 2.5 4.5 8 10 13.5" : "M6 2.5 11.5 8 6 13.5"} />
  </svg>
);

const InstagramProfile: React.FC = () => {
  const { followers, following, posts, fullName, bio, reels } = useInstagram();

  return (
    <section className="browser" aria-label="Instagram profile">
      <div className="browser__titlebar">
        <div className="browser__lights">
          <span className="browser__light" style={{ background: "#ff5f57" }} />
          <span className="browser__light" style={{ background: "#febc2e" }} />
          <span className="browser__light" style={{ background: "#28c840" }} />
        </div>
        <div className="browser__nav">
          <span className="browser__navbtn browser__navbtn--off">
            <Chevron dir="left" />
          </span>
          <span className="browser__navbtn browser__navbtn--off">
            <Chevron dir="right" />
          </span>
        </div>
        <a className="browser__url" href={LINKS.instagram} target="_blank" rel="noreferrer">
          <LockGlyph />
          instagram.com/{IG_USERNAME}
        </a>
      </div>

      <div className="ig">
        <header className="ig__header">
          <a className="ig__avatar" href={LINKS.instagram} target="_blank" rel="noreferrer">
            <img src={avatar} alt={IG_USERNAME} />
          </a>

          <div className="ig__info">
            <div className="ig__row">
              <h2 className="ig__username">{IG_USERNAME}</h2>
              <a className="ig__btn ig__btn--primary" href={LINKS.instagram} target="_blank" rel="noreferrer">
                Follow
              </a>
              <a className="ig__btn" href={LINKS.instagram} target="_blank" rel="noreferrer">
                Message
              </a>
            </div>

            <ul className="ig__stats">
              {posts && (
                <li>
                  <strong>{posts}</strong> posts
                </li>
              )}
              <li>
                <strong>{followers}</strong> followers
              </li>
              <li>
                <strong>{following}</strong> following
              </li>
            </ul>

            <div className="ig__bio">
              <div className="ig__fullname">{fullName}</div>
              {bio.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
        </header>

        <nav className="ig__tabs">
          <span className="ig__tab">
            <GridGlyph />
            Posts
          </span>
          <span className="ig__tab is-active">
            <ReelsGlyph />
            Reels
          </span>
          <span className="ig__tab">
            <TaggedGlyph />
            Tagged
          </span>
        </nav>

        <div className="ig__grid">
          {reels.map((reel) => (
            <a
              className="ig-reel"
              key={reel.code}
              href={`https://www.instagram.com/reel/${reel.code}/`}
              target="_blank"
              rel="noreferrer"
              aria-label={reel.caption || `Reel ${reel.code}`}
            >
              <img src={reel.cover} alt="" loading="lazy" />
              <span className="ig-reel__badge">
                <ReelsGlyph />
              </span>
              {reel.views && (
                <span className="ig-reel__views">
                  <PlayGlyph />
                  {reel.views}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramProfile;
