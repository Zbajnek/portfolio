<script lang="ts">
import { page } from '$app/state'
import { resolve } from '$app/paths'
import Seo from '#components/common/Seo.svelte'
</script>

<Seo title="{page.status} — {page.error?.message}" noindex />

<section class="flex min-h-[60svh] flex-col justify-end gap-8 px-gutter pb-16">
  <h1 class="text-title font-medium">{ page.status }</h1>
  <div class="flex flex-wrap justify-between gap-4 border-t border-ink pt-5">
    <p>{ page.error?.message }</p>
    <a href={resolve('/')} class="font-mono text-[13px]">← Back home</a>
  </div>
</section>
