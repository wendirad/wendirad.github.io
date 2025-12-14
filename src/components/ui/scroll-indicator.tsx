import DownIndicator from "../icons/down-indicator";
import { useSectionIndicator } from "../utils/scroll-indicator";

export default function ScrollIndicator() {
  const { isAtEnd, scrollToNext } = useSectionIndicator();

  if (isAtEnd) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToNext}
      className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 cursor-pointer px-1.5 py-8 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border-2 border-gray-900 dark:border-gray-100 hover:bg-white dark:hover:bg-gray-800 transition-all backdrop-blur-sm"
      aria-label="Scroll to next section"
    >
      <DownIndicator />
    </button>
  );
}
