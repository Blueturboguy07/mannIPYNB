import React from "react";

/* ------------------------------------------------------------------ *
 * JupyterLab toolbar icons — 16px, 1.4px strokes, matching jlab's set.
 * ------------------------------------------------------------------ */

type IconProps = { className?: string };

const jl = (children: React.ReactNode, props: IconProps = {}) => (
  <svg
    className={props.className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

export const SaveIcon = (p: IconProps) =>
  jl(
    <>
      <path d="M2.5 2.5h8.6L13.5 4.9v8.6h-11z" />
      <path d="M5 2.5v3.8h5V2.5" />
      <rect x="4.4" y="9" width="7.2" height="4.5" />
    </>,
    p
  );

export const PlusIcon = (p: IconProps) =>
  jl(
    <>
      <path d="M8 3.2v9.6M3.2 8h9.6" />
    </>,
    p
  );

export const ScissorsIcon = (p: IconProps) =>
  jl(
    <>
      <circle cx="4" cy="12" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <path d="M5.2 10.7 11.4 2.6M10.8 10.7 4.6 2.6" />
    </>,
    p
  );

export const CopyIcon = (p: IconProps) =>
  jl(
    <>
      <rect x="5.4" y="5.4" width="8.1" height="8.1" rx="1" />
      <path d="M10.6 5.4V3.5a1 1 0 0 0-1-1H3.5a1 1 0 0 0-1 1v6.1a1 1 0 0 0 1 1h1.9" />
    </>,
    p
  );

export const PasteIcon = (p: IconProps) =>
  jl(
    <>
      <path d="M5.6 3.2H4a1 1 0 0 0-1 1v9.3a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.2a1 1 0 0 0-1-1h-1.6" />
      <rect x="5.6" y="1.6" width="4.8" height="2.8" rx="0.7" />
    </>,
    p
  );

export const RunIcon = (p: IconProps) =>
  jl(
    <>
      <path d="M4.8 3.1 12.6 8l-7.8 4.9z" />
    </>,
    p
  );

export const StopIcon = (p: IconProps) =>
  jl(
    <>
      <rect x="4" y="4" width="8" height="8" rx="0.6" />
    </>,
    p
  );

export const RestartIcon = (p: IconProps) =>
  jl(
    <>
      <path d="M13 8a5 5 0 1 1-1.7-3.8" />
      <path d="M13.2 1.9v2.9h-2.9" />
    </>,
    p
  );

export const RestartRunAllIcon = (p: IconProps) =>
  jl(
    <>
      <path d="M2.4 3.4 7 8l-4.6 4.6z" />
      <path d="M8.4 3.4 13 8l-4.6 4.6z" />
    </>,
    p
  );

export const ChevronIcon = (p: IconProps) =>
  jl(
    <>
      <path d="M4.5 6.5 8 10l3.5-3.5" />
    </>,
    p
  );

/** JupyterLab's orange notebook file icon. */
export const NotebookFileIcon = (p: IconProps) => (
  <svg
    className={p.className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M3.4 1.6h7.1l2.6 2.6v10.2H3.4z"
      fill="#f37726"
      stroke="#d8600f"
      strokeWidth="0.7"
      strokeLinejoin="round"
    />
    <path d="M10.3 1.7v2.7h2.7" fill="#ffb27a" />
    <circle cx="8" cy="7.1" r="0.75" fill="#fff" />
    <path d="M5.2 8.9c1.5 1.5 4.1 1.5 5.6 0" stroke="#fff" strokeWidth="1" fill="none" />
    <path d="M10.8 11.6c-1.5-1.5-4.1-1.5-5.6 0" stroke="#fff" strokeWidth="1" fill="none" />
  </svg>
);

export const CloseTabIcon = (p: IconProps) =>
  jl(
    <>
      <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
    </>,
    p
  );

/** Kernel status dot: hollow when idle, filled when the kernel is busy. */
export const KernelDot: React.FC<{ busy: boolean }> = ({ busy }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
    <circle
      cx="7"
      cy="7"
      r="4.4"
      fill={busy ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);

/* ------------------------------------------------------------------ *
 * GitHub octicons — 16px, filled, verbatim paths from @primer/octicons
 * ------------------------------------------------------------------ */

const octicon = (path: string, size = 16) => (p: IconProps) =>
  (
    <svg
      className={p.className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );

export const StarIcon = octicon(
  "M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
);

export const ForkIcon = octicon(
  "M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"
);

export const RepoIcon = octicon(
  "M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"
);

export const MarkGithubIcon = octicon(
  "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
);

export const LinkExternalIcon = octicon(
  "M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"
);

export const LawIcon = octicon(
  "M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.081.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z"
);
