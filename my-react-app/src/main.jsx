import React from "react";
import ReactDOM from "react-dom/client";  // Import createRoot
import "./index.css"; // Import Tailwind CSS file
import App from "./App"; // Import the main App component

// Create a root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
