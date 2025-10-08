'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddIdeaModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (text: string, title?: string) => void;
}) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = () => {
    if (!text.trim()) return setError('Idea cannot be empty');
    if (text.length > 280) return setError('Max 280 characters allowed');
    onSubmit(text.trim());
    setText('');
    setError('');
    onClose();
  };

  useEffect(() => {
    if (error && text.trim()) setError('');
  }, [text]);

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl relative border border-slate-100"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 text-3xl font-bold leading-none"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Header */}
          <h2 className="text-2xl font-semibold mb-4 text-center text-slate-900">
            💡 Share a New Idea
          </h2>

          {/* Input area */}
          <textarea
            className="w-full p-3 rounded-lg border border-slate-300 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-[0.95rem] shadow-sm transition-all duration-200"
            placeholder="Describe your idea (max 280 chars)..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            maxLength={280}
          />

          {/* Error and counter */}
          <div className="flex justify-between text-xs text-slate-500 mt-1 mb-2">
            <span>{text.length}/280</span>
            {error && <span className="text-red-500">{error}</span>}
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className={`w-full py-2.5 rounded-lg text-white font-medium transition-all duration-200 ${
              !text.trim()
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
            }`}
          >
            Submit Idea
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
