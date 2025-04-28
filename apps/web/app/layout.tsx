import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fund Raising App',
  description: 'Project management for fund raising',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <div className="container mx-auto flex h-16 items-center px-4">
            <Link href="/" className="font-bold text-lg">
              Fund Raising
            </Link>
            <nav className="ml-auto flex gap-6">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Projects
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
