import { format, formatDistanceToNow } from "date-fns";

/** "2 hours ago", "yesterday"-ish relative time from an ISO date string. */
export function relativeTime(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch {
    return "";
  }
}

/** "12 Jun 2026" from an ISO date string. */
export function formatDate(iso: string): string {
  try {
    return format(new Date(iso), "d MMM yyyy");
  } catch {
    return "";
  }
}
