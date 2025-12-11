import type { Award } from '../types';

interface AwardsProps {
  awards: Award[];
}

const Awards = ({ awards }: AwardsProps) => {
  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  if (awards.length === 0) {
    return null;
  }

  return (
    <section id="awards" className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Awards & Certifications</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {awards.map((award) => (
            <div
              key={award.id}
              className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-primary-600"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {award.name}
                  </h3>
                  <p className="text-primary-700 font-medium mb-2">
                    {award.issuer}
                  </p>
                  <p className="text-gray-700 mb-3">
                    {award.description}
                  </p>
                  {award.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {award.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-primary-200 text-primary-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-2 md:mt-0 md:ml-4">
                  <span className="text-sm text-gray-600 font-medium">
                    {formatDate(award.date)}
                  </span>
                </div>
              </div>
              {award.link && (
                <a
                  href={award.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                >
                  View Certificate →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;

