/**
 * Site-wide switches — flip to false to temporarily hide a whole section.
 * Kept in its own file with no imports so vite.config.ts can read it before
 * the Paraglide plugin has generated `$lib/paraglide`.
 */
export const features = {
  /** Projects: nav link, home section, /projects pages and sitemap entries */
  projects: false,
}
