import { useEffect } from 'react'
import infoData from '../assets/data/info.json'

export default function AboutSection() {
  const { info, education, experience } = infoData

  // Add structured data for Google search
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": info.name,
      "jobTitle": info.title,
      "email": info.email,
      "telephone": info.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": info.location
      },
      "url": info.website,
      "sameAs": [
        info.socials.github,
        info.socials.linkedin,
        info.socials.telegram,
        info.socials.x
      ],
      "alumniOf": education.map(edu => {
        const org: any = {
          "@type": "EducationalOrganization",
          "name": edu.institution?.name || edu.institution
        }
        if (edu.institution?.url) {
          org.url = edu.institution.url
        }
        return org
      }),
      "description": info.summary
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    script.id = 'about-structured-data'
    
    // Remove existing script if present
    const existingScript = document.getElementById('about-structured-data')
    if (existingScript) {
      existingScript.remove()
    }
    
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('about-structured-data')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [info, education])

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  // Calculate total years of experience (handling overlapping periods)
  const calculateTotalExperience = () => {
    const now = new Date()
    
    // Create date ranges for all experiences
    const ranges = experience.map((exp) => {
      const start = new Date(exp.dates.startDate + '-01')
      const end = exp.dates.endDate 
        ? new Date(exp.dates.endDate + '-01')
        : now
      return { start, end }
    })
    
    // Sort ranges by start date
    ranges.sort((a, b) => a.start.getTime() - b.start.getTime())
    
    // Merge overlapping ranges
    const mergedRanges = []
    let currentRange = ranges[0]
    
    for (let i = 1; i < ranges.length; i++) {
      const nextRange = ranges[i]
      
      // If ranges overlap or are adjacent
      if (nextRange.start <= currentRange.end) {
        // Merge ranges
        currentRange.end = new Date(Math.max(currentRange.end.getTime(), nextRange.end.getTime()))
      } else {
        // No overlap, save current and move to next
        mergedRanges.push(currentRange)
        currentRange = nextRange
      }
    }
    mergedRanges.push(currentRange)
    
    // Calculate total months from merged ranges
    let totalMonths = 0
    mergedRanges.forEach((range) => {
      const months = (range.end.getFullYear() - range.start.getFullYear()) * 12 + 
                     (range.end.getMonth() - range.start.getMonth())
      totalMonths += months
    })
    
    const years = Math.floor(totalMonths / 12)
    const months = totalMonths % 12
    
    // Round up if months >= 6, otherwise round down
    const roundedYears = months >= 6 ? years + 1 : years
    
    return `${roundedYears}+ Years`
  }

  const totalExperience = calculateTotalExperience()
  const descriptions = info.about_descriptions || []

  return (
    <section 
      id="about" 
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-8 overflow-x-hidden"
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-gray-100">
          About Me
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left Column - About Descriptions */}
          <div className="space-y-6">
            {descriptions.map((description, index) => (
              <p 
                key={index}
                className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify"
              >
                {description}
              </p>
            ))}
          </div>

          {/* Right Column - Experience and Education Cards */}
          <div className="flex flex-col gap-4 self-center">
            {/* Experience Card */}
            <div className="bg-secondary-light/30 dark:bg-secondary-dark/30 backdrop-blur-sm rounded-lg p-6 border border-secondary-light/30 dark:border-secondary-dark/30">
              <div className="text-left">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Experience</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {totalExperience}
                </p>
              </div>
            </div>

            {/* Education Cards */}
            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-secondary-light/30 dark:bg-secondary-dark/30 backdrop-blur-sm rounded-lg p-4 border border-secondary-light/30 dark:border-secondary-dark/30"
                >
                  <div className="flex items-start gap-3">
                    {edu.institution.logo ? (
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <img 
                          src={edu.institution.logo} 
                          alt={edu.institution.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-tertiary-light dark:text-tertiary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v9M4 9v9a2 2 0 002 2h12a2 2 0 002-2V9" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {edu.degree.toUpperCase()} in {edu.major}
                      </h4>
                      {edu.institution.url ? (
                        <a 
                          href={edu.institution.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-700 dark:text-gray-300 mb-1 hover:text-gray-900 dark:hover:text-gray-100 transition-colors inline-flex items-center gap-1"
                        >
                          {edu.institution.name}
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                          {edu.institution.name}
                        </p>
                      )}
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {edu.address}
                      </p>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {formatDate(edu.dates.startDate)} - {edu.dates.endDate ? formatDate(edu.dates.endDate) : 'Present'}
                        </p>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          GPA: {edu.gpa}
                        </p>
                      </div>
                      {edu.notes && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 italic">
                          {edu.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

