import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Html, useProgress } from '@react-three/drei';

function Model() {
    // Use the useGLTF hook to load your model
    const { scene } = useGLTF("3d-assets/buddyfull.compressed.glb"); // Replace with your model's path
    // const { scene } = useGLTF("https://threejs.org/examples/models/gltf/kira.glb");
    return <primitive object={scene} frustumCulled={false} rotation={[0, 0, Math.PI]} />;
}

function Loader() {
  const { progress } = useProgress();
  periodic_progress_update = true;

  // console.log(Math.round(progress));
  // return <Html center className='buddyloader'>{progress} % loaded</Html>;
  return (
    <Html center className='testparentaccess' style={{ width: `100%`, height: "100%" }}>
      <div className="progress" style={{ width: `100%` }}>
          <div className="progress-bar progress-bar-striped progress-bar-animated" id="buddyprogressbar" style={{ width: `${Math.round(progress)}%`}}>
              {Math.round(progress)}%
          </div>
      </div>
    </Html>
  );
}


export function Gltfmesh() {
    return (
      <Canvas camera={{ near: 0.1, far: 10000.0, position: (0, 0, 1000) }}>
        <ambientLight intensity={30} />
        <directionalLight position={[10, 10, 10]} intensity={15} />
        <directionalLight position={[-10, -10, -10]} intensity={15} />
        <Suspense min-width="100%" fallback={<Loader />}>
          <Model />
        </Suspense>
        <OrbitControls position0={[0, 0, 1000]} minDistance={850} maxDistance={1000} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    );
  }
