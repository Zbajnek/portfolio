<script lang="ts">
import { site } from '#content'
import CopyButton from '#components/common/CopyButton.svelte'
import Seo from '#components/common/Seo.svelte'
import StatusDot from '#components/common/StatusDot.svelte'
import { reveal } from '#motion'

const rows = [
  { label: 'GitHub', value: site.github.handle, href: site.github.url, action: 'Open ↗' },
  { label: 'LinkedIn', value: site.linkedin.handle, href: site.linkedin.url, action: 'Open ↗' }
]

// One transition for every row. The email row is a <div> (it holds a link and a button),
// so it doesn't get the global `a` transition — spelling it out here keeps all rows identical.
const row = 'flex flex-wrap items-baseline justify-between gap-4 border-t border-ink py-7.5 transition-[padding,color] duration-200 ease-out hover:pl-8 hover:text-accent hover:opacity-100'
const rowLabel = 'w-[90px] font-mono text-[13px]'
const rowValue = 'text-row wrap-anywhere'
</script>

<Seo title="Contact" description="Get in touch with {site.name} — email, GitHub and LinkedIn. Based in Prague, open to new work." />

<section class="flex flex-col gap-8 px-gutter pt-45 pb-10">
  <h1 class="text-title font-medium" {...reveal({ y: 60, duration: 1.2 })}>Contact</h1>
  <div class="flex flex-wrap justify-between gap-4 border-t border-ink pt-5" {...reveal({ y: 16, delay: 0.3 })}>
    <p class="flex items-center gap-2.5"><StatusDot />{ site.contactStatus }</p>
    <p class="font-mono text-[13px]">{ site.timezone }</p>
  </div>
</section>

<section aria-label="Ways to reach me" class="px-gutter pt-10 pb-35" {...reveal({ y: 24, delay: 0.4, stagger: 0.08 })}>
  <div class={row}>
    <!-- transition-none: the colour is inherited from the row, which already transitions it.
         Transitioning it here too would make the email lag behind the rest of the row. -->
    <a href="mailto:{site.email}" class="flex flex-wrap items-baseline gap-8 transition-none hover:opacity-100">
      <span class={rowLabel}>Email</span>
      <span class={rowValue}>{ site.email }</span>
    </a>
    <CopyButton text={site.email} class="min-h-11 font-mono text-[13px] transition-opacity duration-150 hover:opacity-60">Copy ⧉</CopyButton>
  </div>

  {#each rows as r (r.label)}
    <a
      href={r.href}
      rel="external noopener"
      class={row}
    >
      <span class="flex flex-wrap items-baseline gap-8">
        <span class={rowLabel}>{ r.label }</span>
        <span class={rowValue}>{ r.value }</span>
      </span>
      <span class="font-mono text-[13px]">{ r.action }</span>
    </a>
  {/each}
  <div class="border-t border-ink"></div>
</section>
