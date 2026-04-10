import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Visceral Current Multidimensional University',
  description: 'A living ecosystem for balanced self-discovery across nine domains.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
