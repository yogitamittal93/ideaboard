export default function CTA() {
  return (
    <section className="bg-white py-16 md:py-20 text-center px-6">
      <h2 className="text-3xl sm:text-4xl font-black text-text mb-4">Stop Theorizing. See the Ideas.</h2>
      <p className="text-gray-700 mb-6 text-sm sm:text-base">
        Ready to experience how simple real innovation can be? It takes less than 10 seconds to create your first idea on the board.
      </p>
      <a
        href="/app"
        className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded text-lg font-semibold hover:bg-blue-600 transition"
      >
        Launch Idea Board →
      </a>
    </section>
  );
}
