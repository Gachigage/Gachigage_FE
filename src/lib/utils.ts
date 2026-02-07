import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR")
}

export function parseFormattedNumber(str: string): number {
  const cleaned = str.replace(/[^0-9]/g, "")
  return cleaned === "" ? 0 : parseInt(cleaned, 10)
}
