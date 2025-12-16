import { useState, useEffect } from "react";
import type { Experience } from "../../../data_provider/data_provider";

function WorkHistory({ experiences }: { experiences: Experience[] }) {
  const [visibleCount, setVisibleCount] = useState(experiences.length);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(Math.min(2, experiences.length));
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [experiences.length]);

  const getCirclePosition = (index: number, total: number) => {
    if (total === 1) return "50%";
    const padding = 0.15; // 15% padding on each side
    const availableWidth = 1 - (padding * 2);
    return `${(padding + (index / (total - 1)) * availableWidth) * 100}%`;
  };

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const visibleExperiences = experiences.slice(0, visibleCount);

  return (
    <section
      id="work"
      className="min-h-screen w-full flex items-start justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-8 overflow-x-hidden relative"
    >
      {/* Horizontal timeline line */}
      <div className="absolute top-3/4 left-0 w-full h-1 bg-gray-700 dark:bg-gray-300 transform -translate-y-1/2"></div>
      
      {visibleExperiences.map((_, index) => {
        const position = getCirclePosition(index, visibleCount);
        return (
          <div
            key={index}
            className="absolute flex flex-col items-center"
            style={{ left: position, top: '25%', height: '50%', transform: 'translateX(-50%)' }}
          >
            {/* Vertical line from top to timeline */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-700 dark:bg-gray-300"></div>
            
            {/* Bigger circle at the top */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-900 dark:bg-gray-100 border-2 border-gray-700 dark:border-gray-300 z-10"></div>
            
            {/* Smaller circle on timeline */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-gray-900 dark:bg-gray-100 border-2 border-gray-700 dark:border-gray-300 z-10"></div>
          </div>
        );
      })}
      
      {/* Date labels below timeline */}
      {visibleExperiences.map((experience, index) => {
        const position = getCirclePosition(index, visibleCount);
        const startDate = formatDate(experience.date_range.start_date);
        const endDate = formatDate(experience.date_range.end_date);
        return (
          <div
            key={`date-${index}`}
            className="absolute top-3/4 transform -translate-x-1/2 flex flex-col items-center mt-4"
            style={{ left: position }}
          >
            <div className="text-xs sm:text-sm text-center text-gray-700 dark:text-gray-300 whitespace-nowrap font-bold" style={{ fontFamily: "'Signika', system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
              {startDate} - {endDate}
            </div>
          </div>
        );
      })}
      
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-gray-100">
          Work History
        </h2>
      </div>
    </section>
  );
}

export default WorkHistory;

