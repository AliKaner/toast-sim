import { ref, onUnmounted, type Ref, type ComputedRef } from 'vue'

interface UseSliderDragOptions {
  containerRef: Ref<HTMLElement | null>
  min: ComputedRef<number>
  max: ComputedRef<number>
  disabled: ComputedRef<boolean>
  onValueChange: (value: number) => void
  knobRadius?: number
}

export function useSliderDrag(options: UseSliderDragOptions) {
  const { containerRef, min, max, disabled, onValueChange, knobRadius = 10 } = options

  const isDragging = ref(false)

  const updateValueFromEvent = (event: MouseEvent | TouchEvent): void => {
    if (!containerRef.value) return

    const rect = containerRef.value.getBoundingClientRect()
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX

    const trackStart = rect.left + knobRadius
    const trackEnd = rect.right - knobRadius
    const trackWidth = trackEnd - trackStart

    let relativeX = clientX - trackStart
    relativeX = Math.max(0, Math.min(relativeX, trackWidth))

    const percent = relativeX / trackWidth
    const range = max.value - min.value
    const newValue = Math.round(min.value + percent * range)

    onValueChange(newValue)
  }

  const onDrag = (event: MouseEvent | TouchEvent): void => {
    if (!isDragging.value) return
    updateValueFromEvent(event)
  }

  const stopDrag = (): void => {
    isDragging.value = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('touchmove', onDrag)
    document.removeEventListener('touchend', stopDrag)
  }

  const startDrag = (event: MouseEvent | TouchEvent): void => {
    if (disabled.value) return
    isDragging.value = true
    updateValueFromEvent(event)

    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('touchmove', onDrag)
    document.addEventListener('touchend', stopDrag)
  }

  onUnmounted(() => {
    stopDrag()
  })

  return {
    isDragging,
    startDrag
  }
}
