<script setup lang="ts">
useIonHead({
  title: 'Page Two - Tab 3',
})
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
      <ExploreContainer name="Tab 3 page two" />
    </ion-content>
  </ion-page>
</template>
