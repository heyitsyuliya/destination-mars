import * as THREE from 'three'
// state management library
import create from 'zustand'
import { Curves } from 'three/examples/jsm/curves/CurveExtras'

const [useStore, api] = create((set, get) => {

  let spline = new Curves.GrannyKnot()
  let track = new THREE.TubeBufferGeometry(spline, 250, 0.2, 10, true)

  return {
    mutation: {
      t: 0,
      position: new THREE.Vector3(),
      track,
      scale: 15
    }
  }
})

export default useStore
