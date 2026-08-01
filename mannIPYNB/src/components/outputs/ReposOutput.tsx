import React from "react";
import { GITHUB_USER, LANGUAGE_COLORS } from "../../data";
import { ForkIcon, LawIcon, MarkGithubIcon, RepoIcon, StarIcon } from "../icons";
import { useRepos } from "./useRepos";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** GitHub's own phrasing for repository list timestamps. */
function updatedLabel(iso: string): string {
  const then = new Date(iso);
  const days = Math.floor((Date.now() - then.getTime()) / 86_400_000);
  if (days <= 0) return "Updated today";
  if (days === 1) return "Updated yesterday";
  if (days < 30) return `Updated ${days} days ago`;
  const sameYear = then.getFullYear() === new Date().getFullYear();
  const date = `${MONTHS[then.getMonth()]} ${then.getDate()}`;
  return `Updated on ${sameYear ? date : `${date}, ${then.getFullYear()}`}`;
}

export const ReposStream: React.FC = () => {
  const { totalRepos, totalStars } = useRepos();
  return <>{`${totalRepos} public repositories · ${totalStars.toLocaleString("en-US")} stars`}</>;
};

const ReposOutput: React.FC = () => {
  const { featured, totalRepos } = useRepos();

  return (
    <div className="gh">
      <div className="gh__head">
        <MarkGithubIcon className="gh__mark" />
        <a className="gh__owner" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
          {GITHUB_USER}
        </a>
        <span className="gh__crumb">/</span>
        <span className="gh__section">repositories</span>
      </div>

      <ul className="gh__list">
        {featured.map((repo) => (
          <li className="gh-repo" key={repo.name}>
            <div className="gh-repo__head">
              <a
                className="gh-repo__name"
                href={`https://github.com/${GITHUB_USER}/${repo.name}`}
                target="_blank"
                rel="noreferrer"
              >
                {repo.name}
              </a>
              <span className="gh-pill">Public</span>
            </div>

            {repo.description && <p className="gh-repo__desc">{repo.description}</p>}

            {repo.topics.length > 0 && (
              <ul className="gh-topics">
                {repo.topics.slice(0, 5).map((topic) => (
                  <li key={topic}>
                    <a
                      href={`https://github.com/topics/${topic}`}
                      target="_blank"
                      rel="noreferrer"
                      className="gh-topic"
                    >
                      {topic}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <div className="gh-repo__meta">
              {repo.language && (
                <span className="gh-meta">
                  <span
                    className="gh-lang-dot"
                    style={{ background: LANGUAGE_COLORS[repo.language] ?? "#8b949e" }}
                  />
                  {repo.language}
                </span>
              )}
              <a
                className="gh-meta gh-meta--link"
                href={`https://github.com/${GITHUB_USER}/${repo.name}/stargazers`}
                target="_blank"
                rel="noreferrer"
              >
                <StarIcon />
                {repo.stars.toLocaleString("en-US")}
              </a>
              {repo.forks > 0 && (
                <a
                  className="gh-meta gh-meta--link"
                  href={`https://github.com/${GITHUB_USER}/${repo.name}/forks`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ForkIcon />
                  {repo.forks.toLocaleString("en-US")}
                </a>
              )}
              {repo.license && (
                <span className="gh-meta">
                  <LawIcon />
                  {repo.license}
                </span>
              )}
              <span className="gh-meta">{updatedLabel(repo.pushedAt)}</span>
            </div>
          </li>
        ))}
      </ul>

      <a
        className="gh__all"
        href={`https://github.com/${GITHUB_USER}?tab=repositories`}
        target="_blank"
        rel="noreferrer"
      >
        <RepoIcon />
        View all {totalRepos} repositories
      </a>
    </div>
  );
};

export default ReposOutput;
