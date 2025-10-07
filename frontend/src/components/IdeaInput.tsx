'use client';
import { useState } from 'react';

export default function IdeaInput({
  onSubmit,
}: {
  onSubmit: (text: string, title?: string) => Promise<void> | void;
}) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const max = 280;

  const submit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      const ideaTitle = title.trim() || text.trim().split(' ').slice(0, 3).join(' ');
      await onSubmit(text.trim(), ideaTitle);
      setText('');
      setTitle('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Optional title for your idea..."
        className="w-full p-3 rounded-md border focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <textarea
        value={text}
        maxLength={max}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe your idea (max 280 chars)..."
        className="w-full p-3 rounded-md border resize-none min-h-[100px] focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <div className="flex justify-between items-center text-sm text-slate-500">
        <span>{text.length}/{max}</span>
        <div className="flex gap-2">
          <button
            onClick={() => { setText(''); setTitle(''); }}
            className="px-3 py-1 rounded-md hover:bg-slate-100"
          >
            Clear
          </button>
          <button
            onClick={submit}
            disabled={submitting}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {submitting ? 'Posting...' : 'Post Idea'}
          </button>
        </div>
      </div>
    </div>
  );
}
