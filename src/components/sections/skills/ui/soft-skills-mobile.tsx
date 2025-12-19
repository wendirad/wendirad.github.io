import { type Skill } from "../../../../data_provider/data_provider";

interface SoftSkillsMobileProps {
  softItems: Skill[];
}

export default function SoftSkillsMobile({ softItems }: SoftSkillsMobileProps) {
  // Extract color from icon URL if available, otherwise use default
  const getColorFromIcon = (icon: string | null): string => {
    if (!icon) return "#71797E"; // Default tertiary-light color
    const match = icon.match(/color=%23([0-9A-Fa-f]{6})/);
    return match ? `#${match[1]}` : "#71797E";
  };

  return (
    <div className="md:hidden grid grid-cols-1 gap-4">
      {softItems.map((skill) => {
        const color = getColorFromIcon(skill.icon);
        return (
        <div
          key={skill.id}
            className="flex items-center gap-4 p-4 bg-secondary-light/20 dark:bg-secondary-dark/20 border border-secondary-light/30 dark:border-secondary-dark/30 rounded-2xl hover:bg-secondary-light/30 dark:hover:bg-secondary-dark/30 hover:shadow-lg hover:shadow-secondary-light/10 dark:hover:shadow-secondary-dark/10 transition-all group"
        >
          {skill.icon ? (
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{ backgroundColor: `${color}15` }}
              >
            <img
              src={skill.icon}
              alt={skill.label}
                  className="w-5 h-5"
              loading="lazy"
            />
              </div>
          ) : (
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-tertiary-light/20 dark:bg-tertiary-dark/20">
                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
              {skill.label.charAt(0).toUpperCase()}
                </span>
            </div>
          )}
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 tracking-tight group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
            {skill.label}
          </span>
        </div>
        );
      })}
    </div>
  );
}
