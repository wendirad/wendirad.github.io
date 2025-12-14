import { type TechnicalSkill } from "../../../../data_provider/data_provider";
import SkillGroupCard from "./skill-group-card";

interface TechnicalSkillsSectionProps {
  groups: TechnicalSkill[];
}

export default function TechnicalSkillsSection({
  groups,
}: TechnicalSkillsSectionProps) {
  const programming = groups.find((g) => g.id === "programming_languages");
  const frameworks = groups.find((g) => g.id === "frameworks_and_libraries");
  const databases = groups.find((g) => g.id === "databases");
  const ides = groups.find((g) => g.id === "ides");
  const devops = groups.find((g) => g.id === "devops");
  const operatingSystems = groups.find((g) => g.id === "operating_systems");

  const mainIds = new Set(
    [
      programming?.id,
      frameworks?.id,
      databases?.id,
      ides?.id,
      devops?.id,
      operatingSystems?.id,
    ].filter(Boolean)
  );

  const remaining = groups.filter((g) => !mainIds.has(g.id));

  return (
    <>
      <style>{`
        .tech-skills-grid-item-languages,
        .tech-skills-grid-item-frameworks,
        .tech-skills-grid-item-others {
          grid-area: unset;
        }
        @media (min-width: 768px) {
          .tech-skills-grid {
            grid-template-areas: "languages languages" "frameworks others" "frameworks others";
          }
          .tech-skills-grid-item-languages {
            grid-area: languages;
          }
          .tech-skills-grid-item-frameworks {
            grid-area: frameworks;
          }
          .tech-skills-grid-item-others {
            grid-area: others;
          }
        }
      `}</style>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1fr_2fr] auto-rows-min tech-skills-grid">
        <div className="tech-skills-grid-item-languages">
          {programming && <SkillGroupCard group={programming} />}
        </div>

        <div className="tech-skills-grid-item-frameworks md:row-span-2">
          {frameworks && (
            <SkillGroupCard group={frameworks} extraClass="md:row-span-2" />
          )}
        </div>

        <div className="space-y-4 tech-skills-grid-item-others">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {databases && <SkillGroupCard group={databases} />}
            {ides && <SkillGroupCard group={ides} />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {devops && <SkillGroupCard group={devops} />}
            {operatingSystems && <SkillGroupCard group={operatingSystems} />}
          </div>

          {remaining.map((group) => (
            <SkillGroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>

      {remaining.length > 0 && false /* already rendered above */}
    </>
  );
}
