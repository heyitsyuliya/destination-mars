import * as THREE from 'three'
import create from 'zustand'
import { Curves } from 'three/examples/jsm/curves/CurveExtras'
import { addEffect } from 'react-three-fiber'
import ppk from './assets/ppk-resurrection(trimmed).mp3'

const [useStore, api] = create((set, get) => {

  let spline = new Curves.GrannyKnot()
  let track = new THREE.TubeBufferGeometry(spline, 250, 0.2, 10, true)
  let audio = new Audio(ppk)

  return {

    camera: undefined,
    sound: false,

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
        actions.toggleSound(get().sound)

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
      },
      toggleSound(sound = !get().sound){
        set({ sound })
        playAudio(audio, 1, true)
      }
    }
  }
})

function playAudio(audio, volume = 1, loop = false){
  if (api.getState().sound){
    audio.currentTime = 0
    audio.volume = volume
    audio.loop = loop
    audio.play()
  }

  else {
    audio.pause()
  }
}

export default useStore
export { ppk , playAudio }
