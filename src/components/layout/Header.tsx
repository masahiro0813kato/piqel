// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
//import { useState } from "react";

export default function Header() {
  //const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">My Portfolio</span>
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/about"
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="/works"
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                Works
              </Link>
              <Link
                href="/lab"
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                Lab
              </Link>
              <Link
                href="/blog"
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>
          {/* モバイルメニュー（省略） */}
        </div>
      </div>
    </header>
  );
}
