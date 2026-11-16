<script lang="ts">
import './layout.css'
import favicon from '#lib/assets/favicon.svg'
import { onMount } from 'svelte'
import { afterNavigate } from '$app/navigation'
import { page } from '$app/state'
import Header from '#components/layout/Header.svelte'
import Footer from '#components/layout/Footer.svelte'
import { initSmoothScroll, refreshScroll } from '#motion'
import { m } from '#i18n'
import type { LayoutProps } from './$types'

let { children }: LayoutProps = $props()

onMount(() => initSmoothScroll())
afterNavigate(() => refreshScroll())
</script>

<svelte:head>
  <link rel="icon" href={favicon} type="image/svg+xml" />
</svelte:head>

<a
  href="#main"
  class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
>{ m.common_skip_to_content() }</a>

<Header />

<main id="main">
  {@render children()}
</main>

<Footer home={page.route.id === '/'} />
