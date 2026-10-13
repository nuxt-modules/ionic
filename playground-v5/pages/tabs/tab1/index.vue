<script setup lang="ts">
definePageMeta({
  alias: ['/', '/tabs'],
})
useHead({
  title: 'Tab 1',
})
const isExploreEnabled = ref(true)
</script>

<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-thumbnail slot="start">
          <ion-img src="/icon.png" />
        </ion-thumbnail>
        <ion-title> Nuxt Ionic </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ExploreContainer
        v-if="isExploreEnabled"
        name="Tab 1"
      />
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Tab 1
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item>
          <ion-checkbox
            slot="start"
            aria-label="Mark idea complete"
          />
          <ion-label>
            <h1>Create Idea</h1>
            <ion-note>Run Idea By Brandy</ion-note>
          </ion-label>
          <ion-badge
            slot="end"
            color="success"
          >
            5 Days
          </ion-badge>
        </ion-item>
      </ion-list>

      <p style="text-align: center;">
        <ion-button
          class="explorer-toggle-1"
          fill="solid"
          color="primary"
          strong
          @click="isExploreEnabled = !isExploreEnabled"
        >
          Toggle Explore Container - Tab 1
        </ion-button>
      </p>
    </ion-content>
  </ion-page>
</template>
