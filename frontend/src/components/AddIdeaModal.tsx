'use client';
import { useState } from 'react';

export default function AddIdeaModal({ onClose, onSubmit }: { onClose: () => void, onSubmit: (text: string) => void }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return setError("Idea cannot be empty");
    if (text.length > 280) return setError("Max 280 characters allowed");
    onSubmit(text.trim());
    setText('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-slate-900">Add New Idea</h2>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-slate-400"
          placeholder="Type your idea here..."
          value={text}
          onChange={e => setText(e.target.value)}
          rows={5}
          maxLength={280}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 transition mt-2"
        >
          Submit Idea
        </button>
      </div>
    </div>
  );
}
