import React from "react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
      <span className="font-bold">エラー: </span>{message}
    </div>
  );
}
