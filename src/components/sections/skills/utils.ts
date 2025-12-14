import { useMemo, useState } from "react";
import type {
  Skill,
  Skills,
  TechnicalSkill,
} from "../../../data_provider/data_provider";

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
    if (activeTags.size === 0) return skills;

    const filterGroups = (groups: TechnicalSkill[]) =>
      groups
        .map((g) => ({
          ...g,
          skills: g.skills.filter((s) =>
            s.tags?.some((t) => activeTags.has(t.toUpperCase()))
          ),
        }))
        .filter((g) => g.skills.length > 0);

    return {
      technical: filterGroups(skills.technical),
      soft: skills.soft,
    };
  }, [activeTags, skills]);

  const toggleTag = (tag: string) => {
    const norm = tag.toUpperCase();
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(norm)) next.delete(norm);
      else next.add(norm);
      return next;
    });
  };

  return { tagPills, filteredSkills, activeTags, toggleTag };
}

export function useSoftSkillsLayout(skills: Skills) {
  const softGroup = skills.soft[0];
  const softItems = softGroup?.skills || [];

  const leftItems = softItems.slice(0, Math.ceil(softItems.length / 2));
  const rightItems = softItems.slice(Math.ceil(softItems.length / 2));

  const computePositions = (items: Skill[], side: "left" | "right") =>
    items.map((skill, i) => {
      const t = items.length <= 1 ? 0.5 : i / (items.length - 1);
      const span = 70;
      const angleDeg = -(span / 2) + t * span;
      const angleRad = (angleDeg * Math.PI) / 180;
      const radius = 34 + 12 * Math.cos(angleRad);
      const x = 50 + (side === "left" ? -1 : 1) * radius;
      const y = 30 + 22 * Math.sin(angleRad);
      return { skill, x, y };
    });

  const leftPositions = useMemo(
    () => computePositions(leftItems, "left"),
    [leftItems]
  );
  const rightPositions = useMemo(
    () => computePositions(rightItems, "right"),
    [rightItems]
  );
  const connectionNodes = useMemo(
    () => [...leftPositions, ...rightPositions],
    [leftPositions, rightPositions]
  );

  return { softItems, leftPositions, rightPositions, connectionNodes };
}
