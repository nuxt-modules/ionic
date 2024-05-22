import { onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue'
import { getActiveHead } from 'unhead'
import type { useHead as useHead$1 } from '@unhead/vue'
import { onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from '#vue-router'

// This is used to store the active head for each path as long as the path's page is still in the DOM
const headMap = new Map<
  string,
  Array<[Parameters<typeof useHead$1>[0], ReturnType<typeof useHead$1>]>
>()
let beforeHook: (() => void) | undefined
let afterHook: (() => void) | undefined
let currPath$1: string
let prevPath: string
export function useHead(obj: Parameters<typeof useHead$1>[0]) {
  const currentPath = useRoute().path
  const activeHead = getActiveHead()
  const { currentRoute } = useRouter()
  const router = useRouter()
  let hasReallyLeft = false
  let innerObj = obj
  const __returned: ReturnType<typeof useHead$1> = {
    dispose() {
      // Can just easily mutate the array instead of wasting little CPU to slice/spread it :P
      const headArr = [...headMap.get(currentPath)!]
      const headArrIndex = headArr.findIndex(headVal => headVal[0] === innerObj)
      if (headArrIndex === -1) return
      const headToDispose = headArr[headArrIndex][1]
      headToDispose?.dispose()
      headArr.splice(headArrIndex, 1)
      headMap.set(currentPath, headArr)
    },
    patch(newObj) {
      // Can just easily mutate the array instead of wasting little CPU to slice/spread it :P
      const headArr = [...headMap.get(currentPath)!]
      const headArrIndex = headArr.findIndex(headVal => headVal[0] === innerObj)
      if (headArrIndex === -1) return
      const [, headToPatch] = headArr[headArrIndex]
      innerObj = newObj
      headToPatch?.patch(innerObj)
      headArr.splice(headArrIndex, 1, [innerObj, headToPatch])
      headMap.set(currentPath, headArr)
    },
  }

  /* Initially assign the head to the respected slots in the map
     because Ionic components don't unmount the way we expect them to */
  if (!headMap.has(currentPath)) {
    const headObj = activeHead?.push(obj)
    headMap.set(currentPath, [[obj, headObj]])
  }
  else {
    const headObj = activeHead?.push(obj)
    const metaArr = headMap.get(currentPath) || []
    headMap.set(currentPath, [...metaArr, [obj, headObj]])
  }
  /* Clear any reference to the input Object and the bound head object before unmounting the component */
  onBeforeUnmount(__returned.dispose)

  if (!beforeHook) {
    beforeHook = router.beforeEach(() => {
      prevPath = currentRoute.value.path
    })
  }
  if (!afterHook) {
    afterHook = router.afterEach(() => {
      currPath$1 = currentRoute.value.path
    })
  }

  onIonViewDidLeave(() => {
    let headArr = headMap.get(prevPath)
    if (headArr) {
      headArr = headArr.map(([obj, head]) => {
        head?.dispose()
        return [obj, undefined]
      })
      headMap.set(prevPath, headArr)
    }
    hasReallyLeft = true
  })

  onIonViewDidEnter(() => {
    if (hasReallyLeft) {
      let headArr = headMap.get(currPath$1)
      if (headArr) {
        headArr = headArr.map(([obj, head]) => {
          head?.dispose()
          const newHead = activeHead?.push(obj)
          return [obj, newHead]
        })
        headMap.set(currPath$1, headArr)
      }
    }
  })
  return __returned
}
