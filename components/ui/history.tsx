"use client";

import { useState } from "react";
import { HistoryItem } from "./history-item";

export interface HistoryEntry {
  date: string;
  company: string;
  tooltipDescription?: string;
  tooltipImages?: [string, string] | [string, string, string];
}

export interface HistoryProps {
  entries: HistoryEntry[];
}

export function History({ entries }: HistoryProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div
      className="flex flex-col w-full"
    >
      {entries.map((entry, index) => (
        <HistoryItem
          key={index}
          date={entry.date}
          company={entry.company}
          tooltipDescription={entry.tooltipDescription}
          tooltipImages={entry.tooltipImages}
          isExpanded={expandedIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
