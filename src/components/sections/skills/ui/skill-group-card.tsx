import {
  type Skill,
  type TechnicalSkill,
} from "../../../../data_provider/data_provider";

interface SkillGroupCardProps {
  group: TechnicalSkill;
  extraClass?: string;
}

export default function SkillGroupCard({
  group,
  extraClass = "",
}: SkillGroupCardProps) {
  return (
    <div
      className={`rounded-lg p-3 sm:p-4 md:p-5 shadow-sm bg-secondary-light/40 dark:bg-secondary-dark/40 ${extraClass}`}
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
        {group.skills.map((skill: Skill) => (
          <div
            key={skill.id}
            className="flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-white/60 dark:bg-gray-900/60 rounded-lg shadow-sm"
          >
            {skill.icon ? (
              <img
                src={skill.icon}
                alt={skill.label}
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain"
                loading="lazy"
              />
            ) : (
              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-tertiary-light/60 dark:bg-tertiary-dark/60 flex items-center justify-center text-xs font-semibold text-gray-900 dark:text-gray-100">
                {skill.label.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
              {skill.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
