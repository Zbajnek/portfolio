<script lang="ts">
import { projectTypeLabel, site } from '#content'
import { localize, m, t } from '#i18n'
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
  description={m.project_description({
    title: project.title,
    type: projectTypeLabel(project.type).toLowerCase(),
    name: site.name,
    role: t(project.role),
    stack: project.stack,
    year: project.year,
  })}
  image={project.images?.hero}
  type="article"
/>

<section class="flex flex-col gap-8 px-gutter pt-35 pb-10">
  <a
    href={localize('/projects')}
    class="inline-flex min-h-11 items-center self-start font-mono text-[13px]"
  >{ m.project_back() }</a>
  <h1 class="text-project font-medium" {...reveal({ y: 60, duration: 1.2 })}>{ project.title }</h1>
  <dl
    class="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 border-t border-ink pt-5"
    {...reveal({ y: 16, delay: 0.3, stagger: 0.06 })}
  >
    <div>
      <dt class="mb-2 label">{ m.table_year() }</dt>
      <dd class="text-lg">{ project.year }</dd>
    </div>
    <div>
      <dt class="mb-2 label">{ m.project_role() }</dt>
      <dd class="text-lg">{ t(project.role) }</dd>
    </div>
    <div>
      <dt class="mb-2 label">{ m.table_stack() }</dt>
      <dd class="text-lg">{ project.stack }</dd>
    </div>
    {#if project.live || project.source}
      <div>
        <dt class="mb-2 label">{ m.project_links() }</dt>
        <dd class="flex gap-4 text-lg">
          {#if project.live}<a href={project.live} rel="external noopener" class="text-accent">{ m.project_live() }</a>{/if}
          {#if project.source}<a href={project.source} rel="external noopener">{ m.project_source() }</a>{/if}
        </dd>
      </div>
    {/if}
  </dl>
</section>

<div class="px-gutter pt-6" {...reveal({ y: 40, delay: 0.4 })}>
  <Placeholder
    class="aspect-video w-full text-[13px]"
    label={m.project_hero_placeholder()}
    src={project.images?.hero}
    alt={m.project_hero_alt({ title: project.title })}
  />
</div>

<div class="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6 px-gutter pt-10 pb-30" {...reveal({ y: 40, stagger: 0.12 })}>
  <Placeholder
    class="aspect-4/3 w-full"
    label={m.project_detail_placeholder()}
    src={project.images?.detail}
    alt={m.project_detail_alt({ title: project.title })}
  />
  <Placeholder
    class="aspect-4/3 w-full"
    label={m.project_mobile_placeholder()}
    src={project.images?.mobile}
    alt={m.project_mobile_alt({ title: project.title })}
  />
</div>

<NextLink
  href={localize(`/projects/${ data.next.slug }`)}
  label={m.project_next({ number: data.nextNumber })}
  title={data.next.title}
/>
