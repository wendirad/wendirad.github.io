import { useMemo, useState } from 'react'
import infoData from '../assets/data/info.json'

type SkillItem = {
  id: string
  label: string
  icon?: string | null
  tags?: string[]
}

type SkillGroup = {
  id: string
  label: string
  icon?: string | null
  items: SkillItem[]
}

type SkillsData = {
  technical: SkillGroup[]
  soft: SkillGroup[]
}

export default function SkillsSection() {
  const { skills } = infoData as { skills: SkillsData }
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())

  const tagPills = useMemo(() => {
    const tags = new Set<string>()

    ;(['technical', 'soft'] as const).forEach((category) => {
      skills[category].forEach((group) => {
        group.items.forEach((item) => {
          item.tags?.forEach((tag) => {
            const normalized = tag.trim()
            if (normalized) {
              tags.add(normalized.toUpperCase())
            }
          })
        })
      })
    })

    return Array.from(tags).sort((a, b) => a.localeCompare(b))
  }, [skills])

  const filteredSkills = useMemo(() => {
    if (activeTags.size === 0) return { technical: skills.technical, soft: skills.soft }

    const filterCategory = (groups: SkillGroup[]) =>
      groups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            item.tags?.some((tag) => activeTags.has(tag.toUpperCase()))
          ),
        }))
        .filter((group) => group.items.length > 0)

    return {
      technical: filterCategory(skills.technical),
      soft: skills.soft,
    }
  }, [activeTags, skills])

  const toggleTag = (tag: string) => {
    const normalized = tag.toUpperCase()
    setActiveTags((prev) => {
      const next = new Set(prev)
      if (next.has(normalized)) {
        next.delete(normalized)
      } else {
        next.add(normalized)
      }
      return next
    })
  }

  const categoryTitles: Record<keyof SkillsData, string> = {
    technical: 'Technical Skills',
    soft: 'Soft Skills',
  }

  const softGroup = skills.soft[0]
  const softItems = softGroup?.items || []
  const leftItems = softItems.slice(0, Math.ceil(softItems.length / 2))
  const rightItems = softItems.slice(Math.ceil(softItems.length / 2))

  const computeWingPositions = (items: SkillItem[], side: 'left' | 'right') =>
    items.map((item, index) => {
      const t = items.length <= 1 ? 0.5 : index / (items.length - 1)
      const span = 70
      const angleDeg = -(span / 2) + t * span
      const angleRad = (angleDeg * Math.PI) / 180
      const radiusBase = 34 + 12 * Math.cos(angleRad)
      const x = 50 + (side === 'left' ? -1 : 1) * radiusBase
      const y = 30 + 22 * Math.sin(angleRad)
      return { item, x, y }
    })

  const leftPositions = useMemo(
    () => computeWingPositions(leftItems, 'left'),
    [leftItems]
  )
  const rightPositions = useMemo(
    () => computeWingPositions(rightItems, 'right'),
    [rightItems]
  )
  const connectionNodes = useMemo(
    () => [...leftPositions, ...rightPositions],
    [leftPositions, rightPositions]
  )

  return (
    <section
      id="skills"
      className="min-h-screen min-w-full flex items-center px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-6xl w-full mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Skills
          </h2>
        </div>

        {tagPills.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {tagPills.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full shadow-sm transition-colors ${
                  activeTags.has(tag.toUpperCase())
                    ? 'bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900'
                    : 'bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-gray-100'
                }`}
                aria-pressed={activeTags.has(tag.toUpperCase())}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-12">
          {(['technical', 'soft'] as const).map((category) => (
            <div
              key={category}
              className={category === 'soft' ? 'space-y-2' : 'space-y-5'}
            >
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />
                {category === 'technical' && (
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    {categoryTitles[category]}
                  </h3>
                )}
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />
              </div>

              {category === 'technical' ? (
                (() => {
                  const programming = filteredSkills.technical.find((g) => g.id === 'programming_languages')
                  const frameworks = filteredSkills.technical.find((g) => g.id === 'frameworks_and_libraries')
                  const databases = filteredSkills.technical.find((g) => g.id === 'databases')
                  const ides = filteredSkills.technical.find((g) => g.id === 'ides')
                  const devops = filteredSkills.technical.find((g) => g.id === 'devops')
                  const operatingSystems = filteredSkills.technical.find((g) => g.id === 'operating_systems')

                  const renderedIds = new Set(
                    [programming, frameworks, databases, ides, devops, operatingSystems]
                      .filter(Boolean)
                      .map((g) => (g as SkillGroup).id)
                  )
                  const remaining = filteredSkills.technical.filter((g) => !renderedIds.has(g.id))

                  const otherGroups = [
                    databases,
                    ides,
                    devops,
                    operatingSystems,
                    ...remaining,
                  ].filter(Boolean) as SkillGroup[]

                  const renderGroupCard = (group?: SkillGroup, extraClass = '', area?: string) =>
                    group ? (
                      <div
                        key={group.id}
                        className={`rounded-lg p-3 sm:p-4 md:p-5 shadow-sm bg-secondary-light/40 dark:bg-secondary-dark/40 ${extraClass}`}
                        style={area ? { gridArea: area } : undefined}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          {group.icon && (
                            <img
                              src={group.icon}
                              alt={group.label}
                              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
                              loading="lazy"
                            />
                          )}
                          <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {group.label}
                          </h4>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {group.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-white/60 dark:bg-gray-900/60 rounded-lg shadow-sm"
                            >
                              {item.icon ? (
                                <img
                                  src={item.icon}
                                  alt={item.label}
                                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-tertiary-light/60 dark:bg-tertiary-dark/60 flex items-center justify-center text-xs font-semibold text-gray-900 dark:text-gray-100">
                                  {item.label.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null

                  return (
                    <>
                      <style>{`
                        .tech-skills-grid-item-languages,
                        .tech-skills-grid-item-frameworks,
                        .tech-skills-grid-item-others {
                          grid-area: unset;
                        }
                        @media (min-width: 768px) {
                          .tech-skills-grid {
                            grid-template-areas: "languages languages" "frameworks others" "frameworks others";
                          }
                          .tech-skills-grid-item-languages {
                            grid-area: languages;
                          }
                          .tech-skills-grid-item-frameworks {
                            grid-area: frameworks;
                          }
                          .tech-skills-grid-item-others {
                            grid-area: others;
                          }
                        }
                      `}</style>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1fr_2fr] auto-rows-min tech-skills-grid">
                        <div className="tech-skills-grid-item-languages">
                          {renderGroupCard(programming)}
                        </div>
                        <div className="tech-skills-grid-item-frameworks md:row-span-2">
                          {renderGroupCard(frameworks, 'md:row-span-2')}
                        </div>
                        <div className="space-y-4 tech-skills-grid-item-others">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {renderGroupCard(databases)}
                            {renderGroupCard(ides)}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {renderGroupCard(devops)}
                            {renderGroupCard(operatingSystems)}
                          </div>
                          {otherGroups
                            .filter(
                              (g) =>
                                g.id !== 'databases' &&
                                g.id !== 'ides' &&
                                g.id !== 'devops' &&
                                g.id !== 'operating_systems'
                            )
                            .map((group) => renderGroupCard(group))}
                        </div>
                      </div>

                      {remaining.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {remaining.map((group) => renderGroupCard(group))}
                        </div>
                      )}
                    </>
                  )
                })()
              ) : (
                <>
                  <div className="hidden md:flex flex-col items-center w-full">
                    <div className="relative w-full max-w-5xl aspect-square">
                      <svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 pointer-events-none text-secondary-light dark:text-secondary-dark"
                      >
                        {connectionNodes.map((pos, idx) => (
                          <line
                            key={`${pos.item.id}-line-${idx}`}
                            x1="50"
                            y1="30"
                            x2={pos.x}
                            y2={pos.y}
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            className="opacity-70"
                          />
                        ))}
                      </svg>

                      <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-secondary-light dark:bg-secondary-dark shadow-md flex items-center justify-center text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap px-2">
                        Soft Skills
                      </div>

                      {leftPositions.map((pos) => (
                        <div
                          key={pos.item.id}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                        >
                          <div className="flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-secondary-light/60 dark:bg-secondary-dark/60 shadow-sm border border-white/40 dark:border-white/10 backdrop-blur-sm whitespace-nowrap">
                            <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {pos.item.label}
                            </span>
                          </div>
                        </div>
                      ))}

                      {rightPositions.map((pos) => (
                        <div
                          key={pos.item.id}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                        >
                          <div className="flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-secondary-light/50 dark:bg-secondary-dark/50 shadow-sm border border-white/30 dark:border-white/5 backdrop-blur-sm whitespace-nowrap">
                            <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {pos.item.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:hidden flex flex-col gap-3 w-full">
                    <div className="rounded-lg p-4 shadow-sm bg-secondary-light/40 dark:bg-secondary-dark/40">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Soft Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {softItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-gray-900/60 rounded-lg shadow-sm"
                          >
                            <div className="w-6 h-6 rounded-full bg-tertiary-light/60 dark:bg-tertiary-dark/60 flex items-center justify-center text-xs font-semibold text-gray-900 dark:text-gray-100">
                              {item.label.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

