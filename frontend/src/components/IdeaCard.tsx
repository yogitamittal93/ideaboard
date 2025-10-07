'use client';
export default function IdeaCard({ idea, onUpvote }: { idea: any; onUpvote: () => void }) {
  // fallback title from idea text
  const displayTitle =
    idea.title && idea.title.trim() !== ''
      ? idea.title
      : idea.text
          ?.split(' ')
          ?.slice(0, 5)
          ?.join(' ')
          ?.replace(/\.$/, '') + (idea.text?.split(' ').length > 5 ? '…' : '');

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between min-h-[180px] border border-slate-100 relative overflow-hidden">
      {/* Sticky Note Title */}
      {displayTitle && (
        <div className="relative w-fit mb-3">
          <div className="sticky-note">
            <span className="text-base font-semibold text-slate-900">{displayTitle}</span>
          </div>
          {/* Pin */}
          <div className="absolute -top-2 left-3 w-2.5 h-2.5 bg-blue-600 rounded-full shadow-md" />
        </div>
      )}

      {/* Idea Text */}
      <p className="whitespace-pre-wrap text-slate-700 mb-4 leading-relaxed">
        {idea.text}
      </p>

      {/* Metadata & Upvote */}
      <div className="flex justify-between items-end mt-auto pt-3 border-t border-slate-100">
        <div className="text-xs text-gray-500">
          <p>{idea.created_at ? new Date(idea.created_at).toLocaleString() : 'Just now'}</p>
          <span className="font-medium text-slate-700">
            {idea.upvotes ?? 0} Upvotes
          </span>
        </div>
        <button
          onClick={onUpvote}
          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          ▲ Upvote
        </button>
      </div>
    </div>
  );
}
