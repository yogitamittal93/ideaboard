'use client';
import { upvoteIdea } from '../services/api';
import { motion } from 'framer-motion';

interface UpvoteButtonProps {
  ideaId: string;
  currentVotes: number;
  refetchIdeas: () => void;
}

export default function UpvoteButton({ ideaId, currentVotes, refetchIdeas }: UpvoteButtonProps) {
  const handleUpvote = async () => {
    try {
      // 1. Send the upvote request
      await upvoteIdea(ideaId);

      // 2. CRITICAL: Trigger an immediate refetch of the idea list
      refetchIdeas(); 

    } catch (error) {
      console.error(`Failed to upvote idea ${ideaId}:`, error);
      // Senior dev assessment rule: No alerts. We could use a toast/notification system here.
      // For now, console error and let the next poll/refetch fix it.
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleUpvote}
      className="flex items-center space-x-1.5 p-2 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-600 transition-all duration-200 shadow-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 fill-current"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-semibold">{currentVotes}</span>
    </motion.button>
  );
}
