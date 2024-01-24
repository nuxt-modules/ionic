<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import {
  createAnimation,
} from '@ionic/vue'

import type {
  Animation,
  AnimationDirection,
  AnimationFill,
  AnimationKeyFrames,
} from '@ionic/vue'

interface AnimationFromObject {
  property: string
  fromValue: string
}

interface AnimationFromToObject {
  property: string
  fromValue: string
  toValue: string
}

type AnimationStyles = {
  [key: string]: any
}

interface AnimationOptions {
  id?: string
  duration?: number
  iterations?: number
  easing?: string
  fill?: AnimationFill
  direction?: AnimationDirection
  from?: AnimationFromObject | AnimationFromObject[] | null
  fromTo?: AnimationFromToObject | AnimationFromToObject[] | null
  keyframes?: AnimationKeyFrames | null
  playOnMount?: boolean
  playOnVisible?: boolean
  beforeStyles?: AnimationStyles | null
  beforeAddClass?: string | string[] | null
  beforeClearStyles?: string[] | null
  afterStyles?: AnimationStyles | null
  afterAddClass?: string | string[] | null
  afterClearStyles?: string[] | null
}

const props = withDefaults(defineProps<AnimationOptions>(), {
  id: '',
  duration: 1000,
  iterations: 1,
  easing: 'linear',
  fill: 'auto',
  direction: 'normal',
  from: null,
  fromTo: null,
  keyframes: null,
  playOnMount: false,
  playOnVisible: false,
  beforeStyles: null,
  beforeAddClass: null,
  beforeClearStyles: null,
  afterStyles: null,
  afterAddClass: null,
  afterClearStyles: null,
})

const element = ref<HTMLDivElement | null>(null)

const animation = ref<Animation | null>(null)

let observer: IntersectionObserver

onMounted(() => {
  animation.value = createAnimation(props.id)
    .addElement(element.value!)
    .duration(props.duration)
    .iterations(props.iterations)
    .easing(props.easing)
    .fill(props.fill)
    .direction(props.direction)
    // Animation Hooks
    .beforeStyles(props.beforeStyles ?? {})
    .beforeAddClass(props.beforeAddClass ?? [])
    .beforeClearStyles(props.beforeClearStyles ?? [])
    .afterStyles(props.afterStyles ?? {})
    .afterAddClass(props.afterAddClass ?? [])
    .afterClearStyles(props.afterClearStyles ?? [])

  let hasKeyframes = Array.isArray(props.keyframes) && props.keyframes.length > 0

  if (hasKeyframes) {
    animation.value.keyframes(props.keyframes!)
  }

  // From
  if (props.from !== null && !hasKeyframes) {
    if (Array.isArray(props.from)) {
      props.from.forEach(({ property, fromValue }) => {
        animation.value!.from(property, fromValue)
      })
    } else {
      animation.value.from(props.from.property, props.from.fromValue)
    }
  }

  // From-to
  if (props.fromTo !== null && !hasKeyframes) {
    if (Array.isArray(props.fromTo)) {
      props.fromTo.forEach(({ property, fromValue, toValue }) => {
        animation.value!.fromTo(property, fromValue, toValue)
      })
    } else {
      animation.value.fromTo(props.fromTo.property, props.fromTo.fromValue, props.fromTo.toValue)
    }
  }

  if (props.playOnVisible && !props.playOnMount) {
    observer = new IntersectionObserver(
      () => {
        // Play animation
        animation.value!.play()
        // Disconnect observer - making animation always trigger ONLY ONCE
        observer.disconnect()
      },
      {
        // Use viewport as root element
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    )
    // Start observing for animation element
    observer.observe(element.value!)
  } else if (props.playOnMount) animation.value.play()
})
onBeforeUnmount(() => {
  //Destroy animation and disconnect observer when component is about to be unmounted if it is defined
  animation.value?.destroy()
  if (observer) observer.disconnect()
})
</script>

<template>
  <div ref="element">
    <slot :animation="animation" />
  </div>
</template>
