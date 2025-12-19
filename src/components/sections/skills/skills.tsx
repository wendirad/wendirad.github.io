import type { Education, Skills } from "../../../data_provider/data_provider";
import { useSkillsFilter, useSoftSkillsLayout } from "./utils";
import SoftSkillsDesktop from "./ui/soft-skills-desktop";
import SoftSkillsMobile from "./ui/soft-skills-mobile";
import TagFilter from "./ui/tag-filter";
import TechnicalSkillsSection from "./ui/technical-skills";
import EducationSummary from "./ui/education";

export default function SkillsSummary({
  skills,
  educations,
}: {
  skills: Skills;
  educations: Education[];
}) {
  const { tagPills, filteredSkills, activeTags, toggleTag } =
    useSkillsFilter(skills);
  const { softItems } = useSoftSkillsLayout(skills);

  return (
    <section
      id="skills"
      className="min-h-screen w-full flex items-center px-4 sm:px-6 lg:px-8 py-16 overflow-x-hidden"
    >
      <div className="max-w-6xl w-full mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Skills
          </h2>
        </div>

        <TagFilter
          tagPills={tagPills}
          activeTags={activeTags}
          toggleTag={toggleTag}
        />

        <div>
          {/* Technical */}
          <div className="mb-48">
            <TechnicalSkillsSection groups={filteredSkills.technical} activeTags={activeTags} />
          </div>

          {/* Education and Soft Skills */}
          <div className="mb-48 grid lg:grid-cols-2 gap-24 items-start">
            {/* Education Column */}
            <div className="space-y-16">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[2px] w-12 bg-tertiary-light dark:bg-tertiary-dark"></div>
                  <h2 className="text-tertiary-light dark:text-tertiary-dark font-bold tracking-[.4em] text-[11px] uppercase">
                    Education
                  </h2>
                </div>
                <EducationSummary educations={educations} />
              </div>
            </div>

            {/* Soft Skills Column */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] w-12 bg-tertiary-light dark:bg-tertiary-dark"></div>
                <h2 className="text-tertiary-light dark:text-tertiary-dark font-bold tracking-[.4em] text-[11px] uppercase">
                  Soft Skills
                </h2>
              </div>
              <SoftSkillsDesktop softItems={softItems} />
              <SoftSkillsMobile softItems={softItems} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
