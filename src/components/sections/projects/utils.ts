import { useMemo, useState } from "react";
import type { Project } from "../../../data_provider/data_provider";
import { trackClarityEvent } from "../../../utils/clarity";

export function useProjectsFilter(projects: Project[]) {
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const tagPills = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        const norm = tag.trim();
        if (norm) tags.add(norm.toUpperCase());
      });
    });
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filter by active tags
    if (activeTags.size > 0) {
      filtered = filtered.filter((p) =>
        p.tags.some((tag) => activeTags.has(tag.toUpperCase()))
      );
    }

    return filtered;
  }, [projects, searchQuery, activeTags]);

  const toggleTag = (tag: string) => {
    const norm = tag.toUpperCase();
    setActiveTags((prev) => {
      const next = new Set(prev);
      const isActivating = !next.has(norm);
      if (next.has(norm)) next.delete(norm);
      else next.add(norm);

      // Track tag filter interaction
      trackClarityEvent(
        `project-tag-${isActivating ? "activate" : "deactivate"}-${norm.toLowerCase()}`
      );

      return next;
    });
  };

  const setSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      trackClarityEvent("project-filter-search");
    }
  };

  return {
    tagPills,
    filteredProjects,
    activeTags,
    toggleTag,
    searchQuery,
    setSearch,
  };
}



