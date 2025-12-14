import type { DataRange } from "../../../data_provider/data_provider";

export function formatDate(dateString: string): string {
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function calculateTotalExperience(
  experiences: { date_range: DataRange }[]
): number {
  const now = new Date();

  const ranges = experiences.map((exp) => {
    const start = new Date(exp.date_range.start_date + "-01");
    const end = exp.date_range.end_date
      ? new Date(exp.date_range.end_date + "-01")
      : now;
    return { start, end };
  });

  if (ranges.length === 0) return 0;

  ranges.sort((a, b) => a.start.getTime() - b.start.getTime());

  const merged: { start: Date; end: Date }[] = [];
  let current = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const next = ranges[i];
    if (next.start <= current.end) {
      current.end = new Date(
        Math.max(current.end.getTime(), next.end.getTime())
      );
    } else {
      merged.push(current);
      current = next;
    }
  }
  merged.push(current);

  let totalMonths = 0;
  merged.forEach((range) => {
    totalMonths +=
      (range.end.getFullYear() - range.start.getFullYear()) * 12 +
      (range.end.getMonth() - range.start.getMonth());
  });

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const roundedYears = months >= 6 ? years + 1 : years;

  return roundedYears;
}
