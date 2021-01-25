import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'

export default function SpaceRocks() {

  const ref = useRef()
  const rock1 = useRef()
  const rock2 = useRef()
  const rock3 = useRef()
  const rock4 = useRef()

  useFrame(() => {
    rock1.current.rotation.y += 0.01
    rock2.current.rotation.x += 0.01
    rock3.current.rotation.y += 0.01
    rock4.current.rotation.z += 0.01
  })

  return (
    <>
      <group ref={ref} scale={[30,50,80]} position={[-200, 0, -200]} >

        {/* red rock*/}
        <mesh ref={rock1}>
          <dodecahedronBufferGeometry attach='geometry'/>
          <meshPhongMaterial attach='material' shininess={100} color='#000000' fog={false}/>
          <pointLight distance={8000} intensity={10} color='#a10505'/>
        </mesh>

        {/* blue rock */}
        <mesh ref={rock2} position={[3,3,5]}>
          <icosahedronBufferGeometry attach='geometry' />
          <meshPhongMaterial attach='material' shininess={100} color='#06060a' fog={false} />
          <pointLight distance={8000} intensity={10} color='#613696'/>
        </mesh>

        {/* purple rock */}
        <mesh ref={rock3} position={[20, 0, 3]} rotation={[Math.PI / 2, Math.PI, 0]}>
          <dodecahedronBufferGeometry attach='geometry'/>
          <meshPhongMaterial attach='material' shininess={100} color='#0a060a' fog={false}/>
          <pointLight distance={8000} intensity={3} color='#17348a'/>
        </mesh>

        {/* the rock in the middle */}
        <mesh ref={rock4} position={[10, -10, 10]} rotation-y={10} scale={[3,5,5]}>
          <icosahedronBufferGeometry attach='geometry' />
          <meshPhongMaterial attach='material' shininess={100} color='#06060a' fog={false} />
          <pointLight distance={8000} intensity={10} color='#c94824'/>
        </mesh>
      </group>
    </>
  )
}
