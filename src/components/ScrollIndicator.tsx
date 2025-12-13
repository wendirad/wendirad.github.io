import { useEffect, useMemo, useState } from 'react'

export default function ScrollIndicator() {
  const [sectionIds, setSectionIds] = useState<string[]>([])
  const [currentSection, setCurrentSection] = useState<string>('home')

  const orderedSections = useMemo(() => sectionIds, [sectionIds])
  const isAtEnd =
    orderedSections.length > 0 &&
    orderedSections.indexOf(currentSection) === orderedSections.length - 1

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[]
    const ids = sections.map((section) => section.id)
    setSectionIds(ids)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target?.id) {
          setCurrentSection(visibleEntry.target.id)
        }
      },
      { threshold: [0.4, 0.6, 0.75], rootMargin: '-20% 0px -40% 0px' }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const handleScrollNext = () => {
    if (!orderedSections.length) return

    const currentIndex = orderedSections.indexOf(currentSection)
    const nextIndex =
      currentIndex >= 0 && currentIndex < orderedSections.length - 1
        ? currentIndex + 1
        : -1

    if (nextIndex === -1) return

    const nextId = orderedSections[nextIndex]
    const targetSection = document.getElementById(nextId)

    targetSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (isAtEnd) {
    return null
  }

  return (
    <button
      type="button"
      onClick={handleScrollNext}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce cursor-pointer p-2 rounded-full bg-white/70 dark:bg-gray-800/70 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors"
      aria-label="Scroll to next section"
    >
      <svg
        className="w-6 h-6 text-gray-700 dark:text-gray-300"
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
    </button>
  )
}

