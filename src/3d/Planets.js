import React, { useRef } from 'react'

export default function Planets() {

  const ref = useRef()

  return (
    <group ref={ref} scale={[100, 100, 100]} position={[-500, -500, 1000]}>

      {/* Mars */}
      <mesh>
        <sphereBufferGeometry attach='geometry' args={[5, 32, 32]}/>
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
