import { expect, describe, it } from 'vitest'
import * as ionicVue from '@ionic/vue'
import { IonicBuiltInComponents, IonicHooks } from '../../src/imports'

const ExportedHelpers = Object.keys(ionicVue) as Array<keyof typeof ionicVue>
const RegisteredHelpers = [...IonicBuiltInComponents, ...IonicHooks]

const ExcludedHelpers: Array<keyof typeof ionicVue> = [
  'IonicSafeString',
  'IonicSlides',
  'IonicVue',
  'actionSheetController',
  'alertController',
  'loadingController',
  'modalController',
  'pickerController',
  'popoverController',
  'toastController',
]

describe('imports:ionic', () => {
  it('should not register anything that is not exported', () => {
    for (const helper of RegisteredHelpers) {
      expect(ExportedHelpers).toContain(helper)
    }
  })
  it('should register everything that is exported', () => {
    for (const helper of ExportedHelpers) {
      if (ExcludedHelpers.includes(helper)) continue
      expect(RegisteredHelpers).toContain(helper)
    }
  })
})
