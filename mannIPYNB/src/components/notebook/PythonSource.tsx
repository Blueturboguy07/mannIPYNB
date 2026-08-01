import React from "react";

/**
 * Small Python tokenizer so code cells get the same colouring CodeMirror gives
 * them inside JupyterLab. Class names map onto the pygments "default" palette
 * in notebook.css — this is not a general-purpose highlighter, only enough of
 * one for the snippets in this notebook.
 */

const KEYWORDS = new Set([
  "and", "as", "assert", "async", "await", "break", "class", "continue", "def",
  "del", "elif", "else", "except", "finally", "for", "from", "global", "if",
  "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "raise",
  "return", "try", "while", "with", "yield",
]);

const CONSTANTS = new Set(["True", "False", "None"]);

const BUILTINS = new Set([
  "abs", "all", "any", "bool", "dict", "dir", "enumerate", "filter", "float",
  "getattr", "int", "isinstance", "len", "list", "map", "max", "min", "open",
  "print", "range", "repr", "reversed", "round", "set", "sorted", "str", "sum",
  "super", "tuple", "type", "zip",
]);

const TOKEN = new RegExp(
  [
    "(#[^\\n]*)", // 1 comment
    "(\"\"\"[\\s\\S]*?\"\"\"|'''[\\s\\S]*?'''|\"(?:[^\"\\\\\\n]|\\\\.)*\"|'(?:[^'\\\\\\n]|\\\\.)*')", // 2 string
    "(\\b\\d[\\d_]*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b)", // 3 number
    "([A-Za-z_][A-Za-z0-9_]*)", // 4 name
    "([+\\-*/%=<>!&|^~@]+)", // 5 operator
  ].join("|"),
  "g"
);

type Piece = { cls: string | null; text: string };

function classify(name: string, before: string, after: string): string | null {
  if (KEYWORDS.has(name)) return "tok-k";
  if (CONSTANTS.has(name)) return "tok-kc";
  if (/\bdef\s+$/.test(before)) return "tok-nf";
  if (/\bclass\s+$/.test(before)) return "tok-nc";
  if (BUILTINS.has(name)) return "tok-nb";
  if (after.startsWith("(")) return "tok-nf";
  return null;
}

export function tokenizePython(source: string): Piece[] {
  const pieces: Piece[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  TOKEN.lastIndex = 0;

  while ((match = TOKEN.exec(source)) !== null) {
    if (match.index > last) pieces.push({ cls: null, text: source.slice(last, match.index) });

    const [text, comment, string, number, name, operator] = match;
    if (comment) pieces.push({ cls: "tok-c", text });
    else if (string) pieces.push({ cls: "tok-s", text });
    else if (number) pieces.push({ cls: "tok-m", text });
    else if (name)
      pieces.push({
        cls: classify(name, source.slice(0, match.index), source.slice(match.index + text.length)),
        text,
      });
    else if (operator) pieces.push({ cls: "tok-o", text });

    last = match.index + text.length;
  }

  if (last < source.length) pieces.push({ cls: null, text: source.slice(last) });
  return pieces;
}

const PythonSource: React.FC<{ source: string }> = ({ source }) => (
  <>
    {tokenizePython(source).map((piece, i) =>
      piece.cls ? (
        <span key={i} className={piece.cls}>
          {piece.text}
        </span>
      ) : (
        <React.Fragment key={i}>{piece.text}</React.Fragment>
      )
    )}
  </>
);

export default PythonSource;
