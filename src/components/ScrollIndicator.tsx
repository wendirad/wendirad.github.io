export default function ScrollIndicator() {
  return (
    <a 
      href="#about"
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce cursor-pointer"
    >
      <svg 
        className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 14l-7 7m0 0l-7-7m7 7V3" 
        />
      </svg>
    </a>
  )
}

