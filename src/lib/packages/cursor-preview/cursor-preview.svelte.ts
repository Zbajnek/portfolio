/**
 * Tracks which item is hovered and where the pointer is inside a container,
 * for the "screenshot follows cursor" previews on project lists.
 */
export class CursorPreviewState<T> {
  /** Item under the mouse, or null */
  active = $state<T | null>(null)
  /** Last hovered item — stays rendered while the preview fades out */
  last = $state<T | null>(null)
  x = $state(0)
  y = $state(0)

  move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    this.x = event.clientX - rect.left
    this.y = event.clientY - rect.top
  }

  enter = (item: T) => (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return
    this.active = item
    this.last = item
  }

  leave = () => {
    this.active = null
  }
}
