import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { sharedMetadata, viewport as viewportData } from './metadata';

const inter = Inter({ subsets: ['latin'] });

// Add fallback for metadata in case of import issues
export const metadata: Metadata = {
  ...sharedMetadata,
  title: "PixelTransformer AI", // Change this to your desired website title
};

// Add fallback for viewport in case of import issues
export const viewport: Viewport = {
  ...viewportData
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-black text-white flex flex-col`}>
        <Header />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
