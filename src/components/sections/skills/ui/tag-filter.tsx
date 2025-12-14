interface TagFilterProps {
  tagPills: string[];
  activeTags: Set<string>;
  toggleTag: (tag: string) => void;
}

function TagFilter({ tagPills, activeTags, toggleTag }: TagFilterProps) {
  if (tagPills.length === 0) return null;

  return (
    <div className="hidden md:flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
      {tagPills.map((tag) => (
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
    </div>
  );
}

export default TagFilter;
