import type DataProvider from "../../../data_provider/data_provider";
import AIChat from "./ai-chat";

interface AIInteractionProps {
  userData: DataProvider;
}

export default function AIInteraction({ userData }: AIInteractionProps) {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-8 overflow-x-hidden"
    >
      <div className="max-w-6xl w-full">
        <div className="mb-48 ml-0 lg:ml-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] w-12 bg-tertiary-light dark:bg-tertiary-dark"></div>
                <h2 className="text-tertiary-light dark:text-tertiary-dark font-bold tracking-[.4em] text-[11px] uppercase">
                  AI Interaction
                </h2>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-100 tracking-tighter italic mb-8 uppercase">
                Let AI Pitch<br /> Wendirad to You.
              </h2>
              <p className="text-secondary-light dark:text-secondary-dark mb-8 max-w-md leading-relaxed">
                Ask questions about my background, skills, and experience to see how I can contribute to your team.
              </p>
            </div>
            <AIChat userData={userData} />
          </div>
        </div>
      </div>
    </section>
  );
}

