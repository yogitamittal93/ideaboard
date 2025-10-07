export default function Footer() {
  return (
    <footer className="bg-bg py-6 text-sm text-gray-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <span className="font-bold text-text">IdeaFlow</span>
        <div className="flex gap-6 my-2 md:my-0">
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <span>© 2025 IdeaFlow, Inc.</span>
      </div>
    </footer>
  );
}
