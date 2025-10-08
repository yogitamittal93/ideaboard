'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IdeaCard({ idea, onUpvote }: { idea: any; onUpvote: () => void }) {
  const [justUpvoted, setJustUpvoted] = useState(false);

  // Fallback title from idea text
  const displayTitle =
    idea.title && idea.title.trim() !== ''
      ? idea.title
      : idea.text
          ?.split(' ')
          ?.slice(0, 5)
          ?.join(' ')
          ?.replace(/\.$/, '') + (idea.text?.split(' ').length > 5 ? '…' : '');

  const handleUpvote = () => {
    setJustUpvoted(true);
    onUpvote?.();
    setTimeout(() => setJustUpvoted(false), 800);
  };

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 10px 25px rgba(0,0,0,0.07)' }}
      transition={{ duration: 0.25 }}
      className={`relative bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between min-h-[190px] overflow-hidden transition-all duration-300 ${
        justUpvoted ? 'ring-2 ring-green-400/70' : ''
      }`}
    >
      {/* Pin & Title */}
      {displayTitle && (
        <div className="relative mb-3 w-fit">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-md translate-y-[-2px]" />
            <h3 className="text-[1.05rem] font-semibold text-slate-900 leading-snug">
              {displayTitle}
            </h3>
          </div>
        </div>
      )}

      {/* Idea Text */}
      <p className="text-slate-700 mb-5 leading-relaxed text-[0.95rem] flex-1">
        {idea.text}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-slate-100">
        <div className="text-xs text-gray-500">
          <p className="opacity-70">
            {idea.created_at ? new Date(idea.created_at).toLocaleString() : 'Just now'}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-700">
            {idea.upvotes ?? 0} Upvotes
          </p>
        </div>

        {/* Upvote Button */}
        <button
          onClick={handleUpvote}
          className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <motion.span
            key={justUpvoted ? 'active' : 'inactive'}
            initial={{ scale: 1 }}
            animate={{ scale: justUpvoted ? 1.3 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          >
            ▲
          </motion.span>
          Upvote
        </button>
      </div>

      {/* Glow animation */}
      <AnimatePresence>
        {justUpvoted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-green-300/20 rounded-2xl pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
