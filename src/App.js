import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from 'drei';


function Box(){
  return (
    <mesh scale={[5, 5, 5]}>
      <boxBufferGeometry attach='geometry'/>
      <meshLambertMaterial attach='material' color='hotpink'/>
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5}/>
      <Box/>
    </Canvas>
  );
}
