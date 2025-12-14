interface Position {
  skill: { id: string; label: string };
  x: number;
  y: number;
}

interface SoftSkillsDesktopProps {
  leftPositions: Position[];
  rightPositions: Position[];
  connectionNodes: Position[];
}

export default function SoftSkillsDesktop({
  leftPositions,
  rightPositions,
  connectionNodes,
}: SoftSkillsDesktopProps) {
  return (
    <div className="hidden md:flex flex-col items-center w-full">
      <div className="relative w-full max-w-5xl aspect-square">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 pointer-events-none text-secondary-light dark:text-secondary-dark"
        >
          {connectionNodes.map((pos, idx) => (
            <line
              key={`${pos.skill.id}-line-${idx}`}
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
            key={pos.skill.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <div className="flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-secondary-light/60 dark:bg-secondary-dark/60 shadow-sm border border-white/40 dark:border-white/10 backdrop-blur-sm whitespace-nowrap">
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                {pos.skill.label}
              </span>
            </div>
          </div>
        ))}

        {rightPositions.map((pos) => (
          <div
            key={pos.skill.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <div className="flex items-center justify-center px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-secondary-light/50 dark:bg-secondary-dark/50 shadow-sm border border-white/30 dark:border-white/5 backdrop-blur-sm whitespace-nowrap">
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
                {pos.skill.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
