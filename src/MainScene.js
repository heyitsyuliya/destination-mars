import React from 'react'
import { Canvas } from 'react-three-fiber'
import { Stars, OrthographicCamera, OrbitControls } from 'drei'

export default function MainScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Stars/>
      <OrbitControls/>
    </Canvas>
  )
}
