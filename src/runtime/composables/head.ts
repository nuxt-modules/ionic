import { onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue'
import type { ActiveHeadEntry, UseHeadInput, UseHeadOptions } from '@unhead/vue/types'
import type { useHead as _useHead } from '@unhead/vue'
import { VueResolver, walkResolver } from '@unhead/vue/utils'
import { getCurrentInstance, getCurrentScope, onBeforeUnmount, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { injectHead } from '#imports'

// This is used to store the active head for each path as long as the path's page is still in the DOM
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const headMap = new Map<string, Array<[UseHeadInput<any>, ActiveHeadEntry<UseHeadInput<any>>]>>()

let beforeHook: (() => void) | undefined
let afterHook: (() => void) | undefined
let currPath: string
let prevPath: string

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useHead<T extends Record<string, any>>(obj: UseHeadInput<T>, _?: UseHeadOptions) {
  const instance = getCurrentInstance()
  const activeHead = injectHead()

  // vue-router composables require being called in setup
  const currentPath = (instance && useRoute().path) || ''

  let innerObj = obj

  /* `@unhead/vue` resolves reactive input before pushing it (see `clientUseHead`), but only in the
     composable we are replacing here — the client head has no prop resolver of its own. Refs would
     otherwise reach the DOM renderer unresolved, where `JSON.stringify` on a `style`/`script`
     innerHTML throws `Converting circular structure to JSON` and every other prop renders the ref
     instead of its value. */
  const resolveInput = (input: UseHeadInput<T>) => walkResolver(input, VueResolver) as UseHeadInput<T>

  /* The map is keyed by the input object identity, so it always holds the raw input — only the
     value handed to unhead is resolved */
  const findActiveEntry = () => headMap.get(currentPath)?.find(headVal => headVal[0] === innerObj)?.[1]

  const __returned: Omit<ActiveHeadEntry<UseHeadInput<T>>, '_poll'> = {
    dispose() {
      // Can just easily mutate the array instead of wasting little CPU to slice/spread it :P
      const headArr = [...headMap.get(currentPath)!]
      const headArrIndex = headArr.findIndex(headVal => headVal[0] === innerObj)
      if (headArrIndex === -1) return
      const headToDispose = headArr[headArrIndex]![1]
      headToDispose?.dispose()
      headArr.splice(headArrIndex, 1)
      headMap.set(currentPath, headArr)
    },
    patch(newObj) {
      // Can just easily mutate the array instead of wasting little CPU to slice/spread it :P
      const headArr = [...headMap.get(currentPath)!]
      const headArrIndex = headArr.findIndex(headVal => headVal[0] === innerObj)
      if (headArrIndex === -1) return
      const [, headToPatch] = headArr[headArrIndex]!
      innerObj = newObj
      headToPatch?.patch(resolveInput(innerObj))
      headArr.splice(headArrIndex, 1, [innerObj, headToPatch])
      headMap.set(currentPath, headArr)
    },
  }

  /* Initially assign the head to the respected slots in the map
     because Ionic components don't unmount the way we expect them to */
  if (!headMap.has(currentPath)) {
    const headObj = activeHead?.push(resolveInput(obj))
    headMap.set(currentPath, [[obj, headObj]])
  }
  else {
    const headObj = activeHead?.push(resolveInput(obj))
    const metaArr = headMap.get(currentPath) || []
    headMap.set(currentPath, [...metaArr, [obj, headObj]])
  }

  /* Keep reactive input in sync, the same way `clientUseHead` does. The entry is looked up on each
     run because `onIonViewDidEnter` disposes and re-pushes it */
  if (getCurrentScope()) {
    let isInitialRun = true
    watchEffect(() => {
      const resolved = resolveInput(innerObj)
      if (isInitialRun) {
        isInitialRun = false
        return
      }
      findActiveEntry()?.patch(resolved)
    })
  }

  // Only use lifecycle hooks if called inside component setup
  if (instance) {
    const router = useRouter()
    const currentRoute = router!.currentRoute

    /* Clear any reference to the input Object and the bound head object before unmounting the component */
    onBeforeUnmount(__returned.dispose)

    if (!beforeHook) {
      beforeHook = router?.beforeEach(() => {
        prevPath = currentRoute.value.path
      })
    }
    if (!afterHook) {
      afterHook = router?.afterEach(() => {
        currPath = currentRoute.value.path
      })
    }

    let hasReallyLeft = false
    onIonViewDidLeave(() => {
      let headArr = headMap.get(prevPath)
      if (headArr) {
        headArr = headArr.map(([obj, head]) => {
          head?.dispose()
          return [obj, head]
        })
        headMap.set(prevPath, headArr)
      }
      hasReallyLeft = true
    })

    onIonViewDidEnter(() => {
      if (hasReallyLeft) {
        let headArr = headMap.get(currPath)
        if (headArr) {
          headArr = headArr.map(([obj, head]) => {
            head?.dispose()
            const newHead = activeHead?.push(resolveInput(obj))
            return [obj, newHead]
          })
          headMap.set(currPath, headArr)
        }
      }
    })
  }

  return __returned
}
