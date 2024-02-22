/* eslint-disable prettier/prettier */
import { onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue'
import { getActiveHead } from 'unhead'
import { useHead } from '@unhead/vue'
import { onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from '#vue-router'

const headMap = new Map<
  string,
  Array<[Parameters<typeof useHead>[0], ReturnType<typeof useHead>]>
>()
let beforeHook: (() => void) | undefined
let afterHook: (() => void) | undefined
let currPath$1: string
let prevPath: string
export function useIonHead(obj: Parameters<typeof useHead>[0]): ReturnType<typeof useHead> {
  let currentPath = useRoute().path
  const activeHead = getActiveHead()
  const { currentRoute } = useRouter()
  const router = useRouter()
  let hasReallyLeft = false
  let innerObj = obj
  const __returned = {
    dispose() {
      const headArr = [...headMap.get(currentPath)!]
      const headArrIndex = headArr.findIndex(headVal => headVal[0] === innerObj)
      if (headArrIndex === -1) return
      const headToDispose = headArr[headArrIndex][1]
      headToDispose?.dispose()
      headArr.splice(headArrIndex, 1)
      headMap.set(currentPath, headArr)
    },
    patch(newObj: Parameters<typeof useHead>[0]) {
      const headArr = [...headMap.get(currentPath)!]
      const headArrIndex = headArr.findIndex(headVal => headVal[0] === innerObj)
      if (headArrIndex === -1) return
      const [_, headToPatch] = headArr[headArrIndex]
      innerObj = newObj
      headToPatch?.patch(innerObj)
      headArr.splice(headArrIndex, 1, [innerObj, headToPatch])
    },
  }

  let headObj = activeHead?.push(obj)
  if (!headMap.has(currentPath)) {
    headMap.set(currentPath, [[obj, headObj]])
  } else {
    let metaArr = headMap.get(currentPath) || []
    headMap.set(currentPath, [...metaArr, [obj, headObj]])
  }
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
