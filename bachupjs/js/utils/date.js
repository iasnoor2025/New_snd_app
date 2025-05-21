/**
 * Format a date string to a localized date format.
 *
 * @param {string} dateString - The date string to format
 * @returns {string} The formatted date string
 */
export function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
