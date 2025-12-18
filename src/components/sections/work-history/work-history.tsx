import type { Experience } from "../../../data_provider/data_provider";
import TimelineHeader from "./ui/timeline-header";
import ExperienceNode from "./ui/experience-node";

interface WorkHistoryProps {
  experiences: Experience[];
}

const WorkHistory: React.FC<WorkHistoryProps> = ({ experiences }) => {
  return (
    <section
      id="work"
      className="min-h-screen w-full flex flex-col overflow-x-hidden relative"
    >
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center px-6 md:px-12 py-16">
        <TimelineHeader />

        <div className="relative">
          {/* Horizontal Line at the Bottom */}
          <div className="absolute bottom-[34px] left-0 w-full h-[1.5px] bg-bg-light dark:bg-bg-dark"></div>

          {/* Scroll Container */}
          <div className="flex overflow-x-auto no-scrollbar snap-x-mandatory timeline-container">
            {experiences.map((experience, index) => (
              <ExperienceNode
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
            {/* Spacing buffer */}
            <div className="flex-none w-20 border-l border-bg-light dark:border-bg-dark"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkHistory;

