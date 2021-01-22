import * as THREE from 'three'
import create from 'zustand'
import { Curves } from 'three/examples/jsm/curves/CurveExtras'
import { addEffect } from 'react-three-fiber'


let guid = 1

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
      fov: 90,
      looptime: 150 * 1000,
      startTime: Date.now(),
      binormal: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      clock: new THREE.Clock(false),
      ray: new THREE.Ray(),
      mouse: new THREE.Vector2(-250, 50),
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
      },
      updateMouse({ clientX: x, clientY: y }){
        get().mutation.mouse.set(x - window.innerWidth / 2, y - window.innerHeight / 2)
      }
    }
  }
})

function randomData(count, track, radius, size, scale) {
  return new Array(count).fill().map(() => {
    const t = Math.random()
    const pos = track.parameters.path.getPointAt(t)
    pos.multiplyScalar(15)
    const offset = pos
      .clone()
      .add(new THREE.Vector3(-radius + Math.random() * radius * 2, -radius + Math.random() * radius * 2, -radius + Math.random() * radius * 2))
    const speed = 0.1 + Math.random()
    return { guid: guid++, scale: typeof scale === 'function' ? scale() : scale, size, offset, pos, speed, radius, t, hit: new THREE.Vector3(), distance: 1000 }
  })
}

export default useStore
