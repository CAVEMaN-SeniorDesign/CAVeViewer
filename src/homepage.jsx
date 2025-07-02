// import { gltfmesh } from "./components/gltf.jsx";
// import { createRoot } from 'react-dom/client'


// createRoot(document.getElementById('root')).render(<gltfmesh path={'3d-assets/buddy.glb'} />)
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TestApp } from "../src/components/gltf"
import { Gltfmesh } from "../src/components/gltf";
import { Header } from './components/header.jsx';

document.body.innerHTML = Header("CAVEMAN") + document.body.innerHTML;
const root = createRoot(document.getElementById("buddycanvas"));
root.render(
  <StrictMode>
    <Gltfmesh />
  </StrictMode>
);
