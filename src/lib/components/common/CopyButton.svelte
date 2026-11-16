<script lang="ts">
import type { Snippet } from 'svelte'
import { m } from '#i18n'

let {
  text,
  copiedLabel = m.copy_copied(),
  class: className = '',
  children,
}: { text: string, copiedLabel?: string, class?: string, children: Snippet } = $props()

let copied = $state(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(text)
    copied = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied = false), 2000)
  } catch {
    // Clipboard blocked: fall back to opening the mail client.
    location.href = `mailto:${ text }`
  }
}
</script>

<button type="button" class={className} onclick={copy}>
  {#if copied}{ copiedLabel }{:else}{@render children()}{/if}
</button>
<span class="sr-only" aria-live="polite">{ copied ? m.copy_announcement() : '' }</span>
