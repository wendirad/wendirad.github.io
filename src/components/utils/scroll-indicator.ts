import { useEffect, useState } from "react";

export function useSectionIndicator() {
  const [sections] = useState<string[]>(() =>
    (Array.from(document.querySelectorAll("section[id]")) as HTMLElement[]).map(
      (el) => el.id
    )
  );
  const [currentSection, setCurrentSection] = useState<string>("");
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          )[0];

        if (visible?.target?.id) {
          setCurrentSection(visible.target.id);
        }
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: "-10% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [sections]);

  // Check if at end of page
  useEffect(() => {
    const checkEnd = () => {
      if (sections.length === 0) {
        setIsAtEnd(false);
        return;
      }
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      const atLast = currentSection === sections[sections.length - 1];
      setIsAtEnd(atLast || nearBottom);
    };

    checkEnd();
    window.addEventListener("scroll", checkEnd);
    return () => window.removeEventListener("scroll", checkEnd);
  }, [sections, currentSection]);

  const scrollToNext = () => {
    if (sections.length === 0) return;

    let currentIndex = sections.indexOf(currentSection);

    if (currentIndex === -1) {
      const midY = window.scrollY + window.innerHeight / 2;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop > midY) {
          currentIndex = i - 1;
          break;
        }
      }
      currentIndex = currentIndex < 0 ? 0 : currentIndex;
    }

    const nextIndex =
      currentIndex < sections.length - 1 ? currentIndex + 1 : currentIndex;
    const nextId = sections[nextIndex];
    const target = document.getElementById(nextId);

    if (target) {
      const offset = 80;
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return { isAtEnd, scrollToNext };
}
