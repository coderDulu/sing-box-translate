import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Sing-box 分流规则管理',
  description: 'Sub-Store - Sing-box 分流规则管理',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-screen w-screen flex-col gap-3 antialiased`}
      >
        <main className="flex-1 overflow-hidden">{children}</main>
        <footer className="self-center">
          <p>&copy; 2024 Sing-box App</p>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
