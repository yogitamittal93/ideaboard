export default function FeatureCard({ title, excerpt }: { title: string; excerpt: string }){
  return (
    <div className="card">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{excerpt}</p>
    </div>
  );
}