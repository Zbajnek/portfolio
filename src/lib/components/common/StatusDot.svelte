<script lang="ts">
let { off = false }: { off?: boolean } = $props()
</script>

<span
  aria-hidden="true"
  class="inline-block size-2.5 shrink-0 {off ? 'bg-transparent' : 'bg-accent'}"
></span>
