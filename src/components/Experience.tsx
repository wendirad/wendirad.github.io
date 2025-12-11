import type { Experience as ExperienceType } from '../types';

interface ExperienceProps {
  experience: ExperienceType[];
}

const Experience = ({ experience }: ExperienceProps) => {
  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <section id="experience" className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Experience</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-lg text-primary-600 mb-1">
                    {exp.company}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {exp.address}
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end mt-2 md:mt-0">
                  <span className="text-sm text-gray-500 mb-1">
                    {formatDateRange(exp.dates.startDate, exp.dates.endDate)}
                  </span>
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                    {exp.type}
                  </span>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {exp.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="text-sm md:text-base">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

