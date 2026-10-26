"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

const COLORS = {
  comment: "rgba(255,255,255,0.28)",
  keyword: "#05C770",
  string: "#FFC46B",
  fn: "#7EE3B8",
  type: "#6EE7F9",
  plain: "rgba(255,255,255,0.72)",
} as const;

type Token = [text: string, kind: keyof typeof COLORS];

const CODE: Token[][] = [
  [["// domains/technical.ts", "comment"]],
  [
    ["import ", "keyword"],
    ["{ Crew }", "type"],
    [" from ", "keyword"],
    ['"@hrcc/core"', "string"],
    [";", "plain"],
  ],
  [
    ["const ", "keyword"],
    ["technical", "fn"],
    [" = ", "plain"],
    ["new ", "keyword"],
    ["Crew", "type"],
    ["({", "plain"],
  ],
  [
    ["  stack: [", "plain"],
    ['"React"', "string"],
    [", ", "plain"],
    ['"AI/ML"', "string"],
    [", ", "plain"],
    ['"Hardware"', "string"],
    ["],", "plain"],
  ],
  [["});", "plain"]],
  [
    ["technical", "plain"],
    [".", "plain"],
    ["ship", "fn"],
    ["(); ", "plain"],
    ["// 40+ builders, one crew", "comment"],
  ],
];

// Each line costs one extra character so blank lines still take time to "type".
const LINE_COSTS = CODE.map((line) => line.reduce((sum, [text]) => sum + text.length, 0) + 1);
const TOTAL_CHARS = LINE_COSTS.reduce((a, b) => a + b, 0);

function useTypewriter(total: number, active: boolean, msPerChar = 14, holdMs = 2600) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    let startedAt = performance.now();
    let finishedAt = 0;

    const tick = (now: number) => {
      if (finishedAt === 0) {
        const typed = Math.min(total, Math.floor((now - startedAt) / msPerChar));
        setCount(typed);
        if (typed >= total) finishedAt = now;
      } else if (now - finishedAt > holdMs) {
        startedAt = now;
        finishedAt = 0;
        setCount(0);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, total, msPerChar, holdMs]);

  return count;
}

export default function TechnicalPanel({ active }: { active: boolean }) {
  const typed = useTypewriter(TOTAL_CHARS, active);
  const done = typed >= TOTAL_CHARS;

  // Which line the caret currently sits on.
  let consumed = 0;
  let caretLine = CODE.length - 1;
  for (let i = 0; i < LINE_COSTS.length; i += 1) {
    if (typed < consumed + LINE_COSTS[i]) {
      caretLine = i;
      break;
    }
    consumed += LINE_COSTS[i];
  }

  let budget = typed;
  const rendered = CODE.map((line) => {
    const parts = line.map(([text, kind]) => {
      const remaining = budget;
      budget -= text.length;
      return remaining <= 0 ? null : { text: text.slice(0, remaining), kind };
    });
    budget -= 1; // newline
    return parts;
  });

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10"
      style={{
        background: "linear-gradient(160deg, rgba(16,18,17,0.95), rgba(6,8,7,0.95))",
        boxShadow: "0 24px 60px -30px rgba(0,0,0,0.9)",
      }}
    >
      {/* Title bar */}
      <div className="flex shrink-0 items-center gap-3 border-b border-white/8 bg-black/40 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-[11px] text-white/40" style={{ fontFamily: MONO }}>
          technical.ts
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-[#05C770]">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#05C770]"
            animate={active ? { opacity: [1, 0.3, 1] } : undefined}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          live
        </span>
      </div>

      {/* Code area */}
      <div className="relative min-h-0 flex-1 overflow-hidden px-3 py-3">
        <div style={{ fontFamily: MONO, fontSize: "clamp(9.5px, 0.85vw, 12px)", lineHeight: 1.7 }}>
          {rendered.map((line, lineIndex) => {
            const showCaret = lineIndex === caretLine;
            return (
              <div key={lineIndex} className="flex whitespace-pre">
                <span className="w-6 shrink-0 select-none text-right text-white/18">
                  {lineIndex + 1}
                </span>
                <span className="pl-3">
                  {line.map((part, tokenIndex) =>
                    part === null ? null : (
                      <span key={tokenIndex} style={{ color: COLORS[part.kind] }}>
                        {part.text}
                      </span>
                    ),
                  )}
                  {showCaret && (
                    <motion.span
                      className="ml-px inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-[#05C770]"
                      animate={{ opacity: done ? [1, 0, 1] : 1 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal strip */}
      <div
        className="flex shrink-0 items-center gap-2 border-t border-white/8 bg-black/50 px-4 py-2.5 text-[10px]"
        style={{ fontFamily: MONO }}
      >
        <span className="text-[#05C770]">$</span>
        <span className="text-white/45">npm run ship</span>
        <motion.span
          className="ml-auto flex items-center gap-1.5 text-[#05C770]"
          animate={{ opacity: done ? 1 : 0.15 }}
          transition={{ duration: 0.35 }}
        >
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12.5l5 5L20 6.5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          deployed
        </motion.span>
      </div>
    </div>
  );
}
