import {
  type Skill,
  type TechnicalSkill,
} from "../../../../data_provider/data_provider";

interface SkillGroupCardProps {
  group: TechnicalSkill;
  extraClass?: string;
  activeTags?: Set<string>;
}

export default function SkillGroupCard({
  group,
  extraClass = "",
  activeTags = new Set(),
}: SkillGroupCardProps) {
  const isIDEs = group.id === "ides";
  const isFrameworks = group.id === "frameworks";
  const isOS = group.id === "operating_systems";
  const isDevOps = group.id === "devops";
  const isLibraries = group.id === "libraries";
  const gridCols = isIDEs ? "grid-cols-4" : isFrameworks || isOS ? "grid-cols-3" : isDevOps ? "grid-cols-2" : isLibraries ? "grid-cols-4" : "grid-cols-2";

  return (
    <div className={`space-y-4 ${extraClass}`}>
      <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-secondary-light dark:text-secondary-dark border-b border-secondary-light/30 dark:border-secondary-dark/30 pb-4">
        {group.label}
      </h3>
      <div className={`grid ${gridCols} gap-4`}>
        {group.skills.map((skill: Skill) => {
          const skillWithMatch = skill as Skill & { matchesFilter?: boolean };
          const matchesFilter = skillWithMatch.matchesFilter ?? (activeTags.size === 0 || (skill.tags?.some((t) => activeTags.has(t.toUpperCase())) ?? false));
          const shouldDim = activeTags.size > 0 && !matchesFilter;
          
          return (
          <div
            key={skill.id}
            className={`group flex flex-col items-center p-4 bg-secondary-light/30 dark:bg-secondary-dark/30 border border-secondary-light/30 dark:border-secondary-dark/30 rounded-2xl hover:border-tertiary-light dark:hover:border-tertiary-dark hover:shadow-xl hover:shadow-secondary-light/20 dark:hover:shadow-secondary-dark/20 transition-all duration-300 ${
              shouldDim ? 'opacity-30 pointer-events-none' : ''
            }`}
          >
            {skill.icon ? (
              <div className={`w-10 h-10 mb-3 transition-all ${
                activeTags.size > 0 && matchesFilter 
                  ? '' 
                  : activeTags.size > 0 
                    ? 'grayscale' 
                    : 'grayscale group-hover:grayscale-0'
              }`}>
                <img
                  src={skill.icon}
                  alt={skill.label}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-10 h-10 mb-3 rounded-full bg-tertiary-light/60 dark:bg-tertiary-dark/60 flex items-center justify-center text-xs font-semibold text-gray-900 dark:text-gray-100 group-hover:scale-110 transition-all">
                {skill.label.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-light dark:text-secondary-dark group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
              {skill.label}
            </span>
          </div>
          );
        })}
      </div>
    </div>
  );
}
