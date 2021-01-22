import React from 'react'
import { Canvas } from 'react-three-fiber'
import { Stars, OrbitControls } from 'drei'
import Track from './3d/Track'

export default function MainScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Stars/>
      <Track/>
      <OrbitControls/>
    </Canvas>
  )
}
