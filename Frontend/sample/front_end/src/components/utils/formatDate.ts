/**
 * formatDate
 * Formats a date string or Date object into a readable format
 *
 * @param date - string | Date
 * @returns formatted date (e.g., "12 Jan 2026, 10:30 AM")
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
