<script lang="ts">
import { m } from '#i18n'

function toggle() {
  const dark = document.documentElement.classList.toggle('dark')
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch {
    // Storage unavailable (private mode etc.) — the toggle still works for this visit.
  }
}
</script>

<!-- The label names the theme you switch *to*; CSS picks it so it is right before hydration. -->
<button
  type="button"
  aria-label={m.theme_toggle()}
  class="inline-flex min-h-11 items-center gap-2 px-1 hover:opacity-60"
  onclick={toggle}
>
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <circle
      cx="7"
      cy="7"
      r="6"
      fill="none"
      stroke="currentColor"
      stroke-width="1.2"
    />
    <path d="M7 1a6 6 0 0 1 0 12z" fill="currentColor" />
  </svg>
  <span class="dark:hidden">{ m.theme_dark() }</span>
  <span class="hidden dark:inline">{ m.theme_light() }</span>
</button>
