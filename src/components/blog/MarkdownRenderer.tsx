"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Quote, Info, CheckCircle2 } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  if (!content) return null;

  // Split by double newline or sections
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let inList = false;
  let listItems: React.ReactNode[] = [];
  let isNumberedList = false;

  let inTable = false;
  let tableRows: string[][] = [];

  let inCodeBlock = false;
  let codeLines: string[] = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      if (isNumberedList) {
        elements.push(
          <ol key={`list-${elements.length}`} className="my-4 space-y-2.5 pl-2">
            {listItems}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`list-${elements.length}`} className="my-4 space-y-2.5 pl-2">
            {listItems}
          </ul>
        );
      }
      listItems = [];
      inList = false;
    }
  };

  const flushTable = () => {
    if (inTable && tableRows.length > 0) {
      const headerRow = tableRows[0];
      const bodyRows = tableRows.slice(1).filter((r) => !r.every((c) => c.match(/^[:\- ]+$/)));

      elements.push(
        <div key={`table-${elements.length}`} className="my-6 overflow-x-auto rounded-2xl border border-[#EFE9E2] shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
            <thead className="bg-[#FAF8F3] border-b border-[#EFE9E2] text-[#2B1B3D] font-serif uppercase tracking-wider text-[11px]">
              <tr>
                {headerRow.map((col, idx) => (
                  <th key={idx} className="p-3 sm:p-4 font-bold border-r last:border-r-0 border-[#EFE9E2]">
                    {formatInline(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE9E2] text-[#635572]">
              {bodyRows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-[#FBF8F3] transition-colors">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="p-3 sm:p-4 border-r last:border-r-0 border-[#EFE9E2]">
                      {formatInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  const flushCode = () => {
    if (inCodeBlock) {
      elements.push(
        <div key={`code-${elements.length}`} className="my-5 rounded-2xl bg-[#231533] p-4 text-[#FBF8F3] text-xs font-mono overflow-x-auto border border-[#7B4FC9]/30 shadow-md">
          <pre>{codeLines.join("\n")}</pre>
        </div>
      );
      codeLines = [];
      inCodeBlock = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Code block toggle
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushCode();
      } else {
        flushList();
        flushTable();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      continue;
    }

    // Table row detection
    if (line.startsWith("|") && line.endsWith("|")) {
      flushList();
      inTable = true;
      const cells = line
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Horizontal Rule
    if (line === "---" || line === "***" || line === "___") {
      flushList();
      elements.push(
        <div key={`hr-${i}`} className="my-8 flex items-center justify-center gap-3">
          <div className="h-px bg-gradient-to-r from-transparent via-[#EFE9E2] to-transparent flex-1" />
          <Sparkles size={14} className="text-[#C9A24D]" />
          <div className="h-px bg-gradient-to-r from-transparent via-[#EFE9E2] to-transparent flex-1" />
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith("# ")) {
      flushList();
      elements.push(
        <h1 key={`h1-${i}`} className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1B3D] mt-8 mb-4">
          {formatInline(line.replace("# ", ""))}
        </h1>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} className="font-serif text-xl sm:text-2xl font-bold text-[#2B1B3D] mt-8 mb-3 pb-2 border-b border-[#EFE9E2] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C9A24D] inline-block" />
          <span>{formatInline(line.replace("## ", ""))}</span>
        </h2>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} className="font-serif text-lg sm:text-xl font-bold text-[#7B4FC9] mt-6 mb-2">
          {formatInline(line.replace("### ", ""))}
        </h3>
      );
      continue;
    }

    // Blockquote & Callouts
    if (line.startsWith("> ")) {
      flushList();
      const quoteText = line.replace("> ", "");
      const isCallout = quoteText.startsWith("[!NOTE]") || quoteText.startsWith("[!TIP]") || quoteText.startsWith("[!IMPORTANT]");

      if (isCallout) {
        const cleanCallout = quoteText.replace(/\[!(NOTE|TIP|IMPORTANT)\]\s*/, "");
        elements.push(
          <div key={`callout-${i}`} className="my-6 p-4 rounded-2xl bg-[#F5F0FD] border border-[#7B4FC9]/30 flex items-start gap-3 text-xs sm:text-sm text-[#2B1B3D]">
            <Sparkles size={18} className="text-[#7B4FC9] flex-shrink-0 mt-0.5" />
            <div>{formatInline(cleanCallout)}</div>
          </div>
        );
      } else {
        elements.push(
          <blockquote key={`quote-${i}`} className="my-6 pl-4 sm:pl-6 py-3.5 border-l-4 border-[#C9A24D] bg-[#FAF8F3] rounded-r-2xl italic text-[#2B1B3D] font-serif text-sm sm:text-base leading-relaxed relative">
            <Quote size={20} className="text-[#C9A24D]/30 absolute top-2 right-3 pointer-events-none" />
            <div>{formatInline(quoteText)}</div>
          </blockquote>
        );
      }
      continue;
    }

    // Lists (unordered)
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList || isNumberedList) {
        flushList();
        inList = true;
        isNumberedList = false;
      }
      const itemText = line.replace(/^[\-\*]\s+/, "");
      listItems.push(
        <li key={`li-${i}`} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2B1B3D] leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7B4FC9] mt-2 flex-shrink-0" />
          <div>{formatInline(itemText)}</div>
        </li>
      );
      continue;
    }

    // Lists (numbered)
    const numMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numMatch) {
      if (!inList || !isNumberedList) {
        flushList();
        inList = true;
        isNumberedList = true;
      }
      const num = numMatch[1];
      const itemText = numMatch[2];
      listItems.push(
        <li key={`li-num-${i}`} className="flex items-start gap-3 text-xs sm:text-sm text-[#2B1B3D] leading-relaxed">
          <span className="w-5 h-5 rounded-full bg-[#F5F0FD] border border-[#7B4FC9]/30 text-[#7B4FC9] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
            {num}
          </span>
          <div>{formatInline(itemText)}</div>
        </li>
      );
      continue;
    }

    // Regular empty line
    if (!line) {
      flushList();
      continue;
    }

    // Regular Paragraph
    flushList();
    elements.push(
      <p key={`p-${i}`} className="my-3.5 text-xs sm:text-base text-[#2B1B3D] leading-relaxed">
        {formatInline(line)}
      </p>
    );
  }

  // Final flushes
  flushList();
  flushTable();
  flushCode();

  return <div className={`space-y-1 ${className}`}>{elements}</div>;
}

/**
 * Format inline tokens: **bold**, *italic*, [link](url), `code`
 */
function formatInline(text: string): React.ReactNode {
  if (!text) return "";

  // Split by inline formatting tokens while preserving delimiters
  const tokens = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);

  return tokens.map((token, idx) => {
    // Bold: **text**
    if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
      return (
        <strong key={idx} className="font-bold text-[#2B1B3D]">
          {token.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text*
    if (token.startsWith("*") && token.endsWith("*") && token.length >= 2) {
      return (
        <em key={idx} className="italic text-[#635572]">
          {token.slice(1, -1)}
        </em>
      );
    }

    // Inline code: `text`
    if (token.startsWith("`") && token.endsWith("`") && token.length >= 2) {
      return (
        <code key={idx} className="px-1.5 py-0.5 rounded-md bg-[#F5F0FD] text-[#7B4FC9] text-[11px] font-mono border border-[#7B4FC9]/20">
          {token.slice(1, -1)}
        </code>
      );
    }

    // Links: [label](url)
    const linkMatch = token.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const label = linkMatch[1];
      const url = linkMatch[2];
      const isInternal = url.startsWith("/");

      if (isInternal) {
        return (
          <Link key={idx} href={url} className="text-[#7B4FC9] font-semibold underline underline-offset-4 hover:text-[#5E37A1] transition-colors">
            {label}
          </Link>
        );
      }

      return (
        <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="text-[#7B4FC9] font-semibold underline underline-offset-4 hover:text-[#5E37A1] transition-colors">
          {label}
        </a>
      );
    }

    return token;
  });
}
