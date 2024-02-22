<script setup lang="ts">
useIonHead({
  title: 'Tab 3',
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button router-link="/tabs/tab3/page-two">Go to page two</ion-button>
      <ion-button router-link="/overlap">Go to overlapping page</ion-button>
      <ExploreContainer name="Tab 3 page" />
    </ion-content>
  </ion-page>
</template>
