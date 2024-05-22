<script setup lang="ts">
import { actionSheetController } from '@ionic/vue'
import type { UserPhoto } from '~/composables/usePhotoGallery'

useHead({
  title: 'Tab 2 - Photos',
})

const { photos, takePhoto, deletePhoto } = usePhotoGallery()

const showActionSheet = async (photo: UserPhoto) => {
  const actionSheet = await actionSheetController.create({
    header: 'Photos',
    buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        icon: ioniconsTrash,
        handler: () => {
          deletePhoto(photo)
        },
      },
      {
        text: 'Cancel',
        icon: ioniconsClose,
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        },
      },
    ],
  })
  await actionSheet.present()
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Photo Gallery
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid>
        <ion-row>
          <ion-col
            v-for="photo in photos"
            :key="photo.filepath"
            size="6"
          >
            <ion-img
              :src="photo.webviewPath"
              @click="showActionSheet(photo)"
            />
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab
        slot="fixed"
        vertical="bottom"
        horizontal="center"
      >
        <ion-fab-button @click="takePhoto()">
          <ion-icon :icon="ioniconsCamera" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>
