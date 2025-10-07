export default function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'Zero-Friction Access',
      description: 'Forget logins and lengthy onboarding. IdeaFlow is ready when you are.',
    },
    {
      icon: '👤',
      title: 'True Anonymity',
      description: 'Submissions are fully anonymous, ensuring every voice is heard equally.',
    },
    {
      icon: '📈',
      title: 'Real-Time Prioritization',
      description: 'Upvotes update live across all devices, creating a dynamic prioritization engine.',
    },
    {
      icon: '🎯',
      title: 'Single-Focus Design',
      description: 'Built for one thing: surfacing the next great idea. Pure idea generation.',
    },
  ];

  return (
    <section id="features" className="bg-bg py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-center">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col items-center gap-4">
            <div className="text-4xl">{f.icon}</div>
            <h3 className="text-xl font-bold text-text">{f.title}</h3>
            <p className="text-gray-600">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
