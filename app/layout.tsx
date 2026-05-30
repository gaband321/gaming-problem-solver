import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Gaming Problem Solver — Smart Gear Recommendations',
  description:
    'Describe your gaming setup problem and get expert product recommendations tailored to your exact issue. From back pain to FPS accuracy — solved.',
  keywords: ['gaming gear', 'gaming recommendations', 'gaming setup', 'gaming products'],
  openGraph: {
    title: 'Gaming Problem Solver',
    description: 'Find the best gaming gear for your exact problem.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col antialiased font-sans">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
