import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="bg-blue-600 text-white p-1 sm:p-1.5 rounded-md group-hover:bg-blue-500 transition-colors">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h1 className="ml-2 text-xl sm:text-2xl font-bold text-white">lofipixel</h1>
            </Link>
            <div className="ml-2 sm:ml-3 px-1.5 sm:px-2 py-0.5 bg-blue-900 rounded-full">
              <p className="text-xs font-medium text-blue-300">Beta</p>
            </div>
          </div>
          <nav className="flex items-center space-x-4 sm:space-x-6">
            <Link
              href="/about"
              className="text-gray-300 hover:text-white text-sm sm:text-base font-medium"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
