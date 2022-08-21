<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { createAnimation, Animation, AnimationDirection, AnimationFill } from '@ionic/vue'

interface AnimationFromObject {
  property: string
  fromValue: string
}

interface AnimationFromToObject {
  property: string
  fromValue: string
  toValue: string
}

interface AnimationOptions {
  id?: string
  duration?: number
  iterations?: number
  easing?: string
  fill?: AnimationFill
  direction?: AnimationDirection
  from?: AnimationFromObject | AnimationFromObject[]
  fromTo?: AnimationFromToObject | AnimationFromToObject[]
  playOnMount?: boolean
  // playOnVisible?: boolean
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
  playOnMount: false,
})

const element = ref<HTMLDivElement>(null)

let animation = ref<Animation>(null)

onMounted(() => {
  animation.value = createAnimation(props.id)
    .addElement(element.value)
    .duration(props.duration)
    .iterations(props.iterations)
    .easing(props.easing)
    .fill(props.fill)
    .direction(props.direction)

  // From
  if (props.from !== null) {
    if (Array.isArray(props.from)) {
      props.from.forEach(({ property, fromValue }) => {
        animation.value.from(property, fromValue)
      })
    } else {
      animation.value.from(props.from.property, props.from.fromValue)
    }
  }

  // From-to
  if (props.fromTo !== null) {
    if (Array.isArray(props.fromTo)) {
      props.fromTo.forEach(({ property, fromValue, toValue }) => {
        animation.value.fromTo(property, fromValue, toValue)
      })
    } else {
      animation.value.fromTo(props.fromTo.property, props.fromTo.fromValue, props.fromTo.toValue)
    }
  }

  props.playOnMount && animation.value.play()
})
onBeforeUnmount(() => {
  animation.value.destroy()
})
</script>

<template>
  <div ref="element">
    <slot :animation="animation" />
  </div>
</template>
