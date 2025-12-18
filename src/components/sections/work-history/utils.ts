import type { Experience } from "../../../data_provider/data_provider";

/**
 * Format date range from "YYYY-MM" format to "MMM YYYY - MMM YYYY" or "MMM YYYY - Present"
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const [startYearStr, startMonthStr] = startDate.split("-");
  const startYear = parseInt(startYearStr);
  const startMonth = parseInt(startMonthStr);
  const startMonthName = monthNames[startMonth - 1];
  
  // Check if end date is in the future
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
  
  const [endYearStr, endMonthStr] = endDate.split("-");
  const endYearNum = parseInt(endYearStr);
  const endMonthNum = parseInt(endMonthStr);
  
  // If end date is in the future (year > current year, or same year but month >= current month)
  if (
    endYearNum > currentYear ||
    (endYearNum === currentYear && endMonthNum >= currentMonth)
  ) {
    return `${startMonthName} ${startYear} - Present`;
  }
  
  const endMonthName = monthNames[endMonthNum - 1];
  return `${startMonthName} ${startYear} - ${endMonthName} ${endYearNum}`;
}

/**
 * Generate a color class for each experience based on index
 */
export function getExperienceColor(index: number): string {
  const colors = [
    "bg-primary-light dark:bg-primary-dark",
    "bg-secondary-light dark:bg-secondary-dark",
    "bg-tertiary-light dark:bg-tertiary-dark",
    "bg-bg-light dark:bg-bg-dark",
    "bg-primary-light dark:bg-primary-dark",
    "bg-secondary-light dark:bg-secondary-dark",
    "bg-tertiary-light dark:bg-tertiary-dark",
    "bg-bg-light dark:bg-bg-dark",
  ];
  
  return colors[index % colors.length];
}

/**
 * Combine responsibilities into a single description
 */
export function getExperienceDescription(experience: Experience): string {
  if (experience.responsibilities && experience.responsibilities.length > 0) {
    return experience.responsibilities.join(" ");
  }
  return "";
}

