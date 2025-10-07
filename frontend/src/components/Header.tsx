import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">IdeaFlow</div>
        <nav className="hidden md:flex space-x-6 text-text font-medium">
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#contact">Contact</Link>
        </nav>
        <Link
          href="/app"
          className="ml-4 px-5 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition"
        >
          Launch Idea Board →
        </Link>
      </div>
    </header>
  );
}
