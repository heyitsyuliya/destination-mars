import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { useLoader } from 'react-three-fiber'
import marsTexture from '../assets/mars_texture.jpg'

export default function Planets() {

  const ref = useRef()
  // const mars_texture = new THREE.TextureLoader().load('../assets/mars_texture.jpg')

  // figure out use loader
  // const [ mars_texture] = useLoader(THREE.TextureLoader, [marsTexture])

  return (
    <group ref={ref} scale={[100, 100, 100]} position={[-500, -500, 1000]}>

      {/* Mars */}
      <mesh>
        <sphereBufferGeometry attach='geometry' args={[5, 32, 32]}/>
        {/* <meshStandardMaterial attach='material' map={mars_texture} roughness={1} fog={false}/> */}
        <meshBasicMaterial attach='material' color='#733912' fog={false}/>
      </mesh>

      {/* Pluto */}
      <mesh position={[-30, -30, -60]}>
        <sphereBufferGeometry attach='geometry' args={[3, 32, 32]}/>
        <meshBasicMaterial attach='material' color='#BCB8B1' fog={false}/>
        <pointLight distance={6100} intensity={80} color='white'/>
      </mesh>
    </group>
  )
}
