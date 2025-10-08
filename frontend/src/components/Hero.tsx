import Image from 'next/image';
import boardImg from '../assets/idea-board-mockup.png';
export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          <p className="text-lg font-medium text-gray-600 my-25 pb-15">Stop Discussing. Start Building.</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text mb-4 py-[25px]">
            Capture <span className="text-primary">Collective Genius</span>. Anonymously.
          </h1>
          <p className="text-gray-700 text-base sm:text-lg mb-6">
            IdeaFlow is the fastest, simplest way for your team to surface, vote on, and prioritize raw innovation. No signups. Zero friction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start mt-[35px]">
            <a
              href="/app"
              className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded font-semibold text-lg hover:bg-blue-600 transition"
            >
              Launch Idea Board →
            </a>
            <span className="text-gray-500 mt-2 sm:mt-0 text-center sm:text-left text-sm sm:text-base">
              It&apos;s live. It&apos;s anonymous. It&apos;s fast.
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 w-full flex justify-center md:justify-end">
          <Image
            src={boardImg}
            width={600}
            height={400}
            alt="Idea Board UI"
            className="w-full max-w-md md:max-w-full h-auto rounded shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
