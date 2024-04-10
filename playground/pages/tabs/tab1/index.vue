<script setup lang="ts">
definePageMeta({
  alias: ['/', '/tabs'],
})
</script>

<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <template #start>
          <ion-thumbnail>
            <ion-img src="/icon.png" />
          </ion-thumbnail>
        </template>
        <ion-title> Nuxt Ionic </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Tab 1
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item>
          <template #start>
            <ion-checkbox aria-label="Mark idea complete" />
          </template>
          <ion-label>
            <h1>Create Idea</h1>
            <ion-note>Run Idea By Brandy</ion-note>
          </ion-label>
          <template #end>
            <ion-badge color="success">
              5 Days
            </ion-badge>
          </template>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
