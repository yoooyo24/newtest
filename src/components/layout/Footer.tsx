import Link from 'next/link';
import { Sparkles, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white p-1 sm:p-1.5 rounded-md">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h2 className="ml-2 text-lg sm:text-xl font-bold text-white">lofipixel</h2>
            </div>
            <p className="mt-1 sm:mt-0 sm:ml-3 text-sm sm:text-base text-gray-400">
              Transform your images with AI
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-3 sm:space-y-4">
            <div className="flex space-x-4 sm:space-x-6">
              <Link
                href="/about"
                className="text-sm sm:text-base text-gray-400 hover:text-white"
              >
                About
              </Link>
              <Link
                href="/privacy"
                className="text-sm sm:text-base text-gray-400 hover:text-white"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm sm:text-base text-gray-400 hover:text-white"
              >
                Terms
              </Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="text-gray-400 text-xs sm:text-sm">Share:</span>
              <button
                className="p-1.5 sm:p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Share on Twitter/X"
              >
                <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-300" />
              </button>
              <button
                className="p-1.5 sm:p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-800">
          <p className="text-center text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} lofipixel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
