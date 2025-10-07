
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Ideas Board',
  description: 'A simple, scalable idea board.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Ideas Board</title>
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        <header className="border-b bg-white/60 sticky top-0 z-30">
          <div className="container flex items-center justify-between h-16 px-14">
            <Link href="/" className="font-semibold text-lg">IdeasBoard</Link>
            <nav className="flex gap-4 items-center">
              <Link href="/app" className="px-3 py-1 rounded-md bg-slate-900 text-white hover:opacity-90">Open App</Link>
            </nav>
          </div>
        </header>
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <footer className="mt-12 py-6 text-center text-sm text-slate-600">Built with ❤️ — Production-ready frontend</footer>
      </body>
    </html>
  );
}