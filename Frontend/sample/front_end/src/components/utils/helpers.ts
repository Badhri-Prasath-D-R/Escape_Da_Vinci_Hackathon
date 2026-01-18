/**
 * Truncate long text safely
 */
export const truncateText = (text: string, maxLength = 100): string => {
  if (!text) return "";
  return text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;
};

/**
 * Capitalize first letter
 */
export const capitalize = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Generate badge color based on news type
 */
export const getNewsBadgeClass = (type: "FAKE" | "REAL"): string => {
  return type === "FAKE" ? "badge fake" : "badge real";
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Normalize search text
 */
export const normalizeText = (text: string): string => {
  return text.toLowerCase().trim();
};
