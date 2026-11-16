import tailwindcss from '@tailwindcss/vite'
import adapter from '@sveltejs/adapter-static'
import { sveltekit } from '@sveltejs/kit/vite'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { defineConfig } from 'vite'
// Imported from its own file: content.ts depends on the Paraglide output, which doesn't exist yet at config time.
import { features } from '#lib/content/features.ts'

export default defineConfig({
  plugins: [
    tailwindcss(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/lib/paraglide',
      // Static site, so the locale comes from the URL only: /cs/… is Czech, everything else English.
      // (No cookie / browser-language detection — a static host can't act on it.)
      strategy: ['url', 'baseLocale'],
      emitTsDeclarations: true,
      // Match SvelteKit's default: /cs, not /cs/ (the prerendered file is cs.html)
      trailingSlash: 'never',
    }),
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
      },

      // Fully static output: every route is prerendered to HTML at build time
      // (see `prerender = true` in src/routes/+layout.ts). No server runtime.
      // The Czech pages are found by the crawler through the language switcher in the header.
      adapter: adapter({
        pages: 'build',
        assets: 'build',
        fallback: undefined,
        precompress: false,
        // Relaxed only while projects are hidden, since /projects pages are then intentionally not built
        strict: features.projects,
      }),
    })
  ],
})
