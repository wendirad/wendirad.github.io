export default function ExperienceCount({
  totalYearOfExperience,
}: {
  totalYearOfExperience: number;
}) {
  return (
    <div className="bg-secondary-light/30 dark:bg-secondary-dark/30 backdrop-blur-sm rounded-lg p-6 border border-secondary-light/30 dark:border-secondary-dark/30">
      <div className="text-left">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Total Experience
        </p>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {totalYearOfExperience}+ Year{totalYearOfExperience > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
