import { useRef, useState, useEffect } from "react";
import type { Experience } from "../../../data_provider/data_provider";
import TimelineHeader from "./ui/timeline-header";
import ExperienceNode from "./ui/experience-node";
import PrevIcon from "../../icons/prev";
import NextIcon from "../../icons/next";

interface WorkHistoryProps {
  experiences: Experience[];
}

const WorkHistory: React.FC<WorkHistoryProps> = ({ experiences }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

    // Determine current index based on scroll position
    const cardWidth = container.querySelector('[class*="w-[350px]"], [class*="w-[450px]"]')?.clientWidth || 350;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(newIndex, experiences.length - 1));
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollability();
    container.addEventListener("scroll", checkScrollability);
    window.addEventListener("resize", checkScrollability);

    return () => {
      container.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [experiences.length]);

  const scrollToPrevious = () => {
    if (!scrollContainerRef.current || currentIndex <= 0) return;

    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('[class*="snap-start"]');
    const targetIndex = currentIndex - 1;

    if (cards[targetIndex]) {
      (cards[targetIndex] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const scrollToNext = () => {
    if (!scrollContainerRef.current || currentIndex >= experiences.length - 1) return;

    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll('[class*="snap-start"]');
    const targetIndex = currentIndex + 1;

    if (cards[targetIndex]) {
      (cards[targetIndex] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

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

          {/* Prev Icon on Left End */}
          {canScrollLeft && (
            <div
              onClick={scrollToPrevious}
              className="absolute bottom-[22px] left-4 z-30 cursor-pointer"
            >
              <PrevIcon />
            </div>
          )}

          {/* Next Icon on Right End */}
          {canScrollRight && (
            <div
              onClick={scrollToNext}
              className="absolute bottom-[22px] right-4 z-30 cursor-pointer"
            >
              <NextIcon />
            </div>
          )}

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto no-scrollbar snap-x-mandatory timeline-container"
          >
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

