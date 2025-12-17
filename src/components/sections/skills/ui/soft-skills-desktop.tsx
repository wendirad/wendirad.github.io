import { type Skill } from "../../../../data_provider/data_provider";

interface SoftSkillsDesktopProps {
  softItems: Skill[];
}

export default function SoftSkillsDesktop({
  softItems,
}: SoftSkillsDesktopProps) {
  return (
    <div className="hidden md:flex flex-wrap gap-2 justify-center w-full">
      {softItems.map((skill) => (
        <div
          key={skill.id}
          className="flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-white/5 dark:bg-gray-900/20 backdrop-blur-sm rounded-lg shadow-sm"
        >
          {skill.icon ? (
            <img
              src={skill.icon}
              alt={skill.label}
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
              loading="lazy"
            />
          ) : (
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-tertiary-light/60 dark:bg-tertiary-dark/60 flex items-center justify-center text-xs font-semibold text-gray-900 dark:text-gray-100">
              {skill.label.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
            {skill.label}
          </span>
        </div>
      ))}
    </div>
  );
}
