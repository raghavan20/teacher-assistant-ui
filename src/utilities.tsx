export function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

export function toSentenceCase(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}