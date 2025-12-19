import type { PersonalInformation } from "../../../data_provider/data_provider";

interface ReachOutProps {
  pi: PersonalInformation;
}

export default function ReachOut({ pi }: ReachOutProps) {
  return (
    <section
      id="contact"
      className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-4xl w-full">
        <div className="bg-secondary-light/20 dark:bg-secondary-dark/20 border border-secondary-light/30 dark:border-secondary-dark/30 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary-light/10 dark:bg-tertiary-dark/10 blur-[100px] -z-10"></div>
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-tertiary-light dark:bg-tertiary-dark"></div>
              <h2 className="text-tertiary-light dark:text-tertiary-dark font-bold tracking-[.4em] text-[11px] uppercase">
                Get In Touch
              </h2>
              <div className="h-[2px] w-12 bg-tertiary-light dark:bg-tertiary-dark"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100 tracking-tighter mb-6">
              Ready to work <br />
              <span className="text-tertiary-light dark:text-tertiary-dark italic">together?</span>
            </h2>
            <p className="text-secondary-light dark:text-secondary-dark text-lg mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`mailto:${pi.email}`}
              className="px-10 py-5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-tertiary-light dark:hover:bg-tertiary-dark transition-all"
            >
              Send Email
            </a>
            <a
              href={pi.cv_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-secondary-light/30 dark:bg-secondary-dark/30 border border-secondary-light/30 dark:border-secondary-dark/30 text-gray-900 dark:text-gray-100 rounded-full font-black uppercase tracking-widest text-[11px] hover:border-tertiary-light dark:hover:border-tertiary-dark transition-all"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

