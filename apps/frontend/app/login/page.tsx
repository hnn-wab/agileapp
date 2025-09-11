"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-xs">
        <h1 className="text-2xl font-bold mb-6 text-center">ログイン</h1>
        <button
          onClick={() => signIn("github")}
          className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          GitHubでログイン
        </button>
      </div>
    </div>
  );
}
