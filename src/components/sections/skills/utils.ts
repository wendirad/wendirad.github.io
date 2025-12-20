import { useMemo, useState } from "react";
import type {
  Skills,
  TechnicalSkill,
} from "../../../data_provider/data_provider";
import { trackClarityEvent } from "../../../utils/clarity";

export function useSkillsFilter(skills: Skills) {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const tagPills = useMemo(() => {
    const tags = new Set<string>();
    (["technical", "soft"] as const).forEach((category) => {
      skills[category].forEach((group) => {
        group.skills.forEach((skill) => {
          skill.tags?.forEach((tag) => {
            const norm = tag.trim();
            if (norm) tags.add(norm.toUpperCase());
          });
        });
      });
    });
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }, [skills]);

  const filteredSkills = useMemo(() => {
    const filterGroups = (groups: TechnicalSkill[]) =>
      groups.map((g) => ({
        ...g,
        skills: g.skills.map((s) => ({
          ...s,
          matchesFilter: activeTags.size === 0 || (s.tags?.some((t) => activeTags.has(t.toUpperCase())) ?? false),
        })),
      }));

    return {
      technical: filterGroups(skills.technical),
      soft: skills.soft,
    };
  }, [activeTags, skills]);

  const toggleTag = (tag: string) => {
    const norm = tag.toUpperCase();
    setActiveTags((prev) => {
      const next = new Set(prev);
      const isActivating = !next.has(norm);
      if (next.has(norm)) next.delete(norm);
      else next.add(norm);
      
      // Track tag filter interaction
      trackClarityEvent(`skill-tag-${isActivating ? 'activate' : 'deactivate'}-${norm.toLowerCase()}`);
      
      return next;
    });
  };

  return { tagPills, filteredSkills, activeTags, toggleTag };
}

export function useSoftSkillsLayout(skills: Skills) {
  const softItems = useMemo(() => {
    const softGroup = skills.soft[0];
    return softGroup?.skills || [];
  }, [skills.soft]);

  return { softItems };
}
