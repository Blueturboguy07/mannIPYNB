import React from "react";
import { NotebookCell } from "./components/notebook/Notebook";
import ProfileOutput from "./components/outputs/ProfileOutput";
import ExperienceOutput from "./components/outputs/ExperienceOutput";
import ReposOutput, { ReposStream } from "./components/outputs/ReposOutput";

export const NOTEBOOK_CELLS: NotebookCell[] = [
  {
    id: "md-title",
    type: "markdown",
    content: (
      <>
        <h1>Mann Bellani</h1>
        <p className="jp-md__lede">
          Computer science at Texas A&amp;M. Machine learning, and open-source software people
          actually install.
        </p>
        <hr />
      </>
    ),
  },
  {
    id: "code-profile",
    type: "code",
    runtime: 420,
    source: `from portfolio import Profile

me = Profile.load("mann")
me.card()`,
    result: <ProfileOutput />,
  },

  {
    id: "md-experience",
    type: "markdown",
    content: <h2>Experience</h2>,
  },
  {
    id: "code-experience",
    type: "code",
    runtime: 520,
    source: `roles = me.experience.from_linkedin("mannbellani")

me.render(roles)`,
    result: <ExperienceOutput />,
  },

  {
    id: "md-open-source",
    type: "markdown",
    content: (
      <>
        <h2>Open source</h2>
        <p>
          Fetched live from the GitHub API when this page loads, so the star counts are whatever
          they are right now.
        </p>
      </>
    ),
  },
  {
    id: "code-repos",
    type: "code",
    runtime: 780,
    source: `import requests

repos = requests.get(
    "https://api.github.com/users/Blueturboguy07/repos",
    params={"per_page": 100, "sort": "pushed"},
).json()

mine = [r for r in repos if not r["fork"] and not r["archived"]]
stars = sum(r["stargazers_count"] for r in mine)
print(f"{len(mine)} public repositories · {stars:,} stars")

top = sorted(mine, key=lambda r: -r["stargazers_count"])
me.render(top[:6])`,
    stream: <ReposStream />,
    result: <ReposOutput />,
  },

  {
    id: "code-blank",
    type: "code",
    source: "",
  },
];
