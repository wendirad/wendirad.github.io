import type { Experience } from "../../../../data_provider/data_provider";
import type { PersonalInformation } from "../../../../data_provider/data_provider";

interface TimelineFooterProps {
  experiences: Experience[];
  personalInformation: PersonalInformation;
}

export default function TimelineFooter({
  experiences,
  personalInformation,
}: TimelineFooterProps) {
  const handleViewResume = () => {
    if (personalInformation.cv_link) {
      window.open(personalInformation.cv_link, "_blank");
    }
  };

  return (
    <div className="mt-16 flex justify-between items-center flex-wrap gap-4">
      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
          {experiences.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === 0
                  ? "bg-indigo-600 dark:bg-indigo-400"
                  : "bg-slate-200 dark:bg-slate-700"
              }`}
            ></div>
          ))}
        </div>
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase">
          Slide to explore milestones
        </span>
      </div>

      <button
        onClick={handleViewResume}
        className="text-[10px] font-black tracking-widest uppercase py-2 px-6 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 hover:border-slate-900 dark:hover:border-slate-100 transition-all"
      >
        View Full Resume
      </button>
    </div>
  );
}

