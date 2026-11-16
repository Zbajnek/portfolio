<script lang="ts">
import { resolve } from '$app/paths'
import { features, jobs, site } from '#content'
import NextLink from '#components/common/NextLink.svelte'
import Seo from '#components/common/Seo.svelte'
import StatusDot from '#components/common/StatusDot.svelte'
import { reveal } from '#motion'
</script>

<Seo
  title="Experience"
  description="Work experience of {site.name}, frontend developer — Haxagon, freelance web development and Unity lecturing. Education and daily tools."
/>

<section class="flex flex-col gap-8 px-gutter pt-45 pb-10">
  <h1 class="text-title font-medium" {...reveal({ y: 60, duration: 1.2 })}>Experience</h1>
  <div class="border-t border-ink pt-5" {...reveal({ y: 16, delay: 0.3 })}>
    <p class="max-w-[520px] leading-snug">{ site.intro }</p>
  </div>
</section>

<section aria-label="Jobs" class="px-gutter pt-10 pb-20">
  {#each jobs as job (job.id)}
    <article
      id={job.id}
      class="grid scroll-mt-4 grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-12 gap-y-6 border-t border-ink py-12"
      {...reveal({ y: 24, stagger: 0.1 })}
    >
      <div class="flex flex-col gap-2.5">
        <span class="flex items-center gap-2.5 font-mono text-sm"><StatusDot off={!job.current} />{ job.when }</span>
        <span class="text-xl">{ job.where }</span>
      </div>
      <div class="flex flex-col gap-5 sm:col-span-2">
        <h2 class="text-subhead font-medium">{ job.role }</h2>
        <ul class="flex max-w-[720px] flex-col gap-2.5 text-lg leading-[1.45]">
          {#each job.points as point, i (i)}
            <li class="flex gap-3.5"><span aria-hidden="true">—</span><span>{ point }</span></li>
          {/each}
        </ul>
        <ul class="flex flex-wrap gap-2 font-mono text-xs" aria-label="Technologies">
          {#each job.stack as tech, i (i)}
            <li class="border border-ink px-2.5 py-1.5">{ tech }</li>
          {/each}
        </ul>
      </div>
    </article>
  {/each}
  <div class="border-t border-ink"></div>
</section>

<section class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-12 px-gutter pt-10 pb-30" {...reveal({ stagger: 0.12 })}>
  <div>
    <h2 class="mb-6 text-[40px] font-medium tracking-[-0.03em]">Education</h2>
    <ul class="flex flex-col gap-6">
      {#each site.education as edu, i (i)}
        <li class="flex flex-col gap-1.5 border-t border-ink pt-4">
          <span class="font-mono text-sm">{ edu.when }</span>
          <span class="text-[22px]">{ edu.school }</span>
          <span class="text-muted">{ edu.field }</span>
        </li>
      {/each}
    </ul>
  </div>
  <div>
    <h2 class="mb-6 text-[40px] font-medium tracking-[-0.03em]">Daily tools</h2>
    <p class="border-t border-ink pt-4 text-[22px] leading-normal">{ site.tools.join(', ') }</p>
  </div>
</section>

{#if features.projects}
  <NextLink href={resolve('/projects')} label="Next" title="Projects" />
{:else}
  <NextLink href={resolve('/contact')} label="Next" title="Contact" />
{/if}
