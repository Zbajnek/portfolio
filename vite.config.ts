import tailwindcss from '@tailwindcss/vite'
import adapter from '@sveltejs/adapter-static'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { features } from './src/lib/content/content.ts'

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
      },

      // Fully static output: every route is prerendered to HTML at build time
      // (see `prerender = true` in src/routes/+layout.ts). No server runtime.
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
