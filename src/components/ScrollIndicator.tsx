import { useEffect, useState } from 'react'

export default function ScrollIndicator() {
  const [sectionIds, setSectionIds] = useState<string[]>([])
  const [currentSection, setCurrentSection] = useState<string>('')
  const [isAtEnd, setIsAtEnd] = useState(false)

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[]
    const ids = sections.map((section) => section.id)
    setSectionIds(ids)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const rectA = a.boundingClientRect
            const rectB = b.boundingClientRect
            return Math.abs(rectA.top) - Math.abs(rectB.top)
          })[0]

        if (visibleEntry?.target?.id) {
          setCurrentSection(visibleEntry.target.id)
        }
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: '-10% 0px -50% 0px' }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const handleScrollNext = () => {
    if (!sectionIds.length) return

    let currentIndex = sectionIds.indexOf(currentSection)
    
    if (currentIndex === -1) {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[]
      
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        
        if (scrollPosition < sectionTop) {
          currentIndex = i - 1
          break
        }
      }
      
      if (currentIndex === -1) {
        currentIndex = 0
      }
    }

    const nextIndex = currentIndex < sectionIds.length - 1 ? currentIndex + 1 : sectionIds.length - 1
    const nextId = sectionIds[nextIndex]
    const targetSection = document.getElementById(nextId)

    if (targetSection) {
      const headerOffset = 80
      const elementPosition = targetSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const checkIfAtEnd = () => {
      if (sectionIds.length === 0) {
        setIsAtEnd(false)
        return
      }
      
      const atLastSection = currentSection === sectionIds[sectionIds.length - 1]
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
      setIsAtEnd(atLastSection || nearBottom)
    }

    checkIfAtEnd()
    window.addEventListener('scroll', checkIfAtEnd)
    return () => window.removeEventListener('scroll', checkIfAtEnd)
  }, [sectionIds, currentSection])

  if (isAtEnd) {
    return null
  }

  return (
    <button
      type="button"
      onClick={handleScrollNext}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 cursor-pointer px-1.5 py-8 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg border-2 border-gray-900 dark:border-gray-100 hover:bg-white dark:hover:bg-gray-800 transition-all backdrop-blur-sm"
      aria-label="Scroll to next section"
    >
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
    </button>
  )
}

