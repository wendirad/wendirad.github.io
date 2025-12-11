import type { Education as EducationType } from '../types';

interface EducationProps {
  education: EducationType[];
}

const Education = ({ education }: EducationProps) => {
  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const getDegreeLabel = (degree: string) => {
    const degreeMap: Record<string, string> = {
      'bsc': 'Bachelor of Science',
      'msc': 'Master of Science',
      'phd': 'Doctor of Philosophy',
    };
    return degreeMap[degree.toLowerCase()] || degree.toUpperCase();
  };

  return (
    <section id="education" className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Education</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {getDegreeLabel(edu.degree)} in {edu.major}
                  </h3>
                  <p className="text-lg text-primary-600 mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {edu.address}
                  </p>
                  {edu.notes && (
                    <p className="text-sm text-gray-500 italic mt-2">
                      {edu.notes}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-start md:items-end mt-2 md:mt-0">
                  <span className="text-sm text-gray-500 mb-2">
                    {formatDateRange(edu.dates.startDate, edu.dates.endDate)}
                  </span>
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    GPA: {edu.gpa}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

