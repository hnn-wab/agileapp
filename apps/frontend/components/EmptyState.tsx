import React from "react";

export default function EmptyState({ text = "データがありません" }: { text?: string }) {
  return (
    <div className="text-gray-400 text-center py-8">
      <span>{text}</span>
    </div>
  );
}
