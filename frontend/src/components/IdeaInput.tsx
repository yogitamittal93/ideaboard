'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      {/* Title Input */}
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your idea a short title (optional)"
          className="w-full p-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-[0.95rem] shadow-sm transition-all duration-200"
        />
      </div>

      {/* Idea Textarea */}
      <div>
        <textarea
          value={text}
          maxLength={max}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe your idea... (max 280 chars)"
          className="w-full p-3 rounded-lg border border-slate-300 resize-none min-h-[120px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-[0.95rem] shadow-sm transition-all duration-200"
        />
        <div className="text-right text-xs text-slate-500 mt-1">
          {text.length}/{max}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-1">
        <button
          onClick={() => {
            setText('');
            setTitle('');
          }}
          disabled={submitting}
          className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all duration-200 text-sm"
        >
          Clear
        </button>
        <button
          onClick={submit}
          disabled={submitting || !text.trim()}
          className={`px-5 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 shadow-sm ${
            submitting || !text.trim()
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
          }`}
        >
          {submitting ? 'Posting...' : 'Post Idea'}
        </button>
      </div>
    </motion.div>
  );
}
