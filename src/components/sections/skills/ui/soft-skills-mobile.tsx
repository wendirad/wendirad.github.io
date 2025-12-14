import { type Skill } from "../../../../data_provider/data_provider";

interface SoftSkillsMobileProps {
  softItems: Skill[];
}

export default function SoftSkillsMobile({ softItems }: SoftSkillsMobileProps) {
  return (
    <div className="md:hidden flex flex-col gap-3 w-full">
      <div className="rounded-lg p-4 shadow-sm bg-secondary-light/40 dark:bg-secondary-dark/40">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Soft Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {softItems.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-gray-900/60 rounded-lg shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-tertiary-light/60 dark:bg-tertiary-dark/60 flex items-center justify-center text-xs font-semibold text-gray-900 dark:text-gray-100">
                {skill.label.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {skill.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
