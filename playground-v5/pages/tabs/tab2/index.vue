<script setup lang="ts">
useHead({
  title: 'Tab 2 - Photos',
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-fab
        slot="fixed"
        vertical="bottom"
        horizontal="center"
      >
        <ion-fab-button>
          <ion-icon :icon="ioniconsCamera" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>
