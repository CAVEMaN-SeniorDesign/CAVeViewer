// import { gltfmesh } from "./components/gltf.jsx";
// import { createRoot } from 'react-dom/client'


// createRoot(document.getElementById('root')).render(<gltfmesh path={'3d-assets/buddy.glb'} />)
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Gltfmesh } from "./components/buddygltf.jsx";
import { Pcbmesh } from "./components/caveboardgltf.jsx";


const root = createRoot(document.getElementById("buddycanvas"));
root.render(
  <StrictMode>
    <Gltfmesh />
  </StrictMode>
);

const pcb = createRoot(document.getElementById("caveboardcanvas"));
pcb.render(
  <StrictMode>
    <Pcbmesh />
  </StrictMode>
)
