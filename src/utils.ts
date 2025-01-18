import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateReadingTime(html: string): string {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

export function formatDateRange(start: Date, end?: Date): string {
  const startMonth = start.toLocaleString("default", { month: "short" });
  const startYear = start.getFullYear().toString();

  if (!end) {
    return `${startMonth} ${startYear} - Present`;
  }

  const endMonth = end.toLocaleString("default", { month: "short" });
  const endYear = end.getFullYear().toString();
  return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
}
