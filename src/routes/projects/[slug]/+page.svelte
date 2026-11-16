<script lang="ts">
import { resolve } from '$app/paths'
import { site } from '#content'
import NextLink from '#components/common/NextLink.svelte'
import Placeholder from '#components/common/Placeholder.svelte'
import Seo from '#components/common/Seo.svelte'
import { reveal } from '#motion'
import type { PageProps } from './$types'

let { data }: PageProps = $props()
const project = $derived(data.project)
</script>

<Seo
  title={project.title}
  description="{project.title} — {project.type.toLowerCase()} project by {site.name}. Role: {project.role}. Built with {project.stack} ({project.year})."
  image={project.images?.hero}
  type="article"
/>

<section class="flex flex-col gap-8 px-gutter pt-35 pb-10">
  <a
    href={resolve('/projects')}
    class="inline-flex min-h-11 items-center self-start font-mono text-[13px]"
  >← All projects</a>
  <h1 class="text-project font-medium" {...reveal({ y: 60, duration: 1.2 })}>{ project.title }</h1>
  <dl
    class="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 border-t border-ink pt-5"
    {...reveal({ y: 16, delay: 0.3, stagger: 0.06 })}
  >
    <div>
      <dt class="mb-2 label">Year</dt>
      <dd class="text-lg">{ project.year }</dd>
    </div>
    <div>
      <dt class="mb-2 label">Role</dt>
      <dd class="text-lg">{ project.role }</dd>
    </div>
    <div>
      <dt class="mb-2 label">Stack</dt>
      <dd class="text-lg">{ project.stack }</dd>
    </div>
    {#if project.live || project.source}
      <div>
        <dt class="mb-2 label">Links</dt>
        <dd class="flex gap-4 text-lg">
          {#if project.live}<a href={project.live} rel="external noopener" class="text-accent">Live ↗</a>{/if}
          {#if project.source}<a href={project.source} rel="external noopener">Source ↗</a>{/if}
        </dd>
      </div>
    {/if}
  </dl>
</section>

<div class="px-gutter pt-6" {...reveal({ y: 40, delay: 0.4 })}>
  <Placeholder
    class="aspect-video w-full text-[13px]"
    label="[HERO SCREENSHOT OR SCREEN RECORDING]"
    src={project.images?.hero}
    alt="{project.title} screenshot"
  />
</div>

<div class="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6 px-gutter pt-10 pb-30" {...reveal({ y: 40, stagger: 0.12 })}>
  <Placeholder
    class="aspect-4/3 w-full"
    label="[DETAIL SHOT]"
    src={project.images?.detail}
    alt="{project.title} detail"
  />
  <Placeholder
    class="aspect-4/3 w-full"
    label="[MOBILE VIEW]"
    src={project.images?.mobile}
    alt="{project.title} on mobile"
  />
</div>

<NextLink
  href={resolve('/projects/[slug]', { slug: data.next.slug })}
  label="Next project — {data.nextNumber}"
  title={data.next.title}
/>
