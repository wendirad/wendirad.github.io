import type { Skills as SkillsType } from '../types';

interface SkillsProps {
  skills: SkillsType;
}

const Skills = ({ skills }: SkillsProps) => {
  return (
    <section id="skills" className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Skills</h2>
        
        {/* Technical Skills */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">Technical Skills</h3>
          <div className="space-y-8">
            {skills.technical.map((category) => (
              <div key={category.id}>
                <h4 className="text-xl font-medium text-gray-800 mb-4">
                  {category.label}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 flex flex-col items-center text-center"
                    >
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-12 h-12 mb-2 object-contain"
                        />
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        {item.label}
                      </span>
                      {item.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1 justify-center">
                          {item.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs text-gray-600 bg-gray-200 px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">Soft Skills</h3>
          <div className="space-y-8">
            {skills.soft.map((category) => (
              <div key={category.id}>
                <h4 className="text-xl font-medium text-gray-800 mb-4">
                  {category.label}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((item) => (
                    <span
                      key={item.id}
                      className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors duration-200"
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

