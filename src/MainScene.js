import { Stars } from 'drei'
import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import * as THREE from 'three'
import Effects from './3d/Effects'
import FlightControls from './3d/FlightControls'
import FlyingObject from './3d/FlyingObject'
import Planets from './3d/Planets'
import Track from './3d/Track'
import useStore from './store'
import SideMenu from './SideMenu'
import SpaceRocks from './3d/SpaceRocks'
import { OrbitControls } from 'drei'

export default function MainScene() {

  const { fov } = useStore(state => state.mutation)
  const actions = useStore(state => state.actions)

  return (
    <>
      <Canvas
        concurrent
        gl={{ antialias: false }}
        onPointerMove={actions.updateMouse}
        camera={{ position: [0, 0, 200], near: 0.01, far: 10000, fov }}
        onCreated={({ gl, camera }) => {
          actions.init(camera)
          gl.toneMapping = THREE.LinearToneMapping
          gl.setClearColor(new THREE.Color('#030008'))
        }}>
        <fog attach='fog' args={['#250736', 100, 700]}/>
        <ambientLight intensity={0.25} />

        <Stars
          radius={150}
          count={8000}
          depth={70}
          factor={5}
        />

        <Track/>

        <SpaceRocks/>

        <Suspense fallback={null}>
          <Planets/>
          {/* comment out flight controls and use OrbitControls to test the positioning of the 3D elements */}
           <FlightControls>
            <FlyingObject />
          </FlightControls>
        </Suspense>
        {/* <OrbitControls /> */}
        <Effects/>
      </Canvas>
      <SideMenu/>

    </>
  )
}
