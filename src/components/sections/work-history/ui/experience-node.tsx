import type { Experience } from "../../../../data_provider/data_provider";
import { formatDateRange, getExperienceColor, getExperienceDescription } from "../utils";
import RemoteIcon from "../../../icons/remote";
import OfficeIcon from "../../../icons/office";
import BriefcaseIcon from "../../../icons/briefcase";
import LinkIcon from "../../../icons/link";

interface ExperienceNodeProps {
  experience: Experience;
  index: number;
}

export default function ExperienceNode({ experience, index }: ExperienceNodeProps) {
  const colorClass = getExperienceColor(index);
  const iconColorClass = colorClass.replace(/bg-/g, 'text-');
  const dateRange = formatDateRange(
    experience.date_range.start_date,
    experience.date_range.end_date
  );
  const description = getExperienceDescription(experience);

  return (
    <div className="flex-none w-[350px] md:w-[450px] snap-start flex border-l border-bg-light dark:border-bg-dark group animate-fade-in">
      {/* The Content Section */}
      <div className="flex flex-col flex-grow">
        <div className="px-8 pt-10 pb-20 flex-grow">
          {/* Logo and Header */}
          <div className="flex items-center gap-5 mb-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all duration-300 overflow-hidden">
              {experience.institution.logo ? (
                <img
                  src={experience.institution.logo}
                  alt={experience.institution.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-secondary-light"></div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {experience.institution.url ? (
                  <a
                    href={experience.institution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-secondary-light dark:text-secondary-dark text-sm tracking-widest uppercase hover:underline flex items-center gap-1.5"
                  >
                    {experience.institution.name}
                    <LinkIcon />
                  </a>
                ) : (
                  <h4 className="font-bold text-secondary-light dark:text-secondary-dark text-sm tracking-widest uppercase">
                    {experience.institution.name}
                  </h4>
                )}
              </div>
              {experience.institution.location && (
                <p className="text-xs text-tertiary-light dark:text-tertiary-dark mb-2">
                  {experience.institution.location}
                </p>
              )}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-text-light dark:text-text-dark uppercase tracking-tighter inline-block">
                  {dateRange}
                </span>
                <div className="flex flex-row gap-4 items-center">
                  {experience.mode && (
                    <div className="flex items-center gap-1.5">
                      <div className={iconColorClass}>
                        {experience.mode.toLowerCase() === "remote" ? (
                          <RemoteIcon />
                        ) : (
                          <OfficeIcon />
                        )}
                      </div>
                      <span className="text-xs font-medium text-tertiary-light dark:text-tertiary-dark uppercase tracking-tighter">
                        {experience.mode}
                      </span>
                    </div>
                  )}
                  {experience.type && (
                    <div className="flex items-center gap-1.5">
                      <div className={iconColorClass}>
                        <BriefcaseIcon />
                      </div>
                      <span className="text-xs font-medium text-tertiary-light dark:text-tertiary-dark uppercase tracking-tighter">
                        {experience.type}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Text */}
          <h3 className="text-2xl font-black text-text-light dark:text-text-dark mb-4 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
            {experience.title}
          </h3>
          <p className="text-tertiary-light dark:text-tertiary-dark leading-relaxed max-w-[90%]">
            {description}
          </p>
        </div>

        {/* Bottom Connection Area */}
        <div className="relative flex flex-col items-center h-24">
          {/* Vertical line connecting card to dot */}
          <div
            className={`absolute top-0 w-[1.5px] h-10 ${colorClass} opacity-20`}
          ></div>

          {/* The Timeline Dot */}
          <div className="absolute bottom-[26px] z-20">
            <div
              className={`w-4 h-4 rounded-full border-[3px] border-white dark:border-bg-dark shadow-lg transition-all duration-500 ${colorClass} group-hover:scale-150 group-hover:ring-8 group-hover:ring-bg-light dark:group-hover:ring-bg-dark`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

