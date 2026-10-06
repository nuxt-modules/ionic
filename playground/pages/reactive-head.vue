<script setup lang="ts">
import { computed, ref } from 'vue'

const count = ref(0)

const title = computed(() => `Reactive Head - ${count.value}`)
const styleContent = computed(() => `.reactive-head-probe { --count: ${count.value} }`)

useHead({
  title,
  style: [{ innerHTML: styleContent, id: 'reactive-head-style' }],
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Reactive head</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-button
        class="reactive-head-increment"
        @click="count++"
      >
        Increment
      </ion-button>
      <ion-label class="reactive-head-count">
        {{ count }}
      </ion-label>
    </ion-content>
  </ion-page>
</template>
