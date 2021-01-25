import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'
import useStore from '../store'

const position = new THREE.Vector3()
const direction = new THREE.Vector3()

export default function FlyingObject() {

  const mutation = useStore(state => state.mutation)
  const { clock, ray } = mutation
  const main = useRef()
  const exhaust = useRef()
  const spaceship = useRef()

  useFrame(() => {
    // setting up clock and exhaust properties
    main.current.position.z = Math.sin(clock.getElapsedTime() * 40) * Math.PI * 0.1
    exhaust.current.scale.x = 1 + Math.sin(clock.getElapsedTime() * 200)
    exhaust.current.scale.y = 1 + Math.sin(clock.getElapsedTime() * 200)

    // Get ships orientation and save it to the stores ray
    main.current.getWorldPosition(position)
    main.current.getWorldDirection(direction)
    ray.origin.copy(position)
    ray.direction.copy(direction.negate())

    // sets space ships rotation
    spaceship.current.rotation.y += 0.01
  })

  return (
    <group ref={main}>

      {/* flying object group */}
      <group scale={[3.5, 3.5, 3.5]}>
        {/* add tetrahedron here */}
        <group rotation={[Math.PI / 2, Math.PI, 0]}>
          <mesh
          scale={[1, 1.3, 1]}
          ref={spaceship}
          >
            <sphereBufferGeometry attach='geometry' args={[2, 6, 2]}/>
            <meshBasicMaterial attach='material' color='#441d91'/>
          </mesh>
        </group>
      </group>

      {/* flying object exhaust */}
      <mesh ref={exhaust} scale={[1, 1, 30]} position={[0, 0, 50]}>
        <dodecahedronBufferGeometry attach='geometry' args={[1.5, 0]}/>
        <meshBasicMaterial attach='material' color='#cccccc'/>
      </mesh>
    </group>
  )
}
