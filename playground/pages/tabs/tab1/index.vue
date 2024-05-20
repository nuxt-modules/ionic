<script setup lang="ts">
definePageMeta({
  alias: ['/', '/tabs'],
})
useIonHead({
  title: 'Tab 1',
})
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
      <explore-container name="Tab 1" />
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
            5 dys
          </ion-badge>
        </ion-item>
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
            5 dys
          </ion-badge>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
