'use client';
import { useEffect, useState } from 'react';
import IdeaInput from '../../components/IdeaInput';
import IdeaCard from '../../components/IdeaCard';
import { fetchIdeas, createIdea, upvoteIdea } from '../../services/api';

export default function AppPage() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const loadIdeas = async () => {
    setLoading(true);
    try {
      const items = await fetchIdeas();
      setIdeas(items.sort((a: any, b: any) => b.upvotes - a.upvotes));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadIdeas(); }, []);

  const handleCreate = async (text: string, title?: string) => {
    try {
      await createIdea(text, title);
      setModalOpen(false);
      await loadIdeas();
    } catch (error) {
      console.error('Failed to create idea:', error);
      alert('Something went wrong while creating your idea.');
    }
  };

  const handleUpvote = async (id: string) => {
    try {
      await upvoteIdea(id);
      setIdeas(prev => prev.map(i => i.id === id ? { ...i, upvotes: i.upvotes + 1 } : i));
    } catch (error) {
      console.error('Failed to upvote:', error);
      alert('Could not upvote. Please try again.');
    }
  };

  return (
    <div className="container py-10 max-w-6xl mx-auto px-4">
      <header className="mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">💡 IdeaFlow Board</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          + New Idea
        </button>
      </header>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md animate-fadeIn">
            <h2 className="text-lg font-semibold mb-4 text-slate-800">Share a New Idea</h2>
            <IdeaInput onSubmit={handleCreate} />
            <button
              onClick={() => setModalOpen(false)}
              className="mt-3 w-full text-center text-slate-600 hover:text-slate-900 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading ideas...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} onUpvote={() => handleUpvote(idea.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
