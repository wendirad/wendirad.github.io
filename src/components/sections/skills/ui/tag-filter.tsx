import { useState } from "react";
import { trackClarityEvent } from "../../../../utils/clarity";

interface TagFilterProps {
  tagPills: string[];
  activeTags: Set<string>;
  toggleTag: (tag: string) => void;
}

function TagFilter({ tagPills, activeTags, toggleTag }: TagFilterProps) {
  const [showAll, setShowAll] = useState(false);
  
  const INITIAL_COUNT = 8;
  
  const displayedTags = showAll ? tagPills : tagPills.slice(0, INITIAL_COUNT);
  const hasMore = tagPills.length > INITIAL_COUNT;

  if (tagPills.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Filter Pills */}
      <div className="hidden md:flex flex-wrap justify-center gap-2 sm:gap-3">
        {displayedTags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => toggleTag(tag)}
          className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full shadow-sm transition-colors ${
            activeTags.has(tag)
              ? "bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900"
              : "bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-gray-100"
          }`}
          aria-pressed={activeTags.has(tag)}
        >
          {tag}
        </button>
      ))}
        
        {/* Show More/Less Button */}
        {hasMore && (
          <button
            type="button"
            onClick={() => {
              const newState = !showAll;
              setShowAll(newState);
              trackClarityEvent(`skill-filter-${newState ? 'show-more' : 'show-less'}`);
            }}
            className="px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full shadow-sm transition-colors bg-secondary-light/30 dark:bg-secondary-dark/30 text-gray-800 dark:text-gray-100 hover:bg-secondary-light/50 dark:hover:bg-secondary-dark/50"
          >
            {showAll ? "Show Less" : `Show More (${tagPills.length - INITIAL_COUNT})`}
          </button>
        )}
      </div>
    </div>
  );
}

export default TagFilter;
