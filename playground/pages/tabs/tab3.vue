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

      <div style="display: flex; justify-content: center; padding-top: 2em">
        <CreateAnimation
          v-slot="{ animation }"
          :duration="2000"
          :fromTo="[
            { property: 'opacity', fromValue: '1', toValue: '0.2' },
            { property: 'transform', fromValue: 'scale(1)', toValue: 'scale(0.8)' },
          ]"
          fill="forwards"
          playOnMount
        >
          <div style="width: 250px; height: 250px; background-color: red; border-radius: 1em"></div>

          <button @click="animation.play()">Play</button>
          <button @click="animation.pause()">Pause</button>
          <button @click="animation.stop()">Stop</button>
        </CreateAnimation>
      </div>

      <ExploreContainer name="Tab 3 page" />
    </ion-content>
  </ion-page>
</template>
