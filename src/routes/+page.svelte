<script lang="ts">
import { resolve } from '$app/paths'
import { featuredProjects, features, jobs, site, type Project } from '#content'
import { CursorPreview, CursorPreviewState } from '#packages/cursor-preview'
import CopyButton from '#components/common/CopyButton.svelte'
import Placeholder from '#components/common/Placeholder.svelte'
import Seo from '#components/common/Seo.svelte'
import StatusDot from '#components/common/StatusDot.svelte'
import { reveal, scrollToTarget } from '#motion'

const preview = new CursorPreviewState<Project>()
const tableCols = 'grid grid-cols-[180px_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-6'

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  givenName: site.firstName,
  familyName: site.lastName,
  jobTitle: 'Frontend developer',
  url: site.url,
  email: `mailto:${ site.email }`,
  address: { '@type': 'PostalAddress', addressLocality: 'Prague', addressCountry: 'CZ' },
  worksFor: { '@type': 'Organization', name: 'Haxagon' },
  sameAs: [site.github.url, site.linkedin.url],
}

function scrollDown(event: MouseEvent) {
  event.preventDefault()
  scrollToTarget('#experience')
}
</script>

<Seo type="profile" jsonLd={person} />

<!-- Hero -->
<section class="flex min-h-[min(50rem,calc(100svh-5rem))] flex-col justify-end gap-10 px-gutter pb-10">
  <h1 class="text-display font-medium" {...reveal({ y: 80, stagger: 0.12, duration: 1.2 })}>
    <span class="block">{ site.firstName }</span>
    <span class="block">{ site.lastName }</span>
  </h1>
  <div
    class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 border-t border-ink pt-5 leading-snug"
    {...reveal({ y: 16, delay: 0.4, stagger: 0.08 })}
  >
    <p>{ site.role }<br />{ site.current }</p>
    <p>{ site.location }</p>
    <p class="flex items-center gap-2.5"><StatusDot />{ site.status }</p>
    <p class="text-right font-mono text-[13px]"><a href="#experience" onclick={scrollDown}>Scroll ↓</a></p>
  </div>
</section>

<!-- Experience -->
<section id="experience" class="scroll-mt-4 px-gutter pt-30 pb-20">
  <div class="mb-12 flex flex-wrap items-end justify-between gap-4" {...reveal()}>
    <h2 class="text-headline font-medium">Experience</h2>
    <a href={resolve('/experience')} class="inline-flex min-h-11 items-center font-mono text-[13px]">Full experience →</a>
  </div>
  <div class="overflow-x-auto">
    <div class="min-w-190" {...reveal({ y: 24, stagger: 0.08 })}>
      <div class="{tableCols} label border-t border-ink py-3.5">
        <span>When</span><span>Role</span><span>Where</span><span>Stack</span>
      </div>
      {#each jobs as job (job.id)}
        <a
          href={resolve(`/experience#${ job.id }`)}
          class="{tableCols} items-baseline border-t border-ink py-7"
        >
          <span class="font-mono text-sm">{ job.when }</span>
          <span class="text-[32px] tracking-[-0.02em]">{ job.role }</span>
          <span class="text-xl">{ job.where }</span>
          <span class="text-muted">{ job.stack.join(', ') }</span>
        </a>
      {/each}
      <div class="border-t border-ink"></div>
    </div>
  </div>
</section>

<!-- Projects -->
{#if features.projects}
  <section class="px-gutter py-20">
    <div class="mb-12 flex flex-wrap items-end justify-between gap-4" {...reveal()}>
      <h2 class="text-headline font-medium">Projects</h2>
      <a href={resolve('/projects')} class="inline-flex min-h-11 items-center font-mono text-[13px]">All projects →</a>
    </div>
    <div
      role="presentation"
      class="relative"
      onpointermove={preview.move}
      onpointerleave={preview.leave}
    >
      <div {...reveal({ y: 24, stagger: 0.08 })}>
        {#each featuredProjects as project, i (project.slug)}
          <a
            href={resolve('/projects/[slug]', { slug: project.slug })}
            class="flex flex-wrap items-baseline justify-between gap-4 border-t border-ink py-5.5 hover:pl-10 hover:text-accent hover:opacity-100"
            onpointerenter={preview.enter(project)}
          >
            <span class="flex items-baseline gap-8">
              <span class="font-mono text-[13px]">{ i + 1 }</span>
              <span class="text-row">{ project.title }</span>
            </span>
            <span class="font-mono text-[13px]">{ project.stack } — { project.year }</span>
          </a>
        {/each}
        <div class="border-t border-ink"></div>
      </div>
      <CursorPreview {preview} class="h-57.5 w-85">
        {#snippet children(item)}
          <Placeholder class="h-full w-full" label="[SCREENSHOT — {item.title}]" src={item.images?.hero} />
        {/snippet}
      </CursorPreview>
    </div>
  </section>
{/if}

<!-- Contact -->
<section class="px-gutter pt-30 pb-16" {...reveal({ stagger: 0.1 })}>
  <h2 class="mb-10 text-headline font-medium">Contact</h2>
  <a
    href="mailto:{site.email}"
    class="block border-b border-ink pb-6 text-email wrap-anywhere"
  >{ site.email }</a>
  <div class="mt-7 flex flex-wrap gap-3">
    <CopyButton
      text={site.email}
      class="min-h-12 min-w-37.5 bg-ink px-5.5 py-3.5 text-paper hover:opacity-80"
    >Copy email</CopyButton>
    <a
      href={resolve('/contact')}
      class="inline-flex min-h-12 items-center border border-ink px-5.5 py-3.5"
    >All contacts →</a>
  </div>
</section>
