import React, { useCallback, useEffect, useRef, useState } from "react";
import PythonSource from "./PythonSource";
import {
  ChevronIcon,
  CloseTabIcon,
  CopyIcon,
  KernelDot,
  NotebookFileIcon,
  PasteIcon,
  PlusIcon,
  RestartIcon,
  RestartRunAllIcon,
  RunIcon,
  SaveIcon,
  ScissorsIcon,
  StopIcon,
} from "../icons";

export type NotebookCell =
  | { id: string; type: "markdown"; content: React.ReactNode }
  | {
      id: string;
      type: "code";
      source: string;
      /** stdout printed above the execute_result, as a real stream output. */
      stream?: React.ReactNode;
      result?: React.ReactNode;
      /** simulated execution time, ms */
      runtime?: number;
    };

type Status = "idle" | "queued" | "busy";

interface CellState {
  count: number | null;
  status: Status;
}

const DEFAULT_RUNTIME = 380;

const Notebook: React.FC<{ cells: NotebookCell[] }> = ({ cells }) => {
  const codeCells = cells.filter((c) => c.type === "code");
  // A notebook's trailing empty cell is a placeholder — it is never part of a
  // run, and executing it would leave the kernel wedged on Busy.
  const runnable = codeCells.filter((c) => c.type === "code" && c.source.trim() !== "");

  const [state, setState] = useState<Record<string, CellState>>(() => {
    const initial: Record<string, CellState> = {};
    codeCells.forEach((cell) => {
      const index = runnable.findIndex((r) => r.id === cell.id);
      initial[cell.id] = { count: index === -1 ? null : index + 1, status: "idle" };
    });
    return initial;
  });
  const [selected, setSelected] = useState<string>(cells[0]?.id ?? "");

  const counter = useRef(runnable.length);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout);
    },
    []
  );

  const patch = useCallback((id: string, next: Partial<CellState>) => {
    setState((prev) => ({ ...prev, [id]: { ...prev[id], ...next } }));
  }, []);

  const runSequence = useCallback(
    (ids: string[], resetCounter: boolean) => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];

      if (resetCounter) counter.current = 0;

      setState((prev) => {
        const next = { ...prev };
        ids.forEach((id) => {
          next[id] = { count: null, status: "queued" };
        });
        return next;
      });

      let offset = 0;
      ids.forEach((id) => {
        const cell = runnable.find((c) => c.id === id);
        const runtime = (cell && cell.type === "code" && cell.runtime) || DEFAULT_RUNTIME;
        const count = ++counter.current;

        timers.current.push(
          window.setTimeout(() => patch(id, { status: "busy", count: null }), offset)
        );
        offset += runtime;
        timers.current.push(window.setTimeout(() => patch(id, { status: "idle", count }), offset));
        offset += 110;
      });
    },
    [runnable, patch]
  );

  const runCell = useCallback((id: string) => runSequence([id], false), [runSequence]);
  const runAll = useCallback(
    () => runSequence(runnable.map((c) => c.id), false),
    [runnable, runSequence]
  );
  const restartAndRunAll = useCallback(
    () => runSequence(runnable.map((c) => c.id), true),
    [runnable, runSequence]
  );

  const interrupt = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setState((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((id) => {
        if (next[id].status !== "idle") next[id] = { ...next[id], status: "idle" };
      });
      return next;
    });
  }, []);

  const busy = Object.values(state).some((s) => s.status !== "idle");
  const selectedIsCode = codeCells.some((c) => c.id === selected);

  return (
    <div className="jp" aria-label="notebook.ipynb">
      <div className="jp__titlebar">
        <div className="jp__lights">
          <span className="jp__light" style={{ background: "#ff5f57" }} />
          <span className="jp__light" style={{ background: "#febc2e" }} />
          <span className="jp__light" style={{ background: "#28c840" }} />
        </div>
        <div className="jp__windowtitle">notebook.ipynb — JupyterLab</div>
      </div>

      <div className="jp__tabbar">
        <div className="jp__tab">
          <NotebookFileIcon />
          <span>notebook.ipynb</span>
          <CloseTabIcon className="jp__tabclose" />
        </div>
      </div>

      <div className="jp__toolbar">
        <button className="jp__tb" type="button" title="Save and create checkpoint">
          <SaveIcon />
        </button>
        <button className="jp__tb" type="button" title="Insert a cell below">
          <PlusIcon />
        </button>
        <button className="jp__tb" type="button" title="Cut this cell">
          <ScissorsIcon />
        </button>
        <button className="jp__tb" type="button" title="Copy this cell">
          <CopyIcon />
        </button>
        <button className="jp__tb" type="button" title="Paste this cell from the clipboard">
          <PasteIcon />
        </button>
        <span className="jp__tbsep" />
        <button
          className="jp__tb"
          type="button"
          title="Run this cell and advance"
          onClick={() => selectedIsCode && runCell(selected)}
        >
          <RunIcon />
        </button>
        <button className="jp__tb" type="button" title="Interrupt the kernel" onClick={interrupt}>
          <StopIcon />
        </button>
        <button className="jp__tb" type="button" title="Restart the kernel" onClick={interrupt}>
          <RestartIcon />
        </button>
        <button
          className="jp__tb"
          type="button"
          title="Restart the kernel and run all cells"
          onClick={restartAndRunAll}
        >
          <RestartRunAllIcon />
        </button>
        <span className="jp__tbsep" />
        <span className="jp__select">
          Code
          <ChevronIcon />
        </span>
        <span className="jp__tbspacer" />
        <button className="jp__kernel" type="button" onClick={runAll} title="Run all cells">
          Python 3 (ipykernel)
        </button>
        <span className={`jp__kerneldot${busy ? " is-busy" : ""}`} title={busy ? "Busy" : "Idle"}>
          <KernelDot busy={busy} />
        </span>
      </div>

      <div className="jp__notebook">
        {cells.map((cell) => {
          const isSelected = cell.id === selected;

          if (cell.type === "markdown") {
            return (
              <div
                key={cell.id}
                className={`jp-cell jp-cell--md${isSelected ? " is-selected" : ""}`}
                onMouseDown={() => setSelected(cell.id)}
              >
                <div className="jp-cell__collapser" />
                <div className="jp-cell__main">
                  <div className="jp-row">
                    <div className="jp-prompt" />
                    <div className="jp-md">{cell.content}</div>
                  </div>
                </div>
              </div>
            );
          }

          const cellState = state[cell.id] ?? { count: null, status: "idle" as Status };
          const running = cellState.status !== "idle";
          const label = running ? "[*]:" : cellState.count === null ? "[ ]:" : `[${cellState.count}]:`;
          const showOutput = !running && cellState.count !== null;
          const empty = cell.source.trim() === "";

          return (
            <div
              key={cell.id}
              className={`jp-cell jp-cell--code${isSelected ? " is-selected" : ""}`}
              onMouseDown={() => setSelected(cell.id)}
            >
              <div className="jp-cell__collapser" />
              <div className="jp-cell__main">
                <div className="jp-row">
                  <button
                    type="button"
                    className="jp-prompt jp-prompt--in"
                    onClick={() => !empty && runCell(cell.id)}
                    title={empty ? undefined : "Run this cell"}
                  >
                    {empty ? "[ ]:" : label}
                  </button>
                  <div className="jp-editor">
                    <pre>
                      <code>
                        {empty ? <span className="jp-caret" /> : <PythonSource source={cell.source} />}
                      </code>
                    </pre>
                  </div>
                </div>

                {showOutput && cell.stream && (
                  <div className="jp-row jp-row--output">
                    <div className="jp-prompt" />
                    <div className="jp-stream">{cell.stream}</div>
                  </div>
                )}

                {showOutput && cell.result && (
                  <div className="jp-row jp-row--output">
                    <div className="jp-prompt jp-prompt--out">{`[${cellState.count}]:`}</div>
                    <div className="jp-out">{cell.result}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="jp__statusbar">
        <span>Mode: Command</span>
        <span>Ln 1, Col 1</span>
        <span>notebook.ipynb</span>
        <span className="jp__tbspacer" />
        <span>Python 3 (ipykernel) | {busy ? "Busy" : "Idle"}</span>
        <span className="jp__kerneldot">
          <KernelDot busy={busy} />
        </span>
      </div>
    </div>
  );
};

export default Notebook;
