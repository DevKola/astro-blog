//Format Date
function formatDate(date: Date): string {
  const option: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(undefined, option);
}

// Capitalize Text
function capitalize(str: string): string {
  if (typeof str !== "string" || str.length === 0) return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { formatDate, capitalize };
