<script lang="ts">
import { resolve } from '$app/paths'
import { projects, site, type Project, type ProjectType } from '#content'
import { CursorPreview, CursorPreviewState } from '#packages/cursor-preview'
import NextLink from '#components/common/NextLink.svelte'
import Placeholder from '#components/common/Placeholder.svelte'
import Seo from '#components/common/Seo.svelte'
import { reveal } from '#motion'

const filters: { label: string, type: ProjectType | null }[] = [
  { label: 'All', type: null },
  { label: 'Work', type: 'Work' },
  { label: 'Side projects', type: 'Side project' }
]

let filter = $state<ProjectType | null>(null)
let view = $state<'list' | 'grid'>('list')

// Keep each project's original number, regardless of filtering.
const numbered = projects.map((project, i) => ({ project, num: i + 1 }))
const visible = $derived(filter ? numbered.filter(({ project }) => project.type === filter) : numbered)

const preview = new CursorPreviewState<Project>()
const tableCols = 'grid grid-cols-[60px_minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)_80px] gap-6'
</script>

<Seo title="Projects" description="Selected work and side projects by {site.name}, frontend developer — web apps, e-shops and games." />

<section class="flex flex-col gap-8 px-gutter pt-45 pb-10">
  <h1 class="text-title font-medium" {...reveal({ y: 60, duration: 1.2 })}>
    Projects<sup class="ml-3 align-top font-mono text-[0.14em] tracking-normal">({ visible.length })</sup>
  </h1>
  <div
    class="flex flex-wrap items-center justify-between gap-4 border-t border-ink pt-4 font-mono text-[13px]"
    {...reveal({ y: 16, delay: 0.3 })}
  >
    <div class="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
      {#each filters as f (f.label)}
        <button
          type="button"
          aria-pressed={filter === f.type}
          class="min-h-11 border border-ink px-4 aria-pressed:bg-ink aria-pressed:text-paper not-aria-pressed:hover:bg-surface"
          onclick={() => (filter = f.type)}
        >{ f.label }</button>
      {/each}
    </div>
    <div class="flex gap-5" role="group" aria-label="Layout">
      {#each ['list', 'grid'] as const as v (v)}
        <button
          type="button"
          aria-pressed={view === v}
          class="min-h-11 capitalize text-muted aria-pressed:text-ink aria-pressed:underline aria-pressed:underline-offset-[5px] hover:text-ink"
          onclick={() => (view = v)}
        >{ v }</button>
      {/each}
    </div>
  </div>
</section>

<section aria-label="Project list" class="px-gutter pt-10 pb-30" {...reveal({ y: 24, delay: 0.4 })}>
  {#if view === 'list'}
    <div class="overflow-x-auto">
      <div
        role="presentation"
        class="relative min-w-[820px]"
        onpointermove={preview.move}
        onpointerleave={preview.leave}
      >
        <div class="{tableCols} label border-t border-ink py-3.5">
          <span>No.</span><span>Project</span><span>Type</span><span>Stack</span><span class="text-right">Year</span>
        </div>
        {#each visible as { project, num } (project.slug)}
          <a
            href={resolve('/projects/[slug]', { slug: project.slug })}
            class="group {tableCols} items-baseline border-t border-ink py-6.5 hover:text-accent hover:opacity-100"
            onpointerenter={preview.enter(project)}
          >
            <span class="font-mono text-[13px]">{ num }</span>
            <span class="text-list transition-[padding] duration-200 group-hover:pl-8">{ project.title }</span>
            <span>{ project.type }</span>
            <span class="text-muted group-hover:text-accent">{ project.stack }</span>
            <span class="text-right font-mono text-[13px]">{ project.year }</span>
          </a>
        {/each}
        <div class="border-t border-ink"></div>
        <CursorPreview {preview} class="h-64 w-[380px]">
          {#snippet children(item)}
            <Placeholder class="h-full w-full" label="[SCREENSHOT — {item.title}]" src={item.images?.hero} />
          {/snippet}
        </CursorPreview>
      </div>
    </div>
  {:else}
    <ul class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-x-6 gap-y-12 border-t border-ink pt-6">
      {#each visible as { project, num } (project.slug)}
        <li>
          <a
            href={resolve('/projects/[slug]', { slug: project.slug })}
            class="group flex flex-col gap-4 hover:opacity-100"
          >
            <Placeholder
              class="aspect-4/3 w-full"
              label="[SCREENSHOT — {project.title}]"
              src={project.images?.hero}
              alt=""
            />
            <span class="flex items-baseline gap-4 group-hover:text-accent">
              <span class="font-mono text-[13px]">{ num }</span>
              <span class="text-[32px] leading-none tracking-[-0.03em]">{ project.title }</span>
            </span>
            <span class="flex justify-between gap-4 font-mono text-[13px]">
              <span>{ project.type } · { project.stack }</span>
              <span>{ project.year }</span>
            </span>
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</section>

<NextLink href={resolve('/contact')} label="Next" title="Contact" />
