<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar class="toolbar">
        <ion-thumbnail slot="start">
          <ion-img src="https://nuxtjs.org/design-kit/colored-logo.svg" />
        </ion-thumbnail>
        <ion-title> Nuxt Ionic </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"> Blank </ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item>
          <ion-checkbox slot="start" />
          <ion-label>
            <h1>Create Idea</h1>
            <ion-note>Run Idea By Brandy</ion-note>
          </ion-label>
          <ion-badge slot="end" color="success"> 5 Days </ion-badge>
        </ion-item>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button router-link="/new">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { add } from 'ionicons/icons'
useHead({
  title: 'Nuxt Ionic',
})
</script>
