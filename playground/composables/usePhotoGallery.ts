import { Capacitor } from '@capacitor/core'
import { Camera, CameraSource, CameraResultType, Photo } from '@capacitor/camera'
import { Filesystem, Directory } from '@capacitor/filesystem'
import { Preferences } from '@capacitor/preferences'

export function usePhotoGallery() {
  const photos = ref<UserPhoto[]>([])
  const PHOTO_STORAGE = 'photos'

  const loadSaved = async () => {
    const photoList = await Preferences.get({ key: PHOTO_STORAGE })
    const photosInStorage = photoList.value ? JSON.parse(photoList.value) : []

    // If running on the web...
    if (!isPlatform('hybrid')) {
      for (const photo of photosInStorage) {
        const file = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        })
        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${file.data}`
      }
    }

    photos.value = photosInStorage
  }

  const convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onerror = reject
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.readAsDataURL(blob)
    })

  const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    let base64Data: string | Blob
    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform('hybrid')) {
      const file = await Filesystem.readFile({
        // eslint-disable-next-line
        path: photo.path!,
      })
      base64Data = file.data
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      // eslint-disable-next-line
      const response = await fetch(photo.webPath!)
      const blob = await response.blob()
      base64Data = (await convertBlobToBase64(blob)) as string
    }
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    })

    if (isPlatform('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      }
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      }
    }
  }

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    })
    const fileName = new Date().getTime() + '.jpeg'
    const savedFileImage = await savePicture(photo, fileName)

    photos.value = [savedFileImage, ...photos.value]
  }

  const deletePhoto = async (photo: UserPhoto) => {
    // Remove this photo from the Photos reference data array
    photos.value = photos.value.filter(p => p.filepath !== photo.filepath)

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1)
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    })
  }

  const cachePhotos = () => {
    Preferences.set({
      key: PHOTO_STORAGE,
      value: JSON.stringify(photos.value),
    })
  }

  onMounted(loadSaved)

  watch(photos, cachePhotos)

  return {
    photos,
    takePhoto,
    deletePhoto,
  }
}

export interface UserPhoto {
  filepath: string
  webviewPath?: string
}
