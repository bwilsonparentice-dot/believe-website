/** Keyword search, filters, sorting, and CSV export. Plain text matching only. */
import type { PublicBrand } from './types'
import { CATEGORIES, GATHERING_TYPES, labelOf } from './options'

const fold = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/** True when every word of the query appears somewhere in the given text. Case-insensitive. */
export function matches(query: string, ...fields: (string | string[] | null | undefined)[]): boolean {
  const words = fold(query).split(/\s+/).filter(Boolean)
  if (!words.length) return true
  const hay = fold(fields.flat().filter((f): f is string => typeof f === 'string').join(' \u0001 '))
  return words.every((w) => hay.includes(w))
}

export const ATTENDANCE_BANDS = [['1-10', 'Up to 10'], ['11-25', '11 to 25'], ['26-50', '26 to 50'], ['51-100', '51 to 100'], ['100+', 'More than 100']] as const
export function attendanceBand(n: number): string {
  return n <= 10 ? '1-10' : n <= 25 ? '11-25' : n <= 50 ? '26-50' : n <= 100 ? '51-100' : '100+'
}

/** inclusive date-range test on ISO dates; an empty bound is open; a missing date never matches a set range */
export function inRange(date: string | null | undefined, from: string, to: string): boolean {
  if (!from && !to) return true
  if (!date) return false
  return (!from || date >= from) && (!to || date <= to)
}

export interface BrandFilters { q: string; category: string; occasion: string; geography: string; dietary: string }
export const EMPTY_BRAND_FILTERS: BrandFilters = { q: '', category: '', occasion: '', geography: '', dietary: '' }

export function filterPublicBrands(brands: PublicBrand[], f: BrandFilters): PublicBrand[] {
  return brands.filter((b) =>
    matches(f.q, b.name, labelOf(CATEGORIES, b.category), b.description, b.occasions.map((o) => labelOf(GATHERING_TYPES, o)))
    && (!f.category || b.category === f.category)
    && (!f.occasion || b.occasions.includes(f.occasion))
    && (!f.geography || b.geography.includes(f.geography))
    && (!f.dietary || b.dietary_verified.includes(f.dietary)))
}
export const distinct = (lists: string[][]): string[] => [...new Set(lists.flat())].sort((a, b) => a.localeCompare(b))

/**
 * CSV for the filtered workspace view. A cell that begins with = + - @ (or a
 * tab or carriage return) could be run as a formula when the file is opened in
 * a spreadsheet, so those cells are prefixed with an apostrophe to keep them
 * as plain text.
 */
export function csvCell(value: unknown): string {
  let s = value == null ? '' : Array.isArray(value) ? value.join('; ') : String(value)
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s
}
export function toCsv<T>(rows: T[], columns: [header: string, get: (row: T) => unknown][]): string {
  const lines = [columns.map((c) => csvCell(c[0])).join(',')]
  for (const r of rows) lines.push(columns.map((c) => csvCell(c[1](r))).join(','))
  return lines.join('\r\n') + '\r\n'
}
