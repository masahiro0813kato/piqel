import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="font-medium text-lg">Piqel</span>
            </Link>
          </div>

          <div className="flex space-x-6">
            <Link
              href="/about"
              className="hover:underline hover:underline-offset-4"
            >
              About
            </Link>
            <Link
              href="/works"
              className="hover:underline hover:underline-offset-4"
            >
              Works
            </Link>
            <Link
              href="/contact"
              className="hover:underline hover:underline-offset-4"
            >
              Contact
            </Link>
          </div>

          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Masahiro Kato. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
