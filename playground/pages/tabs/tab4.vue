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

      <div class="animations-grid">
        <IonAnimation
          v-slot="{ animation }"
          :duration="2000"
          :fromTo="[
            { property: 'opacity', fromValue: '1', toValue: '0.2' },
            { property: 'transform', fromValue: 'translateY(0px)', toValue: 'translateY(-50px)' },
          ]"
          fill="forwards"
        >
          <div class="red-square"></div>

          <button @click="animation.play()">Play</button>
          <button @click="animation.pause()">Pause</button>
          <button @click="animation.stop()">Stop</button>
        </IonAnimation>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.animations-grid {
  padding: 3em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1em;
}

.red-square {
  width: 250px;
  height: 250px;
  background-color: red;
  border-radius: 1em;
}

.blue-square {
  width: 250px;
  height: 250px;
  background-color: blue;
  border-radius: 1em;
}

.green-square {
  width: 250px;
  height: 250px;
  background-color: green;
  border-radius: 1em;
}
</style>
