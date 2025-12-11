import type { PersonalInfo } from '../types';

interface HeroProps {
  personalInfo: PersonalInfo;
}

const Hero = ({ personalInfo }: HeroProps) => {
  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <img
              src={personalInfo.image.light}
              alt={personalInfo.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {personalInfo.name}
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-4">
              {personalInfo.title}
            </p>
            <p className="text-primary-100 mb-6 max-w-2xl">
              {personalInfo.summary}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium"
              >
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

