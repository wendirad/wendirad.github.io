function DownIndicator() {
  return (
    <svg
      className="w-3 h-3 text-gray-900 dark:text-gray-100"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  );
}

export default DownIndicator;
