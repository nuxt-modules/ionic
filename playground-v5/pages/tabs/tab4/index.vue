<script setup lang="ts">
useHead({
  title: 'Tab 4',
})
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Animation examples</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <IonAnimation
        v-slot="{ animation }"
        :duration="2000"
        :from-to="[
          { property: 'opacity', fromValue: '1', toValue: '0.2' },
        ]"
        fill="forwards"
      >
        <div class="square" />
        <IonButton @click="animation?.play()">
          Play
        </IonButton>
      </IonAnimation>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.square {
  width: 250px;
  height: 250px;
  background-color: red;
}
</style>
