import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

import {ConvexProvider, ConvexReactClient} from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </React.StrictMode>
);
