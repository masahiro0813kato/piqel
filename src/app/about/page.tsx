// src/app/about/page.tsx
import React from "react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <div className="prose max-w-none">
        <p>自己紹介や経歴などを追加してください。</p>
      </div>
    </div>
  );
}
