import React, { useEffect, useMemo, useState } from "react";
import { LINKS } from "../data";

const HOST = "Manns-MacBook-Air";
const USER = "mann";

/** figlet -f "ANSI Shadow" Mann */
const BANNER = [
  "███╗   ███╗ █████╗ ███╗   ██╗███╗   ██╗",
  "████╗ ████║██╔══██╗████╗  ██║████╗  ██║",
  "██╔████╔██║███████║██╔██╗ ██║██╔██╗ ██║",
  "██║╚██╔╝██║██╔══██║██║╚██╗██║██║╚██╗██║",
  "██║ ╚═╝ ██║██║  ██║██║ ╚████║██║ ╚████║",
  "╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝",
];

type Entry =
  | { kind: "command"; text: string }
  | { kind: "output"; node: React.ReactNode; dwell?: number }
  | { kind: "blank" };

const TYPE_MS = 24;
const TYPE_MS_SLOW = 46;
const AFTER_COMMAND_MS = 190;
const AFTER_OUTPUT_MS = 90;

function loginStamp(now: Date) {
  const day = now.toDateString().slice(0, 10); // "Thu Jul 31"
  const time = now.toTimeString().slice(0, 8); // "14:22:08"
  return { day, time };
}

const Banner: React.FC = () => (
  <pre className="term__banner" role="img" aria-label="MANN">
    {BANNER.map((line) => (
      <span key={line} className="term__banner-line">
        {line.split("").map((ch, i) =>
          ch === "█" ? (
            <b key={i}>{ch}</b>
          ) : ch === " " ? (
            ch
          ) : (
            <i key={i}>{ch}</i>
          )
        )}
        {"\n"}
      </span>
    ))}
  </pre>
);

const Terminal: React.FC = () => {
  const now = useMemo(() => new Date(), []);
  const { day, time } = loginStamp(now);
  const serverTime = new Date(now.getTime() + 6000).toTimeString().slice(0, 8);

  const script: Entry[] = useMemo(
    () => [
      { kind: "output", node: <span className="term__faint">{`Last login: ${day} ${time} on ttys000`}</span> },
      { kind: "blank" },
      { kind: "output", node: <Banner />, dwell: 260 },
      { kind: "blank" },

      { kind: "command", text: "whoami" },
      { kind: "output", node: "mann bellani" },
      { kind: "blank" },

      { kind: "command", text: "cat about.txt" },
      {
        kind: "output",
        node: (
          <>
            {"computer science @ texas a&m, class of 2029.\n"}
            {"i build machine learning systems, and open-source software\n"}
            {"that people actually install."}
          </>
        ),
      },
      { kind: "blank" },

      { kind: "command", text: "cat links.txt" },
      {
        kind: "output",
        node: (
          <>
            <a className="term__link" href={LINKS.github} target="_blank" rel="noreferrer">
              github.com/Blueturboguy07
            </a>
            {"\n"}
            <a className="term__link" href={LINKS.linkedin} target="_blank" rel="noreferrer">
              linkedin.com/in/mannbellani
            </a>
            {"\n"}
            <a className="term__link" href={LINKS.instagram} target="_blank" rel="noreferrer">
              instagram.com/mann.ascends
            </a>
          </>
        ),
      },
      { kind: "blank" },

      { kind: "command", text: "jupyter lab notebook.ipynb" },
      {
        kind: "output",
        node: (
          <span className="term__dim">
            {`[I ${serverTime} LabApp] JupyterLab extension loaded from ~/.venv/lib/python3.12\n`}
            {`[I ${serverTime} ServerApp] Serving notebooks from local directory: /Users/mann\n`}
            {`[I ${serverTime} ServerApp] http://localhost:8888/lab/tree/notebook.ipynb`}
          </span>
        ),
        dwell: 220,
      },
      { kind: "blank" },
      { kind: "output", node: <span className="term__faint"># scroll down to open notebook.ipynb</span> },
    ],
    [day, time, serverTime]
  );

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const [step, setStep] = useState(reducedMotion ? script.length : 0);
  const [chars, setChars] = useState(0);
  const finished = step >= script.length;

  // Let an impatient visitor jump straight to the finished session.
  useEffect(() => {
    if (finished) return;
    const skip = () => {
      setStep(script.length);
      setChars(0);
    };
    const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "wheel", "touchmove"];
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, skip));
  }, [finished, script.length]);

  useEffect(() => {
    if (finished) return;
    const entry = script[step];

    if (entry.kind === "command") {
      if (chars < entry.text.length) {
        // Uneven keystrokes read as a person typing, not a marquee.
        const delay = chars > 0 && chars % 4 === 0 ? TYPE_MS_SLOW : TYPE_MS;
        const t = window.setTimeout(() => setChars((c) => c + 1), delay);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => {
        setStep((s) => s + 1);
        setChars(0);
      }, AFTER_COMMAND_MS);
      return () => window.clearTimeout(t);
    }

    const dwell = entry.kind === "output" ? entry.dwell ?? AFTER_OUTPUT_MS : AFTER_OUTPUT_MS;
    const t = window.setTimeout(() => setStep((s) => s + 1), dwell);
    return () => window.clearTimeout(t);
  }, [step, chars, finished, script]);

  const visible = script.slice(0, step);
  const active = finished ? null : script[step];

  const prompt = (
    <>
      <span className="term__user">{`${USER}@${HOST}`}</span>{" "}
      <span className="term__cwd">~</span>{" "}
      <span className="term__sigil">%</span>{" "}
    </>
  );

  return (
    <section className="term" aria-label="Terminal">
      <div className="term__titlebar">
        <div className="term__lights">
          <span className="term__light" style={{ background: "#ff5f57" }} />
          <span className="term__light" style={{ background: "#febc2e" }} />
          <span className="term__light" style={{ background: "#28c840" }} />
        </div>
        <div className="term__title">{`${USER} — -zsh — 104×32`}</div>
      </div>

      <div className="term__body">
        {visible.map((entry, i) => {
          if (entry.kind === "blank") return <div key={i} className="term__blank" />;
          if (entry.kind === "output")
            return (
              <div key={i} className="term__line">
                {entry.node}
              </div>
            );
          return (
            <div key={i} className="term__line">
              {prompt}
              <span className="term__cmd">{entry.text}</span>
            </div>
          );
        })}

        {active && active.kind === "command" && (
          <div className="term__line">
            {prompt}
            <span className="term__cmd">{active.text.slice(0, chars)}</span>
            <span className="term__cursor term__cursor--solid" />
          </div>
        )}

        {finished && (
          <div className="term__line term__line--prompt">
            {prompt}
            <span className="term__cursor" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Terminal;
