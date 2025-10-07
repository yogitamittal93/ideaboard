import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <p className="text-lg font-medium text-gray-600 mb-2">Stop Discussing. Start Building.</p>
          <h1 className="text-4xl md:text-5xl font-black text-text mb-4">
            Capture <span className="text-primary">Collective Genius</span>. Anonymously.
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            IdeaFlow is the fastest, simplest way for your team to surface, vote on, and prioritize raw innovation. No signups. Zero friction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <a
              href="/app"
              className="px-6 py-3 bg-primary text-white rounded font-semibold text-lg hover:bg-blue-600 transition"
            >
              Launch Idea Board →
            </a>
            <span className="text-gray-500 mt-2 sm:mt-0">It's live. It's anonymous. It's fast.</span>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/idea-board-mockup.png"
            width={600}
            height={400}
            alt="Idea Board UI"
            className="rounded shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
