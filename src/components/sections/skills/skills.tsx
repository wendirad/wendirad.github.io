import type { Skills } from "../../../data_provider/data_provider";
import { useSkillsFilter, useSoftSkillsLayout } from "./utils";
import SoftSkillsDesktop from "./ui/soft-skills-desktop";
import SoftSkillsMobile from "./ui/soft-skills-mobile";
import TagFilter from "./ui/tag-filter";
import TechnicalSkillsSection from "./ui/technical-skills";

export default function SkillsSummary({ skills }: { skills: Skills }) {
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
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                Technical Skills
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />
            </div>
            <TechnicalSkillsSection groups={filteredSkills.technical} />
          </div>

          {/* Soft */}
          <div className="space-y-5 mt-12">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                Soft Skills
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />
            </div>
            <SoftSkillsDesktop softItems={softItems} />
            <SoftSkillsMobile softItems={softItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
