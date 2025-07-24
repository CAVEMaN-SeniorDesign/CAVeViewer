import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
    // Use the useGLTF hook to load your model
    const { scene } = useGLTF("3d-assets/buddy.glb"); // Replace with your model's path
    return <primitive object={scene} frustumCulled={false} rotation={[0, 0, Math.PI]} />;
}


export function Gltfmesh() {
    return (
      <Canvas camera={{ near: 0.1, far: 10000.0, position: (0, 0, 95) }}>
        <ambientLight intensity={30} />
        <directionalLight position={[10, 10, 10]} intensity={15} />
        <directionalLight position={[-10, -10, -10]} intensity={15} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls position0={[0, 0, 95]} minDistance={95} maxDistance={95} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    );
  }

export function TestApp() {
    return (
        <Canvas>
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshPhongMaterial />
          </mesh>
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 0, 5]} color="red" />
        </Canvas>
    );
    }