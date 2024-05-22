<script setup lang="ts">
useHead({
  title: 'Overlapping - no tabs',
})
const isExploreEnabled = ref(true)
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab3" />
        </ion-buttons>
        <ion-title>Overlapping - no tabs</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ExploreContainer
        v-if="isExploreEnabled"
        name="Overlap Page"
      />
      <p style="text-align: center;">
        <ion-button
          class="explorer-toggle-op"
          fill="solid"
          color="primary"
          strong
          @click="isExploreEnabled = !isExploreEnabled"
        >
          Toggle Overlap Explore Container
        </ion-button>
      </p>
    </ion-content>
  </ion-page>
</template>
