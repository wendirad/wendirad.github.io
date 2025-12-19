import type {
  Experience,
  PersonalInformation,
} from "../../../data_provider/data_provider";
import ExperienceCount from "./experience-count";
import Description from "./pi-description";
import { calculateTotalExperience } from "./about_utils";

function About({
  pi,
  experiences,
}: {
  pi: PersonalInformation;
  experiences: Experience[];
}) {
  const totalYearOfExperience: number = calculateTotalExperience(experiences);

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-8 overflow-x-hidden"
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-gray-100">
          About Me
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left Column - About Descriptions */}
          <Description descriptions={pi.about_descriptions} />

          {/* Right Column - Experience Card */}
          <div className="flex flex-col gap-4 self-center">
            <ExperienceCount totalYearOfExperience={totalYearOfExperience} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
