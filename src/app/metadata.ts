import { Metadata, Viewport } from 'next';

const appName = 'lofipixel';
const appDescription = 'Transform your images with AI using simple prompts';

export const sharedMetadata: Metadata = {
  title: {
    default: `${appName} - AI Image Processing`,
    template: `%s | ${appName}`,
  },
  description: appDescription,
  applicationName: appName,
  authors: { name: 'lofipixel team' },
  keywords: ['AI', 'image processing', 'image transformation', 'art', 'style transfer', 'machine learning'],
  creator: 'lofipixel',
  publisher: 'lofipixel',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    siteName: appName,
    title: `${appName} - AI Image Processing`,
    description: appDescription,
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'lofipixel - Transform images with AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${appName} - AI Image Processing`,
    description: appDescription,
    images: ['/og-image.png'],
    creator: '@lofipixel',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  metadataBase: new URL('https://lofipixel.com'),
};

export const viewport: Viewport = {
  themeColor: '#1e4bb0',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};
