<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <template #start>
          <ion-buttons>
            <ion-back-button default-href="/tabs/tab3" />
          </ion-buttons>
        </template>
        <ion-title>Overlapping - no tabs</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ExploreContainer name="Overlapping page" />
    </ion-content>
  </ion-page>
</template>
