import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css"; // your CSS (paste the CSS you provided here)

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
