<script setup lang="ts">
useHead({
  title: 'Tab 3',
})
const isExploreEnabled = ref(true)
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
          <ion-title size="large">
            Tab 3
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button router-link="/tabs/tab3/page-two">
        Go to page two
      </ion-button>
      <ion-button router-link="/overlap">
        Go to overlapping page
      </ion-button>
      <ExploreContainer
        v-if="isExploreEnabled"
        name="Tab 3"
      />
      <p style="text-align: center;">
        <ion-button
          class="explorer-toggle-3"
          fill="solid"
          color="primary"
          strong
          @click="isExploreEnabled = !isExploreEnabled"
        >
          Toggle Explore Container - Tab 3
        </ion-button>
      </p>
    </ion-content>
  </ion-page>
</template>
