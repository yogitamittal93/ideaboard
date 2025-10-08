'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UpvoteButton from './UpvoteButton'; 

// Define a set of 'sticky note' colors for variety using an object map
const STICKY_COLORS = [
  { bg: 'bg-yellow-200', titleBg: 'bg-yellow-300' }, 
  { bg: 'bg-blue-200', titleBg: 'bg-blue-300' },   
  { bg: 'bg-green-200', titleBg: 'bg-green-300' },  
  { bg: 'bg-pink-200', titleBg: 'bg-pink-300' },   
];

// Define rotations with custom box-shadow transforms for realistic lifting effect
const ROTATIONS = [
  { rotation: 'rotate-1', shadowTransform: '0 25px 50px rgba(0,0,0,0.15), 5px 5px 10px rgba(0,0,0,0.10)' },
  { rotation: '-rotate-1', shadowTransform: '0 25px 50px rgba(0,0,0,0.15), -5px 5px 10px rgba(0,0,0,0.10)' },
  { rotation: 'rotate-2', shadowTransform: '0 25px 50px rgba(0,0,0,0.15), 8px 8px 15px rgba(0,0,0,0.12)' },
  { rotation: '-rotate-2', shadowTransform: '0 25px 50px rgba(0,0,0,0.15), -8px 8px 15px rgba(0,0,0,0.12)' },
  { rotation: 'rotate-0', shadowTransform: '0 25px 50px rgba(0,0,0,0.15), 0px 5px 10px rgba(0,0,0,0.08)' }, // Neutral shadow for no rotation
];

// Helper to get a semi-stable random index based on idea.id
// This ensures the same idea always gets the same color/rotation on reload.
const getDeterministicRandomIndex = (id: string, arrayLength: number) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % arrayLength;
};

// --- FIX: Added type for onVisualUpvote (which is passed to UpvoteButton) ---
export default function IdeaCard({ idea, refetchIdeas }: { idea: any; refetchIdeas: () => void }) {
  const [justUpvoted, setJustUpvoted] = useState(false);

  // Use useMemo to calculate color and rotation once per idea ID
  const cardStyle = useMemo(() => {
    const colorIndex = getDeterministicRandomIndex(idea.id, STICKY_COLORS.length);
    const rotationIndex = getDeterministicRandomIndex(idea.id + 'r', ROTATIONS.length);
    
    // Now we safely pull the full Tailwind class names from the object
    const colorObject = STICKY_COLORS[colorIndex];
    const rotationObject = ROTATIONS[rotationIndex];

    return {
      color: colorObject.bg, // e.g., 'bg-yellow-200'
      rotation: rotationObject.rotation, // e.g., 'rotate-1'
      titleBg: colorObject.titleBg, // e.g., 'bg-yellow-300'
      shadowTransform: rotationObject.shadowTransform,
    };
  }, [idea.id]);


  // Fallback title logic remains the same
  const displayTitle =
    idea.title && idea.title.trim() !== ''
      ? idea.title
      : idea.text
          ?.split(' ')
          ?.slice(0, 5)
          ?.join(' ')
          ?.replace(/\.$/, '') + (idea.text?.split(' ').length > 5 ? '…' : '');

  // This function only manages the visual ping for instant user feedback
  const handleVisualUpvote = () => {
    setJustUpvoted(true);
    setTimeout(() => setJustUpvoted(false), 800);
  };

  return (
    <motion.div
      // Use custom box shadow based on rotation for depth realism
      whileHover={{ y: -10, boxShadow: cardStyle.shadowTransform.replace(/0 25px 50px/, '0 30px 60px') }} 
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      // Apply the sticky note styling and rotation here
      className={`relative rounded-lg p-0 border border-slate-300 ${cardStyle.color} ${cardStyle.rotation} flex flex-col justify-between min-h-[220px] overflow-hidden transition-all duration-300 ${
        justUpvoted ? 'ring-4 ring-red-500/50 z-10' : '' 
      }`}
      style={{
        boxShadow: cardStyle.shadowTransform,
      }}
    >
      {/* Tape Element (Replaces Thumbtack) */}
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-400/50 backdrop-blur-[1px] shadow-sm z-30 pointer-events-none"
        style={{
            // CSS to simulate torn edges of tape
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 75%, 70% 100%, 50% 75%, 30% 100%, 15% 75%, 0 100%)',
            transform: 'translateX(-50%) rotate(0.5deg)', // Slight tape rotation
            opacity: 0.8
        }}
      />

      {/* Title Band Area (Slightly different background color for clear separation) */}
      <div className={`p-4 pb-2 ${cardStyle.titleBg} border-b border-r border-slate-300`}>
        {displayTitle && (
          <h3 className="text-lg font-extrabold text-slate-800 leading-snug break-words">
            {displayTitle}
          </h3>
        )}
      </div>

      {/* Idea Text (Body of the Sticky Note) */}
      <p className="p-4 pt-2 text-slate-700 leading-relaxed text-sm flex-1 break-words">
        {idea.text}
      </p>

      {/* Footer Area (Date and Upvote Button) */}
      <div className="flex justify-between items-center px-4 py-3 border-t border-slate-300 bg-white/40 backdrop-blur-sm">
        <div className="text-xs text-gray-500">
          <p className="opacity-80 font-medium">
            {idea.created_at ? new Date(idea.created_at).toLocaleDateString() : 'Just now'}
          </p>
        </div>

        {/* Upvote Button (Handles API call and refetches) */}
        <UpvoteButton
          ideaId={idea.id}
          currentVotes={idea.upvotes ?? 0}
          refetchIdeas={refetchIdeas}
          onVisualUpvote={handleVisualUpvote} // Pass the visual effect handler
        />
      </div>

      {/* Glow animation for upvote */}
      <AnimatePresence>
        {justUpvoted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-red-300/20 rounded-lg pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
