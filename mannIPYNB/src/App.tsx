import React from "react";
import Terminal from "./components/Terminal";
import Notebook from "./components/notebook/Notebook";
import InstagramProfile from "./components/instagram/InstagramProfile";
import { NOTEBOOK_CELLS } from "./notebookCells";
import { LINKS } from "./data";

const App: React.FC = () => (
  <>
    <Terminal />
    <main className="desktop">
      <Notebook cells={NOTEBOOK_CELLS} />
      <InstagramProfile />
      <footer className="desktop__footer">
        <span>Mann Bellani &mdash; {new Date().getFullYear()}</span>
        <span aria-hidden="true">·</span>
        <a href={`${LINKS.github}/mannIPYNB`} target="_blank" rel="noreferrer">
          source
        </a>
      </footer>
    </main>
  </>
);

export default App;
