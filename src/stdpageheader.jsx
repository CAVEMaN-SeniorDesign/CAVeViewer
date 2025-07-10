import React from "react";
import { createRoot } from "react-dom/client";
import { Header } from './components/header.jsx';

const header = createRoot(document.getElementById("headerroot"));
header.render(<Header params={{page_title: 'CAVEMAN'}}/>);