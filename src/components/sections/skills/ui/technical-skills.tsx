import { type TechnicalSkill } from "../../../../data_provider/data_provider";
import SkillGroupCard from "./skill-group-card";

interface TechnicalSkillsSectionProps {
  groups: TechnicalSkill[];
  activeTags: Set<string>;
}

export default function TechnicalSkillsSection({
  groups,
  activeTags,
}: TechnicalSkillsSectionProps) {
  const programming = groups.find((g) => g.id === "programming_languages");
  const databases = groups.find((g) => g.id === "databases");
  const libraries = groups.find((g) => g.id === "libraries");
  const frameworks = groups.find((g) => g.id === "frameworks");
  const operatingSystems = groups.find((g) => g.id === "operating_systems");
  const ides = groups.find((g) => g.id === "ides");
  const devops = groups.find((g) => g.id === "devops");

  return (
    <>
      <style>{`
        .tech-skills-grid {
          grid-template-columns: repeat(7, 1fr);
          grid-template-areas:
            "pl pl db db frameworks frameworks frameworks"
            "pl pl db db os os os"
            "lib lib lib lib devops devops devops"
            "lib lib lib lib . . ."
            "ides ides ides ides ides ides ides";
        }
        .tech-skills-grid-item-pl {
          grid-area: pl;
        }
        .tech-skills-grid-item-db {
          grid-area: db;
        }
        .tech-skills-grid-item-lib {
          grid-area: lib;
          margin-top: -8rem;
        }
        .tech-skills-grid-item-frameworks {
          grid-area: frameworks;
        }
        .tech-skills-grid-item-os {
          grid-area: os;
        }
        .tech-skills-grid-item-devops {
          grid-area: devops;
        }
        .tech-skills-grid-item-ides {
          grid-area: ides;
          margin-top: -6rem;
        }
        @media (max-width: 767px) {
          .tech-skills-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "pl"
              "db"
              "lib"
              "frameworks"
              "os"
              "devops"
              "ides";
          }
          .tech-skills-grid-item-lib {
            margin-top: 0;
          }
          .tech-skills-grid-item-ides {
            margin-top: 0;
          }
        }
      `}</style>
      <div className="grid gap-14 tech-skills-grid">
        {programming && (
          <div className="tech-skills-grid-item-pl">
            <SkillGroupCard group={programming} activeTags={activeTags} />
          </div>
        )}
        {databases && (
          <div className="tech-skills-grid-item-db">
            <SkillGroupCard group={databases} activeTags={activeTags} />
          </div>
        )}
        {libraries && (
          <div className="tech-skills-grid-item-lib">
            <SkillGroupCard group={libraries} activeTags={activeTags} />
        </div>
        )}
          {frameworks && (
          <div className="tech-skills-grid-item-frameworks">
            <SkillGroupCard group={frameworks} activeTags={activeTags} />
        </div>
        )}
        {operatingSystems && (
          <div className="tech-skills-grid-item-os">
            <SkillGroupCard group={operatingSystems} activeTags={activeTags} />
          </div>
        )}
        {devops && (
          <div className="tech-skills-grid-item-devops">
            <SkillGroupCard group={devops} activeTags={activeTags} />
          </div>
        )}
        {ides && (
          <div className="tech-skills-grid-item-ides">
            <SkillGroupCard group={ides} activeTags={activeTags} />
        </div>
        )}
      </div>
    </>
  );
}
