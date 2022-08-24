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

        <IonAnimation
          v-slot="{ animation }"
          :duration="3000"
          :keyframes="[
            { offset: 0, transform: 'scale(1) translateX(0)' },
            { offset: 0.4, transform: 'scale(1.1) translateX(15px)' },
            { offset: 0.6, transform: 'scale(1.1) translateX(-15px)' },
            { offset: 1, transform: 'scale(1) translateX(0)' },
          ]"
          fill="forwards"
        >
          <div class="blue-square"></div>

          <button @click="animation.play()">Play</button>
          <button @click="animation.pause()">Pause</button>
          <button @click="animation.stop()">Stop</button>
        </IonAnimation>

        <IonAnimation
          v-slot="{ animation }"
          :duration="1000"
          :keyframes="[
            { offset: 0, transform: 'scale(1)' },
            { offset: 0.8, transform: 'scale(1.15)' },
            { offset: 1, transform: 'scale(1)' },
          ]"
          fill="forwards"
          :iterations="Infinity"
        >
          <div class="green-square"></div>

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
