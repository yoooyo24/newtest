import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">About lofipixel</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A simple image transformation tool. No fuss.
        </p>
      </div>

      <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 mb-12">
        <div className="space-y-6 text-gray-300 text-lg">
          <p className="leading-relaxed">
            lofipixel is a straightforward tool that transforms your images using AI.
          </p>
          <p className="leading-relaxed">
            Upload an image, tell it what to do, get results. That's it.
          </p>
          <p className="leading-relaxed">
            No accounts. No subscriptions. No complicated features.
          </p>
        </div>
      </div>

      <div className="blue-container p-8 text-center mb-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-300">
          Ready to transform your images?
        </h2>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-md transition-colors inline-flex items-center text-lg"
        >
          <span>Get started</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
