import type { Education } from "../../../data_provider/data_provider";
import EducationIcon from "../../icons/education";
import { formatDate } from "./about_utils";

export default function Education({ educations }: { educations: Education[] }) {
  return (
    <div className="space-y-4">
      {educations.map((education) => (
        <div
          key={education.id}
          className="bg-secondary-light/30 dark:bg-secondary-dark/30 backdrop-blur-sm rounded-lg p-4 border border-secondary-light/30 dark:border-secondary-dark/30"
        >
          <div className="flex items-start gap-3">
            {education.institution.logo ? (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <img
                  src={education.institution.logo}
                  alt={education.institution.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="flex-shrink-0 mt-1">
                <EducationIcon />
              </div>
            )}
            <div className="flex-1 text-left">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {education.degree.toUpperCase()} in {education.major}
              </h4>
              {education.institution.url ? (
                <a
                  href={education.institution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-700 dark:text-gray-300 mb-1 hover:text-gray-900 dark:hover:text-gray-100 transition-colors inline-flex items-center gap-1"
                >
                  {education.institution.name}
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ) : (
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                  {education.institution.name}
                </p>
              )}
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                {education.institution.location}
              </p>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {formatDate(education.date_range.start_date)} -{" "}
                  {education.date_range.end_date
                    ? formatDate(education.date_range.end_date)
                    : "Present"}
                </p>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  GPA: {education.gpa}
                </p>
              </div>
              {education.notes && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 italic">
                  {education.notes}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
