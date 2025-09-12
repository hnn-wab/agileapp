import React from "react";

export default function LoadingSpinner({ text = "読み込み中..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
      <span className="text-gray-500 text-sm">{text}</span>
    </div>
  );
}
