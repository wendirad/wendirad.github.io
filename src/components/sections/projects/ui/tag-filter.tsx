import { useState, useMemo } from "react";
import { trackClarityEvent } from "../../../../utils/clarity";

interface TagFilterProps {
  tagPills: string[];
  activeTags: Set<string>;
  toggleTag: (tag: string) => void;
}

function TagFilter({ tagPills, activeTags, toggleTag }: TagFilterProps) {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const INITIAL_COUNT = 8;

  const filteredTags = useMemo(() => {
    if (!searchQuery) return tagPills;
    const query = searchQuery.toUpperCase();
    return tagPills.filter((tag) => tag.includes(query));
  }, [tagPills, searchQuery]);

  const displayedTags = showAll
    ? filteredTags
    : filteredTags.slice(0, INITIAL_COUNT);
  const hasMore = filteredTags.length > INITIAL_COUNT;

  if (tagPills.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Search Bar */}
      <div className="hidden md:flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Clear search"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

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
              trackClarityEvent(
                `project-filter-${newState ? "show-more" : "show-less"}`
              );
            }}
            className="px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full shadow-sm transition-colors bg-secondary-light/30 dark:bg-secondary-dark/30 text-gray-800 dark:text-gray-100 hover:bg-secondary-light/50 dark:hover:bg-secondary-dark/50"
          >
            {showAll
              ? "Show Less"
              : `Show More (${filteredTags.length - INITIAL_COUNT})`}
          </button>
        )}
      </div>
    </div>
  );
}

export default TagFilter;

