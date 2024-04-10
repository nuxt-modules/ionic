<script setup lang="ts">
useHead({
  title: 'Nuxt Ionic',
})
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-router-outlet />
        <template #bottom>
          <ion-tab-bar>
            <ion-tab-button
              tab="tab1"
              href="/tabs/tab1"
            >
              <ion-icon :icon="ioniconsHomeOutline" />
              <ion-label>Tab 1</ion-label>
            </ion-tab-button>

            <ion-tab-button
              tab="tab2"
              href="/tabs/tab2"
            >
              <ion-icon :icon="ioniconsImagesOutline" />
              <ion-label>Photos</ion-label>
            </ion-tab-button>

            <ion-tab-button
              tab="tab3"
              href="/tabs/tab3"
            >
              <ion-icon :icon="ioniconsBulbOutline" />
              <ion-label>Tab 3</ion-label>
            </ion-tab-button>

            <ion-tab-button
              tab="tab4"
              href="/tabs/tab4"
            >
              <ion-icon :icon="ioniconsAccessibilityOutline" />
              <ion-label>Animation examples</ion-label>
            </ion-tab-button>
          </ion-tab-bar>
        </template>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>
