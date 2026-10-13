<script setup lang="ts">
useHead({
  title: 'Page Two - Tab 3',
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
        <ion-title>Tab 3 - Page 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ExploreContainer
        v-if="isExploreEnabled"
        name="Tab 3 - Page Two"
      />
      <p style="text-align: center;">
        <ion-button
          class="explorer-toggle-p2"
          fill="solid"
          color="primary"
          strong
          @click="isExploreEnabled = !isExploreEnabled"
        >
          Toggle Explore Container - Tab 3 / Page Two
        </ion-button>
      </p>
    </ion-content>
  </ion-page>
</template>
