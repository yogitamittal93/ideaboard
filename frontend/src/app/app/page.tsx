'use client';
import { useState } from 'react';
import IdeaCard from '../../components/IdeaCard';
import AddIdeaModal from '../../components/AddIdeaModal'; // Import the dedicated modal component
import { useIdeas } from '../../../hooks/useIdeas'; // Import the dedicated polling hook
import { motion } from 'framer-motion';

export default function AppPage() {
  // Use the hook for all data and loading state
  const { ideas, isLoading, refetch } = useIdeas(); 
  const [modalOpen, setModalOpen] = useState(false);

  // NOTE: handleCreate and handleUpvote logic is now inside the AddIdeaModal and UpvoteButton components.
  // We only need to provide the 'refetch' function as the callback!
  
  return (
    <div className="container py-10 max-w-6xl mx-auto px-4">
      {/* Header */}
      <header className="mb-10 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight text-center sm:text-left w-full sm:w-auto">
          💡 IdeaFlow Board
        </h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white w-full sm:w-auto px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
        >
          + New Idea
        </motion.button>
      </header>

      {/* Modal for New Idea */}
      {/* We use a conditional render and pass the required functions */}
      {modalOpen && (
        <AddIdeaModal 
          onClose={() => setModalOpen(false)} 
          refetchIdeas={refetch} // Pass the function to update the board immediately
        />
      )}

      {/* Ideas Grid */}
      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading ideas...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <IdeaCard 
              key={idea.id} 
              idea={idea} 
              // 1. We replace the inline onUpvote with the dedicated UpvoteButton
              // 2. We pass refetch to the UpvoteButton (via IdeaCard props)
              refetchIdeas={refetch} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
