import type { Education } from "../../../../data_provider/data_provider";
import { formatDate } from "../../about/about_utils";

export default function Education({ educations }: { educations: Education[] }) {
  return (
    <div className="mt-12">
      {educations.map((education) => (
        <div
          key={education.id}
          className="relative pl-12 pb-12 group last:pb-0"
        >
          <div className="absolute left-0 top-0 w-px h-full bg-secondary-light/30 dark:bg-secondary-dark/30 group-last:h-0"></div>
          <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-tertiary-light dark:bg-tertiary-dark ring-4 ring-secondary-light/20 dark:ring-secondary-dark/20"></div>

          <div className="mb-2">
            <h3 className="text-xl font-black text-gray-900 dark:text-gray-100 uppercase italic tracking-tighter">
              {education.degree.toUpperCase()} in {education.major}
            </h3>
          </div>
          <div className="flex items-center gap-3 mb-2">
            {education.institution.logo && (
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm overflow-hidden bg-white dark:bg-gray-800 border border-secondary-light/30 dark:border-secondary-dark/30">
                <img
                  src={education.institution.logo}
                  alt={education.institution.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            )}
            <p className="text-secondary-light dark:text-secondary-dark font-bold text-sm uppercase tracking-wide">
              {education.institution.name}
            </p>
            <span className="w-1 h-1 rounded-full bg-secondary-light/50 dark:bg-secondary-dark/50"></span>
            <span className="text-tertiary-light dark:text-tertiary-dark font-black text-sm">
              GPA: {education.gpa}
            </span>
          </div>
          <div className="mb-4">
            <span className="text-[10px] font-black tracking-widest text-secondary-light dark:text-secondary-dark uppercase px-3 py-1">
              {formatDate(education.date_range.start_date)} -{" "}
              {education.date_range.end_date
                ? formatDate(education.date_range.end_date)
                : "Present"}
            </span>
          </div>
          {education.notes && (
            <p className="text-secondary-light/80 dark:text-secondary-dark/80 text-sm italic">
              {education.notes}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
