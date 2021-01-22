import * as THREE from 'three'
import create from 'zustand'
import { Curves } from 'three/examples/jsm/curves/CurveExtras'
import { addEffect } from 'react-three-fiber'

const [useStore, api] = create((set, get) => {

  let spline = new Curves.GrannyKnot()
  let track = new THREE.TubeBufferGeometry(spline, 250, 0.2, 10, true)

  return {

    camera: undefined,

    mutation: {
      t: 0,
      position: new THREE.Vector3(),
      track,
      scale: 15,
      looptime: 40 *1000,
      startTime: Date.now(),
      binormal: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      clock: new THREE.Clock(false),
    },

    actions: {
      init(camera){
        const { mutation, actions } = get()

        set({ camera })
        mutation.clock.start()

        addEffect(() => {
          const time = Date.now()
          const t = (mutation.t = ((time - mutation.startTime) % mutation.looptime) / mutation.looptime)
          mutation.position = track.parameters.path.getPointAt(t)
          mutation.position.multiplyScalar(mutation.scale)

          let warping = false
          if (t > 0.3 && t < 0.4) {
            if (!warping) {
              warping = true
            }
          } else if (t > 0.5) warping = false
        })
      }
    }
  }
})

export default useStore
