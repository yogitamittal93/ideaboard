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
          <div className="container flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 px-6 py-4 sm:py-0 gap-2 sm:gap-0">
            <Link
              href="/"
              className="font-semibold text-lg text-center w-full sm:w-auto"
            >
              IdeasBoard
            </Link>
            <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/app"
                className="px-3 py-2 w-full sm:w-auto rounded-md bg-slate-900 text-white hover:opacity-90 text-center"
              >
                Open App
              </Link>
            </nav>
          </div>
        </header>
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <footer className="mt-12 py-6 text-center text-sm text-slate-600">
          Built with Microservices Architecture — Production-ready frontend
        </footer>
      </body>
    </html>
  );
}
