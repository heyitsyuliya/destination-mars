import React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import { Stars, OrbitControls } from 'drei'
import Track from './3d/Track'
import Effects from './3d/Effects'
import useStore from './store'

export default function MainScene() {

  const { fov } = useStore(state => state.mutation)
  const actions = useStore(state => state.actions)

  return (
    <Canvas
      concurrent
      gl={{ antialias: false }}
      // this position is somewhere near the middle 
      camera={{ position: [0, 0, 200], near: 0.01, far: 10000, fov }}
      onCreated={({ gl, camera }) => {
        actions.init(camera)
        gl.gammaInput = true
        gl.toneMapping = THREE.LinearToneMapping
        gl.setClearColor(new THREE.Color('#050209'))
      }}>
      <fog attach='fog' args={['#250736', 100, 700]}/>
      <ambientLight intensity={0.25} />
      <Stars/>
      <Track/>
      <Effects/>
      <OrbitControls/>
    </Canvas>
  )
}
