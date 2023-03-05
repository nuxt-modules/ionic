<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Animation examples</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Animation examples</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="animations-grid">
        <section>
          <IonLabel color="primary">
            <strong>Basic animation</strong>
          </IonLabel>
          <IonAnimation id="animation1" v-slot="{ animation }" :duration="2000" :fromTo="[
  { property: 'opacity', fromValue: '1', toValue: '0.2' },
  { property: 'transform', fromValue: 'translateX(0px)', toValue: 'translateX(-50px)' },
]" fill="forwards">
            <div class="red-square"></div>

            <div class="buttons">
              <IonButton @click="animation.play()">Play</IonButton>
              <IonButton @click="animation.pause()">Pause</IonButton>
              <IonButton @click="animation.stop()">Stop</IonButton>
            </div>
          </IonAnimation>
        </section>

        <section>
          <IonLabel color="primary">
            <strong>Keyframes animation</strong>
          </IonLabel>
          <IonAnimation id="animation2" v-slot="{ animation }" :duration="3000" :keyframes="[
  { offset: 0, transform: 'scale(1) translate(0, 0)' },
  { offset: 0.4, transform: 'scale(1.05) translate(15px, 15px)' },
  { offset: 0.6, transform: 'scale(1.05) translate(-30px, 15px)' },
  { offset: 1, transform: 'scale(1) translate(0, 0)' },
]" fill="none">
            <div class="blue-square"></div>

            <div class="buttons">
              <IonButton @click="animation.play()">Play</IonButton>
              <IonButton @click="animation.pause()">Pause</IonButton>
              <IonButton @click="animation.stop()">Stop</IonButton>
            </div>
          </IonAnimation>
        </section>

        <section>
          <IonLabel color="primary">
            <strong>Animation that repeats forever</strong>
          </IonLabel>
          <IonAnimation id="animation3" v-slot="{ animation }" :duration="1000" :keyframes="[
  { offset: 0, transform: 'scale(1)' },
  { offset: 0.75, transform: 'scale(1.05)' },
  { offset: 1, transform: 'scale(1)' },
]" :iterations="Infinity">
            <div class="green-square"></div>

            <div class="buttons">
              <IonButton @click="animation.play()">Play</IonButton>
              <IonButton @click="animation.pause()">Pause</IonButton>
              <IonButton @click="animation.stop()">Stop</IonButton>
            </div>
          </IonAnimation>
        </section>

        <section>
          <IonLabel color="primary">
            <strong>Animation with style hooks</strong>
          </IonLabel>
          <IonAnimation id="animation4" v-slot="{ animation }" :duration="2000" :keyframes="[
  { offset: 0, transform: 'scale(1)' },
  { offset: 0.75, transform: 'scale(1.1)' },
  { offset: 1, transform: 'scale(1)' },
]" :beforeStyles="{
  opacity: 0.5,
}" :afterClearStyles="['opacity']" :afterStyles="{
  transform: 'scale(0.9)',
}" :beforeClearStyles="['transform']" fill="none">
            <div class="red-square"></div>

            <div class="buttons">
              <IonButton @click="animation.play()">Play</IonButton>
              <IonButton @click="animation.pause()">Pause</IonButton>
              <IonButton @click="animation.stop()">Stop</IonButton>
            </div>
          </IonAnimation>
        </section>

        <section>
          <IonLabel color="primary">
            <strong>Animation with specific easing</strong>
          </IonLabel>
          <IonAnimation id="animation5" v-slot="{ animation }" :duration="2000" :keyframes="[
  {
    offset: 0,
    transform: 'rotate(0)',
  },
  {
    offset: 0.5,
    transform: 'rotate(60deg)',
  },
  {
    offset: 1,
    transform: 'rotate(0)',
  },
]" easing="cubic-bezier(.7,.55,0,1.15)">
            <div class="blue-square"></div>

            <div class="buttons">
              <IonButton @click="animation.play()">Play</IonButton>
              <IonButton @click="animation.pause()">Pause</IonButton>
              <IonButton @click="animation.stop()">Stop</IonButton>
            </div>
          </IonAnimation>
        </section>

        <section>
          <IonLabel color="primary">
            <strong>Reversed animation direction</strong>
          </IonLabel>
          <IonAnimation id="animation6" v-slot="{ animation }" :duration="3000" :keyframes="[
  { offset: 0, transform: 'scale(1)' },
  { offset: 0.3, transform: 'scale(1.2)' },
  { offset: 0.6, transform: 'scale(1.05)' },
  { offset: 0.9, transform: 'scale(0.8)' },
  { offset: 1, transform: 'scale(1)' },
]" direction="reverse" easing="ease-in">
            <div class="green-square"></div>

            <div class="buttons">
              <IonButton @click="animation.play()">Play</IonButton>
              <IonButton @click="animation.pause()">Pause</IonButton>
              <IonButton @click="animation.stop()">Stop</IonButton>
            </div>
          </IonAnimation>
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.animations-grid {
  padding: 3em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(460px, 1fr));
  grid-auto-flow: row;
  row-gap: 4em;
  align-items: center;
  justify-items: center;
  text-align: center;
}

.animations-grid>*:nth-child(2) {
  margin-left: auto;
  margin-right: auto;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
