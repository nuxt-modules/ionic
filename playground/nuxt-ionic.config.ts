export default defineNuxtIonicConfig(() => {
  const backButtonText = isPlatform('ios') ? 'Go Back' : undefined
  return {
    backButtonText,
  }
})
